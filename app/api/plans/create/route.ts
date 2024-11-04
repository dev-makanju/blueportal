
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { LessonPlanProps } from "@/types/main";

export const POST = async (req: Request) => {
  try {
    const {
      title,
      gradeLevel,
      objectives,
      materials,
      assessment,
      reflection,
      lessonPhases,
      date,
      userId,
    }: LessonPlanProps = await req.json();

    if (!title || !gradeLevel || !objectives || !materials || !assessment || !date || !userId) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const newLessonPlan = await prisma.lessonPlan.create({
      data: {
        title,
        gradeLevel,
        objectives,
        materials,
        assessment,
        lessonPhases,
        reflection, 
        date,
        userId,
      },
    });
    return NextResponse.json(newLessonPlan, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson plan:", error);
    return NextResponse.json(
      { error: "Failed to create lesson plan" },
      { status: 500 }
    );
  }
};
