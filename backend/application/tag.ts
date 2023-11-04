import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class TagApplicationService {
  async createTag(params: {
    name: string
    color: string
    backgroundColor: string
  }) {
    const { name, color, backgroundColor } = params
    const question = await prisma.tag.create({
      data: {
        name,
        color,
        backgroundColor,
      },
    })
    return question
  }

  async getTag(tagId: string) {
    const question = await prisma.tag.findUnique({
      where: { id: tagId },
    })
    return question
  }
  async getTags() {
    const question = await prisma.tag.findMany({
      where: { deleted_at: null },
    })
    return question
  }
}
