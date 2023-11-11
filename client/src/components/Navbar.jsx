import { StyledWrapper } from '../assets/wrappers/Navbar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo'
import LogoutContainer from './LogoutContainer'

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext()
  // BASIC JSX
  return (
    <StyledWrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>
          <LogoutContainer />
        </div>
      </div>
    </StyledWrapper>
  )
}
export default Navbar
