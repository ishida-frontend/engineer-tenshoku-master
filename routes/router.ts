import express from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client'
import 'dotenv/config';
import { readAllContacts } from '../scripts/readContact'
import { createCourse } from '../scripts/createCourse'
import { readCourse, readAllCourses, readFilteredCourses } from '../scripts/readCourse'
import { updateCourse, updateCourses } from '../scripts/updateCourse'
import { deleteCourse, deleteCourses } from '../scripts/deleteCourse'
import { createVideo } from '../scripts/createVideo'
import { readVideo, readVideos, readFilteredVideos } from '../scripts/readVideo'
import { updateVideo, updateVideos } from '../scripts/updateVideo'
import { deleteVideo, deleteVideos } from '../scripts/deleteVideo'
import { createContact } from '../scripts/createContact'
import { contactValidationRules } from '../validation'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

const router = express.Router();
const adminRouter = express.Router();
const courseRouter = express.Router();

router.use('/admin', adminRouter);
router.use('/course', courseRouter);

adminRouter.get('/contacts', async (req, res) => {
  try {
    await readAllContacts();
    res.send('お問合せを全件取得しました！')
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

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

courseRouter.get('/delete',async (req, res) => {
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

const videoRouter = express.Router();
router.use('/video', videoRouter);

videoRouter.get('/create', async (req, res) => {
  try {
    await createVideo(1);
    res.send('新しいビデオが作成されました！');
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

videoRouter.get('/read', async (req, res) => {
  try {
    await readVideo(2);
    await readVideos();
    await readFilteredVideos(4);
    res.send(
      '１件のビデオを読み込みました！<br>全てのビデオを読み込みました！<br>条件指定のビデオを読み込みました！'
    );
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

videoRouter.get('/update', async (req, res) => {
  try {
    await updateVideo(5);
    await updateVideos();
    res.send(
      '１件のビデオを更新しました！<br>複数のビデオを更新しました！'
    );
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})

videoRouter.get('/delete',async (req, res) => {
  try {
    await deleteVideo(8);
    await deleteVideos(10, 12);
    res.send(
      '１件のビデオを削除しました！<br>複数のビデオを削除しました！'
    )
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
})


const contactRouter = express.Router();
router.use('/contact', contactRouter);

contactRouter.get('/create', contactValidationRules, async (req: any, res: any) => {
  const errors = validationResult(req);
  // createContact()でデータ取得してから、バリデーションを実行しないとvalueが空になる(フロントが出来上がってから要対応)
  try {
    await createContact();
    res.send('新しいお問い合わせが作成されました！');
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
});


router.get('/contact/success', async (req, res) => {
  try {

    // コンタクトデータ取得
    const id = req.query.id

    if (!id) {
      throw new Error('無効なコンタクトIDです。')
    }

    const contactData  = await prisma.contact.findUnique({
      where: { id: Number(id) }
    });

    if (!contactData) {
      throw new Error('該当のIDが見つかりません。');
    }


    // Slackへの通知
    const slackMessage = {
      text: `【テスト】新しいお問合せが届きました。
メールアドレス：${contactData.email}
件名：${contactData.subject}
本文：${contactData.message}`
    }

    const url: string = process.env.WEBHOOK_URL || 'default';
    const maxRetries = 3;
    for (let i =0; i < maxRetries; i++) {
      try {
        await axios.post(url, slackMessage);
        break;
      } catch (error) {
        console.log("Axios error", error)
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    res.status(200).send('お問合せを受け付けました。');
  } catch (e: any) {
    console.error(e);
    res.status(500).send('エラーが発生しました。');
  }
});

export default router;
