import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId, projectId, statusType } = await req.json();

    if (!userId || !projectId) {
      return NextResponse.json({ error: "userId and projectId are required" }, { status: 400 });
    }

    const existingRequest = await prisma.projectContributor.findFirst({
      where: {
        userId,
        projectId,
        
      },
    });

    if (existingRequest) {
       const updateRequest = await prisma.projectContributor.update({
          where: {
            id: existingRequest.id
          },
          data: {
            status: statusType
          }
       });

       return NextResponse.json(updateRequest , { status: 200 });
    }else{
      return NextResponse.json({ error: "Request does not exist" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error creating edit request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
