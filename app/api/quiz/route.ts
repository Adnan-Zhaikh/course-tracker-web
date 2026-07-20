import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { studentId, quizId, score, passed } = body;

    const quizAttempt = await prisma.quizAttempt.create({
        data: { studentId, quizId, score, passed }
    });

    return NextResponse.json({ success: true });
    
}