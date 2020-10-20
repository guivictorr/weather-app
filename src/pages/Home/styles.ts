import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  aside {
    background: #1e213a;
    max-width: 460px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      button {
        width: 161px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #6e707a;
        color: #e7e7eb;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        outline: transparent;
        border: none;
        font: 500 16px Raleway;
        cursor: pointer;
        margin: 42px 46px;

        & + button {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
      }
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      flex: 1;
      position: relative;

      div {
        img {
          width: 202px;
          height: 234px;

          &:first-child {
            margin-top: 85px;
          }
        }

        img + img {
          position: absolute;
          width: 650px;
          height: 376px;
          left: -85px;
          top: 0;
          opacity: 0.1;
        }
      }

      p {
        font-size: 144px;
        font-style: normal;
        font-weight: 500;

        span {
          font-size: 56px;
          color: #a09fb1;
        }
      }

      h1 {
        font-weight: 600;
        font-size: 36px;
        line-height: 42px;
        text-align: center;

        color: #a09fb1;
        margin-bottom: 50px;
      }
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      height: 120px;
      padding: 25px 0;

      p {
        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: 500;
        font-size: 18px;
        color: #88869d;
      }
    }
  }
`;
