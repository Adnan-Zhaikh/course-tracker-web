import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function  POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, password } = body;

    const email_exist = await prisma.student.findUnique({
        where: {email}
    });

    if (email_exist){
        return NextResponse.json(
            {error: "Email already in exist"},
            {status: 400}
        )
    } 

    await prisma.student.create({
            data: { name, email, password }
        });
        return NextResponse.json({success: true})
    
}