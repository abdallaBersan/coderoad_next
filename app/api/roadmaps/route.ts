import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request, context: any) => {
  try {
    const { title, description, status, github, type, group } =
      await req.json();

    // generate uuid
    const uuid = uuidv4();

    // get all users
    const users = await prisma.user.findMany();

    // generate roadmap for each user
    await Promise.all(
      users.map((user) =>
        prisma.roadmap.create({
          data: {
            title,
            description,
            status,
            github,
            type,
            group,
            uuid: uuid,
            authorId: user.id,
          },
        })
      )
    );

    return NextResponse.json(
      {
        message: "Roadmaps has been created",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
