import express from 'express'
import { z } from 'zod'

export class EmailValidator {
  updateEmail = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const emailUpdateSchema = z.object({
      username: z.string().email({
        message: 'メールアドレスの形式で入力してください',
      }),
      newEmail: z.string().email({
        message: 'メールアドレスの形式で入力してください',
      }),
    })

    const user = emailUpdateSchema.safeParse(req.body)

    if (user.success) {
      next()
    } else {
      res.status(400).json({ errors: user.error.formErrors.fieldErrors })
    }
  }
}
