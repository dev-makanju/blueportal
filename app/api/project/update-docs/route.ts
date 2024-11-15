import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const { userId, projectId, content } = await req.json();

    if (!userId || !projectId || !content) {
      return NextResponse.json({ error: "Required data missing" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.userId === userId) {
      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: { content },
      });

      return NextResponse.json(updatedProject, { status: 200 });
    }

    const contributor = await prisma.projectContributor.findFirst({
      where: {
        userId,
        projectId,
        status: "APPROVED",
      },
    });

    if (!contributor) {
      return NextResponse.json({ error: "You are not authorized to update this project" }, { status: 403 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { content },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
