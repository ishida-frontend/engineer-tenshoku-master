import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function videoCreate(courseId: number) {
  const video = await prisma.video.create({
    data: {
      name: "video 1",
      description: "The very first video in the whole site.",
      published: true,
      course: { connect: { id: courseId } } //受け取ったCourseのidを使用して紐付け
    }
  });
  return video;
}

videoCreate(1)
  .then((res: any) => {
    console.log(res);
  })
  .catch(e => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


