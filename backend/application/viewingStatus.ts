import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type ViewingStatusesType = {
  video_id: string
  status: boolean
}

export class ViewingStatusApplicationService {
  static async update({
    isWatched,
    userId,
    videoId,
  }: {
    isWatched: boolean
    userId: string
    videoId: string
  }) {
    try {
      const viewingStatus = await prisma.viewingStatus.upsert({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        create: {
          status: isWatched,
          user_id: userId,
          video_id: videoId,
        },
        update: { status: isWatched },
      })

      return viewingStatus
    } catch (error: any) {
      throw error
    }
  }

  static async get({ userId, videoId }: { userId: string; videoId: string }) {
    try {
      const viewingStatus = await prisma.viewingStatus.findUnique({
        where: {
          user_id_video_id: {
            user_id: userId,
            video_id: videoId,
          },
        },
        select: { status: true },
      })
      return viewingStatus
    } catch (error) {
      throw error
    }
  }

  static async getAll(userId: string, courseId: string) {
    try {
      const statuses: ViewingStatusesType[] =
        await prisma.viewingStatus.findMany({
          where: {
            user_id: userId,
            video: {
              section: {
                course_id: courseId,
              },
            },
          },
          select: {
            video_id: true,
            status: true,
          },
        })

      const statusMap: { [videoId: string]: boolean } = {}
      statuses.forEach((s) => {
        statusMap[s.video_id] = s.status
      })

      return statusMap
    } catch (error) {
      throw error
    }
  }
}