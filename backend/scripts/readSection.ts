import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readSection(sectionId: number) {
  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
    },
  })
}

export async function readSections() {
  const sections = await prisma.section.findMany()
}

export async function readFilteredSections(courseId: number) {
  console.log('courseId')
  console.log('courseId', courseId)
  const sections = await prisma.section.findMany({
    where: {
      course_id: courseId,
      deleted_at: null,
    },
  })
  return sections
}
