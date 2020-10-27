import React, { useContext } from 'react';
import { WeatherContext } from '../../context/weatherData';

import formatDate from '../../utils/formatDate';
import weatherImg from '../../utils/weatherImages';

import Loading from '../../components/Loading';
import SearchModal from '../../components/SearchModal';
import SideBar from '../../components/SideBar';

import { Container, CardList, Highlights } from './styles';

const Home: React.FC = () => {
  const {
    todayWeatherData,
    weatherData,
    locationsList,
    modalIsOpen,
    isCelsius,
    setIsCelsius,
  } = useContext(WeatherContext);

  if (!locationsList[0]) {
    return <Loading />;
  }

  return (
    <Container isCelsius={isCelsius}>
      {modalIsOpen ? <SearchModal /> : <SideBar />}

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
