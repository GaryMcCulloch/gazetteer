//Run scripts when page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
});

//Get user location
const showPosition = (position) => {

    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    // let lat = 49.902782;
    // let lng = 12.496366;
    countryCodeSearch(lat, lng);
    getWeather(lat, lng)
}

// User location error
const showError = (error) => {
    if(error.PERMISSION_DENIED){
        alert("The User have denied the request for Geolocation.");
    }
}



///////////////////////////////////////////////////////////////AJAX////////////////////////////////////////////////////////////////////////////////

//Find user country
function countryCodeSearch(lat, lng) {
    $.ajax({
        url: "libs/php/countryCode.php",
        type: "POST",
        dataType: 'json',
        timeout: 5000,
        data: {
            lat: lat,
            lng: lng,
        },
        success: function(result) {
            let countryName = result.data.countryName;
            let countryCode = result.data.countryCode;
            loadMap(lat, lng, countryName);
            countryInfo(countryCode);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('nope');
        }
    });
}

//Get country Information
function countryInfo(countryCode) {
    $.ajax({
        url: "libs/php/countryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: countryCode
        },
        success: function(result) {

            if (result.status.name == "ok") {

                $('#continent').html('Continent:   ' + result['data'][0]['continentName']);
                $('#capital').html('Capital City:   ' + result['data'][0]['capital']);
                $('#countryName').html(result['data'][0]['countryName']);
                $('#population').html('Population:   ' + result['data'][0]['population']);
                $('#currencyCode').html('Currency:   ' + result['data'][0]['currencyCode']);
                $('#area').html('Country Size:   ' + result['data'][0]['areaInSqKm']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    });
}

//Get country Information
function getWeather(lat, lng) {
    $.ajax({
        url: "libs/php/openWeatherMap.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: lat,
            lng, lng
        },
        success: function(result) {

            if (result.status.name == "ok") {

                //Convert Unix timestamps
                let formattedTime = new Date(result.current.dt * 1000).toLocaleTimeString("en-GB");
                let formattedSunrise = new Date(result.current.sunrise * 1000).toLocaleTimeString("en-GB");
                let formattedSunset = new Date((result.current.sunset * 1000) + (10800 * 1000)).toLocaleTimeString("en-GB");
            
                $('#time').html('Time:   ' + formattedTime);
                $('#sunrise').html('Time of Sunrise:   ' + formattedSunrise);
                $('#sunset').html('Time of Sunset:   ' + formattedSunset);
                // $('#icon').html('Icon: ' + result['current']['weather'][0]['icon']);  create background weather image related to weather description
                $('#description').html('Description:   ' + result['current']['weather'][0]['description']);
                $('#temp').html('Temperature:   ' + result['current']['temp']);
                $('#windSpeed').html('Wind Speeds:   ' + result['current']['wind_speed']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    });
}




