function selectOption() {
    let options = [];
    for (let i = 0; i < borders.features.length; i++) {
        let countryName = borders.features[i].properties.name;
        let countryCode = borders.features[i].properties.iso_a2;
        options.push({country: countryName, code: countryCode});
        // const sortedOptions = options.sort(optionsSort());
        options.sort(function(x,y) {
            if (x.country < y.country) return -1;
            if (x.country > y.country) return 1;
            return 0;
          })
    }
    options.forEach(country => {
        $('#countrySelect').append($(`<option value='${country.code}'>${country.country}</option>`));
    })

}

//Find user countryCode and countryName and push result to global array
function countryCodeSearch() {
    $.ajax({
        url: "libs/php/countryCode.php",
        type: "POST",
        dataType: 'json',
        timeout: 5000,
        data: {
            lat: coords[0].latitude,
            lng: coords[1].longitude
        },
        success: function(result) {   
            coords.push({countryName: result.data.countryName});
            coords.push({countryCode: result.data.countryCode});
            getCountryData();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    });
}

//Get country Information
function countryInfo() {
    let countryCode = coords[3].countryCode;
    $.ajax({
        url: "libs/php/countryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: countryCode
        },
        success: function(result) {

            if (result.status.name == "ok") {

                let formattedPopulation = result['data'][0]['population'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                let formattedArea = Math.round(result['data'][0]['areaInSqKm']).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                $('#continent').html(result['data'][0]['continentName']);
                $('#capital').html(result['data'][0]['capital']);
                $('#countryName').html(result['data'][0]['countryName']);
                $('#population').html(formattedPopulation);
                $('#currencyCode').html(result['data'][0]['currencyCode']);
                $('#area').html(formattedArea);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    });
}

//Get weather Information
function getWeather() {
    $.ajax({
        url: "libs/php/openWeatherMap.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: coords[0].latitude,
            lng: coords[1].longitude
        },
        success: function(result) {
            if (result.status.name == "ok") {

                //Convert Unix timestamps
                let formattedTime = new Date(result.current.dt * 1000).toLocaleTimeString("en-GB");
                let formattedSunrise = new Date(result.current.sunrise * 1000).toLocaleTimeString("en-GB");
                let formattedSunset = new Date((result.current.sunset * 1000) + (10800 * 1000)).toLocaleTimeString("en-GB");

                let capString = result['current']['weather'][0]['description'];
                capString = capString.replace(/\b\w/g, l => l.toUpperCase());

            
                $('#time').html(formattedTime);
                $('#sunrise').html(formattedSunrise);
                $('#sunset').html(formattedSunset);
                // $('#icon').html('Icon: ' + result['current']['weather'][0]['icon']);  create background weather image related to weather description
                $('#description').html(capString);
                $('#temp').html(result['current']['temp'] + ' ??C ');
                $('#windSpeed').html(result['current']['wind_speed'] + ' kph');

                let iconCode = result.current.weather[0].icon;
                let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                $('#wicon').attr('src', iconUrl);

                getLocation();
            }
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    });
}

//Get weather Information
function getLocation() {
    $.ajax({
        url: "libs/php/userExact.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: coords[0].latitude,
            lng: coords[1].longitude
        },
        success: function(result) {
            if (result.status.name == "ok") {
                $('#exactLocation').html(result.result);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    });
}

//Get city Information
function getCity() {
    let countryCode = coords[3].countryCode.toLowerCase();
    if (countryCode == 'gb') {
        countryCode = 'uk'
    }
    $.ajax({
        url: "libs/php/cities.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode,
            account: config.triposo_account,
            token: config.triposo_token
        },
        success: function(result) {
            let cityResult = result.results;
            for (i = 0; i < cityResult.length; i++) {
                let lat = cityResult[i].coordinates.latitude;
                let lng = cityResult[i].coordinates.longitude;
                let desc = cityResult[i].name;
                let snippet = cityResult[i].snippet;
                let latlng = [lat, lng];
                let cityMarker = L.marker(latlng, {icon: cityMarkerIcon}).bindPopup(desc + '<hr>' + snippet);
                cityMarker.addTo(cityMarkers);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)        }
    })
}

//Get park Information
function getPark() {
    let countryCode = coords[3].countryCode.toLowerCase();
    if (countryCode == 'gb') {
        countryCode = 'uk'
    }
    $.ajax({
        url: "libs/php/park.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode,
            account: config.triposo_account,
            token: config.triposo_token
        },
        success: function(result) {
            let parkResult = result.results;
            for (i = 0; i < parkResult.length; i++) {
                let lat = parkResult[i].coordinates.latitude;
                let lng = parkResult[i].coordinates.longitude;
                let latlng = [lat, lng];
                let desc = parkResult[i].name;
                let snippet = parkResult[i].snippet;
                let parkMarker = L.marker(latlng, {icon: parkMarkerIcon}).bindPopup(desc + '<hr>' + snippet);
                parkMarker.addTo(parkMarkers);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
}

//Get beach Information
function getBeach() {
    let countryCode = coords[3].countryCode.toLowerCase();
    if (countryCode == 'gb') {
        countryCode = 'uk'
    }
    $.ajax({
        url: "libs/php/beach.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode,
            account: config.triposo_account,
            token: config.triposo_token
        },
        success: function(result) {
            let beachResult = result.results;
            for (i = 0; i < beachResult.length; i++) {
                let lat = beachResult[i].coordinates.latitude;
                let lng = beachResult[i].coordinates.longitude;
                let latlng = [lat, lng];
                let desc = beachResult[i].name;
                let beachMarker = L.marker(latlng, {icon: beachMarkerIcon}).bindPopup(desc);
                beachMarker.addTo(beachMarkers);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus)
            console.log(jqXHR);
            console.log(errorThrown);
        }
    })
}

//Get poi Information
function getPoi() {
    let countryCode = coords[3].countryCode.toLowerCase();
    if (countryCode == 'gb') {
        countryCode = 'uk'
    }
    $.ajax({
        url: "libs/php/poi.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode,
            account: config.triposo_account,
            token: config.triposo_token
        },
        success: function(result) {
            let poiResult = result.results;
            for (i = 0; i < poiResult.length; i++) {
                let lat = poiResult[i].coordinates.latitude;
                let lng = poiResult[i].coordinates.longitude;
                let latlng = [lat, lng];
                let desc = poiResult[i].name;
                let snippet = poiResult[i].snippet;
                let poiMarker = L.marker(latlng, {icon: poiMarkerIcon}).bindPopup(desc);
                poiMarker.addTo(poiMarkers);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
}