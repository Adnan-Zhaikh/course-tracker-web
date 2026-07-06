"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

interface props {
  courseId: number,
  studentId: number
}

export default function EnrollButton({ courseId, studentId }: props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEnroll() {
  setLoading(true);

  const res = await fetch("/api/enrollment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, studentId }),
  });

  if (res.ok) {
    window.location.href = "/dashboard";
  } else {
    const data = await res.json();
    alert(data.error || "Enrollment failed");
  }

  setLoading(false);
}
  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
    >
      {loading ? "Enrolling..." : "Enroll Now"}
    </button>
  );
}