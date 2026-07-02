"use client"

import { useState } from "react";

const student = {
    name: "Adnan",
    completedLectures: 8,
    totalLectures: 10,
};

export default function DashboardPage() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Student: {student.name}</p>
            <p>Progress: {student.completedLectures}/{student.totalLectures} lectures</p>
        </div>
    )
}