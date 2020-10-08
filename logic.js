
$(document).ready(function () {
   var place="";
  $("#lake").on("click", function (event) {
    event.preventDefault();
     place = $("#lake").attr("id");
    getData(place);
  })
  $("#beach").on("click", function (event) {
    event.preventDefault();

     place = $("#beach").attr("id");
    getData(place);
  })
  $("#zoo").on("click", function (event) {
    event.preventDefault();

    place = $("#zoo").attr("id");
    getData(place);
  })
  $("#pool").on("click", function (event) {
    event.preventDefault();

     place = $("#pool").attr("id");
    getData(place);
  })


  function getData(place) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
    else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
    }


    function errorFunction(position) {
      alert('Error!');
    }

    function successFunction(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      

      mapboxgl.accessToken = 'pk.eyJ1IjoiZHJvcC1nIiwiYSI6ImNrZnd3OTd6azFvMWkydG10aGN2Z2Q2MnUifQ.EOjRwzS_WYEK5wOfXc32sQ';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [long, lat],
        zoom: 9
      });


      var queryURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + place + ".json?proximity=" + long + "," + lat + "&autocomplete=false&access_token=pk.eyJ1Ijoic2F0eWFrYXZ5YSIsImEiOiJja2Z3dzlqMHQxbms4MnFtdHU2anRzdXJ1In0.6_LfOlTLPu9B8frAVcNLqA"

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        $("#poi-section").empty();

        for (var i = 0; i < 5; i++) {
          var placeName= response.features[i].place_name;
          var longitude = response.features[i].center[0];
          var latitude =  response.features[i].center[1];
          var name = $("<p>");
          name.addClass("selectedplace");
          name.attr("place-name", place+i);
          name.attr("longitude", longitude);
          name.attr("latitude", latitude);
          name.text(placeName);

          if (placeName) {
            $("#poi-section").append(name);
          }
          
        }

        $(".selectedplace").on("click", function(event) {
          var weatherLong = $(this).attr("longitude");
          var weatherLat = $(this).attr("latitude");
          var API = "381913a298d3365457e6e5d4fdf83c2c";
          var queryUrl = "https://api.openweathermap.org/data/2.5/weather" + "?lat=" + weatherLat + "&lon=" + weatherLong + "&appid=" + API + "&units=imperial";
          $.ajax({
            url:queryUrl,
            method:"GET"
          }).then(function(response){
            console.log(response);
            var humidity= response.main.humidity;
            var temperature =response.main.temp;
            var date= response.dt;
            var formattedDate=  Unix_timestamp(date);

            var icon = response.weather[0].icon;
            
            var temp = $("<p>");
            temp.text("Temperature: " + temperature);
            var humid = $("<p>");
            humid.text("Humidity: " + humidity);
            var dat = $("<p>");
            dat.text("Date: "+ formattedDate);
            $("#selected-details").append(temp).append(humid).append(dat);


          });
 
            // event.preventDefault();
            // var details =$("<p>");
            // details.text(weatherLong+" "+weatherLat);
            // $("#poi-section2").append(details);
            // getWeatherConditions(weatherLat, weatherLong);
 
          })

        
      })
      function Unix_timestamp(t)
      {
      var dt = new Date(t * 1000);
      var date = dt.getDate();
      var month =  (dt.getMonth() + 1);
      var year =  dt.getFullYear();
      return month+ '/' + date+ '/' + year;  
      }
      

    }
  }


});


