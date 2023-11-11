import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'
import { comparePassword, hashPassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

// REGISTER USER
export const register = async (req, res) => {
  // HASH THE PASSWORD BEFORE SAVING INTO THE DATABASE
  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword

  const user = await User.create(req.body)

  res
    .status(StatusCodes.CREATED)
    .json({ user, msg: 'Registration successfully' })
}

// LOGIN USER
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  // IF IS VALID USER IS TRUE, THAT MEANS THE CREDENTIALS ARE CORRECT
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password))
  if (!isValidUser) throw new UnauthenticatedError('Invalid credentials')
  // IF CREDENTIALS ARE CORRECT, CREATE JSON WEB TOKEN
  const token = createJWT({ userId: user._id })

  // ON SUCCESSFUL LOGIN, CREATE A COOKIE WITH KEY AND VALUE AS TOKEN
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  })

  res.status(StatusCodes.CREATED).json({ msg: 'User logged in' })
}

// LOGOUT USER
export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'User logged out!' })
}
