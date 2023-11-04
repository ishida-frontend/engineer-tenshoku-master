import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class TagApplicationService {
  async createTag(params: {
    name: string
    color: string
    backgroundColor: string
  }) {
    try {
      const { name, color, backgroundColor } = params
      const question = await prisma.tag.create({
        data: {
          name,
          color,
          backgroundColor,
        },
      })
      return question
    } catch (error) {
      throw error
    }
  }
  async updateTag(params: {
    id: string
    name: string
    color: string
    backgroundColor: string
  }) {
    try {
      const { id, name, color, backgroundColor } = params
      const tag = await prisma.tag.update({
        where: { id },
        data: {
          name,
          color,
          backgroundColor,
        },
      })
      return tag
    } catch (error) {
      throw error
    }
  }

  async getTag(tagId: string) {
    try {
      const question = await prisma.tag.findUnique({
        where: { id: tagId },
      })
      return question
    } catch (error) {
      throw error
    }
  }
  async getTags() {
    try {
      const question = await prisma.tag.findMany({
        where: { deleted_at: null },
      })
      return question
    } catch (error) {
      throw error
    }
  }
}
