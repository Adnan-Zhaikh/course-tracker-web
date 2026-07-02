"use client"

import { useState } from "react";
import { Student, Enrollment } from "@/types";

const student: Student = {
    id: 1,
    name: "Adnan",
    email: "adnan@gmai.com",
};

const enrollment: Enrollment = {
    id: 1,
    studentId: 1,
    courseId: 1,
    completedLectures: 8,
    enrolledAt: "2026-03-15"
}

export default function DashboardPage() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Student: {student.name}</p>
            <p>Completed: {enrollment.completedLectures} lectures</p>
        </div>
    )
}