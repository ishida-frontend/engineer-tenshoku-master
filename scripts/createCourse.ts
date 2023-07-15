import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function createCourse() {
  try {
    const createdCourse = await prisma.course.create({
      data: {
        name: 'Course Name',
        description: 'Enjoy the course!',
        published: true,
      },
    });
    console.log(createdCourse);
  } catch (e: any) {
    console.log(e.message);
  } finally {
    await prisma.$disconnect();
  }
}
