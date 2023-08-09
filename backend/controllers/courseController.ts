import express from 'express'
import { createCourse } from '../scripts/createCourse'
import {
  readCourse,
  readAllCourses,
  readFilteredCourses,
} from '../scripts/readCourse'
import { updateCourse, updateCourses } from '../scripts/updateCourse'
import { deleteCourse, deleteCourses } from '../scripts/deleteCourse'

exports.checkCreateCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const { name, description } = req.body

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'コース名とコース概要は必須です。' })
    }

    await createCourse(name, description)

    res.status(201).json({ message: '新しいコースが作成されました！' })
  } catch (e: any) {
    res.status(500).json({ message: 'エラーが発生しました' })
  }
}

exports.checkReadCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await readCourse()
    await readFilteredCourses()
    res.send(
      '１件のコースを読み込みました！<br>条件指定のコースを読み込みました！',
    )
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkReadAllCourses = async function (
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

exports.checkUpdateCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await updateCourse()
    await updateCourses()
    res.send('１件のコースを更新しました！<br>複数のコースを更新しました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkDeleteCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await deleteCourse(3)
    await deleteCourses(5, 8)
    res.send('１件のコースを削除しました！<br>複数のコースを削除しました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
