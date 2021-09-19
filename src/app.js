function displayTemperature(response) {
  console.log(response.data.main.temp);
}

let apiKey = "cf3b4232190c2a97ceb7d113e0a89390";
let apiUrl = `api.openweathermap.org/data/2.5/weather?q=New York&appid={$apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
