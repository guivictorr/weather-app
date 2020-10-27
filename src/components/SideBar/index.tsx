import React, { useContext } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

import { WeatherContext } from '../../context/weatherData';

import weatherImg from '../../utils/weatherImages';
import formatDate from '../../utils/formatDate';

import { Container } from './styles';

import CloudBackground from '../../assets/images/Cloud-background.png';

const SideBar: React.FC = () => {
  const {
    todayWeatherData,
    locationsList,
    isCelsius,
    setModalIsOpen,
  } = useContext(WeatherContext);

  return (
    <Container>
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
          <img
            src={weatherImg[todayWeatherData.weather_state_abbr]}
            alt="Clima"
          />
          <img src={CloudBackground} alt="Nuvens" />
        </div>
        <p>
          {isCelsius
            ? `${todayWeatherData.the_temp_f}`
            : `${todayWeatherData.the_temp}`}
          <span>{isCelsius ? 'ºF' : 'ºC'}</span>
        </p>
        <h1>{todayWeatherData.weather_state_name}</h1>
      </main>
      <footer>
        <p>Today • {formatDate(todayWeatherData.applicable_date)}</p>
        <p>
          <MdLocationOn color="#88869D" size={25} />
          {locationsList[0].title}
        </p>
      </footer>
    </Container>
  );
};

export default SideBar;
