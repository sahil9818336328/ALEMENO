/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { StyledWrapper } from '../assets/wrappers/CourseDetailsPage'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import Collapsible from 'react-collapsible'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const CourseDetails = ({
  // LITTLE DESTRUCTURING
  _id,
  createdAt,
  description,
  duration,
  enrollmentStatus,
  instructor,
  location,
  name,
  prerequisites,
  schedule,
  students,
  syllabus,
  thumbnail,
}) => {
  // CONVERTING DATE TO A SPECIFIC FORMAT
  const date = day(createdAt).format('MMM Do, YYYY')
  const navigate = useNavigate()

  // THIS FUNCTION HELPS IN ENROLLMENT OF THE COURSE
  const handleClick = async () => {
    try {
      const response = await customFetch.patch(`/courses/${_id}`, {
        enrollmentStatus: 'In Progress',
      })
      toast.success(response.data.msg)

      if (response.data.msg) {
        // ONCE RESPONSE COMES BACK NAVIGATE THE USER TO ENROLLED COURSES
        setTimeout(() => {
          navigate('/dashboard/enrolled-courses')
        }, 1500)
      }
      return
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

  return (
    // THIS IS THE DETAILED VIEW PAGE OF THE COURSE
    <StyledWrapper>
      <div className='course-header'>
        <img src={thumbnail} alt={description} className='details-img' />
        <div className='course-info'>
          <p className='course-name'>{name}</p>
          <p className='created-at'> {date}</p>
        </div>
      </div>
      <div className='course-main'>
        <p className='course-description'>{description}</p>
        <div className='course-instructor'>
          <FaUserCircle className='instructor-avatar' />{' '}
          <span className='instructor-key'>Instructor</span> :{' '}
          <span className='instructor-key-value'>{instructor}</span>
        </div>

        <button
          className={`enroll-btn ${
            enrollmentStatus === 'In Progress' && 'disabled'
          }`}
          onClick={handleClick}
          disabled={enrollmentStatus === 'In Progress'}
        >
          {enrollmentStatus === 'In Progress' ? (
            <p>Course enrolled</p>
          ) : (
            <p>Enroll for free</p>
          )}
          <p className='enroll-date'>starts Dec 10</p>
        </button>

        <p className='course-info'>
          <span className='course-key'>Enrollment status </span> :
          <span className='course-key-value'>{enrollmentStatus}</span>
        </p>
        <p className='course-info'>
          <span className='course-key'>Duration </span> :
          <span className='course-key-value'>{duration}</span>
        </p>
        <p className='course-info'>
          <span className='course-key'>Location </span> :
          <span className='course-key-value'>{location}</span>
        </p>
        <p className='course-info'>
          <span className='course-key'>Schedule </span> :
          <span className='course-key-value'>{schedule}</span>
        </p>
        <p className='course-info '>
          <span className='course-key'>Prerequisites </span> :
          {prerequisites.map((item) => {
            return (
              <span className='course-key-value' key={item}>
                {item}
              </span>
            )
          })}
        </p>
        <p className='course-info'>
          <span className='course-key'>Students enrolled </span> :
          {students.map((student) => {
            const { _id, name } = student
            return (
              <span className='course-key-value' key={_id}>
                {name}
              </span>
            )
          })}
        </p>
      </div>
      <div className='course-footer'>
        <p className='footer-label'>Syllabus</p>
        {syllabus.map((item) => {
          const { _id, content, topic, week } = item
          return (
            <Collapsible trigger={`Week ${week} `} key={_id}>
              <div className='syllabus'>
                <p className='course-info'>
                  <span className='course-key'>Topic </span> :
                  <span className='course-value'>{topic} </span>
                </p>
                <p className='course-info'>
                  <span className='course-key'>Content </span> :
                  <span className='course-value'>{content} </span>
                </p>
              </div>
            </Collapsible>
          )
        })}
      </div>
    </StyledWrapper>
  )
}
export default CourseDetails
