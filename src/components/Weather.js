import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "e19bc56d35c8a8c0ce5c11b6a0c79f02";

  async function weatherData(e) {
    e.preventDefault();
    if (!form.city) {
      alert("City Name Can't be Empty");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);
      setWeather({ data: data });
    }
  }

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

      <form className="form">
        <input
          type="text"
          placeholder="City Name (Required)"
          name="city"
          value={form.city}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Country Name (Optional)"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
