import express from 'express'
import { z } from 'zod'

export class QuestionValidator {
  create = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const minTitleLength = 10
    const maxTitleLength = 255
    const minContentLength = 15
    const questionCreateSchema = z.object({
      title: z
        .string()
        .min(minTitleLength, {
          message: `※${minTitleLength}文字以上で入力してください`,
        })
        .max(maxTitleLength, {
          message: `※${maxTitleLength}文字以内で入力してください`,
        }),
      content: z
        .string()
        .min(minContentLength, {
          message: `※${minContentLength}文字以上で入力してください`,
        }),
    })

    const questionData = questionCreateSchema.safeParse(req.body)

    if (questionData.success) {
      next()
    } else {
      res.status(500).json({ errors: [questionData.error.errors] })
    }
  }
}
