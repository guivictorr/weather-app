import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
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
      height: 100%;
      position: relative;

      div {
        img + img {
          position: absolute;
          width: 650px;
          height: 376px;
          left: -160px;
          top: 0;
          opacity: 0.1;
        }
      }

      p {
        font-size: 144px;
        font-style: normal;
        font-weight: 500;
        margin-bottom: 90px;

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
      }
    }

    footer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 200px;

      p {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 18px;
        color: #88869d;
        line-height: 40px;
      }
    }
  }

  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      height: 90%;
      width: 700px;

      header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

        button {
          background: #e7e7eb;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          font-size: 18px;
          color: #110e3c;

          & + button {
            margin-left: 12px;
          }
        }
      }

      section {
        display: flex;
        justify-content: space-between;
        width: 100%;

        div {
          height: 180px;
          max-width: 120px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          background: #1e213a;
          padding: 20px;

          p {
            font-weight: 500;
            font-size: 16px;
            color: #e7e7eb;
          }

          img {
            width: 56px;
            height: 62px;
          }

          footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            p + p {
              color: #a09fb1;
            }
          }
        }
      }

      h2 {
        align-self: flex-start;
        margin-top: 40px;
        font-size: 24px;
      }

      .highlights {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;

        .highlight {
          max-width: 100%;
          max-height: 204px;
          background: #1e213a;
        }
      }

      .devchallenges-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        color: #616475;
      }
    }
  }
`;
