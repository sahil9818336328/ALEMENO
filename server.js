import 'express-async-errors' // THIS MIDDLEWARE CATCHES AND PASSES ERROR TO OUR ERROR MIDDLEWARE AVOIDING TRY/CATCH BLOCKS.
import * as dotenv from 'dotenv'
dotenv.config() // TO HAVE ACCESS TO ENV VARIABLES
import express from 'express'
const app = express() // SEVER INSTANCE
import mongoose from 'mongoose'
import morgan from 'morgan' // LOGGING MIDDLEWARE, TO SEE INFORMATION ABOUT OUR REQUEST
import cookieParser from 'cookie-parser'
import path, { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ROUTES
import coursesRouter from './routes/courses.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'

// MIDDLEWARES
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import { authenticateUser } from './middlewares/authMiddleware.js'
import { fileURLToPath } from 'url'

// ONLY RUN MORGAN IN DEVELOPMENT AND NOT IN PRODUCTION
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './public')))
// MIDDLEWARE TO GET ACCESS TO THE DATA INSIDE REQ.BODY
app.use(express.json())
// MIDDLEWARE TO ACCESS COOKIE DATA
app.use(cookieParser())

// ROUTER MIDDLEWARE
app.use('/api/v1/courses', authenticateUser, coursesRouter) // CHECK FOR THE TOKEN IN COOKIE THEN ONLY SHOW COURSES ROUTES
app.use('/api/v1/user', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

// INVALID ROUTE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found...' })
})

// ERROR'S CAUGHT WHILE PROCESSING A REQUEST, AKA - ERROR MIDDLEWARE
app.use(errorHandlerMiddleware)

// SERVER'S PORT
const port = process.env.PORT || 5100

// FIRST START THE DATABASE AND THEN THE SERVER
try {
  await mongoose.connect(process.env.MONGO_URI)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
