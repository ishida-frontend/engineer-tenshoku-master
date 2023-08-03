import express from 'express'
import 'dotenv/config'
import { contactValidationRules } from '../validation'
const {
  checkCreateCourse,
  checkReadCourse,
  checkUpdateCourse,
  checkDeleteCourse,
} = require('../controllers/courseController')
const {
  checkCreateVideo,
  checkReadVideo,
  checkUpdateVideo,
  checkDeleteVideo,
} = require('../controllers/videoController')
const {
  checkCreateContact,
  checkReadContact,
  checkSuccessContact,
} = require('../controllers/contactController')

const router = express.Router()
router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTION',
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  },
)

const adminRouter = express.Router()
router.use('/admin', adminRouter)
adminRouter.get('/contacts', checkReadContact)

const courseRouter = express.Router()
router.use('/course', courseRouter)
courseRouter.get('/create', checkCreateCourse)
courseRouter.get('/read', checkReadCourse)
courseRouter.get('/update', checkUpdateCourse)
courseRouter.get('/delete', checkDeleteCourse)

const videoRouter = express.Router()
router.use('/video', videoRouter)
videoRouter.get('/create', checkCreateVideo)
videoRouter.get('/read', checkReadVideo)
videoRouter.get('/update', checkUpdateVideo)
videoRouter.get('/delete', checkDeleteVideo)

const contactRouter = express.Router()
router.use('/contact', contactRouter)
contactRouter.get('/create', contactValidationRules, checkCreateContact)

router.get('/contact/success', checkSuccessContact)

export default router