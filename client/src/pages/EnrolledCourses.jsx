import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { Course } from '../components'
import { StyledWrapper } from '../assets/wrappers/EnrolledCourses'
import { useQuery } from '@tanstack/react-query'

//QUERY FOR GETTING ENROLLED COURSES
const enrolledCoursesQuery = {
  queryKey: ['enrolledCourses'],
  queryFn: async () => {
    const { data } = await customFetch(`/user/enrolled-courses`)

    return data
  },
}

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
// GET INFORMATION ABOUT THE CURRENT USER, TO DISPLAY INSIDE LOGOUT CONTAINER
// PRE-FETCHING DATA USING LOADER
export const loader = (queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(enrolledCoursesQuery)
    return response
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const EnrolledCourses = () => {
  // DATA RETURNED FROM THE LOADER USING REACT-QUERY

  const {
    data: { userCourses, count },
  } = useQuery(enrolledCoursesQuery)

  return (
    <StyledWrapper>
      <h3 className='enrolled-course-title'>
        total number of enrolled courses{' '}
        <span className='course-count'>{count}</span>{' '}
      </h3>
      {userCourses.map((course) => {
        return (
          <StyledWrapper key={course._id}>
            {/* CODE - REUSABILITY */}
            <Course
              {...course}
              showStatus
              markCourse
              showProgress
              showDueDate
            />
          </StyledWrapper>
        )
      })}
    </StyledWrapper>
  )
}
export default EnrolledCourses
