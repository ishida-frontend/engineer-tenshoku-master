import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readVideo(videoId: number) {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  })
}

export async function readVideos() {
  const videos = await prisma.video.findMany()
}

export async function readFilteredVideos(filteredId: number) {
  const videos = await prisma.video.findMany({
    where: {
      id: {
        gt: filteredId,
      },
      deleted_at: {
        not: null,
      },
    },
  })
}

