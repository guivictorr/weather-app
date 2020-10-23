import React, { useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';

import {
  Container,
  SideBar,
  CardList,
  Highlights,
  SearchModal,
} from './styles';

import CloudBackground from '../../assets/images/Cloud-background.png';
import ShowerImage from '../../assets/images/Shower.png';

const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Container>
      {modalIsOpen ? (
        <SearchModal>
          <header>
            <button
              type="button"
              className="close-button"
              onClick={() => setModalIsOpen(false)}
            >
              <CgClose color="background: #E7E7EB" size={25} />
            </button>
            <div>
              <div className="input-container">
                <IoMdSearch color="background: #616475" size={25} />
                <input type="text" placeholder="search location" />
              </div>
              <button type="button">Search</button>
            </div>
          </header>
          <ul>
            <li>London</li>
            <li>Dublin</li>
            <li>Parelhas</li>
          </ul>
        </SearchModal>
      ) : (
        <SideBar>
          <header>
            <button type="button" onClick={() => setModalIsOpen(true)}>
              Search for places
            </button>
            <button type="button">
              <BiCurrentLocation color="#E7E7EB" size={25} />
            </button>
          </header>
          <main>
            <div>
              <img src={ShowerImage} alt="Clima" />
              <img src={CloudBackground} alt="Nuvens" />
            </div>
            <p>
              15
              <span>ºC</span>
            </p>
            <h1>Shower</h1>
          </main>
          <footer>
            <p>Today • Fri,5 Jun</p>
            <p>
              <MdLocationOn color="#88869D" size={25} />
              Hellsink
            </p>
          </footer>
        </SideBar>
      )}

      <div>
        <main>
          <header>
            <button type="button">ºC</button>
            <button type="button">ºF</button>
          </header>
          <CardList>
            <div>
              <p>Tomorrow</p>
              <img src={ShowerImage} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={ShowerImage} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={ShowerImage} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={ShowerImage} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={ShowerImage} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
          </CardList>
          <h2>Today Highlights</h2>
          <Highlights>
            <div>
              <p>Air Pressure</p>
              <p>
                998
                <span>mb</span>
              </p>
              <footer>WWB</footer>
            </div>
            <div>
              <p>Humidity</p>
              <p>
                84
                <span>%</span>
              </p>
              <footer />
            </div>
            <div>
              <p>Visibility</p>
              <p>
                6,4
                <span>miles</span>
              </p>
            </div>
            <div>
              <p>Air Pressure</p>
              <p>
                998
                <span>mb</span>
              </p>
            </div>
          </Highlights>
          <footer className="devchallenges-footer">
            Guilherme Victor @ DevChallenges.io
          </footer>
        </main>
      </div>
    </Container>
  );
};

export default Home;
