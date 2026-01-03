import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "45cf8406067f4bd137658d8dc3bd7179";

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        if (res.status === 404) throw new Error("City not found");
        if (res.status === 401) throw new Error("Invalid API key (wait 10 min)");
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter Name...."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p> Temp: {weather.main.temp} °C</p>
          <p> Humidity: {weather.main.humidity}%</p>
          <p> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
