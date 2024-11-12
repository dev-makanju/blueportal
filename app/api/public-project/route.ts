import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {    
        const projects = await prisma.project.findMany({
            include: {
                user: true, 
            },
            orderBy: {
                dueDate: 'asc',
            },
        });

        return NextResponse.json(projects);

    } catch (e) {
        console.error("Error fetching projects:", e);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }         
};
