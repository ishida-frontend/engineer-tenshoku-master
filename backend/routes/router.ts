import express from 'express'
import 'dotenv/config'

import { contactValidationRules, contactValidate } from '../validation'
import { validate, courseValidationRules } from '../validation/courseValidation'
import { VideoValidator } from '../validation/videoValidator'
import { UserController } from '../controllers/userController'
import { ViewingStatusController } from '../controllers/viewingStatusController'
import { FavoriteVideoController } from '../controllers/favoriteVideoController'
import { VideoController } from '../controllers/videoController'
import { QuestionController } from '../controllers/questionController'
import { AnswerController } from '../controllers/answerController'
import { TagValidator } from '../validation/tagValidator'
import { TagController } from '../controllers/tagController'
import { AdvertisementValidator } from '../validation/advertisementValidator'
import { AdvertisementController } from '../controllers/advertisementController'
import { UserValidator } from '../validation/userValidator'

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
const userValidator = new UserValidator()
const videoValidator = new VideoValidator()
const tagController = new TagController()
const tagValidator = new TagValidator()
const advertisementController = new AdvertisementController()
const advertisementValidator = new AdvertisementValidator()
const videoController = new VideoController()
const questionController = new QuestionController()
const answerController = new AnswerController()
const viewingStatusController = new ViewingStatusController()
const favoriteVideoController = new FavoriteVideoController()

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

// Tagのルーティング
router.get('/tag', (req, res) => tagController.getTags(req, res))
router.get('/tag/:id', (req, res) => tagController.getTag(req, res))
router.post('/tag', tagValidator.createTag, (req, res) => {
  tagController.createTag(req, res)
})
router.put('/tag', tagValidator.updateTag, (req, res) => {
  tagController.updateTag(req, res)
})

// Advertisementのルーティング
router.get('/advertisement', (req, res) => {
  advertisementController.getAdvertisements(req, res)
})
router.get('/advertisement/banner', (req, res) => {
  advertisementController.getUserAdvertisments(req, res)
})

router.get('/advertisement/:id', (req, res) => {
  advertisementController.getAdvertisement(req, res)
})
router.post(
  '/advertisement',
  advertisementValidator.createAdvertisement,
  (req, res) => {
    advertisementController.createAdvertisement(req, res)
  },
)
router.put(
  '/advertisement',
  advertisementValidator.updatedAdvertisement,
  (req, res) => {
    advertisementController.updateAdvertisement(req, res)
  },
)
router.delete('/advertisement', (req, res) => {
  advertisementController.deleteAdvertisement(req, res)
  })

const userRouter = express.Router()
router.use('/user', userRouter)
userRouter.get('/:id', userController.get)
userRouter.put('/update', userValidator.updateUser, userController.update)

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

const questionRouter = express.Router()
router.use('/question', questionRouter)
questionRouter.post('/create', (req, res) => {
  questionController.create(req, res)
})
questionRouter.get('/:video_id', (req, res) => {
  questionController.get(req, res)
})

const answerRouter = express.Router()
router.use('/answer', answerRouter)
answerRouter.post('/create', (req, res) => {
  answerController.create(req, res)
})
answerRouter.get('/:question_id', (req, res) => {
  answerController.get(req, res)
})
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
  '/:userId/:courseId/all',
  viewingStatusController.getViewingStatuses,
)

const favoriteVideoRouter = express.Router()
router.use('/favoritevideo', favoriteVideoRouter)
favoriteVideoRouter.put(
  '/:userId/:videoId',
  favoriteVideoController.upsertFavoriteVideo,
)
favoriteVideoRouter.get(
  '/:userId/:videoId',
  favoriteVideoController.getFavoriteVideo,
)
favoriteVideoRouter.get('/:userId', favoriteVideoController.getFavoriteVideos)

export default router
