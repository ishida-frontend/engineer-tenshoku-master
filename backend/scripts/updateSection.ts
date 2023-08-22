import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateSection(sectionId: number) {
  const section = await prisma.section.update({
    where: {
      id: sectionId,
    },
    data: {
      title: 'JavaScript入門講座',
    },
  })
  return section
}

export async function updateSections() {
  const sections = await prisma.section.updateMany({
    where: {
      title: {
        contains: 'Section 1',
      },
    },
    data: {
      title: 'インストール方法',
    },
  })
}
updateSection(9), updateSections()
