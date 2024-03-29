function displayTemperature(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.temperature.current);

  let describeElement = document.querySelector("#description");
  describeElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = response.data.wind.speed;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#input-city");
  let city = searchInputElement.value;
  let apiKey = "6be84de62317f4eocff0cd120tf40fa4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getForecast() {
  let searchInputElement = document.querySelector("#input-city");
  let city = searchInputElement.value;
  let apiKey = "6be84de62317f4eocff0cd120tf40fa4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

let clickElement = document.querySelector("#click-forecast");
clickElement.addEventListener("click", getForecast);

function forecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0) {
      forecastHtml =
        forecastHtml +
        `  <div class="forecast-day">
    <span class="forecast-date">${forecastDay(day.time)}</span> <br />
    <span>
    <img src = "${day.condition.icon_url}" class="forecast-icon"/>
    </span>
    <div class="forecast-temp">
      <span class="forecast-temp-min">${Math.round(
        day.temperature.minimum
      )}°C</span>
      
        <span class="forecast-temp-max">${Math.round(
          day.temperature.maximum
        )}°C</span>
    </div>
    <span class= "forcast-humidity">${day.temperature.humidity}%💧</span>
  </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function currentDate() {
  let now = new Date();

  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");

  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  h2.innerHTML = `${day} ${month} ${date}`;
  h3.innerHTML = `${hours}:${minutes}`;
}
currentDate();

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertToFarenheit);

function convertToCelsius() {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);
