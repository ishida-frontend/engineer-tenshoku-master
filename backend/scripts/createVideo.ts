import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createVideo(sectionId: number) {
  try {
    const video = await prisma.video.create({
      data: {
        name: 'video 1',
        description: 'The very first video in the whole site.',
        published: true,
        section: { connect: { id: sectionId } },
      },
    })
    return video
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
