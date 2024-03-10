import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  const softDeleteModels = [
    'User',
    'Course',
    'Section',
    'Video',
    'Tag',
    'FavoriteVideo',
    'Advertisement',
  ]
  if (params.model && softDeleteModels.includes(params.model)) {
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

export default prisma
