import { PrismaClient } from '@prisma/client'
// import crypto from 'crypto'
const prisma = new PrismaClient()

export class AnswerApplication {
  static async create(params: {
    question_id: string
    user_id: string
    comment: string
  }) {
    try {
      const { comment, question_id, user_id } = params
      const answer = await prisma.answer.create({
        data: {
          // id: crypto.randomUUID(),
          question_id,
          user_id,
          comment,
        },
      })
      return answer
    } catch (error) {
      throw error
    }
  }

  static async get(question_id: string) {
    try {
      const answer = await prisma.answer.findMany({
        where: { question_id },
      })
      return answer
    } catch (error) {
      throw error
    }
  }
}
