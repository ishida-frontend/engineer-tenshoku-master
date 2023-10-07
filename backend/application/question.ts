import { PrismaClient } from '@prisma/client'
// import crypto from 'crypto'
const prisma = new PrismaClient()

export class QuestionApplication {
  static async create(params: {
    title: string
    content: string
    video_id: string
    user_id: string
  }) {
    try {
      const { title, content, video_id, user_id } = params
      const question = await prisma.question.create({
        data: {
          // id: crypto.randomUUID(),
          video_id,
          user_id,
          title,
          content,
        },
      })
      return question
    } catch (error) {
      throw error
    }
  }

  static async get(video_id: string) {
    try {
      const question = await prisma.question.findMany({
        where: { video_id },
      })
      return question
    } catch (error) {
      throw error
    }
  }
}
