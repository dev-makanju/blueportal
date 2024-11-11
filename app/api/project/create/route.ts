
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ProjectTypes } from "@/types/main";

export const POST = async (req: Request) => {
  try {
    const {
      content,
      description,
      dueDate,
      tags,
      title,
      date,
      userId,
    }: ProjectTypes = await req.json();

    if (!title || !content || !description || !tags || !dueDate || !userId) {
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
        tags,
        title,
        date,
        userId,
      },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson plan:", error);
    return NextResponse.json(
      { error: "Failed to create lesson plan" },
      { status: 500 }
    );
  }
};
