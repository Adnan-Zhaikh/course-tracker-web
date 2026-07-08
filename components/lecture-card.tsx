"use client";

import { useState } from "react";
import LectureCheckbox from "@/components/lectures-checkbox";

interface Props {
  title: string;
  notes: string | null;
  lectureId: number;
  studentId: number;
  isCompleted: boolean;
}

export default function LectureCard({
  title,
  notes,
  lectureId,
  studentId,
  isCompleted,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LectureCheckbox
              lectureId={lectureId}
              studentId={studentId}
              isCompleted={isCompleted}
            />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>

        {notes && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            {isExpanded ? "Hide Notes" : "Show Notes"}
          </button>
        )}
      </div>

      {isExpanded && (
          <div className="mt-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-gray-700 text-sm leading-relaxed">{notes}</p>
          </div>
        )}
    </div>
  );
}