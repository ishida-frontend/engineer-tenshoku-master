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
        order: videoData.order,
        published: videoData.published,
        section: { connect: { id: videoData.sectionId } },
      },
    })
    return videoData
  } catch (e: any) {
    throw new Error(e)
  } finally {
    await prisma.$disconnect()
  }
}
