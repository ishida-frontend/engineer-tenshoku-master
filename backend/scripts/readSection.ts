import prisma from '../utils/prismaClient'

export async function readSection(sectionId: string) {
  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
    },
    include: {
      videos: true,
    },
  })
  return section
}

export async function readSections() {
  const sections = await prisma.section.findMany()
  return sections
}

export async function readOrderedSections(course_id: string) {
  const sections = await prisma.section.findMany({
    where: {
      course_id,
      deleted_at: null,
    },
    orderBy: [
      {
        order: 'asc',
      },
    ],
  })
  return sections
}
