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
