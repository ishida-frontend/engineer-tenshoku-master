import express from 'express'
import { z } from 'zod'

export class TagValidator {
  createTag = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const tagCreateSchema = z.object({
      name: z.string(),
      color: z.string(),
      backgroundColor: z.string(),
    })

    const tagData = tagCreateSchema.safeParse(req.body)

    if (tagData.success) {
      next()
    } else {
      res.status(400).json({ errors: tagData.error.formErrors.fieldErrors })
    }
  }

  updateTag = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const videoUpdateSchema = z.object({
      name: z.string(),
      color: z.string(),
      backgroundColor: z.string(),
    })

    const tagData = videoUpdateSchema.safeParse(req.body)

    if (tagData.success) {
      next()
    } else {
      res.status(400).json({ errors: tagData.error.formErrors.fieldErrors })
    }
  }
}
