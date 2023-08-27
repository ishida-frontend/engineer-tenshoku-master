import express from 'express'
import { z } from 'zod'

export class VideoValidator {
  createVideo = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const videoCreateSchema = z.object({
      name: z.string().nonempty({ message: '入力必須です' }),
      description: z.string().nonempty({ message: '入力必須です' }),
      url: z.string().url({
        message: 'URLの形式で入力してください',
      }),
      order: z.number().positive(),
    })

    const result = videoCreateSchema.safeParse(req.body)

    if (result.success) {
      next()
    } else {
      res.status(400).json({ errors: result.error.formErrors.fieldErrors })
    }
  }
}
