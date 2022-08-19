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
  //search form
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
var uv = document.querySelector("uv-index");

//Set up local storage
var search = JSON.parse(localStorage.getItem("search") || "[]");

// Search for a city
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();
  // get value from input element
  var cityName = searchInputEl.value.trim();
    searchInputEl.value = "";

  if (cityName) {
    getCoordinates(cityName);
    // clear old content
    cityContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getCoordinates = function(cityName) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&limit=1&units=imperial&appid=fdd66cdc633a5422043e08fcf47a0c04";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json()
          .then(function(data) {

          $("#city-name")[0].textContent = cityName + " (" + moment().format('MM/DD/YYYY') + ")";
          console.log(data);
          displayWeather(/* */);
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Weather Dashboard");
    });
};

var displayWeather = function(/** */) {
  // check if api returned weather
  if (city.length === 0) {
    cityContainerEl.textContent = "No weather found for this city, check your spelling and try again.";
    return;
  }

  citySearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < city.length; i++) {

    cityEl.appendChild(titleEl);

    // append container to the dom
    cityContainerEl.appendChild(cityEl);
  }
};

// add event listeners to form and button container
searchFormEl.addEventListener("submit", formSubmitHandler);
