let coords = [];
let cityArray = [];

//Run scripts when page is loaded
document.addEventListener('DOMContentLoaded', () => {
    selectOption();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
});

//Get user location
const showPosition = (position) => {
    
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    coords.push({latitude: lat})
    coords.push({longitude: lng})

    countryCodeSearch();
}

// User location error
const showError = (error) => {
    if(error.PERMISSION_DENIED){
        alert("The User has denied the request for Geolocation. Please pick a country to continue.");
    }
}

const getCountryData = async () => {
    await getWeather();
    await countryInfo();
    await wikiSearch(coords[2].countryName);
    await getCity();
    await getPark();
    await getBeach();
    await getPoi();
    await loadLayers(map);
}

$('#countrySelect').on('change', function() {
    let selectValue = this.value;
    $.ajax({
        url: "libs/php/selectCountry.php",
        type: 'POST',
        dataType: 'json',
        data: {
            selectValue: selectValue
        },
        success: function(result) {
            coords.length = 0;
            let lat = result.results[0].coordinates.latitude;
            let lng = result.results[0].coordinates.longitude;
            
            coords.push({latitude: lat});
            coords.push({longitude: lng});

            countryCodeSearch();
            resetUserLocation(); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
  });


