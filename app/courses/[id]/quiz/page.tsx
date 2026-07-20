import QuizForm from "@/components/quiz-form";
import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = parseInt(id);
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const studentId = parseInt(session?.value || "0");
    
    const course = await prisma.course.findUnique({
        where: { id: courseId }
    });

    const quiz = await prisma.quiz.findFirst({
      where: { courseId },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    if (!quiz){
        return <p>No quiz found for this course.</p>;
    }

    const alreadyPassed = await prisma.quizAttempt.findFirst({
        where: { studentId, quizId: quiz.id, passed: true}
    });

    if (alreadyPassed) {
        return <p> You already passed this quiz! <Link href="/dashboard">Go to Dashboard</Link></p>;
    }
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8 overflow-y-auto">
          <Link href={`/courses/${courseId}`} className="inline-block mb-6 text-sm text-blue-500 hover:underline">
            ← Back to Course
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz</h1>
          <p className="text-gray-500 mb-8">{quiz.questions.length} questions — pass 50% to unlock certificate</p>
          <QuizForm 
            quiz={quiz} 
            studentId={studentId}
            courseId={courseId}
          />
        </main>
      </div>
    );
}