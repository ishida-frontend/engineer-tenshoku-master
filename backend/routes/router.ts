import express from 'express'
import 'dotenv/config'
import { contactValidationRules, contactValidate } from '../validation'
import { validate, courseValidationRules } from '../validation/courseValidation'
const {
  checkCreateCourse,
  checkReadCourse,
  checkUpdateCourse,
  checkDeleteCourse,
  checkReadAllCourses,
} = require('../controllers/courseController')
const { sectionCreateController } = require('../controllers/sectionController')
const {
  checkCreateVideo,
  checkReadVideo,
  checkUpdateVideo,
  checkDeleteVideo,
} = require('../controllers/videoController')
const {
  checkCreateContact,
  checkReadContact,
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
adminRouter.post('/course/create', checkCreateCourse)
adminRouter.get('/course', checkReadAllCourses)
adminRouter.get('/course/:id', checkReadCourse)
adminRouter.put(
  '/course/edit/:id',
  validate(courseValidationRules),
  checkUpdateCourse,
)
adminRouter.get('/contacts', checkReadContact)

const courseRouter = express.Router()
router.use('/course', courseRouter)
courseRouter.get('/create', checkCreateCourse)
courseRouter.get('/read', checkReadCourse)
courseRouter.get('/update', checkUpdateCourse)
courseRouter.get('/delete', checkDeleteCourse)
courseRouter.get('/all', checkReadAllCourses)

const sectionRouter = express.Router()
router.use('/section', sectionRouter)
sectionRouter.post('/create', sectionCreateController)

const videoRouter = express.Router()
router.use('/video', videoRouter)
videoRouter.get('/create', checkCreateVideo)
videoRouter.get('/read', checkReadVideo)
videoRouter.get('/update', checkUpdateVideo)
videoRouter.get('/delete', checkDeleteVideo)

const contactRouter = express.Router()
router.use('/contact', contactRouter)
contactRouter.post(
  '/create',
  contactValidate(contactValidationRules),
  checkCreateContact,
)

export default router
