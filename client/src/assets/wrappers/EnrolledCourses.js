import styled from 'styled-components'

export const StyledWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;

  .enrolled-course-title {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;

    .course-count {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: var(--primary-500);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      color: var(--white);
    }
  }
`
