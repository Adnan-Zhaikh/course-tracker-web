interface ProgressCardProps {
    completedLectures: number;
    totalLectures: number;
    courseTitle: string;
}

export default function ProgressCard({ completedLectures, totalLectures, courseTitle }: ProgressCardProps) {
    const progressPercent = Math.round((completedLectures / totalLectures) * 100);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{courseTitle}</h2>
      <p className="text-sm text-gray-500 mb-4">{completedLectures} of {totalLectures} lectures completed</p>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="text-right text-sm font-medium text-blue-600 mt-2">{progressPercent}%</p>
    </div>
  );
}