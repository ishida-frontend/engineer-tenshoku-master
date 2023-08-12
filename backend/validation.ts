import { AnyZodObject, ZodError, z } from 'zod'
import express, { Request, Response, NextFunction } from 'express'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ ...req.body })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(
          'error',
          error.issues.map((error) => ({
            path: error.path[0],
            message: error.message,
          })),
        )
        return res.status(500).json({
          status: '500 Server Error',
          error: error.issues.map((error) => ({
            path: error.path[0],
            message: error.message,
          })),
        })
      }
    }
  }

export const contactValidationRules = z.object({
  name: z.string().min(5, { message: '名前は5文字以上必要です。' }),
  email: z
    .string()
    .min(5, { message: 'メールは5文字以上必要です。' })
    .email({ message: '有効なメールアドレスの形式で入力してください。' }),
  subject: z.string().min(6, { message: 'タイトルは6文字以上必要です。' }),
  message: z.string().min(6, { message: '内容は6文字以上必要です。' }),
})
