import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const { username, password } = await request.json();

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "USER",
      },
    });

    // get all unique roadmaps by uuid
    const roadmaps = await prisma.roadmap.findMany({
      distinct: ["uuid"],
    });

    // copier ces roadmaps pour chaque nouvel utilisateur
    await Promise.all(
      roadmaps.map((roadmap) =>
        prisma.roadmap.create({
          data: {
            title: roadmap.title,
            description: roadmap.description,
            status: roadmap.status,
            github: roadmap.github,
            type: roadmap.type,
            group: roadmap.group,
            uuid: roadmap.uuid,
            authorId: user.id,
            createdAt: roadmap.createdAt,
          },
        })
      )
    );

    return NextResponse.json(
      {
        message: "Account has been created",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
