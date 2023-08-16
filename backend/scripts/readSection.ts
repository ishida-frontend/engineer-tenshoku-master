import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readSection(sectionId: number) {
  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
    },
  })
  console.log('section', section)
}

export async function readSections() {
  const sections = await prisma.section.findMany()
  console.log('allSections', sections)
}

export async function readFilteredSections(filteredId: number) {
  const sections = await prisma.section.findMany({
    where: {
      id: {
        gt: filteredId,
      },
      deleted_at: {
        not: null,
      },
    },
  })
  console.log('FilteredSections', sections)
}
readSection(2), readSections(), readFilteredSections(5)
