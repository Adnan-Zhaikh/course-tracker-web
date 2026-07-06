"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, LogOut } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className={`bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col ${isOpen ? "w-64" : "w-16"}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <span className="font-bold text-lg">Course Tracker</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-3 flex-1">
        <a href="/dashboard" className="flex items-center gap-2 hover:text-blue-400">
            <LayoutDashboard className="w-4 h-4" />
            {isOpen && <span>Dashboard</span>}
        </a>
        
        <a href="/courses" className="flex items-center gap-2 hover:text-blue-400">
            <BookOpen className="w-4 h-4" />
            {isOpen && <span>Courses</span>}
        </a>
      </nav>

      <div className="p-4 border-t border-gray-700">

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm w-full text-left"
          >
          <LogOut className="w-4 h-4" />
          {isOpen && <span>Logout</span>}
      </button>
      </div>
    </div>
  );
}