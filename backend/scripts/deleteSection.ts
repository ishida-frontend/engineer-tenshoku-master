import prisma from '../utils/prismaClient'

export async function deleteSection(id: string) {
  const section = await prisma.section.delete({
    where: {
      id,
    },
  })
  return section
}

export async function deleteSections(sectionId1: string, sectionId2: string) {
  await prisma.section.deleteMany({
    where: {
      id: {
        in: [sectionId1, sectionId2],
      },
    },
  })
}
