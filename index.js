let searchBar = document.querySelector(`.search-bar`);
let searchSubmit = document.querySelector(`.search-submit`);
const apiKey = `e3bfa20318d729a284980fde230f79b4`;

let cityWeather = {
  id: null,
  desc: null,
  cityName: null,
  temp: null,
  date: null,
  houre: null,
  minute: null,
  maxTemp: null,
  minTemp: null,
  humidity: null,
  windSpeed: null,
  timeEnd: null,
};

searchSubmit.addEventListener(`click`, (event) => {
  searchSubmit.classList.toggle(`search-submit__loading`);
  event.preventDefault();
  const start = performance.now();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=${apiKey}&units=metric`,
    {
      method: `GET`,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      cityWeather.id = data.weather[0].id;
      cityWeather.desc = data.weather[0].description;
      cityWeather.cityName = data.name;
      cityWeather.temp = data.main.temp;
      cityWeather.maxTemp = data.main.temp_max;
      cityWeather.minTemp = data.main.temp_min;
      cityWeather.humidity = data.main.humidity;
      cityWeather.windSpeed = data.wind.speed;
      cityWeather.date = `${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`;
      cityWeather.houre = new Date().getHours();
      cityWeather.minute = new Date().getMinutes();
      const end = performance.now();
      cityWeather.timeEnd = end - start;
      console.log(cityWeather);
      updateUi();
      setTimeEndOfloading();
    })
    .catch((error) => {
      swal({
        title: `اطلاعات شهر یافت نشد!`,
        text: `نام شهر را به درستی یا به انگلیسی وارد کنید.`,
        icon: `error`,
        button: false,
        timer: 3000,
      });
      setTimeEndOfloading();
    });
});

function updateUi() {
  document.querySelector(".desc").innerHTML = cityWeather.desc;
  document.querySelector(".city-name").innerHTML = cityWeather.cityName;
  document.querySelector(".temp").innerHTML =
    Math.floor(cityWeather.temp) + "°c";
  document.querySelector(".max-temp").innerHTML =
    Math.floor(cityWeather.maxTemp) + "°c";
  document.querySelector(".min-temp").innerHTML =
    Math.floor(cityWeather.minTemp) + "°c";
  document.querySelector(".humidity").innerHTML = cityWeather.humidity + " %";
  document.querySelector(".wind-speed").innerHTML =
    cityWeather.windSpeed + " m/s";
  document.querySelector(".date").innerHTML = cityWeather.date;

  if (cityWeather.houre < 10) {
    cityWeather.houre = `0` + cityWeather.houre;
  }
  if (cityWeather.minute < 10) {
    cityWeather.minute = `0` + cityWeather.minute;
  }
  document.querySelector(
    ".clock"
  ).innerHTML = `${cityWeather.minute} : ${cityWeather.houre}`;

  if (199 < cityWeather.id && cityWeather.id < 233) {
    document.querySelector(".weather-icon").innerHTML = `<img
    src="./assets/weather-icons/storm.gif"
    class="weather-icon"
    alt="weather icon"
  />`;
  } else if (299 < cityWeather.id && cityWeather.id < 322) {
    document.querySelector(".weather-icon").innerHTML = `<img
    src="./assets/weather-icons/drizzle.gif"
    class="weather-icon"
    alt="weather icon"
  />`;
  } else if (499 < cityWeather.id && cityWeather.id < 532) {
    document.querySelector(".weather-icon").innerHTML = `<img
    src="./assets/weather-icons/umbrella.gif"
    class="weather-icon"
    alt="weather icon"
  />`;
  } else if (599 < cityWeather.id && cityWeather.id < 623) {
    document.querySelector(".weather-icon").innerHTML = `<img
    src="./assets/weather-icons/snow.gif"
    class="weather-icon"
    alt="weather icon"
  />`;
  } else if (700 < cityWeather.id && cityWeather.id < 782) {
    document.querySelector(".weather-icon").innerHTML = `<img
    src="./assets/weather-icons/foggy.gif"
    class="weather-icon"
    alt="weather icon"
  />`;
  } else if (cityWeather.id == 800) {
    document.querySelector(".weather-icon").innerHTML = `<img
    src="./assets/weather-icons/sun.gif"
    class="weather-icon"
    alt="weather icon"
  />`;
  } else if (800 < cityWeather.id && cityWeather.id < 804) {
    document.querySelector(".weather-icon").innerHTML = `<img
    src="./assets/weather-icons/clouds.gif"
    class="weather-icon"
    alt="weather icon"
  />`;
  } else {
    console.log(`icon not found!`);
  }
}

function setTimeEndOfloading() {
  setTimeout(
    searchSubmit.classList.remove(`search-submit__loading`),
    cityWeather.timeEnd
  );
}
