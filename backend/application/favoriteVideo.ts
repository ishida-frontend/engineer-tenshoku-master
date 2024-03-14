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
  async getfavoriteVideos() {
    try {
      const favoriteVideos = await prisma.favoriteVideo.findMany({
        where: {
          deleted_at: null,
        },
        include: {
          video: {
            include: {
              section: {
                include: {
                  course: {},
                },
              },
            },
          },
        },
      })
      return favoriteVideos
    } catch (error) {
      throw new Error(
        `FavoriteVideoApplicationService: getfavoriteVideos error: ${error}`,
      )
    }
  }

  async getAll({ userId }: { userId: string }) {
    try {
      const favoriteVideos = await prisma.course.findMany({
        orderBy: [
          {
            created_at: 'asc',
          },
        ],
        include: {
          sections: {
            orderBy: [
              {
                order: 'asc',
              },
            ],
            include: {
              videos: {
                orderBy: [
                  {
                    order: 'asc',
                  },
                ],
                where: {
                  published: true,
                  deleted_at: null,
                },
                select: {
                  id: true,
                  name: true,
                  description: true,
                  order: true,
                  FavoriteVideo: {
                    where: {
                      status: true,
                      user_id: userId,
                      deleted_at: null,
                    },
                    select: {
                      status: true,
                    },
                  },
                },
              },
            },
            where: {
              published: true,
              deleted_at: null,
            },
          },
        },
        where: {
          published: true,
          deleted_at: null,
        },
      })
      return favoriteVideos
    } catch (error) {
      throw new Error(
        `FavoriteVideoApplicationService: get favorite videos error: ${error}`,
      )
    }
  }
}
