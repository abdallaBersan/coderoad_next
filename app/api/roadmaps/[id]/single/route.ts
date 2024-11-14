import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, context: any) => {
  try {
    const { params } = context;
    const id = params.id;

    // Données de mise à jour reçues dans le corps de la requête
    const data = await req.json();

    // Exclure `id` et `authorId` des données de mise à jour
    const { id: _, authorId: __, ...updateData } = data;

    // Mettre à jour uniquement la roadmap correspondant à l'ID
    const updatedRoadmap = await prisma.roadmap.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      message: "Roadmap updated",
      roadmap: updatedRoadmap,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error || "Something went wrong" },
      { status: 500 }
    );
  }
};
