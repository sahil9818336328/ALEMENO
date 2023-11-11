import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .stat-key,
  .stat-key-value {
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing);

    @media screen and (max-width: 700px) {
      font-size: 1rem;
    }
  }

  .stat-key-value {
    display: inline-block;
    margin-left: 1rem;
    text-align: center;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    color: var(--white);
    background-color: var(--primary-500);
    width: 50px;
    font-size: 1.5rem;

    @media screen and (max-width: 700px) {
      font-size: 1rem;
      width: 30px;
    }
  }
`
