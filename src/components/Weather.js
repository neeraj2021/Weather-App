import React, { useState, useEffect } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);

  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "e19bc56d35c8a8c0ce5c11b6a0c79f02";

  const fetchData = async function () {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);
  };

  function weatherData(e) {
    e.preventDefault();
    setLoading(true);
    setIsErr(false);
    let init = async function () {
      setLoading(true);

      const data = await fetchData();
      // console.log("data = ", data);
      if (data.cod === "404") setIsErr(true);
      setWeather(data);
      // console.log("weather = ", data);
      setLoading(false);
    };
    init();
  }

  useEffect(() => {
    setLoading(true);
    setIsErr(false);
  }, []);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // console.log(name, value);
    if (name === "city") {
      setForm({ city: value });
    }
    if (name === "country") {
      setForm({ country: value });
    }
  };

  return (
    <div className="weather">
      <div className="title">
        <div>Weather App</div>
        <br />
      </div>

      <form className="form" onSubmit={weatherData}>
        <input
          type="text"
          placeholder="City Name (Required)"
          name="city"
          required
          value={form.city}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Country Name (Optional)"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="getweather">
          Submit
        </button>
      </form>

      {loading ? (
        <div></div>
      ) : isErr ? (
        <h3>City Not Found</h3>
      ) : (
        <div>{<DisplayWeather data={weather} />}</div>
      )}
    </div>
  );
}

export default Weather;
