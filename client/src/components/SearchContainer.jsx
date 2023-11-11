import { Form, useSubmit } from 'react-router-dom'
import { StyledWrapper } from '../assets/wrappers/DashboardFormPage'
import FormRow from './FormRow'
import { useAllCoursesContext } from '../pages/AllCourses'

const SearchContainer = () => {
  const data = useAllCoursesContext()

  // REACT ROUTER LATEST VERSION, HELPS IN HANDLING FORM SUBMISSION
  const submit = useSubmit()

  // STARTING ONLY AFTER THE LAST USER KEY STROKE AND AFTER 1.5 SECONDS,
  // IMPLEMENTED DEBOUNCE TO AVOID REPETITIVE API CALL'S ON EACH KEY STROKE
  const debounce = (onChange) => {
    let timeout
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 1500)
    }
  }

  return (
    <StyledWrapper>
      <Form className='form'>
        <h5 className='form-title'>Search form</h5>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            defaultValue={data.searchValues.search}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
        </div>
      </Form>
    </StyledWrapper>
  )
}
export default SearchContainer
