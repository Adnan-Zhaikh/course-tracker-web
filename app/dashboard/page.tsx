"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Icons (inline SVG — no external icon package required)
// ---------------------------------------------------------------------------

function HamburgerIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}

function CloseIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function DashboardIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h6.75v6.75H3.75V4.5ZM13.5 4.5h6.75v3.75H13.5V4.5ZM13.5 11.25h6.75v8.25H13.5v-8.25ZM3.75 13.5h6.75v6.75H3.75V13.5Z" />
    </svg>
  );
}

function CoursesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.04C10.5 4.6 8.25 3.75 6 3.75c-.97 0-1.92.13-2.81.38a.75.75 0 0 0-.44.7v12.84a.75.75 0 0 0 .96.72c.74-.21 1.5-.32 2.29-.32 2.07 0 3.97.78 5.4 2.06.16.14.36.21.55.21.2 0 .39-.07.55-.21 1.43-1.28 3.33-2.06 5.4-2.06.8 0 1.55.11 2.29.32a.75.75 0 0 0 .96-.72V4.83a.75.75 0 0 0-.44-.7A9.7 9.7 0 0 0 18 3.75c-2.25 0-4.5.85-6 2.29Z" />
    </svg>
  );
}

function SettingsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.146.083.217.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.7 7.7 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.216.128c-.332.183-.582.495-.645.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.217-.127c-.326-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7.7 7.7 0 0 1 0-.255c.007-.379-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.071-.044.144-.087.218-.127.331-.184.581-.496.644-.87l.213-1.28Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function LockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75M3.75 21h16.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5Z" />
    </svg>
  );
}

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5 7.5 12M12 16.5V3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Static nav config
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { label: "My Dashboard", icon: DashboardIcon },
  { label: "All Courses", icon: CoursesIcon },
  { label: "Account Settings", icon: SettingsIcon },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("My Dashboard");

  // Placeholder course progress data — wire this up to real data later.
  const courseTitle = "Full-Stack Web Development";
  const completedLectures = 7;
  const totalLectures = 10;
  const progressPercent = Math.round((completedLectures / totalLectures) * 100);
  const isComplete = completedLectures >= totalLectures;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 text-slate-300 transition-transform duration-200 ease-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="text-lg font-semibold tracking-tight text-white">
            Course<span className="text-indigo-400">OS</span>
          </span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 md:hidden"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ label, icon: Icon }) => {
            const active = activeItem === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setActiveItem(label);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  active
                    ? "bg-indigo-500/15 text-indigo-300"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-5 py-5 text-xs text-slate-500">
          Signed in as <span className="text-slate-300">Adnan</span>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen w-full flex-1 flex-col">
        {/* Top bar (mobile hamburger) */}
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Course<span className="text-indigo-600">OS</span>
          </span>
        </header>

        <main className="flex-1 px-5 py-8 md:px-10 md:py-10">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Welcome back, Adnan!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s where your learning progress stands today.
          </p>

          {/* Course Progress Card */}
          <section className="mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Current course
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">{courseTitle}</h2>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isComplete
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                {isComplete ? "Completed" : "In progress"}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Lecture progress</span>
                <span className="text-slate-500">
                  {completedLectures}/{totalLectures} lectures
                </span>
              </div>
              <div
                className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Course completion progress"
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isComplete ? "bg-emerald-500" : "bg-indigo-600"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">{progressPercent}% complete</p>
            </div>

            {/* Certificate action */}
            <button
              type="button"
              disabled={!isComplete}
              aria-disabled={!isComplete}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                isComplete
                  ? "cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500"
                  : "cursor-not-allowed bg-slate-100 text-slate-400 focus-visible:ring-slate-300"
              }`}
            >
              {isComplete ? <DownloadIcon /> : <LockIcon />}
              {isComplete ? "Download Certificate" : "Complete all lectures to unlock"}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}