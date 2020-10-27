import React, { createContext, useCallback, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import api from '../service/api';

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

interface ContextProps {
  weatherData: WeatherDataProps[];
  todayWeatherData: WeatherDataProps;
  locationsList: LocationDataProps[];
  modalIsOpen: boolean;
  handleGetWeatherData(woeid: number): Promise<void>;
  handleGetLocationWeather(woeid: number, title: string): Promise<void>;
  setLocationsList(locationsList: LocationDataProps[]): void;
  setModalIsOpen(arg: boolean): void;
}

export const WeatherContext = createContext<ContextProps>({} as ContextProps);

export const ContextProvider: React.FC = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDataProps[]>([]);
  const [todayWeatherData, setTodayWeatherData] = useState<WeatherDataProps>();
  const [locationsList, setLocationsList] = useState<LocationDataProps[]>([
    {
      title: 'San Francisco',
      woeid: 2487956,
    },
  ]);

  const handleGetWeatherData = useCallback(async (woeid: number) => {
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

  const handleGetLocationWeather = useCallback(
    async (woeid: number, title: string) => {
      setLocationsList([]);
      await handleGetWeatherData(woeid);
      setLocationsList([{ title, woeid }]);
      setModalIsOpen(false);
    },
    [handleGetWeatherData],
  );

  useEffect(() => {
    handleGetWeatherData(locationsList[0].woeid);
  }, []);

  if (!weatherData || !todayWeatherData) {
    return <Loading />;
  }

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        todayWeatherData,
        locationsList,
        modalIsOpen,
        handleGetWeatherData,
        handleGetLocationWeather,
        setLocationsList,
        setModalIsOpen,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
