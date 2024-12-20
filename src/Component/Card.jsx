import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import searchIcon from "../searchIcon.svg";
import logo from "../logo.svg";

export default function Card() {
  const apiKey = "e8c7123d2f6eb8bf4b3bbb5dfe8347a7";
  const [data, setData] = useState({});
  const [cityName, setInputCity] = useState("");

  const getweatherDetails = (cityName) => {
    if (!cityName || cityName === "") return;
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          cityName +
          "&appid=" +
          apiKey
      )
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        alert("City Did not Exist. Please write correct city name.");
        console.log(err);
      });
  };
  const handleSearch = () => {
    getweatherDetails(cityName);
  };
  const handlechangeInput = (e) => {
    setInputCity(e.target.value);
  };
  useEffect(() => {
    getweatherDetails();
  }, []);

  const temperature = (data?.main?.temp - 273.15).toFixed(2);
  const weatherIconUrl = data.weather
    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;
  return (
    <div className="card">
      <div className="header">
        <input
          type="text"
          name="searchbar"
          className="search-field"
          id="search"
          placeholder="Enter City name..."
          onChange={handlechangeInput}
          value={cityName}
        />
        <button className="searchbtn" onClick={handleSearch}>
          <img src={searchIcon} alt="Search Icon" className="searchIcon" />
        </button>
      </div>
      <div className="card-data">
        {Object.keys(data).length === 0 ? (
          <div>
            <img src={logo} alt="app logo" className="front-screen-img" />
            <h3>Welcome to Weather App</h3>
          </div>
        ) : (
          <div className="details">
            <h2 className="city">{data.name}</h2>
            <div className="temprature">
              <figure>
                <img src={weatherIconUrl} alt="icon" className="weather-logo" />
                <figcaption>{data.weather?.[0]?.description}</figcaption>
              </figure>
              <p className="temp">{temperature}&deg;C</p>
            </div>
            <div className="moreDetail">
              <div className="humidity">
                Humidity level: {data.main?.humidity}%
              </div>
              <div className="windspeed">Wind Speed: {data.wind?.speed}m/s</div>
              <div className="pressure">Pressure: {data.main?.pressure}hPa</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
