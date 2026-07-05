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
        {error: "No Enrollment Found"},
        {status: 404}
    );
  };
  if(enrollment.completedLectures !== enrollment.course.totalLectures){
    return NextResponse.json(
        {error:"Not completed yet"},
        {status: 400}
    )
  };
  return NextResponse.json({
    studentName: enrollment.student.name,
    courseTitle: enrollment.course.title,
    });
}
