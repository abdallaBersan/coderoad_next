import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  try {
    const { params } = context;
    //   if (!req.user) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //   }

    // Get the ID from the URL
    const userId = params.id;

    // Get user with roadmaps
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Roadmap: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error || "Something went wrong" },
      { status: 500 }
    );
  }
};
