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
      if (!existingGoodVideo.deleted_at) {
        //すでにキャンセルされている場合、再度いいね追加する
        const reGoodVideo = await prisma.goodVideo.update({
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
        return reGoodVideo
      } else {
        //まだキャンセルされていない場合、通常のキャンセル処理を行う
        const deletedGoodVideo = await prisma.goodVideo.delete({
          where: {
            user_id_video_id: {
              user_id: userId,
              video_id: videoId,
            },
          },
        })
        return deletedGoodVideo
      }
    } else {
      throw new Error('Good video not found')
    }
  }
}
