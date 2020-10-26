import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';

import formatDate from '../../utils/formatDate';
import api from '../../service/api';
import weatherImg from '../../utils/weatherImages';
import { WeatherContext } from '../../context/weatherData';
import Loading from '../../components/Loading';

import {
  Container,
  SideBar,
  CardList,
  Highlights,
  SearchModal,
} from './styles';

import CloudBackground from '../../assets/images/Cloud-background.png';

interface LocationDataProps {
  title: string;
  woeid: number;
}

const Home: React.FC = () => {
  const { handleGetWeatherData, todayWeatherData, weatherData } = useContext(
    WeatherContext,
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);
  const [locationsList, setLocationsList] = useState<LocationDataProps[]>([
    {
      title: 'San Francisco',
      woeid: 2487956,
    },
  ]);

  const handleInputText = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setLocationName(event.target.value);
    },
    [],
  );

  const handleFillLocationList = useCallback(async () => {
    const { data } = await api.get(`location/search/?query=${locationName}`);

    if (data.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setLocationsList(data);
  }, [locationName]);

  const handleGetLocationWeather = useCallback(
    async (woeid: number, title: string) => {
      setLocationsList([]);
      await handleGetWeatherData(woeid);
      setLocationsList([{ title, woeid }]);
      setModalIsOpen(false);
    },
    [handleGetWeatherData],
  );

  if (!locationsList[0]) {
    return <Loading />;
  }

  return (
    <Container isCelsius={isCelsius}>
      {modalIsOpen ? (
        <SearchModal error={error}>
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
              <button type="button" onClick={handleFillLocationList}>
                Search
              </button>
            </div>
          </header>
          <ul>
            {locationsList.map(local => (
              <li key={local.woeid}>
                <button
                  type="button"
                  onClick={() =>
                    handleGetLocationWeather(local.woeid, local.title)
                  }
                >
                  <p>{local.title}</p>
                </button>
              </li>
            ))}
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
        </SideBar>
      )}

      <div>
        <main>
          <header>
            <button type="button" onClick={() => setIsCelsius(false)}>
              ºC
            </button>
            <button type="button" onClick={() => setIsCelsius(true)}>
              ºF
            </button>
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
                  <p>
                    {isCelsius
                      ? `${weather.max_temp_f}ºF`
                      : `${weather.max_temp}ºC`}
                  </p>
                  <p>
                    {isCelsius
                      ? `${weather.min_temp_f}ºF`
                      : `${weather.min_temp}ºC`}
                  </p>
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
