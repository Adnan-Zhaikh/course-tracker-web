"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProgressButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate(lectures: number) {
    setLoading(true);

    await fetch("/api/enrollment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completedLectures: lectures }),
    });

    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {[2, 4, 6, 8, 10].map((num) => (
        <button
          key={num}
          onClick={() => handleUpdate(num)}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Set to {num} lectures
        </button>
      ))}
    </div>
  );
}