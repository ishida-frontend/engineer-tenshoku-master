import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readSection(sectionId: number) {
  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
    },
  })
  return section
}

export async function readSections() {
  const sections = await prisma.section.findMany()
  return sections
}

export async function readFilteredSections(course_id: string) {
  console.log('course_id', course_id)
  const sections = await prisma.section.findMany({
    where: {
      course_id: Number(course_id),
      deleted_at: null,
    },
    orderBy: [
      {
        order: 'asc',
      },
    ],
  })
  console.log('sections', sections)
  return sections
}
