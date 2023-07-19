import express from 'express';
import 'dotenv/config';
import { createContact } from '../scripts/createContact'

const router = express.Router();
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

export default router;
