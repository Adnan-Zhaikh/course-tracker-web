"use client"

import Sidebar from "@/components/sidebar";
import ProgressCard from "@/components/progress-card";
import CertificateButton from "@/components/certificatebutton";
import { Student, Enrollment } from "@/types";

const student: Student = {
  id: 1,
  name: "Adnan",
  email: "adnan@example.com",
};

const enrollment: Enrollment = {
  id: 1,
  studentId: 1,
  courseId: 1,
  completedLectures: 10,
  enrolledAt: "2024-01-15",
};

const totalLectures = 10;
const progressPercent = Math.round((enrollment.completedLectures / totalLectures) * 100);

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {student.name}</h1>
        <p className="text-gray-500 mb-8">Here's your course progress</p>
        <div className="flex flex-col gap-6 max-w-xl">
          <ProgressCard
            courseTitle="Full Stack Web Development"
            completedLectures={enrollment.completedLectures}
            totalLectures={totalLectures}
          />
          <CertificateButton progressPercent={progressPercent} />
        </div>
      </main>
    </div>
  );
}