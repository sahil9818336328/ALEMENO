import { useState } from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { StyledWrapper } from '../assets/wrappers/LogoutContainer'
import { useDashboardContext } from '../pages/DashboardLayout'

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { user, logoutUser } = useDashboardContext()

  return (
    <StyledWrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user?.name || 'User'}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        {/* LOG THE USER OUT AND CLOSE THE DROPDOWN */}
        <button
          type='button'
          className='dropdown-btn'
          onClick={() => {
            logoutUser()
            setShowLogout(false)
          }}
        >
          logout
        </button>
      </div>
    </StyledWrapper>
  )
}
export default LogoutContainer
