import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is missing" },
        { status: 400 }
      );
    }

    const comments = await prisma.projectComment.findMany({
      where: {
        projectId,
      },
      include: {
        user: true, 
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching project comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
