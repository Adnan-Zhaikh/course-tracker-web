"use client"

import { useState } from "react";

interface props {
    lectureId: number,
    studentId: number,
    isCompleted: boolean
}

export default function LectureCheckbox({ lectureId, studentId, isCompleted }: props) {
    const [checked, setChecked] =  useState(isCompleted);
    const [loading, setLoading] = useState(false);

    async function handleToggle() {
        console.log("Sending:", { lectureId, studentId, types: { lectureId: typeof lectureId, studentId: typeof studentId } });
    setLoading(true);
    
    const res = await fetch("/api/lectures", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({lectureId, studentId}),
    })

    setChecked(!checked);
    setLoading(false);
    };

    return (
        <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={loading}
        className="w-5 h-5 cursor-pointer"
        />
    );
};


