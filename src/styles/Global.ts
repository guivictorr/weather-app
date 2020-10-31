import { createGlobalStyle } from 'styled-components';
import { Container, Wrapper, CardList, Highlights } from '../pages/Home/styles';
import { SideBarContainer } from '../components/SideBar/styles';
import { SearchModalContainer } from '../components/SearchModal/styles';
import { CardContainer } from '../components/Card/styles';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #100E1D;
    color: #E7E7EB;
    font: 600 18px Raleway, sans-serif;
  }

  @media (max-width: 1190px) {
    div${Container} {
      flex-direction: column;

      .devchallenges-footer {
        height: 100px;
      }
    }

    aside${SideBarContainer} {
      overflow: inherit;
      width: 100%;
      height: 100vh;

      div {
        position:relative;

        img {
          width: 150px;
          height: 174px;
          position:absolute;
          right:-60px;
        }

        img+img {
          display:none;
        }
      }

      main {
          p {
            margin-bottom:40px;
          }
        }

        footer {
          height:400px;
        }
    }

    aside${SearchModalContainer} {
      overflow: inherit;
      width: 100%;
      height: auto;

      header {
        width:90%;

        .input-container {
          width: 100%;
        }
      }

      ul {
        overflow:hidden;
        width: 100%;
      }
    }

    section${CardList} {
      flex-wrap: wrap;
      margin: 0 40px;
      width: 100vw;
      padding: 0 40px;
      margin:0;

      div${CardContainer} {
        margin-top: 32px;
      }
    }

    div${Wrapper} {
      main {
        height: auto;
        .main-header {
          display:none;
        }

        h2 {
          margin: 40px 0 20px 20px;
        }
      }
    }

    section${Highlights} {
      grid-template-columns: 1fr;
      gap: 32px;
      width: auto;
    }
  }

  @media (max-height: 750px) {
    div${Container} {
      height: 100%;

      .devchallenges-footer {
        margin-top: 50px;
      }
    }
  }
`;
