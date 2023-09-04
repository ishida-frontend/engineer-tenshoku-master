import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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

export async function deleteSection(id: number) {
  console.log('id', id)
  const section = await prisma.section.delete({
    where: {
      id: Number(id),
    },
  })
  console.log('section', section)
  return section
}

export async function deleteSections(sectionId1: number, sectionId2: number) {
  await prisma.section.deleteMany({
    where: {
      id: {
        in: [sectionId1, sectionId2],
      },
    },
  })
}
