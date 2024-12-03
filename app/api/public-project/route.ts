import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const sortOrder = url.searchParams.get('sortOrder') || 'asc';
        const sortBy = url.searchParams.get('sortBy') || 'dueDate';

        if (sortOrder !== 'asc' && sortOrder !== 'desc') {
            return NextResponse.json(
                { error: "'sortOrder' must be either 'asc' or 'desc'" },
                { status: 400 }
            );
        }

        if (sortBy !== 'dueDate') {
            return NextResponse.json(
                { error: "'sortBy' is only allowed to be 'dueDate'" },
                { status: 400 }
            );
        }

        const projects = await prisma.project.findMany({
            include: {
                user: true, 
                ratings: true,
                comments: true,
                contributors: true,
            },
            orderBy: {
                [sortBy]: sortOrder,
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
