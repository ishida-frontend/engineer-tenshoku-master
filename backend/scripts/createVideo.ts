import { PrismaClient } from '@prisma/client'

import { convertVideoUrl } from '../utils/convertVideoUrl'
import { VideoType } from '../types'

const prisma = new PrismaClient()

export async function createVideo(videoData: VideoType) {
  try {
    const videoUrl = convertVideoUrl(videoData.url)
    await prisma.video.create({
      data: {
        name: videoData.name,
        description: videoData.description,
        url: videoUrl,
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
