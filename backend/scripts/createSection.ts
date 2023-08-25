import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createSection(sectionData: {
  courseId: number
  order: number
  title: string
  published: boolean
}) {
  try {
    console.log('sectionData1', sectionData)
    const section = await prisma.section.create({
      data: {
        course: { connect: { id: sectionData.courseId } },
        order: sectionData.order,
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
