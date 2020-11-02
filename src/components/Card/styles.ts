import styled from 'styled-components';

export const CardContainer = styled.div`
  height: 180px;
  width: 130px;
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
    object-fit: contain;
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
`;
