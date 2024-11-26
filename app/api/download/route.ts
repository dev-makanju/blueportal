import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const ratings = await prisma.projectDownLoad.findMany({
      where: { 
        projectId, 
      },
    });

    return NextResponse.json(ratings, { status: 200 });
  } catch (error) {
    console.error("Error fetching project downloads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
