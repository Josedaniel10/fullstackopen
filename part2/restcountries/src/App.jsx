import { useState, useEffect } from "react";
import axios from "axios";

import CountryForm from "./components/CountryForm";
import ListResults from "./components/ListResults";
import InfoCountry from "./components/InfoCountry";
import InfoWeather from "./components/InfoWeather";

function App() {
  const [countries, setCountries] = useState(null);
  const [value, setValue] = useState("");
  const [matches, setMatches] = useState(null);
  const [dataCountry, setDataCountry] = useState(null);
  const [dataWeather, setDataWeather] = useState(null);

  const getDataCountry = (country) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((res) => setDataCountry(res.data));
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data.map((country) => country.name.common));
      });
  }, []);

  useEffect(() => {
    if (value !== "" && countries) {
      const results = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );

      if (results.length === 1) {
        getDataCountry(results[0]);
        setMatches(null);
        return;
      }
      setMatches(results);
    }
  }, [value]);

  useEffect(() => {
    if (dataCountry) {
      const API_WEATHER = "https://api.openweathermap.org/data/2.5/";
      const API_KEY = import.meta.env.VITE_SOME_KEY;
      const capital = dataCountry.capital[0];
      const country_code = dataCountry.altSpellings[0];

      axios
        .get(
          `${API_WEATHER}weather?q=${capital},${country_code}&appid=${API_KEY}&units=metric&lang=es`
        )
        .then((res) => setDataWeather(res.data));
    }
  }, [dataCountry]);

  const changeInputCountry = (ev) => {
    setValue(ev.target.value);
  };

  const handleResultView = (ev) => {
    const newValue = ev.target.getAttribute("data-value");
    setValue(newValue);
  };

  if(!countries) {
    return <div>Cargando datos...</div>
  }

  return (
    <>
      <CountryForm inputCountry={value} changeValue={changeInputCountry} />
      <ListResults matches={matches} onResultClick={handleResultView} />
      <InfoCountry data={dataCountry} />
      <InfoWeather data={dataWeather} />
    </>
  );
}

export default App;
