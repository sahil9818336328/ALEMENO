import { useAllCoursesContext } from '../pages/AllCourses'
import { StyledWrapper } from '../assets/wrappers/CoursesContainer'
import Course from './Course'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

const CoursesContainer = () => {
  const { data } = useAllCoursesContext()
  const { courses } = data

  // POPULATE COURSES
  const populateCourses = async () => {
    try {
      await customFetch.post('/courses/populate')
      toast.success('Course added successfully')
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      return
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

  // IF THERE ARE NO COURSES TO DISPLAY
  if (courses.length === 0) {
    return (
      <StyledWrapper>
        <div className='no-courses'>
          <h2>No courses to display...</h2>
          <button className='btn' onClick={populateCourses}>
            Populate courses
          </button>
        </div>
      </StyledWrapper>
    )
  }

  return (
    <StyledWrapper>
      <div className='courses'>
        {courses.map((course) => {
          return <Course key={course._id} {...course} isLink showDueDate />
        })}
      </div>
    </StyledWrapper>
  )
}

export default CoursesContainer
