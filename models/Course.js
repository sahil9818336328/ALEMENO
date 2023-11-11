import mongoose from 'mongoose'
import { enrollmentStatus } from '../utils/constants.js'

const CourseSchema = new mongoose.Schema(
  {
    name: String,
    instructor: String,
    description: String,
    likes: {
      type: Number,
      default: 10,
    },
    progress: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: String,
      default: 'November 15, 2023',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    enrollmentStatus: {
      type: String,
      enum: Object.values(enrollmentStatus),
      default: enrollmentStatus.OPEN,
    },
    thumbnail: {
      type: String,
      default: 'some image url',
    },
    duration: String,
    schedule: String,
    location: String,
    prerequisites: {
      type: [String],
      default: ['Knowledge of any programming language'],
    },
    syllabus: {
      type: [
        {
          week: Number,
          topic: String,
          content: String,
        },
      ],
      default: [
        {
          week: 1,
          topic: 'Basic Syntax and Variables',
          content: 'Understanding syntax and working with variables.',
        },
        {
          week: 2,
          topic: 'Control Flow and Functions',
          content: 'Learn about loops, conditionals, and defining functions.',
        },
      ],
    },
    students: {
      type: [
        {
          name: String,
          email: String,
        },
      ],
      default: [
        {
          name: 'Sophia Wilson',
          email: 'sophia@example.com',
        },
        {
          name: 'Jackson Davis',
          email: 'jackson@example.com',
        },
      ],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },

  { timestamps: true }
)

export default mongoose.model('Course', CourseSchema)
