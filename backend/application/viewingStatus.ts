import { PrismaClient, ViewingStatusType } from '@prisma/client'

const prisma = new PrismaClient()

export class ViewingStatusApplicationService {
  static async create(statusData: { userId: string; videoId: string }) {
    try {
      const { userId, videoId } = statusData
      const newStatus = await prisma.viewingStatus.create({
        data: {
          user_id: userId,
          video_id: videoId,
        },
      })
      return newStatus
    } catch (e: any) {
      throw new Error(e)
    } finally {
      await prisma.$disconnect()
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

  static async update({
    newStatus,
    userId,
    videoId,
  }: {
    newStatus: string
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
        update: { status: newStatus as ViewingStatusType },
        create: {
          user_id: userId,
          video_id: videoId,
          status: newStatus as ViewingStatusType,
        },
      })
    } catch (error: any) {
      console.error('Error updating viewing status:', error)
      throw error
    }
  }
}
