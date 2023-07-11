import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function updateCourse() {
  const course = await prisma.course.update({
    where: {
      id: 3,
    },
    data: {
      description: 'This course was made just for you!',
    },
  })
  console.log(course)
}

async function updateCourses() {
  const courses = await prisma.course.updateMany({
    where: {
      description: {
        contains: 'Enjoy the course!',
      },
    },
    data: {
      description: 'This course will change your life!',
    },
  })
  console.log(courses)
}

updateCourse()
updateCourses()
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
