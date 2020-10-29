import React, { useContext } from 'react';

import formatDate from '../../utils/formatDate';
import weatherImg from '../../utils/weatherImages';
import { WeatherContext } from '../../context/weatherData';

import { CardContainer } from './styles';

interface CardProps {
  applicable_date: string;
  weather_state_abbr: string;
  max_temp_f: number;
  min_temp_f: number;
  max_temp: number;
  min_temp: number;
}

const Card: React.FC<CardProps> = ({
  applicable_date,
  weather_state_abbr,
  max_temp,
  min_temp,
  max_temp_f,
  min_temp_f,
}) => {
  const { isCelsius } = useContext(WeatherContext);

  return (
    <CardContainer>
      <p>{formatDate(applicable_date)}</p>
      <img src={weatherImg[weather_state_abbr]} alt="Imagem do Clima" />
      <footer>
        <p>{isCelsius ? `${max_temp_f}ºF` : `${max_temp}ºC`}</p>
        <p>{isCelsius ? `${min_temp_f}ºF` : `${min_temp}ºC`}</p>
      </footer>
    </CardContainer>
  );
};

export default Card;
