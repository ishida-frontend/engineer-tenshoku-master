import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

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
