import prisma from '../utils/prismaClient'

export async function updateSection(section_id: string) {
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
  course_id: string
  order: number
  title: string
  published: boolean
}) {
  const sections = await prisma.section.updateMany({
    where: {
      course_id: sectionData.course_id,
      order: sectionData.order,
    },
    data: {
      title: sectionData.title,
      published: sectionData.published,
      deleted_at: null,
    },
  })
  return sections
}
