import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const { username, password } = await request.json();

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "USER",
      },
    });

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
