/* eslint-disable no-unused-vars */
import { FormRow, FormRowSelect } from '../components'
import { enrollmentStatus } from '../utils/constants'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { StyledWrapper } from '../assets/wrappers/DashboardFormPage'

// ACTION'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH FORM SUBMISSION
export const action = async ({ request }) => {
  // ACCESSING AND STORING ALL INPUT FILED VALUES
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  data.prerequisites = data.prerequisites.split(', ')

  try {
    await customFetch.post('/courses', data)
    toast.success('Course added successfully')
    return redirect('all-courses')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AddCourse = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    // THIS COMPONENT RE-USES FORM ROW COMPONENT
    <StyledWrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add course</h4>
        <div className='form-center'>
          <FormRow type='text' name='name' defaultValue='React' />
          <FormRow type='text' name='instructor' defaultValue='Sahil' />
          <FormRow
            type='text'
            name='description'
            defaultValue='React tutorial from scratch'
          />
          <FormRowSelect
            name='enrollmentStatus'
            labelText='enrollment status'
            list={Object.values(enrollmentStatus)}
            defaultValue={enrollmentStatus.OPEN}
          />
          <FormRow type='text' name='duration' defaultValue='6 weeks' />
          <FormRow
            type='text'
            name='schedule'
            defaultValue='Mondays and Wednesdays, 6:00 PM - 8:00 PM'
          />
          <FormRow type='text' name='thumbnail' />
          <FormRow
            type='text'
            name='dueDate'
            defaultValue='November 15, 2023'
          />
          <FormRow
            type='text'
            name='prerequisites'
            defaultValue='HTML, CSS, Javascript'
          />
          <FormRow type='text' name='location' defaultValue='online' />

          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </StyledWrapper>
  )
}
export default AddCourse
