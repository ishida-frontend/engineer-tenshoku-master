import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateCourse(
  id: number,
  name: string,
  description: string,
  published: boolean,
) {
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        published: published,
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
