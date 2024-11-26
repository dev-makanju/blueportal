import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const ratings = await prisma.projectComment.findMany();

    return NextResponse.json(ratings, { status: 200 });
  } catch (error) {
    console.error("Error fetching project downloads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
