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
      throw new Error(`UserApplicationService: create user error: ${error}`)
    }
  }

  static async get(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })
      return user
    } catch (error) {
      throw new Error(`UserApplicationService: get user error: ${error}`)
    }
  }

  static async update(params: {
    id: string
    name: string
    oneWord: string
    goal: string
  }) {
    try {
      const { id, name, oneWord, goal } = params
      const updatedProfile = await prisma.user.update({
        where: { id },
        data: {
          name,
          oneWord,
          goal,
        },
      })
      return updatedProfile
    } catch (error) {
      throw new Error(`UserApplicationService: update user error: ${error}`)
    }
  }
}
