// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'XXXXXXX'; // Replace with your actual API key

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: API_KEY,
            q: city,
          },
        }
      );

      if (response.status === 200) {
        setWeatherData(response.data);
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div id="App-wrapper">
      <div id="app">
        <div id="head">
       
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <p>Loading data...</p>}

        {weatherData && (
          <div className="weather-cards">
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weatherData.current.temp_c}°C</p>
            </div>

            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{weatherData.current.humidity}%</p>
            </div>

            <div className="weather-card">
              <h3>Condition</h3>
              <p>{weatherData.current.condition.text}</p>
              
            </div>

            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{weatherData.current.wind_kph} kph</p>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default WeatherApp;
