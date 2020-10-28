import React, { useContext } from 'react';
import { WeatherContext } from '../../context/weatherData';

import Loading from '../../components/Loading';
import SearchModal from '../../components/SearchModal';
import SideBar from '../../components/SideBar';

import { Container, CardList, Highlights, Wrapper } from './styles';
import Card from '../../components/Card';
import Progress from '../../components/Progress';

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
    <Container>
      {modalIsOpen ? <SearchModal /> : <SideBar />}

      <Wrapper isCelsius={isCelsius}>
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
              <Card
                key={weather.id}
                applicable_date={weather.applicable_date}
                max_temp={weather.max_temp}
                min_temp={weather.min_temp}
                max_temp_f={weather.max_temp_f}
                min_temp_f={weather.min_temp_f}
                weather_state_abbr={weather.weather_state_abbr}
              />
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
      </Wrapper>
    </Container>
  );
};

export default Home;
