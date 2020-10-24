import React, { useCallback, useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';
import { format } from 'date-fns';

import {
  Container,
  SideBar,
  CardList,
  Highlights,
  SearchModal,
} from './styles';

import CloudBackground from '../../assets/images/Cloud-background.png';
import Clear from '../../assets/images/Clear.png';
import Hail from '../../assets/images/Hail.png';
import HeavyCloud from '../../assets/images/HeavyCloud.png';
import HeavyRain from '../../assets/images/HeavyRain.png';
import LightCloud from '../../assets/images/LightCloud.png';
import LightRain from '../../assets/images/LightRain.png';
import Shower from '../../assets/images/Shower.png';
import Sleet from '../../assets/images/Sleet.png';
import Snow from '../../assets/images/Snow.png';
import ThunderStorm from '../../assets/images/Thunderstorm.png';
import api from '../../service/api';

interface WeatherDataProps {
  air_pressure: number;
  applicable_date: string;
  humidity: number;
  id: number;
  max_temp: number;
  min_temp: number;
  the_temp: number;
  visibility: number;
  weather_state_name: string;
  wind_direction_compass: string;
  wind_speed: number;
}

const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDataProps[]>([]);
  const [locationData, setLocationData] = useState({
    title: 'London',
    woeid: 44418,
  });

  const getWeatherData = useCallback(async () => {
    const { data } = await api.get(`location/${locationData.woeid}`);
    setWeatherData(data.consolidated_weather);
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  if (!weatherData[0]) {
    return <p>Carregando</p>;
  }

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
              <img src={Shower} alt="Clima" />
              <img src={CloudBackground} alt="Nuvens" />
            </div>
            <p>
              {weatherData[0].the_temp.toFixed()}
              <span>ºC</span>
            </p>
            <h1>{weatherData[0].weather_state_name}</h1>
          </main>
          <footer>
            <p>
              Today •{' '}
              {format(new Date(weatherData[0].applicable_date), 'EEE, d LLL')}
            </p>
            <p>
              <MdLocationOn color="#88869D" size={25} />
              {locationData.title}
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
              <img src={Shower} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={Shower} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={Shower} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={Shower} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
            <div>
              <p>Tomorrow</p>
              <img src={Shower} alt="Imagem do Clima" />
              <footer>
                <p>16ºC</p>
                <p>11ºC</p>
              </footer>
            </div>
          </CardList>
          <h2>Today Highlights</h2>
          <Highlights>
            <div>
              <p>Wind Status</p>
              <p>
                {weatherData[0].wind_speed.toFixed()}
                <span>mph</span>
              </p>
              <footer>{weatherData[0].wind_direction_compass}</footer>
            </div>
            <div>
              <p>Humidity</p>
              <p>
                {weatherData[0].humidity.toFixed()}
                <span>%</span>
              </p>
              <footer />
            </div>
            <div>
              <p>Visibility</p>
              <p>
                {weatherData[0].visibility.toFixed(1)}
                <span>miles</span>
              </p>
            </div>
            <div>
              <p>Air Pressure</p>
              <p>
                {weatherData[0].air_pressure.toFixed()}
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
