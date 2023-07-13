import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function videoCreate() {
  const video = await prisma.video.create({
    data: {
      name: "video 1",
      description: "The very first video in the whole site.",
      published: true
    }
  })
  console.log(video);
}

videoCreate()
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  