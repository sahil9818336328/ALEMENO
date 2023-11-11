// eslint-disable-next-line react/prop-types
const FormRow = ({ type, name, defaultValue, onChange }) => {
  // RE-USABLE COMPONENT
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required
      />
    </div>
  )
}
export default FormRow
