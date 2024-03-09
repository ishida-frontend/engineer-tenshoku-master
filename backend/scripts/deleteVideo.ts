import prisma from '../utils/prismaClient'

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

export async function deleteVideo(videoId: string) {
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
    throw new Error(`deleteVideo error: ${error}`)
  }
}

export async function deleteVideos(videoId1: string, videoId2: string) {
  await prisma.video.deleteMany({
    where: {
      id: {
        in: [videoId1, videoId2],
      },
    },
  })
}
