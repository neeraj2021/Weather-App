import React, { useState, useEffect } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);

  const [history, setHistory] = useState([]);

  const [city, setCity] = useState("");

  const APIKEY = "e19bc56d35c8a8c0ce5c11b6a0c79f02";

  const fetchData = async function () {
    // console.log(history);
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);
  };

  function weatherData(e) {
    e.preventDefault();
    setLoading(true);
    setIsErr(false);

    let d = 0;
    while (d < 1000) d++;

    let init = async function () {
      setLoading(true);

      const data = await fetchData();
      // console.log("data = ", data);
      if (data.cod === "404") setIsErr(true);
      setWeather(data);
      if (data.name !== undefined) {
        setHistory([
          { cityName: data.name, cityTemp: data.main.temp },
          ...history,
        ]);
        // console.log("weather = ", data);
      }
      // console.log(history);
      setLoading(false);
    };
    init();
  }

  useEffect(() => {
    setLoading(true);
    setIsErr(false);
  }, []);

  return (
    <div className="weather">
      <div className="title">
        <div>Weather App</div>
        <br />
      </div>

      <form className="form">
        <input
          type="text"
          placeholder="City Name (Required)"
          name="city"
          required
          value={city}
          onChange={(e) => {
            setLoading(true);
            setIsErr(false);
            setCity(e.target.value);
          }}
        />
        <button type="submit" className="getweather" onClick={weatherData}>
          Submit
        </button>
      </form>

      {loading ? (
        <div></div>
      ) : isErr ? (
        <h3>City Not Found</h3>
      ) : (
        <>
          <div>{<DisplayWeather data={weather} />}</div>
          <br />
          <br />
          <hr />
          <hr />
          <br />
          <br />
        </>
      )}
      <h2>Previous Search</h2>

      {history.map((ele, index) => {
        return (
          <h4 key={index}>
            <span style={{ margin: "1px 25px 0px 0px" }}>{ele.cityName}</span>
            <span>
              {Math.floor(ele.cityTemp - 273.15)}
              <sup>o</sup>C
            </span>
          </h4>
        );
      })}
    </div>
  );
}

export default Weather;
