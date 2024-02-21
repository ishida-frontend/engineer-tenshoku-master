import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class GoodVideoApplicationService {
  //videoIdに対するいいねの数を取得するメソッド
  static async getLikeCount(videoId: string): Promise<number> {
    //Prismaを使用して、videoIdに対するいいねの数を取得
    const likeCount = await prisma.goodVideo.count({
      where: {
        video_id: videoId,
      },
    })
    return likeCount
  }

  //いいねを追加、または取り消すメソッド
  static async goodVideo(
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
    //すでに削除されている場合は削除を解除して、削除されていない場合は新たにいいねを追加する
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
  //いいねを取り消すメソッド
  static async cancelGoodVideo(
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
    //いいね情報が存在しない場合エラーを投げる処理
    if (!existingGoodVideo) {
      throw new Error('target goodVideo data is not exist')
    }

    //いいね情報が存在する場合の処理
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
      //データが存在しない場合エラーを投げる
      throw new Error('Good video not found')
    }
  }
}
