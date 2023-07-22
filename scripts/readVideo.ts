import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readVideo(videoId: number) {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  })
  console.log("video:", video);
}

export async function readAllVideos() {
  const videos = await prisma.video.findMany()
  console.log("videos:", videos);
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
  console.log("filteredVideos", videos)
}

