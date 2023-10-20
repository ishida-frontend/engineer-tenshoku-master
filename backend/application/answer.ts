import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class AnswerApplicationService {
  static async create(body: {
    question_id: string
    user_id: string
    comment: string
  }) {
    try {
      const { comment, question_id, user_id } = body
      const answer = await prisma.answer.create({
        data: {
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
        orderBy: [
          {
            created_at: 'asc',
          },
        ],
      })
      return answer
    } catch (error) {
      throw error
    }
  }
}
