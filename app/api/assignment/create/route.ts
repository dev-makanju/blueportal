
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { AssignmentTypes } from "@/types/main";

export const POST = async (req: Request) => {
  try {
    const {
      title,
      gradeLevel,
      instructions,
      resources,
      subject,
      description,
      dueDate,
      userId,
    }: AssignmentTypes = await req.json();

    if (!title || !gradeLevel || !resources || !subject || !description || !instructions || !dueDate || !userId) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const newAssignment = await prisma.assignment.create({
      data: {
        title,
        gradeLevel,
        instructions,
        resources,
        subject,
        description,
        dueDate,
        userId,
      },
    });
    return NextResponse.json( newAssignment, { status: 201 });
  } catch (error) {
    console.error("Error creating Assignment:", error);
    return NextResponse.json(
      { error: "Failed to create Assignment" },
      { status: 500 }
    );
  }
};
