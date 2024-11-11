import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    try {    
        const assignment = await prisma.assignment.findMany({
            where: {
                userId: userId,
            },
        });

        return NextResponse.json(assignment);

    } catch (e) {
        console.error("Error fetching lesson plans:", e);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }         
};
