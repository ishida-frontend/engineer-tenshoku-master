import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'Video') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deleted_at: new Date() }
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date()
      } else {
        params.args.data = { deleted_at: new Date() }
      }
    }
  }

  return next(params)
})

export async function deleteVideo(videoId: number) {
  try {
    const videoToDelete = await prisma.video.findUnique({
      where: { id: videoId },
      select: { order: true },
    })

    if (!videoToDelete) {
      throw new Error('該当の動画が見つかりません')
    }

    const currentOrder = videoToDelete.order

    // currentOrderより値が大きい全てのorderに-1
    await prisma.video.updateMany({
      where: {
        order: {
          gt: currentOrder,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    })

    await prisma.video.delete({ where: { id: videoId } })
  } catch (error) {
    throw error
  }
}

export async function deleteVideos(videoId1: number, videoId2: number) {
  await prisma.video.deleteMany({
    where: {
      id: {
        in: [videoId1, videoId2],
      },
    },
  })
}
