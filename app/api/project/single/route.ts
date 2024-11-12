import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("_id");

    if (!projectId) {
        return NextResponse.json({ error: "Cannot fetch single project" }, { status: 400 });
    }

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                user: true,
                tags: true,         
                contributors: {
                    include: {
                        user: true, 
                    },
                },
                ratings: true, 
            },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(project);

    } catch (e) {
        console.error("Error fetching project:", e);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};
