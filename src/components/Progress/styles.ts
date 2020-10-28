import styled, { css } from 'styled-components';

interface ProgressProps {
  percentage: number;
}

export const ProgressContainer = styled.div<ProgressProps>`
  display: flex;
  flex-direction: column;
  min-width: 230px;

  header {
    display: flex;
    justify-content: space-between !important;
    align-items: center;
  }

  span {
    font-weight: bold;
    font-size: 12px;
    color: #a09fb1;
  }

  main {
    background: #e7e7eb;
    border-radius: 80px;
    width: 100%;
    height: 8px;
    position: relative;
    margin: 5px 0;

    div {
      background: #ffec65;
      ${({ percentage }) =>
        percentage &&
        css`
          width: ${percentage}%;
        `};
      border-radius: 80px;
      position: absolute;
      height: 8px;
      top: 0;
      left: 0;
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }
`;
