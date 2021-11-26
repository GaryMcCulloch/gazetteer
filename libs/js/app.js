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

    // let lat = 48.902782; //France
    // let lng = 2.496366;
    // let lat = 51.90; //germany
    // let lng = 10.49;
    // let lat = 55.902782; //russia
    // let lng = 37.496366;
    // let lat = 44.902782; //Murica
    // let lng = -103.496366;


    countryCodeSearch(lat, lng);
    
    // getCity();
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
            let countryCode = result.data.countryCode.toLowerCase();
            if (countryCode == 'gb') {
                countryCode = 'uk';
            }
            countryInfo(lat, lng, countryCode, countryName);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('nope');
        }
    });
}

//Get country Information
function countryInfo(lat, lng, countryCode, countryName) {
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
                getWeather(lat, lng, countryCode, countryName);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    });
}

//Get weather Information
function getWeather(lat, lng, countryCode, countryName) {
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
    getCity(lat, lng, countryCode, countryName);
}

//Get city Information
function getCity(lat, lng, countryCode, countryName) {
    $.ajax({
        url: "libs/php/cities.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function(result) {
            let cityResult = result.results;
            getPark(lat, lng, countryCode, countryName, cityResult);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('nope');
        }
    })
}

//Get park Information
function getPark(lat, lng, countryCode, countryName, cityResult) {
    $.ajax({
        url: "libs/php/park.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function(result) {
            let parkResult = result.results;
            getBeach(lat, lng, countryCode, countryName, cityResult, parkResult);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('nope');
        }
    })
}

//Get park Information
function getBeach(lat, lng, countryCode, countryName, parkResult, cityResult) {
    $.ajax({
        url: "libs/php/beach.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function(result) {
            let beachResult = result.results;
            getPoi(lat, lng, countryCode, countryName, parkResult, cityResult, beachResult);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('nope');
            console.log(countryCode)
        }
    })
}

//Get poi Information
function getPoi(lat, lng, countryCode, countryName, parkResult, cityResult, beachResult) {
    $.ajax({
        url: "libs/php/poi.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function(result) {
            let poiResult = result.results;
            loadMap(lat, lng, countryCode, countryName, parkResult, cityResult, beachResult, poiResult);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('nope');
        }
    })
}






