import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createCourse(
  name: string,
  description: string,
  published: boolean,
) {
  try {
    const createdCourse = await prisma.course.create({
      data: {
        name: name,
        description: description,
        published: published,
      },
    })
    console.log(createdCourse)
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
