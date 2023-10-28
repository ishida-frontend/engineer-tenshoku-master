import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
const prisma = new PrismaClient()

export async function createCourse(
  name: string,
  description: string,
  image: string,
  published: boolean,
  tagIds: string[],
) {
  try {
    const createdCourse = await prisma.course.create({
      data: {
        id: crypto.randomUUID(),
        name,
        description,
        image,
        published,
        tags: {
          create: tagIds.map((tagId) => ({
            tag: {
              connect: {
                id: tagId,
              },
            },
          })),
        },
      },
    })
    return createdCourse
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
