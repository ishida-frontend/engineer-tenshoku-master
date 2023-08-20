import { AnyZodObject, ZodError, z } from 'zod'
import express, { Request, Response, NextFunction } from 'express'

export const contactValidate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ ...req.body })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.json({
          error: error.issues.map((error) => ({
            path: error.path[0],
            message: error.message,
          })),
        })
      }
    }
  }

export const contactValidationRules = z.object({
  name: z
    .string()
    .min(2, { message: '2文字以上入力してください' })
    .max(50, { message: '50文字以下で入力してください' }),
  email: z
    .string()
    .email({ message: '有効なメールアドレスの形式で入力してください' }),
  subject: z.string().min(5, { message: '5文字以上入力してください' }),
  message: z.string().min(5, { message: '5文字以上入力してください' }),
})
