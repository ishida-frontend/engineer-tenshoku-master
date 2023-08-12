import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type CourseUpdateInput = Prisma.CourseUpdateInput & { id: number }

export async function updateCourse({
  id,
  name,
  description,
  published,
}: CourseUpdateInput) {
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        published,
      },
    })
    console.log(updatedCourse)
  } catch (error) {
    console.log('Error updating course:', error)
    throw error
  }
}

export async function updateCourses() {
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
