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
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityWeather = cityInputEl.value.trim();

  if (cityWeather) {
    getWeather(cityWeather);

    // clear old content
    cityContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};
/*
var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
  }
};
*/
var getWeather = function() {
  var cityName = titleCase($("#city-search")[0].value.trim());
  // format the One Call api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=fdd66cdc633a5422043e08fcf47a0c04";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {

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
/*
var getFeaturedRepos = function(language) {
  // format the github api url
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};
*/
var displayWeather = function(/** */) {
  // check if api returned weather
  if (city.length === 0) {
    cityContainerEl.textContent = "No weather found for this city, check your spelling and try again.";
    return;
  }

  citySearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < city.length; i++) {
 /*
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
*/
    // append to container
    cityEl.appendChild(titleEl);
/*
    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);
*/
    // append container to the dom
    cityContainerEl.appendChild(cityEl);
  }
};

// add event listeners to form and button container
searchFormEl.addEventListener("submit", formSubmitHandler);
//languageButtonsEl.addEventListener("click", buttonClickHandler);