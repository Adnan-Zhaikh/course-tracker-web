import { PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

async function main() {
  
  await prisma.completedLecture.deleteMany();
  await prisma.lecture.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();
  
  const student = await prisma.student.create({
    data: {
      name: "Adnan",
      email: "adnan@example.com",
    },
  });

  const course = await prisma.course.create({
    data: {
      title: "Full Stack Web Development",
      description: "Learn to build fullstack apps with Next.js and PostgreSQL",
      totalLectures: 10,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      completedLectures: 8,
    },
  });
  const lectures = [
    "Introduction to Next.js",
    "App Router Basics",
    "Typescript Fundamentals",
    "Tailwind CSS Layout",
    "PostgreSQL Setup",
    "API Routes",
    "Authentication",
    "Certificate Generation",
    "Deployment",
  ];

  for (let i = 0; i < lectures.length; i++) {
    await prisma.lecture.create({
      data: {
        courseId: course.id,
        title: lectures[i],
        order: i + 1,
      },
    });
  }

  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());