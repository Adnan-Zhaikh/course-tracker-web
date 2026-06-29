# 🎓 Course Tracker & Certificate Generator

A lightweight, modern full-stack web application designed to track student course progression, compute module metrics in real-time, and securely generate downloadable completion certificates. Built using a robust three-tier architecture with **Next.js**, **TypeScript**, and **PostgreSQL**.

---

## 🚀 Core Feature Pipeline

* **Secure Authentication Engine:** Dedicated portals for students to manage profiles and administrative access configurations.
* **Granular Lecture Tracking:** Real-time tracking of lecture benchmarks completed versus total course modules.
* **Dynamic Progress Computation:** A responsive dashboard GUI rendering instantaneous percentage feedback loops using Tailwind CSS utility components.
* **Automated Certificate Gate:** A conditional logic engine that safely validates criteria completion ($100\%$ tracking accuracy) to unlock downloadable PDF certificates.

---

## 🏗️ Technical Architecture & Directory Blueprint

This repository implements a modular directory layout ensuring a strict boundary between presentation layouts and underlying backend schema evaluation channels.

```text
course-tracker-web/
├── app/                        # Next.js Core App Router Routing
│   ├── layout.tsx              # Global application layout (Fonts, Root metadata)
│   ├── page.tsx                # Public Root Landing View
│   ├── login/                  # User login layout gate
│   └── dashboard/              # Dynamic Student / Admin view container
├── components/                 # Isolated, reusable presentation UI blocks
│   ├── sidebar.tsx             # The Navigation Sidebar view
│   ├── progress-card.tsx       # Component displaying course metrics & calculations
│   └── certificate-button.tsx  # Interactive lock/unlock button component
├── types/                      # Strict TypeScript data model contracts
│   └── index.ts                # Core structural interfaces (Student, Course, Enrollment)
└── public/                     # Static system asset storage
    └── templates/              # Base graphical layout certificates