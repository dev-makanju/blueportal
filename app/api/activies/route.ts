import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.projectComment.findMany({
      where: {
        userId,
      },
      include: {
        project: true, 
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching user comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
