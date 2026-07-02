"use client"
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <span className="font-bold text-lg">Course Tracker</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-3">
        {isOpen && (
          <>
            <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
            <a href="/courses" className="hover:text-blue-400">Courses</a>
          </>
        )}
      </nav>
    </div>
    );
}