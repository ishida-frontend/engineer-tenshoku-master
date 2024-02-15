import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class GoodVideoApplicationService {
  async getLikeCount(videoId: string): Promise<number> {
    const likeCount = await prisma.goodVideo.count({
      where: {
        video_id: videoId,
      },
    })
    return likeCount
  }

  async goodVideo(
    userId: string,
    videoId: string,
  ): Promise<{
    user_id: string
    video_id: string
    deleted_at: Date | null
  }> {
    const existingGoodVideo = await prisma.goodVideo.findUnique({
      where: {
        user_id_video_id: {
          user_id: userId,
          video_id: videoId,
        },
      },
    })
    if (existingGoodVideo?.deleted_at) {
      const goodVideo = await prisma.goodVideo.update({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        data: {
          deleted_at: null,
        },
      })
      return goodVideo
    }

    const goodVideo = await prisma.goodVideo.create({
      data: {
        user_id: userId,
        video_id: videoId,
      },
    })
    return goodVideo
  }

  async cancelGoodVideo(
    userId: string,
    videoId: string,
  ): Promise<{
    user_id: string
    video_id: string
    deleted_at: Date | null
  }> {
    const existingGoodVideo = await prisma.goodVideo.findUnique({
      where: {
        user_id_video_id: {
          user_id: userId,
          video_id: videoId,
        },
      },
    })
    if (existingGoodVideo) {
      await prisma.goodVideo.update({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        data: {
          deleted_at: new Date(),
        },
      })
    }
  }
}
