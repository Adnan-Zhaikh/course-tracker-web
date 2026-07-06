import Sidebar from "@/components/sidebar";
import ProgressCard from "@/components/progress-card";
import CertificateButton from "@/components/certificatebutton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";
import EnrollButton from "@/components/enroll-button";

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
  const courses = await prisma.course.findMany();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h1>
        <p className="text-gray-500 mb-8">Choose a course to get started</p>
        <div className="flex flex-col gap-4 max-w-xl">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{course.description}</p>
              <p className="text-sm text-gray-400 mt-1">{course.totalLectures} lectures</p>
              <EnrollButton courseId={course.id} studentId={studentId} />
            </div>
          ))}
        </div>
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

const courses = await prisma.course.findMany();
const otherCourses = courses.filter(course => course.id !== enrollment.course.id);
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
          {otherCourses.length > 0 && (
          <div className="mt-8">
             <h2 className="text-lg font-semibold text-gray-800 mb-4">Other Courses</h2>
              {otherCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow p-6 mb-4">
                  <h3 className="text-md font-semibold text-gray-800">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                  <p className="text-sm text-gray-400 mt-1">{course.totalLectures} lectures</p>
                  <EnrollButton courseId={course.id} studentId={studentId} />
                </div>
                 ))}
             </div>
            )}
        </div>
      </main>
    </div>
  );
}