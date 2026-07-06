"use client"
import { useState } from "react";



interface CertificateButtonProps {
  progressPercent: number;
}

export default function CertificateButton({ progressPercent }: CertificateButtonProps) {
  const isComplete = progressPercent === 100;
  const [loading, setLoading] = useState(false);
    
  async function handleDownload() {
  setLoading(true);

  const res = await fetch("/api/certificate", { 
    method: "GET" 
  });

  if (!res.ok) {
    alert("Complete the course first");
    setLoading(false);
    return;
  }

  const data = await res.json();

  // PDF generation with jspdf
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  doc.setFontSize(24);
  doc.text("Certificate of Completion", 105, 40, { align: "center" });
  doc.setFontSize(16);
  doc.text("This certifies that", 105, 70, { align: "center" });
  doc.setFontSize(20);
  doc.text(data.studentName, 105, 90, { align: "center" });
  doc.setFontSize(16);
  doc.text("has successfully completed", 105, 110, { align: "center" });
  doc.setFontSize(18);
  doc.text(data.courseTitle, 105, 130, { align: "center" });

  doc.save("certificate.pdf");
  setLoading(false);
}
  return (
    <button
      onClick = {handleDownload}
      disabled={!isComplete}
      className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
        isComplete
          ? "bg-green-500 hover:bg-green-600 cursor-pointer"
          : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      {isComplete ? "⬇ Download Certificate" : "🔒 Complete course to unlock certificate"}
      
    </button>
  );
}