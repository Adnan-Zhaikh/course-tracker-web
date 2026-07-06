import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }
  
  const student = await prisma.student.findUnique({
    where: { email }
  });

  if (!student || !student.password || student.password !== password) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
}

  const response = NextResponse.json({ success: true });

  response.cookies.set("session", student.id.toString(), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24,
});

  return response;
}