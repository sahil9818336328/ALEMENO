/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react'

import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { StyledWrapper } from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { useQuery } from '@tanstack/react-query'

// QUERY FOR GETTING CURRENT USER
const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/user/current-user')
    return data
  },
}

// LOADER'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH PRE-FETCHING DATA BEFORE THE ROUTE LOADS
// GET INFORMATION ABOUT THE CURRENT USER, TO DISPLAY INSIDE LOGOUT CONTAINER
// PRE-FETCHING DATA USING LOADER
export const loader = (queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(userQuery)
    return response
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext()

const DashboardLayout = () => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const {
    data: { user },
  } = useQuery(userQuery)
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  const [showSidebar, setShowSidebar] = useState(false)

  // OPEN AND CLOSE SIDEBAR
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  // LOG OUT USER
  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('Logging out...')
  }

  return (
    <DashboardContext.Provider
      value={{ user, showSidebar, toggleSidebar, logoutUser }}
    >
      <StyledWrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </StyledWrapper>
    </DashboardContext.Provider>
  )
}

// TO BASICALLY HAVE ACCESS TO THE DATA IN SMALL SIDEBAR , BIG SIDEBAR AND NAVBAR
export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
