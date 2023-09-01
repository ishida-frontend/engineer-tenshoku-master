import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createSection(sectionData: {
  course_id: number
  order: number
  title: string
  published: boolean
}) {
  // console.log('create:sectionData', sectionData)
  try {
    const section = await prisma.section.create({
      data: {
        course: { connect: { id: Number(sectionData.course_id) } },
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
