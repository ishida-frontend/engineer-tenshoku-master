import prisma from '../utils/prismaClient'

export class TagApplicationService {
  private prisma

  constructor(prismaClient = prisma) {
    this.prisma = prismaClient
  }

  async createTag(params: {
    name: string
    color: string
    backgroundColor: string
  }) {
    try {
      const { name, color, backgroundColor } = params
      const question = await this.prisma.tag.create({
        data: {
          name,
          color,
          backgroundColor,
        },
      })
      return question
    } catch (error) {
      throw new Error(`TagApplicationService: create tag error: ${error}`)
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
      const tag = await this.prisma.tag.update({
        where: { id },
        data: {
          name,
          color,
          backgroundColor,
        },
      })
      return tag
    } catch (error) {
      throw new Error(`TagApplicationService: update tag error: ${error}`)
    }
  }

  async getTag(tagId: string) {
    try {
      const tag = await prisma.tag.findUnique({
        where: { id: tagId },
      })
      return tag
    } catch (error) {
      throw new Error(`TagApplicationService: get tag error: ${error}`)
    }
  }

  async getTags() {
    try {
      const tags = await prisma.tag.findMany()
      return tags
    } catch (error) {
      throw new Error(`TagApplicationService: get tags error: ${error}`)
    }
  }

  async deleteTag(tagId: string) {
    try {
      await prisma.tag.softDelete(tagId)
    } catch (error) {
      throw new Error(`TagApplicationService: get tags error: ${error}`)
    }
  }
}
