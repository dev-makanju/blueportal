import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const ratings = await prisma.projectDownLoad.findMany();

    return NextResponse.json(ratings, { status: 200 });
  } catch (error) {
    console.error("Error fetching project downloads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
