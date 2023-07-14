import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function readVideo(videoId: number) {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  })
  console.log("a:", video);
}

async function readAllVideos() {
  const videos = await prisma.video.findMany()
  console.log("b:", videos);
}

async function readFilteredVideo(filteredId: number) {
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
  console.log("c:", videos)
}

readVideo(2)
readAllVideos()
readFilteredVideo(6)
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
