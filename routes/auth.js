import { Router } from 'express'
import { login, logout, register } from '../controllers/auth.js'
import {
  validateLoginUser,
  validateRegisterUser,
} from '../middlewares/validationMiddleware.js'

const router = Router()

router.post('/register', validateRegisterUser, register)
router.post('/login', validateLoginUser, login)
router.get('/logout', logout)

export default router
