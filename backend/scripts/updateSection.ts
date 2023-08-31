import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateSection(section_id: number) {
  console.log('section_id', section_id)
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
