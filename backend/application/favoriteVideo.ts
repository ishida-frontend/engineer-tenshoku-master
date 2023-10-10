import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class FavoriteVideoApplicationService {
  static async upsert({
    isFavorited,
    userId,
    videoId,
  }: {
    isFavorited: boolean
    userId: string
    videoId: string
  }) {
    try {
      const favoriteStatus = await prisma.favoriteVideo.upsert({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        create: {
          status: isFavorited,
          user_id: userId,
          video_id: videoId,
        },
        update: { status: isFavorited },
      })

      return favoriteStatus
    } catch (error: any) {
      throw error
    }
  }

  static async get({ userId, videoId }: { userId: string; videoId: string }) {
    try {
      const favoriteStatus = await prisma.favoriteVideo.findUnique({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        select: { status: true },
      })
      return favoriteStatus
    } catch (error) {
      throw error
    }
  }
}
