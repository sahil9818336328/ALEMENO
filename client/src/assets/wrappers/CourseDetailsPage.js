import styled from 'styled-components'

export const StyledWrapper = styled.div`
  letter-spacing: var(--letter-spacing);
  .course-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    .details-img {
      width: 100px;
      height: 100px;
      border-radius: var(--border-radius);
      object-fit: cover;
    }

    .course-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;

      .course-name {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 1.3rem;
      }
    }
  }

  .course-main {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .course-description {
      font-size: 2.5rem;
      text-transform: capitalize;
      line-height: 1.2;
      color: var(--grey-600);

      @media screen and (max-width: 800px) {
        font-size: 1.5rem;
      }
    }

    .course-instructor {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.3rem;

      .instructor-avatar {
        font-size: 2rem;

        @media screen and (max-width: 450px) {
          display: none;
        }
      }

      .instructor-key {
        background-color: var(--primary-100);
        padding: 0.3rem 1rem;
        border-radius: var(--border-radius);
      }

      .instructor-key-value {
        background-color: var(--grey-300);
        padding: 0.3rem 1rem;
        border-radius: var(--border-radius);
      }
    }

    .enroll-btn {
      width: fit-content;
      padding: 1rem 2rem;
      border: none;
      box-shadow: var(--shadow-2);
      background-color: var(--primary-700);
      cursor: pointer;
      border-radius: var(--border-radius);
      font-size: 1.2rem;
      color: var(--white);

      .enroll-date {
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .disabled {
      cursor: not-allowed;
      background-color: var(--grey-300);
    }

    .enroll-options {
      background-color: var(--primary-100);
      border-radius: var(--border-radius);
      width: fit-content;
      padding: 1rem;
      display: flex;
      gap: 1rem;
      .option {
        width: 150px;
      }
    }

    .course-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.2rem;

      .course-key {
        color: var(--white);
        background-color: var(--primary-400);
        padding: 0.3rem 1rem;
        border-radius: var(--border-radius);
      }

      .course-key-value {
        color: var(--white);
        background-color: var(--grey-500);
        padding: 0.3rem 1rem;
        border-radius: var(--border-radius);
        line-height: 1.3;

        @media screen and (max-width: 850px) {
          background-color: transparent;
          color: var(--grey-500);
        }
      }
    }
  }

  .course-footer {
    margin-top: 2rem;

    .Collapsible {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .collapsible-trigger {
        display: flex;
        justify-content: space-between;
      }

      .Collapsible__trigger {
        background-color: var(--primary-100);
        padding: 1rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        color: var(--white);
      }
    }

    .footer-label {
      font-size: 1.5rem;
      text-transform: uppercase;
    }

    .syllabus {
      margin-top: 1rem;
      border-top: 1px solid var(--primary-400);
      padding-top: 1rem;

      .course-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;

        .course-key {
          color: var(--white);
          background-color: var(--primary-400);
          padding: 0.3rem 1rem;
          border-radius: var(--border-radius);
        }

        .course-key-value {
          color: var(--white);
          background-color: var(--grey-500);
          padding: 0.3rem 1rem;
          border-radius: var(--border-radius);
        }
      }
    }
  }
`
