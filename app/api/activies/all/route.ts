import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const groupedComments = await prisma.projectComment.groupBy({
      by: ['projectId'],
      _max: {
        createdAt: true,
      },
    });

    const comments = await Promise.all(
      groupedComments.map(async (group) => {
        return prisma.projectComment.findFirst({
          where: {
            projectId: group.projectId,
            createdAt: group._max.createdAt as Date,
          },
          include: {
            project: true,
          },
        });
      })
    );

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
