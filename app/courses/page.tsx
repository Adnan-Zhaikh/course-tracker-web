import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";

export default async function CoursePage() {
    const courses = await prisma.course.findMany();

return (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Courses</h1>
      
        <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{course.description}</p>
            <p className="text-sm text-gray-500 mt-2">{course.totalLectures} Lectures</p>
            </div>
            ))}
        </div>
      
    </main>
  </div>
);
}

