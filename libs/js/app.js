$('#countrySelect').on('change', function() {
    alert( this.value );
    showPosition()
  });


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
}

// User location error
const showError = (error) => {
    if(error.PERMISSION_DENIED){
        alert("The User have denied the request for Geolocation.");
        let lat = 55;
        let lng = -4;
        // countryCodeSearch(lat, lng);
    }
}



//currency converter
const select = document.querySelectorAll('.currency');
const number = document.getElementById('number');
const output = document.getElementById('currencyOutput');

fetch('https://api.frankfurter.app/currencies').then((data) => data.json())
.then((data) => {
    display(data);
});

function display(data) {
    const entries = Object.entries(data);
    for (let i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`;
    }
}

function updateValue() {
    let currency1 = select[0].value;
    let currency2 = select[1].value;

    let value = number.value;

    if(currency1 != currency2) {
        convert(currency1, currency2, value);
    } else {
        alert("Choose different currencies");
    }
}

function convert(currency1, currency2, value) {
    const host = "api.frankfurter.app";

    fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
    .then((val) => val.json())
    .then((val) => {
        console.log(Object.values(val.rates)[0]);
        output.value = Object.values(val.rates)[0];
    });
}


function wikiSearch(countryName) {
    let ids = "";
    let links = [];
    let results = [];

    fetch("https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=" + countryName)
    .then(response =>{
        return response.json();
    })
    .then(result => {
        results = result.query.search;
        for(var i = 0; i < results.length; i++) {
            if (results[i+1] != null) {
                ids += results[i].pageid + "|";
            } else {
                ids += results[i].pageid;
            }
        }
    })
    .then(a => {
        fetch("https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&origin=*&format=json&pageids=" + ids)
        .then(idresult => {
            return idresult.json();
        })
        .then(idresult => {
            for (i in idresult.query.pages) {
                links.push(idresult.query.pages[i].fullurl);
            }
        })
        .then(g => {
            document.getElementById("output").innerHTML="";
            for(let i = 0; i < results.length; i++){
                if (i < 3) {
                    document.getElementById("output").innerHTML += "<br><br><a href='" + links[i] + "'target='_blank'>" + results[i].title + "</a><br>" + results[i].snippet + "... Click title to read full article.";
                }
            }
        });
    });
}


///////////////////////////////////////////////////////////////AJAX////////////////////////////////////////////////////////////////////////////////


//Select option
function selectOption() {
    $.ajax({
        url: "libs/php/getAllCountries.php",
        type: "POST",
        dataType: 'json',
        timeout: 5000,
        success: function(result) {
            // console.log(result);
            const options = [];
            for (i = 0; i < result.data.length; i++) {
                options.push(result.data[i].countryName);
            }
            options.forEach(country => {
                $('#countrySelect').append($(`<option value='${country}'>${country}</option>`));
        }
            )
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('nope');
        }
    });
}

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
            // getWikiLinks(countryName);
            selectOption();
            wikiSearch(countryName);
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

                $('#continent').html(result['data'][0]['continentName']);
                $('#capital').html(result['data'][0]['capital']);
                $('#countryName').html(result['data'][0]['countryName']);
                $('#population').html(result['data'][0]['population']);
                $('#currencyCode').html(result['data'][0]['currencyCode']);
                $('#area').html(result['data'][0]['areaInSqKm']);

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






