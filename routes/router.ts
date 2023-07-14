import express from 'express';
import { createCourse } from '../scripts/createCourse'
import { readCourse, readAllCourses, readFilteredCourses } from '../scripts/readCourse'
import { updateCourse, updateCourses } from '../scripts/updateCourse'
import { deleteCourse, deleteCourses } from '../scripts/deleteCourse'

const router = express.Router();

router.get('/create', (req, res) => {
  try {
    createCourse();
    res.send('新しいコースが作成されました！');
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

router.get('/read', async (req, res) => {
  try {
    await readCourse();
    await readAllCourses();
    await readFilteredCourses();
    res.send(
      '１件のコースを読み込みました！<br>全てのコースを読み込みました！<br>条件指定のコースを読み込みました！'
    );
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

router.get('/update', async (req, res) => {
  try {
    await updateCourse();
    await updateCourses();
    res.send(
      '１件のコースを更新しました！<br>複数のコースを更新しました！'
    );
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

router.get('/delete', async (req, res) => {
  try {
    await deleteCourse(9);
    await deleteCourses(25, 28);
    res.send(
      '１件のコースを削除しました！<br>複数のコースを削除しました！'
    )
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

export default router;
