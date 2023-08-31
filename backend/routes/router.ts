import express from 'express'
import 'dotenv/config'

import { contactValidationRules, contactValidate } from '../validation'
import { validate, courseValidationRules } from '../validation/courseValidation'
import { VideoValidator } from '../validation/videoValidator'
import { VideoController } from '../controllers/videoController'
import { readVideo } from '../scripts/readVideo'

const {
  createCourse,
  readCourse,
  readAllCourses,
  readFilteredCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')
const { sectionCreateController } = require('../controllers/sectionController')
const {
  checkCreateContact,
  checkReadContact,
} = require('../controllers/contactController')

const router = express.Router()

const videoValidator = new VideoValidator()
const videoController = new VideoController()

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
adminRouter.post('/course/create', createCourse)
adminRouter.get('/course/:id', readCourse)
adminRouter.get('/course', readFilteredCourses)
adminRouter.put(
  '/course/edit/:id',
  validate(courseValidationRules),
  updateCourse,
)
adminRouter.delete('/course/delete/:id', deleteCourse)
adminRouter.get('/contacts', checkReadContact)
adminRouter.post(
  '/video/create',
  videoValidator.createVideo,
  videoController.createVideo,
)
adminRouter.get('/video/:id', readVideo)
adminRouter.get('/video', videoController.readFilteredVideos)
adminRouter.put('/video/:id', videoController.updateVideo)
adminRouter.delete('/video/delete/:id', videoController.deleteVideo)

const courseRouter = express.Router()
router.use('/course', courseRouter)
courseRouter.get('/create', createCourse)
courseRouter.get('/read', readCourse)
courseRouter.get('/all', readAllCourses)
courseRouter.get('/update', updateCourse)

const contactRouter = express.Router()
router.use('/contact', contactRouter)
contactRouter.post(
  '/create',
  contactValidate(contactValidationRules),
  checkCreateContact,
)

export default router
