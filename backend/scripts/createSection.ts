import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createSection(sectionData: {
  courseId: number
  index: number
  title: string
  published: boolean
}) {
  try {
    const section = await prisma.section.create({
      data: {
        course: { connect: { id: sectionData.courseId } },
        order: sectionData.index,
        title: sectionData.title,
        published: sectionData.published,
      },
    })
    return section
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
