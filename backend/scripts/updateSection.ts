import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateSection(section_id: number) {
  const section = await prisma.section.update({
    where: {
      id: section_id,
    },
    data: {
      title: 'JavaScript入門',
      deleted_at: null,
    },
  })
  return section
}

export async function updateSections(sectionData: {
  course_id: number
  order: number
  title: string
  published: boolean
}) {
  const sections = await prisma.section.updateMany({
    where: {
      course_id: Number(sectionData.course_id),
      order: Number(sectionData.order),
    },
    data: {
      title: sectionData.title,
      published: sectionData.published,
      deleted_at: null,
    },
  })
  return sections
}
