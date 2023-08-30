import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readVideo(id: number) {
  console.log('Type of id:', typeof id)
  console.log('Value of id object:', JSON.stringify(id, null, 2))
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
  })
  return video
}

export async function readVideos() {
  const videos = await prisma.video.findMany()
}

export async function readFilteredVideos() {
  const filteredVideos = await prisma.video.findMany({
    where: {
      deleted_at: null,
    },
  })
  return filteredVideos
}
