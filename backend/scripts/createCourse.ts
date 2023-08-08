import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createCourse(name: string, description: string) {
  try {
    const createdCourse = await prisma.course.create({
      data: {
        name: name,
        description: description,
        published: true,
      },
    })
    console.log(createdCourse)
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
