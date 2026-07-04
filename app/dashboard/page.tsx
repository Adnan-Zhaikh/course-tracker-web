import Sidebar from "@/components/sidebar";
import ProgressCard from "@/components/progress-card";
import CertificateButton from "@/components/certificatebutton";
import UpdateProgressButton from "@/components/update-progress-button";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const enrollment = await prisma.enrollment.findFirst({
    include: {
      student: true,
      course: true,
    },
  });

  if (!enrollment) {
    return <p>No enrollment found.</p>;
  }

  const progressPercent = Math.round(
    (enrollment.completedLectures / enrollment.course.totalLectures) * 100
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
          <ProgressCard
            courseTitle={enrollment.course.title}
            completedLectures={enrollment.completedLectures}
            totalLectures={enrollment.course.totalLectures}
          />
          <CertificateButton progressPercent={progressPercent} />
          <UpdateProgressButton />
        </div>
      </main>
    </div>
  );
}