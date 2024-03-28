import prisma from '../utils/prismaClient'

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
