import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { compareSync } from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Please enter a valid email address or password. Retry." },
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
