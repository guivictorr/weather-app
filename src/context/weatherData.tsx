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
  isCelsius: boolean;
  setIsCelsius(arg: boolean): void;
  handleGetWeatherData(woeid: number): Promise<void>;
  handleGetLocationWeather(woeid: number, title: string): Promise<void>;
  setLocationsList(locationsList: LocationDataProps[]): void;
  handleGetCurrentLocation(): void;
  setModalIsOpen(arg: boolean): void;
}

export const WeatherContext = createContext<ContextProps>({} as ContextProps);

export const ContextProvider: React.FC = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDataProps[]>([]);
  const [todayWeatherData, setTodayWeatherData] = useState<WeatherDataProps>();
  const [locationsList, setLocationsList] = useState<LocationDataProps[]>([]);

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

  const handleGetPosition = useCallback(
    async position => {
      const { latitude, longitude } = await position.coords;
      const { data } = await api.get(
        `location/search/?lattlong=${latitude},${longitude}`,
      );
      setLocationsList(data);
      handleGetWeatherData(data[0].woeid);
    },
    [handleGetWeatherData],
  );

  const handleGetCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGetPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, [handleGetPosition]);

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  if (!weatherData || !todayWeatherData || !locationsList[0]) {
    return <Loading />;
  }

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        todayWeatherData,
        locationsList,
        modalIsOpen,
        isCelsius,
        handleGetWeatherData,
        handleGetLocationWeather,
        handleGetCurrentLocation,
        setLocationsList,
        setModalIsOpen,
        setIsCelsius,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
