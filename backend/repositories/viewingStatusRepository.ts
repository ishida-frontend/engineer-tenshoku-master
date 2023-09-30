import { PrismaClient, ViewingStatusType } from '@prisma/client'

const prisma = new PrismaClient()

export class ViewingStatusRepository {
  static getStatusByUserAndVideo(userId: string, videoId: string) {
    return prisma.viewingStatus.findUnique({
      where: { userId_videoId: { userId, videoId } },
      select: { status: true },
    })
  }

  static updateStatusByUserAndVideo({
    userId,
    videoId,
    newStatus,
  }: {
    userId: string
    videoId: string
    newStatus: string
  }) {
    if (!['NOT_WATCHED', 'WATCHING', 'WATCHED'].includes(newStatus)) {
      throw new Error('Invalid status value')
    }

    return prisma.viewingStatus.update({
      where: { userId_videoId: { userId, videoId } },
      data: { status: newStatus as ViewingStatusType },
    })
  }
}
