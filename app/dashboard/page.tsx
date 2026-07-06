import Sidebar from "@/components/sidebar";
import ProgressCard from "@/components/progress-card";
import CertificateButton from "@/components/certificatebutton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const studentId = parseInt(session?.value || "0");

  const enrollment = await prisma.enrollment.findFirst({
    where: {studentId},
    include: {
      student: true,
      course: true,
    },
  });
  
  if (!enrollment) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <p className="text-gray-600">No enrollment found. Please contact your administrator.</p>
      </main>
    </div>
  );
}
  const completedCount = await prisma.completedLecture.count({
    where: { studentId: enrollment.studentId }
});

 const progressPercent = Math.round(
  (completedCount / enrollment.course.totalLectures) * 100
);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {enrollment.student.name}
        </h1>
        <p className="text-gray-500 mb-8">Here's your course progress</p>
        <div className="flex flex-col gap-6 max-w-xl">
          <Link href={`/courses/${enrollment.course.id}`}>
          <ProgressCard
            courseTitle={enrollment.course.title}
            completedLectures={completedCount}
            totalLectures={enrollment.course.totalLectures}
          />
          </Link>
          <CertificateButton progressPercent={progressPercent} />
        </div>
      </main>
    </div>
  );
}