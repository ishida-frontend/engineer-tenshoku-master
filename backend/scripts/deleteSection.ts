import prisma from '../utils/prismaClient'

prisma.$use(async (params, next) => {
  if (params.model === 'Section') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deleted_at: new Date() }
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date()
      } else {
        params.args.data = { deleted_at: new Date() }
      }
    }
  }

  return next(params)
})

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
