import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { compareSync } from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cookie from "cookie";
// import dayjs from "dayjs";

// const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    const passwordIsValid = compareSync(password, user.password);
    
    if (!passwordIsValid) {
      return NextResponse.json(
        { error: `Invalid credentials` },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
          { data: user, error: null },
          { status: 200 }
    );

    // const sessionToken = jwt.sign(
    //   {
    //     id: user.id,
    //     role: user.role,
    //   },
    //   JWT_SECRET,
    //   { expiresIn: "30d" }
    // );

    // const response = NextResponse.json(
    //     { data: user, error: null },
    //     { status: 200 }
    // );

    // response.headers.set(
    //   "Set-Cookie",
    //   cookie.serialize("session_id", sessionToken, {
    //     httpOnly: true,
    //     path: "/",
    //     priority: "high",
    //     sameSite: "strict",
    //     secure: process.env.NODE_ENV === "production",
    //     expires: dayjs().add(30, "days").toDate(),
    //   })
    // );

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
