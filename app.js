// f3a11779d95336e3b87fcfcb8a70f186
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
  key: "f3a11779d95336e3b87fcfcb8a70f186",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");

//Anonymous function on keypress (Event Listener)
searchInputBox.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

//Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

//Show Weather Report
function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weather.weather[0].main}`;

  let wind = document.getElementById("wind-speed");
  wind.innerText = `${weather.wind.speed} m/s (Wind Speed)`;

  let humidity = document.getElementById("humidity");
  humidity.innerHTML = `${weather.main.humidity} % (Humidity)`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (weatherType.textContent === "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  } else if (weatherType.textContent === "Clouds") {
    document.body.style.backgroundImage = "url('images/cloudy.jfif')";
  } else if (weatherType.textContent === "Fog") {
    document.body.style.backgroundImage = "url('images/fog.jfif')";
  } else if (weatherType.textContent === "Rain") {
    document.body.style.backgroundImage = "url('images/rain.jpg')";
  } else if (weatherType.textContent === "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weatherType.textContent === "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
  } else if (weatherType.textContent === "Haze") {
    document.body.style.backgroundImage = "url('images/haze.jpg')";
  }
}

//Date manager
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
