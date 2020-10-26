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
import Loading from '../../components/Loading';

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
  max_temp_f: number;
  min_temp_f: number;
  the_temp_f: number;
}

interface LocationDataProps {
  title: string;
  woeid: number;
}

const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState(false);
  const [changeTempUnit, setChangeTempUnit] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDataProps[]>([]);
  const [todayWeatherData, setTodayWeatherData] = useState<WeatherDataProps>();
  const [locationData, setLocationData] = useState<LocationDataProps[]>([
    {
      title: 'San Francisco',
      woeid: 2487956,
    },
  ]);

  const getWeatherData = useCallback(async (woeid: number) => {
    const { data } = await api.get(`location/${woeid}`);

    data.consolidated_weather.map((item: WeatherDataProps) => {
      const max_temp_f = item.max_temp * 1.8 + 32;
      const min_temp_f = item.min_temp * 1.8 + 32;
      const the_temp_f = item.the_temp * 1.8 + 32;

      item.max_temp = Number(item.max_temp.toFixed());
      item.min_temp = Number(item.min_temp.toFixed());
      item.the_temp = Number(item.the_temp.toFixed());

      item.max_temp_f = Number(max_temp_f.toFixed());
      item.min_temp_f = Number(min_temp_f.toFixed());
      item.the_temp_f = Number(the_temp_f.toFixed());
    });

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

    if (data.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setLocationData(data);
  }, [locationName]);

  const handleGetLocationWeather = useCallback(
    async (woeid: number, title: string) => {
      setLocationData([]);
      await getWeatherData(woeid);
      setLocationData([{ title, woeid }]);
      setModalIsOpen(false);
    },
    [getWeatherData],
  );

  useEffect(() => {
    getWeatherData(locationData[0].woeid);
  }, []);

  if (!todayWeatherData || !locationData[0]) {
    return <Loading />;
  }

  console.log(weatherData, todayWeatherData);

  return (
    <Container changeTempUnit={changeTempUnit}>
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
              <button type="button" onClick={handleSearchData}>
                Search
              </button>
            </div>
          </header>
          <ul>
            {locationData.map(local => (
              <li>
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
              {changeTempUnit
                ? `${todayWeatherData.the_temp_f}`
                : `${todayWeatherData.the_temp}`}
              <span>{changeTempUnit ? 'ºF' : 'ºC'}</span>
            </p>
            <h1>{todayWeatherData.weather_state_name}</h1>
          </main>
          <footer>
            <p>Today • {formatDate(todayWeatherData.applicable_date)}</p>
            <p>
              <MdLocationOn color="#88869D" size={25} />
              {locationData[0].title}
            </p>
          </footer>
        </SideBar>
      )}

      <div>
        <main>
          <header>
            <button type="button" onClick={() => setChangeTempUnit(false)}>
              ºC
            </button>
            <button type="button" onClick={() => setChangeTempUnit(true)}>
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
                    {changeTempUnit
                      ? `${weather.max_temp_f}ºF`
                      : `${weather.max_temp}ºC`}
                  </p>
                  <p>
                    {changeTempUnit
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
