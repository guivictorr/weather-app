import styled from 'styled-components';

interface SearchModalProps {
  error: boolean;
}

export const SearchModalContainer = styled.aside<SearchModalProps>`
  background: #1e213a;
  width: 460px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  header {
    display: flex;
    align-items: center;
    flex-direction: column;

    button {
      background: transparent;
      border: none;
      color: white;
      align-self: flex-end;
      margin-top: 20px;
      cursor: pointer;
      outline: transparent;
    }

    div {
      display: flex;
      margin-top: 20px;

      .input-container {
        width: 268px;
        height: 48px;
        border: 1px solid ${({ error }) => (error ? 'red' : '#e7e7eb')};
        margin-right: 10px;
        align-items: center;
        display: flex;

        svg {
          flex: 1;
        }

        input {
          background: transparent;
          border: none;
          outline: none;
          color: #e7e7eb;
          width: 80%;

          &::placeholder {
            font-weight: 500;
            font-size: 16px;
            color: #616475;
          }
        }
      }

      button {
        width: 86px;
        height: 48px;
        background: #3c47e9;
        font-weight: 600;
        font-size: 16px;
        color: #e7e7eb;
        border: none;
        cursor: pointer;
      }
    }
  }

  ul {
    margin-top: 56px;

    li {
      width: 367px;
      height: 64px;
      border: none;
      display: flex;
      align-items: center;
      padding: 23px 12px;

      &:hover {
        border: 1px solid #616475;
      }

      & + li {
        margin: 10px 0;
      }

      button {
        background: transparent;
        font-size: 16px;
        color: #e7e7eb;
        border: none;
        width: 100%;
        padding: 23px 26px;
        justify-content: flex-start;
        display: flex;
        align-items: center;
        height: 100%;
        cursor: pointer;
        outline: transparent;
      }
    }
  }
`;
