import express from 'express'
import { z } from 'zod'

export class QuestionValidator {
  create = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const questionCreateSchema = z.object({
      title: z
        .string()
        .min(15, { message: '※15文字以上で入力してください' })
        .max(255, { message: '※255文字以内で入力してください' }),
      content: z.string().min(15, { message: '※15文字以上で入力してください' }),
    })

    const questionData = questionCreateSchema.safeParse(req.body)

    if (questionData.success) {
      next()
    } else {
      res.status(500).json({ errors: [questionData.error.errors] })
    }
  }
}
