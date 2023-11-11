import { Form, redirect, useNavigation, Link } from 'react-router-dom'
import { FormRow, Logo } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { StyledWrapper } from '../assets/wrappers/RegisterAndLogin'

// ACTION'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH FORM SUBMISSION
export const action = async ({ request }) => {
  // ACCESSING AND STORING ALL INPUT FILED VALUES
  const formData = await request.formData()
  // CONVERT ARRAY OF ARRAYS IN TO OBJECT
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post('/auth/register', data)
    toast.success(response.data.msg)
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <StyledWrapper>
      {/* CODE - REUSABILITY */}
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='email' />
        <FormRow type='password' name='password' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </StyledWrapper>
  )
}
export default Register
