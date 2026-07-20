// @ts-nocheck
"use client"
import { useState } from "react";



interface CertificateButtonProps {
  progressPercent: number;
  courseId: number;
  quizPassed: boolean;
}

export default function CertificateButton({ progressPercent, courseId, quizPassed }: CertificateButtonProps) {
  const isComplete = progressPercent === 100;
  const [loading, setLoading] = useState(false);
    
  async function handleDownload() {
  setLoading(true);

  const res = await fetch(`/api/certificate?courseId=${courseId}`, { method: "GET" });

if (!res.ok) {
  alert("Complete the course and pass the quiz first");
  setLoading(false);
  return;
}

const data = await res.json();

// Load template and overlay text
const { PDFDocument, rgb } = await import("pdf-lib");

const templateRes = await fetch("/certificate-template.pdf");
const templateBytes = await templateRes.arrayBuffer();

const pdfDoc = await PDFDocument.load(templateBytes);
const page = pdfDoc.getPages()[0];
const { width } = page.getSize();

// Draw student name above the line
page.drawText(data.studentName, {
  x: width / 2 - (data.studentName.length * 6),
  y: 331,
  size: 28,
  color: rgb(0.05, 0.4, 0.35),
});


// Draw actual course title
page.drawText(data.courseTitle, {
  x: width / 2 - (data.courseTitle.length * 3.5),
  y: 145,
  size: 16,
  color: rgb(0.2, 0.2, 0.2),
});

const pdfBytes = await pdfDoc.save();
const blob = new Blob([pdfBytes], { type: "application/pdf" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "certificate.pdf";
a.click();
URL.revokeObjectURL(url);
}
  return (
  <div className="flex flex-col gap-2">
    {isComplete && !quizPassed && (
      
       <a href={`/courses/${courseId}/quiz`}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white text-center bg-blue-500 hover:bg-blue-600 transition-all"
      >
        📝 Take Quiz to Unlock Certificate
      </a>
    )}
    <button
      onClick={handleDownload}
      disabled={!isComplete || !quizPassed}
      className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
        isComplete && quizPassed
          ? "bg-green-500 hover:bg-green-600 cursor-pointer"
          : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      {isComplete && quizPassed ? "⬇ Download Certificate" : "🔒 Complete course to unlock certificate"}
    </button>
  </div>
);
}