"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, LogOut, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        bg-gray-900 text-white flex flex-col
        transition-all duration-300
        ${isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-64"}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="font-bold text-lg">Course Tracker</span>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-3 flex-1">
          <a 
            href="/dashboard" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </a>
          <a 
            href="/courses" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}