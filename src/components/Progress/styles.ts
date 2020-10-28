import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 230px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    font-weight: bold;
    font-size: 12px;
    color: #a09fb1;
  }

  main {
    background: #e7e7eb;
    border-radius: 80px;
    width: 100%;

    div {
      background: #ffec65;
      width: 50%;
      border-radius: 80px;
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }
`;
