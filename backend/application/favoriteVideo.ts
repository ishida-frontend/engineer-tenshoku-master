import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// type FavoriteVideoType = {
//   video_id: string
//   status: boolean
// }

export class FavoriteVideoApplicationService {
  static async upsert({
    isFavorited,
    userId,
    courseId,
    videoId,
  }: {
    isFavorited: boolean
    userId: string
    courseId: string
    videoId: string
  }) {
    try {
      const favoriteStatus = await prisma.favoriteVideo.upsert({
        where: {
          user_id_course_id_video_id: {
            user_id: userId,
            course_id: courseId,
            video_id: videoId,
          },
        },
        create: {
          status: isFavorited,
          user_id: userId,
          course_id: courseId,
          video_id: videoId,
        },
        update: { status: isFavorited },
      })

      return favoriteStatus
    } catch (error: any) {
      throw error
    }
  }

  static async get({
    userId,
    courseId,
    videoId,
  }: {
    userId: string
    courseId: string
    videoId: string
  }) {
    try {
      const favoriteStatus = await prisma.favoriteVideo.findUnique({
        where: {
          user_id_course_id_video_id: {
            user_id: userId,
            course_id: courseId,
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
