import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createVideo(courseId: number) {
  try {
    const video = await prisma.video.create({
      data: {
        name: "video 1",
        description: "The very first video in the whole site.",
        published: true,
        course: { connect: { id: courseId } } //受け取ったCourseのidを使用して紐付け
      }
    });
    return video;

  } catch (e: any) {
    console.log(e.message);
  } finally {
    await prisma.$disconnect();
  }
}

