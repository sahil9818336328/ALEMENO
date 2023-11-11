import { Router } from 'express'
const router = Router()

import {
  getCurrentUser,
  getStats,
  getUserEnrolledCourses,
} from '../controllers/user.js'

router.get('/current-user', getCurrentUser)
router.get('/enrolled-courses', getUserEnrolledCourses)
router.get('/course-stats', getStats)
export default router
