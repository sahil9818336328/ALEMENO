import styled from 'styled-components'

export const StyledWrapper = styled.section`
  margin-top: 4rem;

  .no-courses {
    display: flex;
    align-items: center;
    gap: 2rem;

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }

    .btn {
      padding: 0.8rem 1.2rem;
      font-size: 1.2rem;

      @media screen and (max-width: 600px) {
        padding: 0.6rem 1rem;
        font-size: 1rem;
      }
    }
  }

  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .courses {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;

    @media screen and (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }
`
