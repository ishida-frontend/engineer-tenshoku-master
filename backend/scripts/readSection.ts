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

export async function readFilteredSections() {
  const sections = await prisma.section.findMany({
    where: {
      deleted_at: {
        not: null,
      },
    },
  })
  return sections
}
