import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div>
      {/* TO RENDER CHILDREN ROUTES */}
      <Outlet />
    </div>
  )
}
export default HomeLayout
