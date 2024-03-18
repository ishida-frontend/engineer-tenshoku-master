import prisma from '../utils/prismaClient'

export async function deleteCourse(courseId: string) {
  await prisma.course.delete({ where: { id: courseId } })
}

export async function deleteCourses(courseId1: string, courseId2: string) {
  await prisma.course.deleteMany({
    where: {
      id: {
        in: [courseId1, courseId2],
      },
    },
  })
  console.log(`ID${courseId1}と${courseId2}のコースをソフトデリートしました。`)
}
