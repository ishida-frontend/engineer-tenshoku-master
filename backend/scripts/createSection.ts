import prisma from '../utils/prismaClient'
import crypto from 'crypto'

export async function createSection(sectionData: {
  course_id: string
  order: number
  title: string
  published: boolean
}) {
  try {
    const section = await prisma.section.create({
      data: {
        id: crypto.randomUUID(),
        course: { connect: { id: sectionData.course_id } },
        order: sectionData.order,
        title: sectionData.title,
        published: sectionData.published,
      },
    })
    return section
  } catch (e) {
    throw new Error(`createSection error: ${e}`)
  } finally {
    await prisma.$disconnect()
  }
}
