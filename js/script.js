$(document).ready(function() {
 var fcounter = 0;
 var ccounter = 1;
 $(".c").on("click" , function() {
   $("#temp").fadeOut().fadeIn(2000);
 });

 $(".f").on("click" , function() {
   $("#temp").fadeOut().fadeIn(2000);
 });

 $(".c").addClass("cborder");
  $(".f").on("click" , function() {
    if(fcounter == 0) {
      var temp = parseFloat($("#temp").html());
      temp = Math.round(parseFloat(temp * 9 / 5 + 32)) + "&deg;";
      $("#temp").html(temp);
      $(".f").addClass("fborder");
      $(".c").removeClass("cborder");
      fcounter += 1;
      ccounter = 0;
    }
  });
  $(".c").on("click" , function() {
    if(ccounter == 0) {
      var temp = parseFloat($("#temp").html());
      temp = Math.round(parseFloat((temp - 32) * 5 / 9)) + "&deg;";
      $("#temp").html(temp);
      $(".c").addClass("cborder");
      $(".f").removeClass("fborder");
      ccounter += 1;
      fcounter = 0;
    }
  });

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var getAPI = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lng;
      $.getJSON(getAPI , function(json) {


        var img = "<img src='" + json.weather[0].icon + "'></img>";
        var name = json.name + ", " + json.sys.country;
        $("#temp").html(Math.round(parseFloat(json.main.temp , 2)) + "&deg;");
        $("#image").html(img);
        $("#name").html(name);
        $("#weather").html(json.weather[0].main);
        $("#windAndhumidity").html("Wind " + json.wind.speed + "km/h &nbsp;&nbsp;&nbsp;&nbsp; Humidity " + json.main.humidity+"%");

        switch (json.weather[0].main.toLowerCase()) {

          case 'clear':
            $("body").css("background-image" , "url('https://static.pexels.com/photos/337282/pexels-photo-337282.jpeg')");
          break;
          case 'clouds':
              $("body").css("background-image" , "url('https://static.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg')");
          break;
          case 'drizzle':
              $("body").css("background-image" , "url('https://static.pexels.com/photos/764767/pexels-photo-764767.jpeg')");
          break;
          case 'thunderstrom':
              $("body").css("background-image" , "url('https://static.pexels.com/photos/273280/pexels-photo-273280.jpeg')");
          break;
          case 'rain':
              $("body").css("background-image" , "url('https://static.pexels.com/photos/237637/pexels-photo-237637.jpeg')");
          break;
          case 'snow':
              $("body").css("background-image" , "url('https://static.pexels.com/photos/65911/winter-nature-season-trees-65911.jpeg')");
          break;
          default:
              $("body").css("background-color" , "white");

        }



        console.log("Wheather: "+json.weather[0].main);
        console.log("Temp: "+json.main.temp);
        console.log("MIN-Temp: "+json.main.temp_min);
        console.log("MAX-Temp: "+json.main.temp_max);
        console.log("Name: "+json.name);
        console.log("Wind Speed: "+json.wind.speed);
        console.log("Pressure: "+json.main.pressure);
        console.log("humidity: "+json.main.humidity);
        console.log(json.weather[0].icon);
      });
      // window.open(getAPI , "_blank");
    });
  }







});
