import express from 'express'
import { z } from 'zod'

export class QuestionValidator {
  create = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const questionCreateSchema = z.object({
      title: z.string().min(10, { message: '※10文字以上で入力してください' }),
      content: z.string().min(15, { message: '※15文字以上で入力してください' }),
      video_id: z
        .string()
        .min(20, { message: '※もう一度コースの選択から行なってください' }),
      user_id: z.string().min(20, { message: '※ログインしてください' }),
    })

    const questionData = questionCreateSchema.safeParse(req.body)

    if (questionData.success) {
      next()
    } else {
      res
        .status(400)
        .json({ errors: questionData.error.formErrors.fieldErrors })
    }
  }
}
