import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import { FormRow, Logo } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { StyledWrapper } from '../assets/wrappers/RegisterAndLogin'

// ACTION'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH FORM SUBMISSION
export const action = async ({ request }) => {
  // ACCESSING AND STORING ALL INPUT FILED VALUES
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const response = await customFetch.post('/auth/login', data)
    toast.success(response.data.msg)
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  const navigation = useNavigation()

  // TO DISABLE LOGIN BUTTON IF THE REQUEST IS BEING PROCESSED
  const isSubmitting = navigation.state === 'submitting'
  return (
    <StyledWrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='text' name='email' />
        <FormRow type='password' name='password' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Not a member?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </StyledWrapper>
  )
}
export default Login
