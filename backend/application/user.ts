import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserApplicationService {
  static async create(params: { id: string; name: string }) {
    try {
      const { id, name } = params
      const user = await prisma.user.create({
        data: {
          id,
          name,
        },
      })
      return user
    } catch (error) {
      throw error
    }
  }

  static async get(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })
      return user
    } catch (error) {
      throw error
    }
  }
}
