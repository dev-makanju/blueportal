
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ProjectTypes } from "@/types/main";

export const POST = async (req: Request) => {
  try {
    const {
      content,
      description,
      dueDate,
      title,
      userId,
    }: ProjectTypes = await req.json();

    if (!title || !content || !description || !dueDate || !userId) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        content,
        description,
        dueDate,
        title,
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
