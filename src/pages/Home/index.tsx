import React, { useContext, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { WeatherContext } from '../../context/weatherData';

import formatDate from '../../utils/formatDate';
import weatherImg from '../../utils/weatherImages';
import CloudBackground from '../../assets/images/Cloud-background.png';

import Loading from '../../components/Loading';
import SearchModal from '../../components/SearchModal';

import { Container, SideBar, CardList, Highlights } from './styles';

const Home: React.FC = () => {
  const {
    todayWeatherData,
    weatherData,
    locationsList,
    modalIsOpen,
    setModalIsOpen,
  } = useContext(WeatherContext);

  const [isCelsius, setIsCelsius] = useState(false);

  if (!locationsList[0]) {
    return <Loading />;
  }

  return (
    <Container isCelsius={isCelsius}>
      {modalIsOpen ? (
        <SearchModal />
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
