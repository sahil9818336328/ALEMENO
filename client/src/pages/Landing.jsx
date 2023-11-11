import { StyledWrapper } from '../assets/wrappers/Landing'
import { Logo } from '../components'
import landingImg from '../assets/images/landing.svg'
import { Link } from 'react-router-dom'

const Landing = () => {
  // THIS PAGE IS THE INITIAL VIEW WHEN THE APP LOADS
  return (
    <StyledWrapper>
      <div className='container'>
        <Logo />
        <section className='hero'>
          <img src={landingImg} alt='landing-image' className='landing-img' />
          <p className='text description'>
            Unlock coding mastery at Alemeno CodeHub. From novice to ninja,
            we&apos;ve got you covered.
          </p>
          <div className='btn-container'>
            <Link to='/register' className='btn authenticate-btn'>
              Register
            </Link>
            <Link to='/login' className='btn authenticate-btn'>
              Login
            </Link>
          </div>
        </section>
      </div>
    </StyledWrapper>
  )
}
export default Landing
