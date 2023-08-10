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
    await createCourse()
    res.send('新しいコースが作成されました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkReadCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  const id = Number(req.params.id)
  try {
    const course = await readCourse(id)
    res.json(course)
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
    res.json(courses)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkReadFilteredCourses = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await readFilteredCourses()
    res.send('条件指定のコースを読み込みました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkUpdateCourse = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const { id, name, description, published } = req.body

    await updateCourse(id, name, description, published)
    res.status(200).send('コースが正常に更新されました！')
  } catch (e: any) {
    console.log(e)
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkUpdateCourses = async function (
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
