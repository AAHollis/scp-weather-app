function displayDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="35px"
              />
              <div class="forecast-temp">
                <span class="forecast-min">${Math.round(
                  forecastDay.temp.min
                )}°C</span> /
                <span class="forecast-max">${Math.round(
                  forecastDay.temp.max
                )}°C</span>
              </div>
              </div>
            
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cf3b4232190c2a97ceb7d113e0a89390";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let weatherIconElement = document.querySelector("#weatherIcon");

  celsTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = displayDate(response.data.dt * 1000);
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "cf3b4232190c2a97ceb7d113e0a89390";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityTypedElement = document.querySelector("#cityTyped");
  search(cityTypedElement.value);
}

function displayFarTemp(event) {
  event.preventDefault();
  celsLink.classList.remove("active");
  farLink.classList.add("active");
  let farTemp = (celsTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farTemp);
}

function displayCelsTemperature(event) {
  event.preventDefault();
  celsLink.classList.add("active");
  farLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsTemperature);
}
let celsTemperature = null;

let form = document.querySelector("#searchFunction");
form.addEventListener("submit", handleSubmit);

let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", displayCelsTemperature);

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", displayFarTemp);

search("New York");
