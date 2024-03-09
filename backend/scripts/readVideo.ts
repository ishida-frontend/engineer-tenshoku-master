import prisma from '../utils/prismaClient'

export async function readVideo(id: string) {
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
  })
  return video
}

export async function readFilteredVideos() {
  const filteredVideos = await prisma.video.findMany({
    where: {
      deleted_at: null,
    },
  })
  return filteredVideos
}
