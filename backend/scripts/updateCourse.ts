import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type CourseUpdateInput = Prisma.CourseUpdateInput & { id: string }

export async function updateCourse({
  id,
  name,
  description,
  published,
}: CourseUpdateInput) {
  try {
    await prisma.course.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        published,
      },
    })
  } catch (error) {
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
}
