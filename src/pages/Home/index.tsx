import React from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

import { Container } from './styles';

import CloudBackground from '../../assets/images/Cloud-background.png';
import ShowerImage from '../../assets/images/Shower.png';

const Home: React.FC = () => {
  return (
    <Container>
      <aside>
        <header>
          <button type="button">Search for places</button>
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
      </aside>
    </Container>
  );
};

export default Home;
