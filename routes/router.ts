import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import { createCourse } from '../scripts/createCourse'
import { readCourse, readAllCourses, readFilteredCourses } from '../scripts/readCourse'
import { updateCourse, updateCourses } from '../scripts/updateCourse'
import { deleteCourse, deleteCourses } from '../scripts/deleteCourse'
import { createContact } from '../scripts/createContact'

const router = express.Router();
const courseRouter = express.Router();

router.use('/course', courseRouter);

courseRouter.get('/create', async (req, res) => {
  try {
    await createCourse();
    res.send('新しいコースが作成されました！');
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

courseRouter.get('/read', async (req, res) => {
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

courseRouter.get('/update', async (req, res) => {
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

courseRouter.get('/delete', async (req, res) => {
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

const contactRouter = express.Router();

router.use('/contact', contactRouter);

contactRouter.get('/create', async (req, res) => {
  try {
    await createContact();
    res.send('新しいお問い合わせが作成されました！');
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
});

router.get('/contact/form-success', async (req, res) => {
  try {
    // TODO 動的に変える
    const text = `テストメッセージ
    新しいお問合せが届きました。
    メールアドレス：test@test.com
    件名：テスト
    本文：これはテストです。`;

    const url: string = process.env.WEBHOOK_URL || 'default';
    await axios.post(url, { text });

    res.status(200).send('お問合せを受け付けました。');
  } catch (e: any) {
    console.error(e);
    res.status(500).send('エラーが発生しました。');
  }
});

export default router;
