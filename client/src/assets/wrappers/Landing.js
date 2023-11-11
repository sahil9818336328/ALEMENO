import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin: 1rem 0;

  .hero {
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .landing-img {
      width: 50%;
    }

    .description {
      line-height: 1.2;
      font-weight: 500;
      letter-spacing: var(--letter-spacing);
      font-size: 1.2rem;
      margin: 3rem 0;
      color: var(--primary-600);
      text-align: center;
    }

    .btn-container {
      display: flex;
      align-items: center;
      gap: 1rem;

      .authenticate-btn {
        width: 150px;
        text-align: center;
        font-size: 1.2rem;
        padding: 0.8rem 2rem;
      }
    }
  }
`
