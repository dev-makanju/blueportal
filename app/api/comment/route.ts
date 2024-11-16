import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { userId, projectId, content } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is missing" },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is missing" },
        { status: 400 }
      );
    }

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content cannot be empty" },
        { status: 400 }
      );
    }

    const comment = await prisma.projectComment.create({
      data: {
        content,
        projectId,
        userId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating project comment:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
