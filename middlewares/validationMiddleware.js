import { body, validationResult, param } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js'
import { enrollmentStatus } from '../utils/constants.js'
import Course from '../models/Course.js'
import User from '../models/User.js'

import mongoose from 'mongoose'
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // ERROR MESSAGES CAN RETURN MULTIPLE VALUES
        const errorMessages = errors.array().map((error) => error.msg)
        // A CHECK FOR JOB NOT FOUND, IF THIS CHECK IS NOT HERE IT WILL THROW BAD REQUEST ERROR WITH STATUS 400 WHICH IS WRONG
        if (errorMessages[0].startsWith('No job')) {
          throw new NotFoundError(errorMessages)
        }

        // A CHECK TO RENDER CORRECT STATUS CODE AND MESSAGE
        if (errorMessages[0].startsWith('Not authorized')) {
          throw new UnauthorizedError('Not authorized to access this route')
        }
        throw new BadRequestError(errorMessages)
      }

      // IF NO ERROR'S PASS CONTROL TO THE NEXT MIDDLEWARE, AKA - CONTROLLER
      next()
    },
  ]
}

// VALIDATE COURSE INPUT FORM
export const validateCourseInput = withValidationErrors([
  body('enrollmentStatus')
    .isIn(Object.values(enrollmentStatus))
    .withMessage('Please provide valid status')
    .trim(),
])

// VALIDATE ID PARAMS
export const validateIdParams = withValidationErrors([
  param('id').custom(async (id, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id)

    // IS VALID ID IS TRUE, THEN THE ERROR IS THROWN
    if (!isValidId) throw new BadRequestError('Invalid MongoDB Id')

    const course = await Course.findById(id)
    // IF THE ID IS VALID BUT MONGO DB CANNOT FIND THAT DOCUMENT , EG - THE DOCUMENT MAY HAVE BEEN DELETED
    if (!course) {
      throw new NotFoundError(`No course with id ${id} found`)
    }

    // ONLY THE OWNER(LOGGED-IN-USER) CAN PERFORM THE UPDATES ON HIS DOCUMENTS/COURSES
    const isOwner = req.user.userId === req.body.createdBy
    if (!isOwner)
      throw new UnauthorizedError('Not authorized to access this route')
  }),
])

// VALIDATE REGISTER USER
export const validateRegisterUser = withValidationErrors([
  // CHECK FOR THE KEY'S YOU WANT TO VALIDATE
  body('name').notEmpty().withMessage('Please provide a name'),
  body('email')
    .notEmpty()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('Email already exists')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 8 }),
])

// VALIDATE LOGIN USER
export const validateLoginUser = withValidationErrors([
  // CHECK FOR THE KEY'S YOU WANT TO VALIDATE
  body('email')
    .notEmpty()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Please provide a password'),
])
