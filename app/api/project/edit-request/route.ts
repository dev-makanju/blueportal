import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId, projectId, statusType } = await req.json();

    if (!userId || !projectId) {
      return NextResponse.json({ error: "userId and projectId are required" }, { status: 400 });
    }

    const editRequest = await prisma.projectContributor.create({
      data: {
        userId,
        projectId,
        status: statusType,
      },
    });

    return NextResponse.json(editRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating edit request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
