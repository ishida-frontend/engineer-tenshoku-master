import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
      return prisma.viewingStatus.upsert({
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
    } catch (error: any) {
      console.error('Error updating viewing status:', error)
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

  static async getAll(userId: string) {
    try {
      const viewingStatuses = await prisma.viewingStatus.findMany({
        where: {
          user_id: userId,
        },
        select: { status: true, video_id: true },
      })
      return viewingStatuses
    } catch (error) {
      throw error
    }
  }
}
