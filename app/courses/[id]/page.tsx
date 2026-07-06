import LectureCheckbox from "@/components/lectures-checkbox";
import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import { BookOpen, CheckCircle } from "lucide-react";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = parseInt(id);
    
    const course = await prisma.course.findUnique({
        where: { id: courseId }
    });
    const lectures = await prisma.lecture.findMany({
        where: { courseId }
    });
    const completedLectures = await prisma.completedLecture.findMany({
        where: { studentId: 3 }
    });

    if(!course){
        return <p>Course Not found</p>
    }

    return (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{course.title}</h1>
      <div className="grid grid-cols-1 gap-3">
        {lectures.map((lecture) => {
          const isCompleted = completedLectures.some(cl => cl.lectureId === lecture.id);
          return (
            <div key={lecture.id} className="bg-white rounded-xl shadow p-3 flex items-center gap-4">
              <LectureCheckbox
                lectureId={lecture.id}
                studentId={3}
                isCompleted={isCompleted}
              />
              {isCompleted
              ? <CheckCircle className="w-4 h-4 text-green-500"/>
              : <BookOpen className="w-4 h-4 text-gray-400" />
              }
              <h2 className="text-sm font-semibold text-gray-800">{lecture.title}</h2>
            </div>  
          );
        })}
      </div>   
    </main>    
  </div>       
);
}