import prisma from '../utils/prismaClient'

export class QuestionApplicationService {
  static async create(body: {
    title: string
    content: string
    video_id: string
    user_id: string
  }) {
    try {
      const { title, content, video_id, user_id } = body
      const question = await prisma.question.create({
        data: {
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
        orderBy: [
          {
            created_at: 'desc',
          },
        ],
      })
      return question
    } catch (error) {
      throw error
    }
  }
}
