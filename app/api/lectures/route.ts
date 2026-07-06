import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function  POST(request: NextRequest) {
    const body = await request.json();
    const { lectureId, studentId } = body;

    const existing = await prisma.completedLecture.findUnique({
  where: {
    studentId_lectureId: { studentId, lectureId }
  }
});
    if(existing) {
        await prisma.completedLecture.delete({
            where: {studentId_lectureId: { studentId, lectureId}}
        })
    } else {
        await prisma.completedLecture.create({
            data: { studentId, lectureId}
        })
    }

    return NextResponse.json({ success: true});
}