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

  async LikeVideo(userId: string, videoId: string): Promise<void> {
    const existingLike = await prisma.goodVideo.findUnique({
      where: {
        user_id_video_id: {
          user_id: userId,
          video_id: videoId,
        },
      },
    })

    if (!existingLike) {
      await prisma.goodVideo.create({
        data: {
          user_id: userId,
          video_id: videoId,
        },
      })
    }
  }

  async unLikeVideo(userId: string, videoId: string): Promise<void> {
    const existingLike = await prisma.goodVideo.findUnique({
      where: {
        user_id_video_id: {
          user_id: userId,
          video_id: videoId,
        },
      },
    })
    if (existingLike) {
      await prisma.goodVideo.delete({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
      })
    } else {
      await prisma.goodVideo.create({
        data: {
          user_id: userId,
          video_id: videoId,
        },
      })
    }
  }
}
