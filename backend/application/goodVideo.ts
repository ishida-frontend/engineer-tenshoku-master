import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class GoodVideoApplicationService {
  //videoIdに対するいいねの数を取得するメソッド
  async getGoodCount(videoId: string): Promise<number> {
    //Prismaを使用して、videoIdに対するいいねの数を取得
    const goodCount = await prisma.goodVideo.count({
      where: {
        video_id: videoId,
      },
    })
    return goodCount
  }

  //いいねを追加メソッド
  async goodVideo(
    userId: string,
    videoId: string,
  ): Promise<{
    user_id: string
    video_id: string
    deleted_at: Date | null
  }> {
    //ユーザーと動画のいいね情報を取得
    const existingGoodVideo = await prisma.goodVideo.findUnique({
      where: {
        user_id_video_id: {
          user_id: userId,
          video_id: videoId,
        },
      },
    })
    //すでに削除されている場合は削除を解除
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

    //existingGoodVideoが存在しかつ削除されていない場合は削除
    if (existingGoodVideo && !existingGoodVideo.deleted_at) {
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
    //削除されていた場合は、新たにいいねを追加
    const goodVideo = await prisma.goodVideo.create({
      data: {
        user_id: userId,
        video_id: videoId,
      },
    })
    return goodVideo
  }
}
