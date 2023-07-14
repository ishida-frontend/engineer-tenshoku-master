import express from 'express';
import { createCourse } from '../scripts/createCourse.ts'

const router = express.Router();

router.get('/create', (req, res) => {
  try {
    createCourse();
    res.send('新しいコースが作成されました！');
  } catch (e) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }

})

export default router;
