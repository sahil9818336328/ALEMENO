import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddCourse,
  Stats,
  AllCourses,
  CourseDetailsPage,
} from './pages'

// // ACTION'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH FORM SUBMISSION
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as addCourseAction } from './pages/AddCourse'

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as allCourseLoader } from './pages/AllCourses'
import { loader as courseDetailsLoader } from './pages/CourseDetailsPage'
import { loader as statsLoader } from './pages/Stats'
import EnrolledCourses, {
  loader as enrolledCoursesLoader,
} from './pages/EnrolledCourses'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

// LATEST VERSION OF REACT ROUTER
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddCourse />,
            action: addCourseAction,
          },
          {
            path: 'all-courses',
            element: <AllCourses />,
            loader: allCourseLoader(queryClient),
          },
          {
            path: 'course-stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
          },
          {
            path: 'all-courses/:id',
            element: <CourseDetailsPage />,
            loader: courseDetailsLoader(queryClient),
          },
          {
            path: 'enrolled-courses',
            element: <EnrolledCourses />,
            loader: enrolledCoursesLoader(queryClient),
          },
        ],
      },
    ],
  },
])

// ENTRY POINT
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
