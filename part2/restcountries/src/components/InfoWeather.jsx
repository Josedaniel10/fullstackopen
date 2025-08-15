const InfoWeather = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <>
      <h2>Weather in {data.name}</h2>
      <p>Temperature {data.main.temp}°C</p>
      <p>Humidity {data.main.humidity}%</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
      <p>Wind {data.wind.speed} m/s</p>
    </>
  );
};

export default InfoWeather;
