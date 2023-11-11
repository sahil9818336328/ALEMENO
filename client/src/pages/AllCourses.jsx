/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify'
import { CoursesContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'

// QUERY FOR GETTING ALL COURSES WITH SEARCH
const allCourseQuery = (params) => {
  const { search } = params
  return {
    queryKey: ['courses', search ?? ''],
    queryFn: async () => {
      const { data } = await customFetch.get('/courses', {
        params,
      })
      return data
    },
  }
}

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    await queryClient.ensureQueryData(allCourseQuery(params))
    return { searchValues: { ...params } }
  }

const allCoursesContext = createContext()

const AllCourses = () => {
  // DATA RETURNED FROM THE LOADER CAN BE ACCESSED WITH USE LOADER DATA HOOK
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allCourseQuery(searchValues))

  return (
    <allCoursesContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <CoursesContainer />
    </allCoursesContext.Provider>
  )
}

// TO BASICALLY HAVE ACCESS TO THE DATA IN SEARCH AND COURSES CONTAINER
export const useAllCoursesContext = () => useContext(allCoursesContext)

export default AllCourses
