import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'Course') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deleted_at: new Date() }
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date()
      } else {
        params.args.data = { deleted_at: new Date() }
      }
    }
  }

  return next(params)
})

export async function deleteCourse(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { id: courseId } = req.body

    await prisma.course.delete({
      where: { id: courseId },
    })

    res.status(201).json({
      message: '削除されました。自動的にコース一覧へ戻ります。',
    })
  } catch (e: any) {
    res.status(500).json({ message: 'サーバー内部エラーが発生しました。' })
  } finally {
    await prisma.$disconnect()
  }
}

export async function deleteCourses(courseId1: number, courseId2: number) {
  await prisma.course.deleteMany({
    where: {
      id: {
        in: [courseId1, courseId2],
      },
    },
  })
  console.log(`ID${courseId1}と${courseId2}のコースをソフトデリートしました。`)
}
