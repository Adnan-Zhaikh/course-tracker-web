# Course Tracker & Certificate Generator

A full-stack web application that allows students to track their course progress and download a completion certificate upon finishing all lectures.

## Features

- Student authentication (signup/login/logout)
- Course enrollment system
- Lecture-by-lecture progress tracking
- Automatic certificate unlock at 100% completion
- PDF certificate download
- Per-student progress tracking

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Server Components
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Deployment:** Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Set up environment variables — create a `.env` file:
DATABASE_URL=""
4. Run database migrations:
```bash
   npx prisma migrate dev
```
5. Seed the database:
```bash
   npx prisma db seed
```
6. Start the development server:
```bash
   npm run dev
```

## Project Structure
course-tracker/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard page
│   ├── courses/           # Courses + lecture pages
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # Reusable UI components
├── lib/                   # Prisma client
├── prisma/                # Schema + migrations
└── types/                 # TypeScript interfaces

## Demo Credentials

- Email: `adnan@example.com`
- Password: `password123`