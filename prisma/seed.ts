import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());