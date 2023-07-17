import express from 'express';
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import 'dotenv/config';
import videoRouter from './video';

const router = express.Router();
const prisma = new PrismaClient();

router.use('/video', videoRouter)

router.get('/contact', async (req, res) => { // あとで router.post に変更
  
  // Prismaでテーブル作ったら動作確認
  const { name, email, subject, message } = req.body;

  try {
    // DBへ保存
    // Prismaでテーブル作ったら動作確認
    await prisma.contactFormSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // Slackへ通知
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
