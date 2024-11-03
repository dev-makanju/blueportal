import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

   // const hashPassword = await bcrypt.hash(password, 10);

    await prisma.$connect();
    const user = await prisma.user.create({
      data: { name, email, password , role },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);
    await prisma.$disconnect();
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
