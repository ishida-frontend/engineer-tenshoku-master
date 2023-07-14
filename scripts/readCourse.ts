import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readCourse() {
  const course = await prisma.course.findUnique({
    where: {
      id: 5,
    },
  })
  console.log(course);
}

export async function readAllCourses() {
  const courses = await prisma.course.findMany()
  console.log(courses);
}

export async function readFilteredCourses() {
  const courses = await prisma.course.findMany({
    where: {
      id: {
        gt: 9,
      },
      deleted_at: {
        not: null,
      },
    },
  })
  console.log(courses)
}
