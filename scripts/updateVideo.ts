import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function updateVideo() {
  const video = await prisma.video.update({
    where: {
      id: 2,
    },
    data: {
      description: 'This video was made just for you!',
    },
  })
  return video;
}

async function updateVideos() {
  const videos = await prisma.video.updateMany({
    where: {
      description: {
        contains: 'Enjoy the video!',
      },
    },
    data: {
      description: 'This video will change your life!',
    },
  })
  console.log(videos);
}

updateVideo()
updateVideos()
  .catch(e => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
