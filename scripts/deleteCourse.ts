import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'Course') {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deleted_at: new Date() };
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date();
      } else {
        params.args.data = { deleted_at: new Date() };
      }
    }
  }

  return next(params);
})

async function testDeleteCourse(courseId: number) {
  await prisma.course.delete({ where: {id: courseId}});
  console.log(`ID${courseId}のコースをソフトデリートしました。`);
}

async function testDeleteCourses(courseId1:number, courseId2: number) {
  await prisma.course.deleteMany({
    where: {
      id: {
        in: [courseId1, courseId2],
      },
    },
  })
  console.log(`ID${courseId1}と${courseId2}のコースをソフトデリートしました。`);
}

testDeleteCourse(8)
testDeleteCourses(10, 11)
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

