import express from 'express'
import { z } from 'zod'

export class UserValidator {
  updateUser = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const userUpdateSchema = z.object({
      name: z
        .string()
        .min(1, { message: '※1文字以上で入力してください' })
        .max(15, { message: '※15文字以下で入力してください' }),
      oneWord: z.string().max(20, { message: '※20文字以下で入力してください' }),
      goal: z.string().max(40, { message: '※40文字以下で入力してください' }),
      github: z
        .string()
        .url({
          message: '※URLの形式で入力してください',
        })
        .startsWith('https://github.com/', {
          message: 'githubのURLにしてください',
        }),
      x: z
        .string()
        .url({
          message: '※URLの形式で入力してください',
        })
        .startsWith('https://twitter.com/', {
          message: 'XのURLにしてください',
        }),
    })

    const user = userUpdateSchema.safeParse(req.body)

    if (user.success) {
      next()
    } else {
      res.status(400).json({ errors: user.error.formErrors.fieldErrors })
    }
  }
}
