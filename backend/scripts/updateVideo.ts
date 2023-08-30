import { PrismaClient } from '@prisma/client'

import { VideoType } from '../types'

const prisma = new PrismaClient()

export async function updateVideo({
  id,
  name,
  description,
  order,
  url,
  published,
}: Partial<VideoType>) {
  try {
    await prisma.video.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        order,
        url,
        published,
      },
    })
  } catch (error) {
    throw error
  }
}

export async function updateVideos() {
  const videos = await prisma.video.updateMany({
    where: {
      description: {
        contains: 'Enjoy the video!',
      },
    },
    data: {
      description: 'This video will change your life!',
    },
  })
}
