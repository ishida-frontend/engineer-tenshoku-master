import { PrismaClient } from '@prisma/client'

import { VideoType } from '../types'

const prisma = new PrismaClient()

export async function createVideo(videoData: VideoType) {
  try {
    await prisma.video.create({
      data: {
        name: videoData.name,
        description: videoData.description,
        url: videoData.url,
        published: videoData.published,
        order: videoData.order,
        section: { connect: { id: videoData.sectionId } },
      },
    })
  } catch (e: any) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
}
