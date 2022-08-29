let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

const cityNameDiv = document.getElementById("city-name");
const weatherTypeDiv = document.getElementById("weather-type");
const tempDiv = document.getElementById("temp");
const minTempDiv = document.getElementById("min-temp");
const maxTempDiv = document.getElementById("max-temp");

getWeatherData = async (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const response = await fetch(
    `${URL}?q=${city}&appid=${API_KEY}&units=imperial`
  );
  const data = await response.json();
  return data;
};

const searchCity = async () => {
  const city = document.getElementById("city-input").value;
  const data = getWeatherData(city);
  showWeatherData(await data);
};

const showWeatherData = (weatherData) => {
  console.log(weatherData);

  if (weatherData.cod == 404 || weatherData.cod == 400) {
    resetUI();
    return;
  }

  cityNameDiv.innerHTML = weatherData.name;
  weatherTypeDiv.innerHTML = weatherData.weather[0].main;
  tempDiv.innerHTML = fahrenheitToCelcius(Number(weatherData.main.temp));
  minTempDiv.innerHTML = fahrenheitToCelcius(Number(weatherData.main.temp_min));
  maxTempDiv.innerHTML = fahrenheitToCelcius(Number(weatherData.main.temp_max));
};

const resetUI = () => {
  cityNameDiv.innerHTML = "----";
  weatherTypeDiv.innerHTML = "----";
  tempDiv.innerHTML = "--°";
  minTempDiv.innerHTML = "--°";
  maxTempDiv.innerHTML = "--°";
};

const fahrenheitToCelcius = (fahrenheit) => {
  const celcius = ((fahrenheit - 32) * 5) / 9;
  return celcius.toFixed(2);
};
