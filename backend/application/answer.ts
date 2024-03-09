import prisma from '../utils/prismaClient'

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
          userId: user_id,
          comment,
        },
      })
      return answer
    } catch (error) {
      throw new Error(`AnswerApplicationService error: ${error}`)
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
      throw new Error(`AnswerApplicationService: get answer error: ${error}`)
    }
  }
}
