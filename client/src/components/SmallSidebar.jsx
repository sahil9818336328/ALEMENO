import { FaTimes } from 'react-icons/fa'
import { StyledWrapper } from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()

  // BASIC JSX
  return (
    <StyledWrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </StyledWrapper>
  )
}
export default SmallSidebar
