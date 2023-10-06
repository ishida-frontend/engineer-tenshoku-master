import express from 'express'
import 'dotenv/config'

import { contactValidationRules, contactValidate } from '../validation'
import { validate, courseValidationRules } from '../validation/courseValidation'
import { VideoValidator } from '../validation/videoValidator'
import { UserController } from '../controllers/userController'
import { ViewingStatusController } from '../controllers/viewingStatusController'
import { VideoController } from '../controllers/videoController'

const {
  createCourse,
  readCourse,
  readAllCourses,
  readFilteredCourses,
  getPublishedCourse,
  getSearchedCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')
const {
  sectionCreate,
  sectionRead,
  sectionUpdate,
  sectionDelete,
} = require('../controllers/sectionController')
const {
  checkCreateContact,
  checkReadContact,
} = require('../controllers/contactController')

const router = express.Router()

const userController = new UserController()
const videoValidator = new VideoValidator()
const videoController = new VideoController()
const viewingStatusController = new ViewingStatusController()

router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*')
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
  '/video',
  videoValidator.createVideo,
  videoController.createVideo,
)
adminRouter.get('/video/:id', videoController.readVideo)
adminRouter.get('/video', videoController.readFilteredVideos)
adminRouter.put(
  '/video/:id',
  videoValidator.updateVideo,
  videoController.updateVideo,
)
adminRouter.delete('/video/:id', videoController.deleteVideo)

const userRouter = express.Router()
router.use('/user', userRouter)
userRouter.get('/:id', (req, res) => {
  userController.get(req, res)
})

const courseRouter = express.Router()
router.use('/course', courseRouter)
courseRouter.get('/create', createCourse)
courseRouter.get('/read', readCourse)
courseRouter.get('/all', readAllCourses)
courseRouter.post('/search', getSearchedCourses)
courseRouter.get('/update', updateCourse)
courseRouter.get('/:id', getPublishedCourse)

const sectionRouter = express.Router()
router.use('/section', sectionRouter)
sectionRouter.post('/create', sectionCreate)
sectionRouter.get('/read/:course_id', sectionRead)
sectionRouter.post('/update', sectionUpdate)
sectionRouter.delete('/delete/:id', sectionDelete)

const contactRouter = express.Router()
router.use('/contact', contactRouter)
contactRouter.post(
  '/create',
  contactValidate(contactValidationRules),
  checkCreateContact,
)

const viewingStatusRouter = express.Router()
router.use('/viewingstatus', viewingStatusRouter)
viewingStatusRouter.post(
  '/:userId/:videoId',
  viewingStatusController.upsertViewingStatus,
)
viewingStatusRouter.put(
  '/:userId/:videoId',
  viewingStatusController.upsertViewingStatus,
)
viewingStatusRouter.get(
  '/:userId/:videoId',
  viewingStatusController.getViewingStatus,
)
viewingStatusRouter.get(
  '/all/:courseId/:userId',
  viewingStatusController.getViewingStatuses,
)

export default router
