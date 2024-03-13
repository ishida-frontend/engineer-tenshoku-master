import prisma from '../utils/prismaClient'

prisma.$use(async (params, next) => {
  if (params.model === 'Course') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deleted_at: new Date() }
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date()
      } else {
        params.args.data = { deleted_at: new Date() }
      }
    }
  }

  return next(params)
})

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
