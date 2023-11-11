/* eslint-disable react/prop-types */
import { useDashboardContext } from '../pages/DashboardLayout'
import { NavLink } from 'react-router-dom'
import { links } from '../utils/links'

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar } = useDashboardContext()
  // LINKS DATA COMING FROM CONSTANTS FOR CODE REUSABILITY
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon: Icon } = link

        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            className='nav-link'
            end
          >
            <span className='icon'>{<Icon />}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
