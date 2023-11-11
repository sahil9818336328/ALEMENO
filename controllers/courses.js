import Course from '../models/Course.js'
import User from '../models/User.js'
import { readFile } from 'fs/promises'
import { StatusCodes } from 'http-status-codes'

// GET ALL COURSES
const getAllCourses = async (req, res) => {
  const { search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: 'i' } },
      { instructor: { $regex: search, $options: 'i' } },
    ]
  }

  const courses = await Course.find(queryObject)

  res.status(StatusCodes.OK).json({ courses, totalCourses: courses.length })
}

// POPULATE COURSES
const populateCourses = async (req, res) => {
  // POPULATE DB WITH MOCK DATA
  const jsonCourses = JSON.parse(
    await readFile(new URL('../utils/MOCK_DATA.json', import.meta.url))
  )
  const courses = jsonCourses.map((course) => {
    return { ...course, createdBy: req.user.userId }
  })
  await Course.create(courses)

  res.status(StatusCodes.CREATED).json({ msg: 'Courses populated' })
}

// CREATE A COURSE
const createCourse = async (req, res) => {
  req.body.createdBy = req.user.userId
  const course = await Course.create(req.body)

  res.status(StatusCodes.CREATED).json({ course })
}

// GET SINGLE COURSE
const getCourse = async (req, res) => {
  try {
    const { id } = req.params

    const course = await Course.findById(id)

    // FOR GETTING ALL THE USERS ENROLLED IN A SPECIFIC COURSE
    const getEnrolledCourses = await Course.find({
      enrollmentStatus: 'In Progress',
      name: course.name,
    })

    const studentsPromises = getEnrolledCourses.map(async (item) => {
      const userId = item.createdBy
      const user = await User.findOne({ _id: userId })
      return { _id: userId, email: user.email, name: user.name }
    })

    const students = await Promise.all(studentsPromises)

    course.students = students
    res.status(StatusCodes.OK).json({ course })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Cannot find user details' })
  }
}

// UPDATE COURSE LIKES
const updateCourseLikes = async (req, res) => {
  const { id } = req.params

  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json({
    likes: updatedCourse.likes,
    msg: 'Thank you for liking the course',
  })
}

// UPDATE A COURSE
const updateTask = async (req, res) => {
  const { id } = req.params
  let message
  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (req.body.progress === 100) {
    message = 'Course marked as completed and course progress updated'
  } else {
    message = 'Course enrolled successfully'
  }

  res.status(StatusCodes.OK).json({
    msg: message,
    updatedCourse,
  })
}

// DELETE A COURSE
const deleteCourse = async (req, res) => {
  const { id } = req.params
  const courseRemoved = await Course.findByIdAndDelete(id)

  res
    .status(StatusCodes.OK)
    .json({ msg: `${courseRemoved.name} course deleted` })
}

export {
  getAllCourses,
  createCourse,
  getCourse,
  updateTask,
  deleteCourse,
  updateCourseLikes,
  populateCourses,
}
