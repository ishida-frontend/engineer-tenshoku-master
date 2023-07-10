import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function readCourse() {
  const course = await prisma.course.findUnique({
    where: {
      id: 5,
    },
  })
  console.log(course);
}

async function readAllCourses() {
  const courses = await prisma.course.findMany()
  console.log(courses);
}

async function readFilteredCourses() {
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

readCourse()
readAllCourses()
readFilteredCourses()
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
