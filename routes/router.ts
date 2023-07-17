import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import videoRouter from './video';

const router = express.Router();

router.use('/video', videoRouter)

router.get('/contact/form-success', async (req, res) => {
  try {
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
