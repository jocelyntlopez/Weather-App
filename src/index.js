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
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hour}:${minutes}`;
  let h3 = document.querySelector("#current-day");
  h3.innerHTML = `${currentDay}`;
  let h4 = document.querySelector("#current-time");
  h4.innerHTML = `${currentTime}`;
}
formatDate();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2 forecast">
                <span class="forecast-day">${day}</span>
                <div class="col">
                  <span class="weather-img"
                    ><i class="fa-solid fa-cloud"></i
                  ></span>
                  <span class="forecast-temp">
                    <div class="col">
                      <span class="forecast-high-temp">39°</span>
                      <div class="col forecast-low-temp">25°</div>
                    </div>
                  </span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();

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
  let apiKey = "f7def44a260o7a6t33069ef99b69e2f4";
  let city = document.querySelector("#change-city");
  let apiLink = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=metric`;
  axios.get(apiLink).then(findCelsius);
}

function findCelsius(response) {
  cTemp = Math.round(response.data.temperature.current);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.temperature.humidity);
  let currentDescription = response.data.condition.description;
  changeTemp.innerHTML = cTemp;
  windSpeed.innerHTML = wind;
  humidityPercent.innerHTML = humidity;
  weatherDescription.innerHTML = currentDescription;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
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
  let apiKey = "f7def44a260o7a6t33069ef99b69e2f4";
  let apiLink = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiLink).then(currentTemp);
}

function currentTemp(response) {
  cTemp = Math.round(response.data.temperature.current);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.temperature.humidity);
  let currentDescription = response.data.condition.description;
  let city = response.data.city;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  changeTemp.innerHTML = cTemp;
  windSpeed.innerHTML = wind;
  humidityPercent.innerHTML = humidity;
  weatherDescription.innerHTML = currentDescription;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
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

let weatherDescription = document.querySelector("#weather-description");

let weatherIcon = document.querySelector("#weather-icon");
