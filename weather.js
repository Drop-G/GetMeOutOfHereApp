// sets variables to be used in functions and defines moment and local storage variables
var API="381913a298d3365457e6e5d4fdf83c2c";
var weather = "";
var city = "";
var current_date = moment().format("L");
lon= "";
lat= "";
// present day forecast
function currentWeather() {

    weather = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API;

    $.getJSON(weather, function (json) {
        var temp = (json.main.temp - 273.15) * (9 / 5) + 32;
        var windspeed = json.wind.speed * 2.237;

        $("#current-city").text(json.name + " " + current_date);
        $("#weather-img").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        $("#temperature").text(temp.toFixed(2) + "°F");
        $("#humidity").text(json.main.humidity + "%");
        $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
    });
}
