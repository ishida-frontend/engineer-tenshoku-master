import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const crypto = require('crypto')

export async function createCourse(
  name: string,
  description: string,
  published: boolean,
) {
  try {
    const createdCourse = await prisma.course.create({
      data: {
        id: crypto.randomUUID(),
        name: name,
        description: description,
        published: published,
      },
    })
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
