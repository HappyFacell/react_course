import React from "react";

const Weather = ({ country, weather }) => {
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {weather.temperature}°C</p>
      <img
        src="https://w7.pngwing.com/pngs/546/46/png-transparent-weather-forecasting-severe-weather-storm-weather-free-text-heart-logo-thumbnail.png"
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px" }}
      />
      <p>
        Wind: {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
