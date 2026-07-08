import LectureCard from "@/components/lecture-card";
import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = parseInt(id);
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const studentId = parseInt(session?.value || "0");
    
    const course = await prisma.course.findUnique({
        where: { id: courseId }
    });
    const lectures = await prisma.lecture.findMany({
        where: { courseId },
        orderBy: { order: "asc"}
    });
    const completedLectures = await prisma.completedLecture.findMany({
        where: { studentId }
    });


    if(!course){
        return <p>Course Not found</p>
    }

    return (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <main className="flex-1 p-8">
      <Link href="/dashboard" className="inline-block mb-6 text-sm text-blue-500 hover:underline">
  ← Back to Dashboard
</Link>
      <h1 className="text-2xl font-bold text-green-900 mb-6">{course.title}</h1>
      <div className="grid grid-cols-1 gap-3 max-w-2xl">
        {lectures.map((lecture) => {
          const isCompleted = completedLectures.some(cl => cl.lectureId === lecture.id);
          return (
            <LectureCard
              key={lecture.id}
              title={lecture.title}
              notes={lecture.notes}
              lectureId={lecture.id}
              studentId={studentId}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>   
    </main>    
  </div>       
);
}