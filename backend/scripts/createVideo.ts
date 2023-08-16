import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createVideo(videoData: {
  name: string
  description: string
  url: string
  published: boolean
  order: number
  sectionId: number
}) {
  try {
    const video = await prisma.video.create({
      data: {
        name: videoData.name,
        description: videoData.description,
        url: videoData.url,
        published: videoData.published,
        order: videoData.order,
        section: { connect: { id: videoData.sectionId } },
      },
    })
    return video
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
export default createVideo({
  name: 'aaaaaa',
  description: 'aaaaaa',
  url: 'aaaaaa',
  published: true,
  order: 1,
  sectionId: 1,
})
