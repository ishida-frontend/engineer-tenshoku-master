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

export async function deleteSection(sectionId: number) {
  await prisma.section.delete({ where: { id: sectionId } })
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
deleteSection(2), deleteSections(5, 7)
