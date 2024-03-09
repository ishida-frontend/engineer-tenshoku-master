import prisma from '../utils/prismaClient'
import crypto from 'crypto'

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
  } catch (e) {
    console.log(e)
    throw new Error(`createCourse error: ${e}`)
  } finally {
    await prisma.$disconnect()
  }
}
