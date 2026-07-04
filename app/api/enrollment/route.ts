import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const enrollment = await prisma.enrollment.findFirst({
    include: {
      student: true,
      course: true,
    },
  });

  if (!enrollment) {
    return NextResponse.json(
      { error: "No enrollment found" },
      { status: 404 }
    );
  }

  return NextResponse.json(enrollment);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { completedLectures } = body;

  if (typeof completedLectures !== "number") {
    return NextResponse.json(
      { error: "completedLectures must be a number" },
      { status: 400 }
    );
  }

  const updated = await prisma.enrollment.updateMany({
    data: { completedLectures },
  });

  return NextResponse.json({ success: true, updated });
}