import express from 'express';
import indexRouter from './index';

const router = express.Router();

router.use('/video', indexRouter)

export default router;
