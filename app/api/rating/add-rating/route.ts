import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { userId, projectId, rating } = await req.json();

    if (!userId || !projectId || rating == null) {
      return NextResponse.json(
        { error: "User ID, Project ID, and Rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const existingRating = await prisma.projectRating.findFirst({
      where: {
        userId,
        projectId,
      },
    });

    if (existingRating) {
      const updatedRating = await prisma.projectRating.update({
        where: {
          id: existingRating.id,
        },
        data: {
          rating,
        },
      });
      return NextResponse.json(
        { message: "Rating updated successfully", data: updatedRating },
        { status: 200 }
      );
    } else {
      const newRating = await prisma.projectRating.create({
        data: {
          rating,
          userId,
          projectId,
        },
      });
  
      return NextResponse.json(
        { message: "Rating added successfully", data: newRating },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error adding project rating:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
