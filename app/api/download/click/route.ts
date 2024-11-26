
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
   const { userId, projectId } = await req.json();
   try {
    if (!projectId || !userId) {
      return NextResponse.json(
        { error: "Please provide login user info" },
        { status: 400 }
      );
    }

    const newProject = await prisma.projectDownLoad.create({
      data: {
        projectId,
        userId,
      },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
};
