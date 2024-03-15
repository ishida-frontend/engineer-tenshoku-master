import prisma from '../utils/prismaClient'

export class FavoriteVideoApplicationService {
  static async upsert({
    favoritedStatus,
    userId,
    videoId,
  }: {
    favoritedStatus: boolean
    userId: string
    videoId: string
  }) {
    try {
      const newStatus = await prisma.favoriteVideo.upsert({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        create: {
          status: favoritedStatus,
          user_id: userId,
          video_id: videoId,
        },
        update: { status: favoritedStatus },
      })

      return newStatus
    } catch (error) {
      throw new Error(
        `FavoriteVideoApplicationService favorite video error: ${error}`,
      )
    }
  }

  async get({ userId, videoId }: { userId: string; videoId: string }) {
    try {
      const fetchedStatus = await prisma.favoriteVideo.findUnique({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        select: { status: true },
      })
      return fetchedStatus
    } catch (error) {
      throw new Error(
        `FavoriteVideoApplicationService favorite video error: ${error}`,
      )
    }
  }
  async getFavoritedVideos() {
    try {
      const favoriteVideos = await prisma.favoriteVideo.findMany({
        where: {
          status: true,
        },
        orderBy: {
          updated_at: 'asc',
        },
        include: {
          video: {
            include: {
              section: {
                include: {
                  course: true,
                },
              },
            },
          },
        },
      })
      return favoriteVideos
    } catch (error) {
      throw new Error(
        `FavoriteVideoApplicationService: getFavoriteVideos error: ${error}`,
      )
    }
  }
}
