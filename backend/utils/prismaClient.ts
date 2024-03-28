import { Prisma, PrismaClient } from '@prisma/client'

export { Prisma, PrismaClient }

const prisma = new PrismaClient().$extends({
  // soft-delete 用のカスタムメソッド
  model: {
    $allModels: {
      async softDelete(id: string) {
        const context = Prisma.getExtensionContext(this)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (context as any).update({
          where: {
            id,
          },
          data: {
            deleted_at: new Date(),
          },
        })
      },
    },
  },

  // findMany() で deleted_at が null のレコードのみを取得
  query: {
    $allModels: {
      async findMany({ args, query }) {
        {
          args.where = {
            ...args.where,
            deleted_at: null,
          }
        }
        return query(args)
      },
    },
  },
})

export default prisma
