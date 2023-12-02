import express from 'express'
import z from 'zod'

import { createCourse } from '../scripts/createCourse'
import {
  readCourse,
  readAllCourses,
  readFilteredCourses,
  readPublishedCourseContent,
  getSearchedCourses,
} from '../scripts/readCourse'
import { updateCourse, updateCourses } from '../scripts/updateCourse'
import { deleteCourse, deleteCourses } from '../scripts/deleteCourse'

exports.createCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const { name, description, published, tagIds } = req.body

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'コース名とコース概要は必須です。' })
    }

    const createdCourse = await createCourse(
      name,
      description,
      published,
      tagIds,
    )

    if (!createdCourse) {
      return res.status(400).json({ message: 'コースの作成に失敗しました。' })
    }

    res.status(201).json({
      message: `新しいコース(${createdCourse.name})が作成されました！`,
    })
  } catch (e: any) {
    res.status(500).json({ message: 'サーバー内部のエラーが発生しました。' })
  }
}

exports.readCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const course = await readCourse(req.params.id)
    res.status(200).json(course)
  } catch (e: any) {
    res.status(500).json({ message: 'サーバー内部のエラーが発生しました。' })
  }
}

exports.readAllCourses = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const courses = await readAllCourses()
    res.status(200).json(courses)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.readFilteredCourses = async function (res: express.Response) {
  try {
    const filteredCourses = await readFilteredCourses()
    res.status(200).json(filteredCourses)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.getPublishedCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const publishedCourse = await readPublishedCourseContent(req.params.id)
    res.status(200).json(publishedCourse)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.getSearchedCourses = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const { text } = req.body
    const searchCourses = await getSearchedCourses({ text })
    res.status(200).json(searchCourses)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.readFilteredCourses = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const filteredCourses = await readFilteredCourses()
    res.status(200).json(filteredCourses)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.updateCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const { id, name, description, published, tagIds } = req.body

    const response = await updateCourse(
      id,
      name,
      description,
      published,
      tagIds,
    )

    res.status(200).json({ message: '変更が保存されました。' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message })
    }
  }
}

exports.updateCourses = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await updateCourses()
    res.send('複数のコースを更新しました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.deleteCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await deleteCourse(req.body.courseId)
    res.status(201).json({
      message: '削除されました。自動的にコース一覧へ戻ります。',
    })
  } catch (e: any) {
    res.status(500).json({ message: 'サーバー内部エラーが発生しました。' })
  }
}

exports.deleteCourses = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await deleteCourses('5', '8')
    res.send('複数のコースを削除しました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
