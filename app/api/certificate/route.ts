import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const studentId = parseInt(session?.value || "0");

  const courseId = parseInt(request.nextUrl.searchParams.get("courseId") || "0");

  const enrollment = await prisma.enrollment.findFirst({
    where: { studentId, courseId },
    include: {
      student: true,
      course: true,
    },
  });

  if (!enrollment) {
    return NextResponse.json(
      { error: "No Enrollment Found" },
      { status: 404 }
    );
  }

  const completedCount = await prisma.completedLecture.count({
    where: {
      studentId,
      lecture: { courseId }
    }
  });

  if (completedCount < enrollment.course.totalLectures) {
    return NextResponse.json(
      { error: "Not completed yet" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    studentName: enrollment.student.name,
    courseTitle: enrollment.course.title,
  });
}