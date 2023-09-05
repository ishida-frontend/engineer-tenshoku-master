import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { contactValidationRules, contactValidate } from '../validation'
import { validate, courseValidationRules } from '../validation/courseValidation'

const app = express()
const allowedOrigins = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
}
app.use(cors(options))
app.use(express.json())

const {
  createCourse,
  readCourse,
  readAllCourses,
  readFilteredCourses,
  getPublishedCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')
const {
  sectionCreate,
  sectionRead,
  sectionUpdate,
  sectionDelete,
  sectionUpsert,
} = require('../controllers/sectionController')
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

const courseRouter = express.Router()
router.use('/course', courseRouter)
courseRouter.get('/create', createCourse)
courseRouter.get('/read', readCourse)
courseRouter.get('/:id', getPublishedCourse)
courseRouter.get('/all', readAllCourses)
courseRouter.get('/update', updateCourse)

const sectionRouter = express.Router()
router.use('/section', sectionRouter)
sectionRouter.post('/create', sectionCreate)
sectionRouter.get('/read/:course_id', sectionRead)
sectionRouter.post('/update', sectionUpdate)
sectionRouter.post('/delete/:id', sectionDelete)

const videoRouter = express.Router()
router.use('/video', videoRouter)
// videoRouter.get('/create', checkCreateVideo)
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
