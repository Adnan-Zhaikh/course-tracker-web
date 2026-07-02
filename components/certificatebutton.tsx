"use client"

interface CertificateButtonProps {
  progressPercent: number;
}

export default function CertificateButton({ progressPercent }: CertificateButtonProps) {
  const isComplete = progressPercent === 100;

  return (
    <button
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