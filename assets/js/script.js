// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//Global Variables
var apiKey = '&appid=fdd66cdc633a5422043e08fcf47a0c04';
  //search form
var searchBtn = document.querySelector('#search-button');
var searchFormEl = document.querySelector("#search-form");
var searchContainerEl = document.querySelector("#search-container");
var searchInputEl = document.querySelector("#city-search");
var currentHeadingEl = document.querySelector("#current-heading");
var currentCityEl = document.querySelector("#weather-data");
var currentIconEl = document.querySelector("#current-icon");
  //Weather Variables
var temperature = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("wind-speed");
var uvindex = document.querySelector("uv-index");

//Set up local storage
var search = JSON.parse(localStorage.getItem("search") || "[]");
var cityName = localStorage.getItem('cityNameStorage')


//5-Day forecast
var apiForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' + apiKey;

//Input in local storage
function storeCityName() {
  localStorage.setItem('cityNameStorage', inputEl.value);
}
//append search input to recent searches container
for (var i = 0; i < localStorage.length; i++) {
  $('#search-container').append + ("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}

//Current Day Forecast
var displayWeather = function(data) {
  //Fetch the Current day weather
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&units=imperial' + apiKey;
  //Icon Link
  //var iconLink = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      currentHeadingEl.innerHTML = data[0].name + " (" + moment().format("M/D/YYYY") + ") ";
     // currentIconEl.innerHTML = "<img src=" + iconLink + ">";
      saveSearch(data[0].name);
    })
    //temperature.textContent = "Temperature: " + data.current.temperature + " \u00B0F"

}
   
    //displayWeather();



// add event listeners to form and button container
searchBtn.addEventListener("click", displayWeather);
