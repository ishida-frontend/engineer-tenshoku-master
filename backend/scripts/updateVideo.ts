import { PrismaClient } from '@prisma/client'

import { VideoType } from '../types'

const prisma = new PrismaClient()

export async function updateVideo({
  id,
  name,
  description,
  order: newOrder,
  url,
  published,
}: Partial<VideoType>) {
  try {
    const currentVideo = await prisma.video.findUnique({
      where: { id },
      select: { order: true },
    })
    const currentOrder = currentVideo?.order

    if (
      currentOrder !== undefined &&
      newOrder !== undefined &&
      currentOrder !== newOrder
    ) {
      if (newOrder < currentOrder) {
        await prisma.video.updateMany({
          where: {
            order: {
              gte: newOrder,
              lt: currentOrder,
            },
          },
          data: {
            order: {
              increment: 1,
            },
          },
        })
      } else if (newOrder > currentOrder) {
        await prisma.video.updateMany({
          where: {
            order: {
              gt: currentOrder,
              lte: newOrder,
            },
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        })
      }
    }
    await prisma.video.update({
      where: { id },
      data: {
        name,
        description,
        order: newOrder !== undefined ? newOrder : currentOrder,
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
