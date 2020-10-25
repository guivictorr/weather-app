import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';

import formatDate from '../../utils/formatDate';
import api from '../../service/api';
import weatherImg from '../../utils/weatherImages';

import {
  Container,
  SideBar,
  CardList,
  Highlights,
  SearchModal,
} from './styles';

import CloudBackground from '../../assets/images/Cloud-background.png';

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
  weather_state_abbr: string;
  wind_direction_compass: string;
  wind_speed: number;
}

interface LocationDataProps {
  title: string;
  woeid: number;
}

const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherDataProps[]>([]);
  const [todayWeatherData, setTodayWeatherData] = useState<WeatherDataProps>();
  const [locationData, setLocationData] = useState<LocationDataProps>({
    title: 'San Francisco',
    woeid: 2487956,
  });

  const getWeatherData = useCallback(async (woeid: number) => {
    const { data } = await api.get(`location/${woeid}`);
    setTodayWeatherData(data.consolidated_weather[0]);
    await data.consolidated_weather.shift();
    setWeatherData(data.consolidated_weather);
  }, []);

  const handleInputText = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setLocationName(event.target.value);
    },
    [],
  );

  const handleSearchData = useCallback(async () => {
    const { data } = await api.get(`location/search/?query=${locationName}`);
    await data.map(async (item: LocationDataProps) => {
      setLocationData(item);
      await getWeatherData(item.woeid);
    });
    setModalIsOpen(false);
  }, [getWeatherData, locationName]);

  useEffect(() => {
    getWeatherData(locationData.woeid);
  }, []);

  if (!todayWeatherData || !weatherData[0] || !locationData) {
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
                <input
                  type="text"
                  placeholder="search location"
                  onChange={handleInputText}
                />
              </div>
              <button type="button" onClick={handleSearchData}>
                Search
              </button>
            </div>
          </header>
          <ul>
            <li>{locationData.title}</li>
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
              <img
                src={weatherImg[todayWeatherData.weather_state_abbr]}
                alt="Clima"
              />
              <img src={CloudBackground} alt="Nuvens" />
            </div>
            <p>
              {todayWeatherData.the_temp.toFixed()}
              <span>ºC</span>
            </p>
            <h1>{todayWeatherData.weather_state_name}</h1>
          </main>
          <footer>
            <p>Today • {formatDate(todayWeatherData.applicable_date)}</p>
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
            {weatherData.map(weather => (
              <div key={weather.id}>
                <p>{formatDate(weather.applicable_date)}</p>
                <img
                  src={weatherImg[weather.weather_state_abbr]}
                  alt="Imagem do Clima"
                />
                <footer>
                  <p>{weather.max_temp.toFixed()}ºC</p>
                  <p>{weather.min_temp.toFixed()}ºC</p>
                </footer>
              </div>
            ))}
          </CardList>
          <h2>Today Highlights</h2>
          <Highlights>
            <div>
              <p>Wind Status</p>
              <p>
                {todayWeatherData.wind_speed.toFixed()}
                <span>mph</span>
              </p>
              <footer>{todayWeatherData.wind_direction_compass}</footer>
            </div>
            <div>
              <p>Humidity</p>
              <p>
                {todayWeatherData.humidity.toFixed()}
                <span>%</span>
              </p>
              <footer />
            </div>
            <div>
              <p>Visibility</p>
              <p>
                {todayWeatherData.visibility.toFixed(1)}
                <span>miles</span>
              </p>
            </div>
            <div>
              <p>Air Pressure</p>
              <p>
                {todayWeatherData.air_pressure.toFixed()}
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
