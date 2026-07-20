"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Quiz {
  id: number;
  questions: Question[];
}

interface Props {
  quiz: Quiz;
  studentId: number;
  courseId: number;
}

export default function QuizForm({ quiz, studentId, courseId }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSelect(questionId: number, optionId: number) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  }

  async function handleSubmit() {
    if (Object.keys(answers).length < quiz.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);

    let correct = 0;
    quiz.questions.forEach(question => {
      const selectedOptionId = answers[question.id];
      const selectedOption = question.options.find(o => o.id === selectedOptionId);
      if (selectedOption?.isCorrect) correct++;
    });

    const scorePercent = Math.round((correct / quiz.questions.length) * 100);
    const passed = scorePercent >= 50;

    await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, quizId: quiz.id, score: scorePercent, passed }),
    });

    setScore(scorePercent);
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl">
        <div className={`rounded-xl p-8 text-center ${score >= 50 ? "bg-green-500" : "bg-red-500"}`}>
  <h2 className="text-3xl font-bold mb-2 text-white">{score}%</h2>
  <p className="text-lg font-semibold mb-4 text-white">
    {score >= 50 ? "🎉 You passed!" : "❌ You didn't pass"}
  </p>
  <p className="text-white mb-6">
            {score >= 50 
              ? "Certificate is now unlocked. Go to dashboard to download it." 
              : "You need 50% to pass. Go back and review the lectures."}
          </p>
          {score >= 50 
            ? <button onClick={() => router.push("/dashboard")} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                Go to Dashboard
              </button>
            : <button onClick={() => router.push(`/courses/${courseId}`)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Review Lectures
              </button>
          }
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {quiz.questions.map((question, index) => (
        <div key={question.id} className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            {index + 1}. {question.text}
          </h3>
          <div className="flex flex-col gap-2">
            {question.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelect(question.id, option.id)}
                className={`text-left px-4 py-3 rounded-lg border transition-all ${
                  answers[question.id] === option.id
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Quiz"}
      </button>
    </div>
  );
}