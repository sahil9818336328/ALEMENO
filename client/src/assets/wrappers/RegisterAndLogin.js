import styled from 'styled-components'

export const StyledWrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-800);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`
