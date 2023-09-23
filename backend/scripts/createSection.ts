import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

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
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
