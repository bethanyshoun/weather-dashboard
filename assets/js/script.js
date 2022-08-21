//Global Variables
var apiKey = '&appid=fdd66cdc633a5422043e08fcf47a0c04';
var searchBtn = document.querySelector('#search-button');
var searchFormEl = document.querySelector("#search-form");
var searchContainerEl = document.querySelector("#search-container");
var searchInputEl = document.querySelector("#city-search");
var currentHeadingEl = document.querySelector("#current-heading");
var currentCityEl = document.querySelector("#weather-data");
//var currentIconEl = document.querySelector("#current-icon");
var clearButtonEl = document.querySelector("#clear-button");

//Set up local storage
var search = JSON.parse(localStorage.getItem("search") || "[]");
var cityName = localStorage.getItem('.city-storage')
// Append the search input from localStorage to the cities list
for (var i = 0; i < localStorage.length; i++) {
  $(".city-storage").append("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}


// Ensure text is captured with Button Click
function captureText(event) {
  event.preventDefault();
  var city = searchInputEl.value;
  fetchWeather(city);
  fetchForecast(city);
}

//Fetch current weather data
function fetchWeather(cityName) {
  if (document.getElementById("weather-data").contains(document.querySelector(".weather-container"))) 
  {     
  };
  console.log(cityName, "input");
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey + '&units=imperial').then(function (response) {
    return response.json();
  }) .then(function (data){
    console.log(data);
    displayWeather(data);
  }) 
}

// Function to display current weather data
function displayWeather(data) {
  // Current City Name
  var currentCity  = document.createElement ('p');
  currentCity.className = "current-city";
  currentCity.textContent = data.name;
  console.log(data.name);
  var cityContainer = document.getElementById('city');
  cityContainer.appendChild(currentCity);
  
    saveSearch(data.name);
  //Date
  var currentDate = document.createElement ('p');
  currentDate.className = "current-date";
  currentDate.innerHTML =  moment().format ("dddd, MMMM DD, YYYY");
  var dateConatiner = document.getElementById('date');
  dateConatiner.appendChild(currentDate);
  //Icon *still needs work
    //var currentIcon = document.createElement ('img');
  var iconURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  var currentIcon = document.createElement ('img');
    //var currentWeatherIcon = iconURL + currentIcon + '.png';
  currentIcon.classname = "current-icon";
  currentIcon.innerHTML = data.weather[0].icon;
  currentIcon.innerHTML = "<img src=" + iconURL + ">";
  var iconContainer = document.getElementById('icon');
  iconContainer.appendChild(currentIcon);
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

  // //UV index *Still needs work
  // var uvIndex = document.createElement ('p');
  // uvIndex.className = "current-uv";
  // //uvIndex.innerHTML = current.uvi;
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


// Display 5-day forecast
function fetchForecast(cityName) {
  if (document.getElementById("five").contains(document.querySelector(".forecast"))) 
  { };
  console.log(cityName, "input");
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey + '&units=imperial').then(function (response) {
    return response.json();
  }) .then(function (data){
    console.log(data);
    displayForecast(data);
  }) 
}

//display forecast data
function displayWeather(data) {
     //add date
     for (i = 1; i < 6; i++) {
      let current = document.querySelector("#day" + i + "-heading");
      current.textContent = moment().add(i, 'd').format("M/D/YYYY");
      let forecast = document.querySelector("#day" + i);
      forecast.classList.remove("d-none");
  }

}

// Forecast API
//var apiForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey + '&units=imperial';


//save search history
var saveSearch = function(cityName) {
  if (search.includes(cityName)) {
      return;
  } else {
      search.push(cityName)
      localStorage.setItem("search", JSON.stringify(search));
      loadSearch();
  }
}

//load search history when page loads
var loadSearch = function() {
  if (search.length > 0) {
      searchContainerEl.innerHTML = "";
      for (i = 0; i < search.length; i++) {
          let searchBtn = document.createElement("button")
          searchBtn.className = "search w-100 mb-3 btn btn-secondary"
          searchBtn.innerHTML = search[i]
          searchContainerEl.appendChild(searchBtn);
      }
  } else {
      searchContainerEl.innerHTML = "";
  }
}

var clearHistory = function() {
  search = [];
  localStorage.clear();
  loadSearch();
}

// //search for location that is clicked on in history
// var reSearch = function(event) {
//   if (event.target.innerHTML.includes("<")) {
//       return;
//   } 
// }

loadSearch();

// add event listeners to form and button container
searchBtn.addEventListener("click", captureText);


clearButtonEl.addEventListener("click", clearHistory);
//searchContainerEl.addEventListener("click", reSearch);
