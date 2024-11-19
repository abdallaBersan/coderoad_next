import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  try {
    const { params } = context;

    // Get the ID from the URL
    const id = params.id;

    //   get uuid from this roadmap
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
    });

    if (!roadmap) {
      return NextResponse.json(
        { message: "Roadmap not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error || "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request, context: any) => {
  try {
    const { params } = context;

    // Get the ID from the URL
    const id = params.id;

    // Données de mise à jour reçues dans le corps de la requête
    const data = await req.json();

    const { id: _, authorId: __, ...updateData } = data;

    // get uuid from this roadmap
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
    });

    if (!roadmap) {
      return NextResponse.json(
        { message: "Roadmap not found" },
        { status: 404 }
      );
    }

    const uuid = roadmap.uuid;

    // Mettre à jour les roadmaps qui ont le même uuid
    const updatedRoadmap = await prisma.roadmap.updateMany({
      where: { uuid },
      data: updateData,
    });

    // Récupérer les roadmaps mises à jour
    const updatedRoadmaps = await prisma.roadmap.findMany({
      where: { uuid },
    });

    return NextResponse.json({
      message: "Roadmaps updated",
      count: updatedRoadmap.count,
      roadmaps: updatedRoadmaps,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error || "Something went wrong" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, context: any) => {
  try {
    const { params } = context;

    const id = params.id;

    // get uuid from this roadmap
    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
    });

    if (!roadmap) {
      return NextResponse.json(
        { message: "Roadmap not found" },
        { status: 404 }
      );
    }

    const uuid = roadmap.uuid;

    // Supprimer les roadmaps qui ont le même uuid
    const deletedRoadmap = await prisma.roadmap.deleteMany({
      where: { uuid },
    });

    return NextResponse.json({
      message: "Roadmaps deleted",
      count: deletedRoadmap.count,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error || "Something went wrong" },
      { status: 500 }
    );
  }
};
