import z, { AnyZodObject, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ ...req.body })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: { [key: string]: string } = {}
        error.issues.forEach((issue) => {
          errors[issue.path[0]] = issue.message
        })
        return res.status(400).json({ errors })
      }
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

export const courseValidationRules = z.object({
  name: z.string().min(5, { message: '5文字以上で入力してください' }),
  description: z.string().min(15, { message: '15文字以上で入力してください' }),
})
