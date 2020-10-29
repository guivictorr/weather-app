import styled from 'styled-components';

interface HeaderButtonProps {
  isCelsius: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const CardList = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Highlights = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 45px;
  width: 100%;

  article {
    width: 328px;
    height: 204px;
    background: #1e213a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 30px 0;

    p {
      font-weight: 500;
      font-size: 16px;
      color: #e7e7eb;

      & + p {
        font-weight: bold;
        font-size: 64px;
        color: #e7e7eb;

        span {
          font-weight: normal;
          font-size: 36px;
          margin-left: 10px;
        }
      }
    }

    footer {
      display: flex;
      align-items: center;
    }

    &:nth-child(3),
    &:nth-child(4) {
      height: 160px;
    }
  }
`;

export const Wrapper = styled.div<HeaderButtonProps>`
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

    header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;

      button {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        font-size: 18px;
        background: ${({ isCelsius }) => (isCelsius ? '#E7E7EB' : '#585676')};
        color: ${({ isCelsius }) => (isCelsius ? '#110E3C' : '#E7E7EB')};
        outline: transparent;

        & + button {
          margin-left: 12px;
          background: ${({ isCelsius }) => (isCelsius ? '#585676' : '#E7E7EB')};
          color: ${({ isCelsius }) => (isCelsius ? '#E7E7EB' : '#110E3C')};
        }
      }
    }

    h2 {
      align-self: flex-start;
      margin-top: 40px;
      font-size: 24px;
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
`;
