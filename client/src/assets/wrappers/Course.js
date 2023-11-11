import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-bottom: 5rem;
  box-shadow: var(--shadow-3);
  position: relative;

  .details-btn {
    margin: 1rem;
  }

  .completion-message {
    background-color: var(--grey-900);
    color: var(--white);
    padding: 1rem;
    display: flex;
    align-items: center;
    letter-spacing: 2px;
    height: 60px;
  }

  .status,
  .due-date,
  .course-completed {
    position: absolute;
    top: 0;
    background-color: var(--grey-900);
    color: var(--white);
    padding: 1rem;
    letter-spacing: 2px;
    box-shadow: var(--shadow-3);
  }

  .progress {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: red;
  }

  .course-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: var(--border-radius);
    border-bottom-left-radius: 0;
    display: block;
    border-bottom-right-radius: 0;
  }

  .course-details {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    background-color: var(--grey-200);
    padding: 1rem;
    letter-spacing: var(--letter-spacing);
    position: relative;

    .course-like {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-left: 0.5rem;
      .like-icon {
        width: 22px;
        height: 22px;
        cursor: pointer;
      }

      .likes {
        margin-top: 5px;
        font-size: 1.4rem;
      }
    }

    .course-key {
      background-color: var(--primary-100);
      padding: 0 1rem;
      border-radius: var(--border-radius);
    }

    .course-key-value {
      line-height: 2;
    }
  }
`
