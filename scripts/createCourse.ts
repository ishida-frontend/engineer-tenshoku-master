import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function createCourse() {
  try {
    await prisma.course.create({
      data: {
        name: 'Course Name',
        description: 'Enjoy the course!',
        published: true,
      },
    });
  } catch (e: any) {
    console.log(e.message);
  } finally {
    await prisma.$disconnect();
  }
}
