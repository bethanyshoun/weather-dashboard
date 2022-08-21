//Global Variables
var apiKey = '&appid=fdd66cdc633a5422043e08fcf47a0c04';
var searchBtn = document.querySelector('#search-button');
var searchFormEl = document.querySelector("#search-form");
var searchContainerEl = document.querySelector("#search-container");
var searchInputEl = document.querySelector("#city-search");
var currentHeadingEl = document.querySelector("#current-heading");
var currentCityEl = document.querySelector("#weather-data");
//var currentIconEl = document.querySelector("#current-icon");

var temperature = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("wind-speed");
var uvindex = document.querySelector("uv-index");

//Set up local storage
var search = JSON.parse(localStorage.getItem("search") || "[]");
var cityName = localStorage.getItem('.city-storage')


var apiForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;






// Ensure text is captured
function captureText(event) {
  event.preventDefault();
  var city = searchInputEl.value;
  fetchWeather(city);
}

//Fetch current weather data
function fetchWeather(cityName) {
  if (document.getElementById("weather-data").contains(document.querySelector(".weather-container"))) {
     //document.getElementById("weather-data").removeChild(document.querySelector(".weather-container"))
  };
  console.log(cityName, "input");
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey + '&units=imperial').then(function (response) {
    return response.json();
  }) .then(function (data){
    console.log(data);
    displayWeather(data);
  }) 

  // //Input in local storage
  // function storeCityName(event) {
  //   event.preventDefault();
  //   localStorage.setItem('.city-storage', inputEl.value);
  //   //append search input to recent searches container
  //   for (var i = 0; i < localStorage.length; i++) {
  //     document.querySelector('#search-container').append + ("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
  //   }
  //   storeCityName();
  // }

}

// Function to display current weather data
function displayWeather(data) {
  // Current City Name
  var currentCity  = document.createElement ('p');
  currentCity.className = "current-city";
  currentCity.innerHTML = data.name;
  console.log(data.name);
  var cityContainer = document.getElementById('city');
  cityContainer.appendChild(currentCity);
  //Date
  var currentDate = document.createElement ('p');
  currentDate.className = "current-date";
  currentDate.innerHTML =  moment().format ("dddd, MMMM DD, YYYY");
  var dateConatiner = document.getElementById('date');
  dateConatiner.appendChild(currentDate);
  // //Icon
  //   //var currentIcon = document.createElement ('img');
  // var iconURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  // var currentIcon = document.createElement ('img');
  //   //var currentWeatherIcon = iconURL + currentIcon + '.png';
  // currentIcon.classname = "current-icon";
  // currentIcon.innerHTML = data.weather[0].icon;
  // currentIcon.innerHTML = "<img src=" + iconURL + ">";
  // var iconContainer = document.getElementById('icon');
  // iconContainer.appendChild(currentIcon);
  //Temperature
  var currentTemp = document.createElement ('p');
  currentTemp.className = "current-temp";
  currentTemp.innerHTML = data.main.temp;
  var tempContainer = document.getElementById('temperature');
  tempContainer.appendChild(currentTemp);
  //Humidity
  var currentHumidity = document.createElement ('p');
  currentHumidity.className = "current-humid";
  currentHumidity.innerHTML = data.main.humidity;
  var humidityContainer = document.getElementById('humidity');
  humidityContainer.appendChild(currentHumidity);
  //Wind Speed
  var currentWindSpeed  = document.createElement ('p');
  currentWindSpeed.className = "current-wind";
  currentWindSpeed.innerHTML = data.wind.speed;
  var windSpeedContainer = document.getElementById('wind-speed');
  windSpeedContainer.appendChild(currentWindSpeed);

  // //UV index
  // var uvIndex = document.createElement ('p');
  // uvIndex.className = "current-uv";
  // uvIndex.innerHTML = current.uvi;
  //   if (current.uvi() <= 2) {
  //   uvIndex.addClass('favorable');
  //   } else if (current.uvi() > 2 && uvIndex.text() <= 7) {
  //   uvIndex.addClass('moderate');
  //   } else {
  //   uvIndex.addClass('severe');
  //   }
  // var uvContainer = document.getElementById('uv-index');
  // uvContainer.appendChild(uvIndex);
}

// add event listeners to form and button container
searchBtn.addEventListener("click", captureText);
