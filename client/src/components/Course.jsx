/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { StyledWrapper } from '../assets/wrappers/Course'
import { Link } from 'react-router-dom'
import likeImg from '../assets/images/like.png'
import { CircularProgressbar } from 'react-circular-progressbar'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const Course = ({
  // LITTLE DESTRUCTURING
  _id,
  createdAt,
  description,
  duration,
  enrollmentStatus,
  instructor,
  name,
  thumbnail,
  isLink,
  showStatus,
  showProgress,
  progress,
  dueDate,
  showDueDate,
  completed,
  likes,
}) => {
  // CREATED LOCAL STATES FOR SMOOTH UI TRANSITION, TO AVOID PAGE RELOAD FOR SEEING CHANGES
  const [courseLikes, setCourseLikes] = useState(likes)
  const [courseCompleted, setCourseCompleted] = useState(completed)
  const [courseProgress, setProgress] = useState(progress)

  // CONVERTING DATE TO A SPECIFIC FORMAT
  const date = day(createdAt).format('MMM Do, YYYY')

  // THIS FUNCTION MARKS THE COURSE IN-PROGRESS AS COMPLETED
  const markAsCompleted = async () => {
    try {
      const response = await customFetch.patch(`/courses/${_id}`, {
        completed: true,
        progress: 100,
      })
      setCourseCompleted(response.data.updatedCourse.completed)
      setProgress(response.data.updatedCourse.progress)
      toast.success(response.data.msg)
      return
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

  // THIS FUNCTION INCREMENTS LIKES
  const handleLikeClick = async () => {
    try {
      const response = await customFetch.patch(`/courses/like-course/${_id}`, {
        likes: courseLikes + 1,
      })
      setCourseLikes(response.data.likes)
      toast.success(response.data.msg)
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

  return (
    // THIS COMPONENT USES CONDITIONAL RENDERING AS I'M RE-USING THE COMPONENT IN DIFFERENT ROUTES AND WANT TO ENABLE/DISABLE CERTAIN FEATURES ON CERTAIN ROUTES
    <StyledWrapper>
      <img src={thumbnail} alt={description} className='course-img' />
      {!courseCompleted && enrollmentStatus !== 'In Progress' && (
        <span className='due-date'> Due on {dueDate}</span>
      )}
      {!courseCompleted && enrollmentStatus === 'In Progress' && (
        <span className='status'>{enrollmentStatus}</span>
      )}

      {courseCompleted && (
        <span className='course-completed'>Course completed</span>
      )}

      {showProgress && (
        <div className='progress'>
          <CircularProgressbar
            value={courseProgress}
            text={`${courseProgress}%`}
          />
        </div>
      )}
      <div className='course-details'>
        <p>
          <span className='course-key'>Course name</span> :-&nbsp;
          <span className='course-key-value'> {name}</span>
        </p>
        <p>
          <span className='course-key'>Course instructor</span> :-&nbsp;
          <span className='course-key-value'> {instructor}</span>
        </p>
        <p>
          <span className='course-key'>Course description</span> :-&nbsp;
          <span className='course-key-value'> {description}</span>
        </p>
        <p>
          <span className='course-key'>Course duration</span> :-&nbsp;
          <span className='course-key-value'> {duration}</span>
        </p>
        <p>
          <span className='course-key'>Created at</span> :-&nbsp;
          <span className='course-key-value'> {date}</span>
        </p>

        <div className='course-like'>
          <img
            src={likeImg}
            alt='like-icon'
            className='like-icon'
            onClick={handleLikeClick}
          />
          <span className='likes'>{courseLikes}</span>
        </div>
        {showStatus && !courseCompleted && (
          <div className='enrollment-status'>
            <button
              className='btn enroll'
              type='button'
              onClick={markAsCompleted}
            >
              Mark course as completed
            </button>
          </div>
        )}
      </div>

      {courseCompleted && (
        <p className='completion-message'>THANK FOR YOUR PURCHASE.</p>
      )}
      {isLink && !courseCompleted && (
        <Link to={`${_id}`} className='btn details-btn '>
          View details
        </Link>
      )}
    </StyledWrapper>
  )
}
export default Course
