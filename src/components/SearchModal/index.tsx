import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';
import { WeatherContext } from '../../context/weatherData';

import { SearchModalContainer } from './styles';

import api from '../../service/api';

const SearchModal: React.FC = () => {
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState(false);
  const {
    locationsList,
    handleGetLocationWeather,
    setLocationsList,
    setModalIsOpen,
  } = useContext(WeatherContext);

  const handleFillLocationList = useCallback(async () => {
    const { data } = await api.get(`location/search/?query=${locationName}`);

    if (data.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setLocationsList(data);
  }, [locationName, setLocationsList]);

  const handleInputText = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setLocationName(event.target.value);
    },
    [],
  );

  return (
    <SearchModalContainer error={error}>
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
              onClick={() => handleGetLocationWeather(local.woeid, local.title)}
            >
              <p>{local.title}</p>
            </button>
          </li>
        ))}
      </ul>
    </SearchModalContainer>
  );
};

export default SearchModal;
