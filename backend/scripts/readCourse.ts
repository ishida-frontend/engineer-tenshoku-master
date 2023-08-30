import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readCourse(id: number) {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      sections: {
        include: {
          videos: true,
        },
      },
    },
  })
  return course
}

export async function readAllCourses() {
  const courses = await prisma.course.findMany()
  return courses
}

export async function readFilteredCourses() {
  const filteredCourses = await prisma.course.findMany({
    where: {
      deleted_at: null,
    },
  })
  return filteredCourses
}
