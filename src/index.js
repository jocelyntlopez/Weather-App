let now = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let currentTime = `${hour}:${minutes}`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${currentDay}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${currentTime}`;
}
formatDate();

let form = document.querySelector("#search-city");
form.addEventListener("submit", enterCity);
form.addEventListener("submit", cityTemp);

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city");
  let h1 = document.querySelector("h1");
  if (city.value) {
    h1.innerHTML = `${city.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city.");
  }
}

function cityTemp(event) {
  event.preventDefault();
  let apiKey = "a625733502fa5d280b89e6ead1b45129";
  let city = document.querySelector("#change-city");
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(findCelsius);
}

function findCelsius(response) {
  cTemp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  changeTemp.innerHTML = cTemp;
  windSpeed.innerHTML = wind;
  humidityPercent.innerHTML = humidity;
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", findLocation);

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a625733502fa5d280b89e6ead1b45129";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiLink).then(currentTemp);
}

function currentTemp(response) {
  cTemp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  changeTemp.innerHTML = cTemp;
  windSpeed.innerHTML = wind;
  humidityPercent.innerHTML = humidity;
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  changeTemp.innerHTML = Math.round(cTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fTemp = (cTemp * 9) / 5 + 32;
  changeTemp.innerHTML = Math.round(fTemp);
}

let changeTemp = document.querySelector("#change-temp");

let cTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let windSpeed = document.querySelector("#wind");

let humidityPercent = document.querySelector("#humidity");
