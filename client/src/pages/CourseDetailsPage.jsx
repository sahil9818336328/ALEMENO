import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import CourseDetails from '../components/CourseDetails'
import { useQuery } from '@tanstack/react-query'

//QUERY FOR GETTING ENROLLED COURSES
const singleCourseQuery = (id) => {
  return {
    queryKey: ['singleCourse', id],
    queryFn: async () => {
      const { data } = await customFetch(`/courses/${id}`)

      return data
    },
  }
}

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
// GET'S SINGLE COURSE DETAILS
export const loader =
  (queryClient) =>
  async ({ params: { id } }) => {
    try {
      await queryClient.ensureQueryData(singleCourseQuery(id))
      return id
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const CourseDetailsPage = () => {
  const id = useLoaderData()
  const {
    data: { course },
  } = useQuery(singleCourseQuery(id))

  return <CourseDetails {...course} />
}
export default CourseDetailsPage
