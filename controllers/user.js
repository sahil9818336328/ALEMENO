import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'
import Course from '../models/Course.js'

// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.removePassword()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

// GET COURSE STATS
export const getStats = async (req, res) => {
  const userCourses = await Course.find({
    createdBy: req.user.userId,
    enrollmentStatus: 'In Progress',
  })
  const totalUsers = await User.countDocuments()
  const totalCourses = await Course.countDocuments()
  res
    .status(StatusCodes.OK)
    .json({ userCourses: userCourses.length, totalUsers, totalCourses })
}

// GET ENROLLED COURSES
export const getUserEnrolledCourses = async (req, res) => {
  const userCourses = await Course.find({
    createdBy: req.user.userId,
    enrollmentStatus: 'In Progress',
  })
  res.status(StatusCodes.OK).json({ userCourses, count: userCourses.length })
}
