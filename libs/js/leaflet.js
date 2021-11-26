

// const addMarker = (map, element) => {
//     let city = L.marker([element.coordinates.latitude, element.coordinates.longitude]);
//     console.log(element.coordinates.latitude)
// }


const loadMap = (lat, lng,countryCode, countryName, cityResult, parkResult, beachResult, poiResult) => {


    //Tile options for base layers
    let satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=PmYmuNRZMsQcvPp3DsmN', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }),
    voyager = L.tileLayer('https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}.png?key=PmYmuNRZMsQcvPp3DsmN', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    });


    /////////////////////city data
    let city1Coords = [cityResult[0].coordinates.latitude, cityResult[0].coordinates.longitude];
    let city2Coords = [cityResult[1].coordinates.latitude, cityResult[1].coordinates.longitude];
    let city3Coords = [cityResult[2].coordinates.latitude, cityResult[2].coordinates.longitude];
    let city4Coords = [cityResult[3].coordinates.latitude, cityResult[3].coordinates.longitude];
    let city5Coords = [cityResult[4].coordinates.latitude, cityResult[4].coordinates.longitude];
    let city6Coords = [cityResult[5].coordinates.latitude, cityResult[5].coordinates.longitude];
    let city7Coords = [cityResult[6].coordinates.latitude, cityResult[6].coordinates.longitude];
    let city8Coords = [cityResult[7].coordinates.latitude, cityResult[7].coordinates.longitude];
    let city9Coords = [cityResult[8].coordinates.latitude, cityResult[8].coordinates.longitude];
    let city10Coords = [cityResult[9].coordinates.latitude, cityResult[9].coordinates.longitude];
    
    let city1 = L.marker(city1Coords).bindPopup('This is Littleton, CO.'),
        city2    = L.marker(city2Coords).bindPopup('This is Denver, CO.'),
        city3    = L.marker(city3Coords).bindPopup('This is Aurora, CO.'),
        city4    = L.marker(city4Coords).bindPopup('This is Golden, CO.'),
        city5    = L.marker(city5Coords).bindPopup('This is Golden, CO.'),
        city6    = L.marker(city6Coords).bindPopup('This is Golden, CO.'),
        city7   = L.marker(city7Coords).bindPopup('This is Golden, CO.'),
        city8    = L.marker(city8Coords).bindPopup('This is Golden, CO.'),
        city9    = L.marker(city9Coords).bindPopup('This is Golden, CO.'),
        city10    = L.marker(city10Coords).bindPopup('This is Golden, CO.');
    
    let cities = L.layerGroup([city1, city2, city3, city4, city5, city6, city7, city8, city9, city10]);


    /////////////////////park data
    let park1Coords = [parkResult[0].coordinates.latitude, parkResult[0].coordinates.longitude];
    let park2Coords = [parkResult[1].coordinates.latitude, parkResult[1].coordinates.longitude];
    let park3Coords = [parkResult[2].coordinates.latitude, parkResult[2].coordinates.longitude];
    let park4Coords = [parkResult[3].coordinates.latitude, parkResult[3].coordinates.longitude];
    let park5Coords = [parkResult[4].coordinates.latitude, parkResult[4].coordinates.longitude];
    let park6Coords = [parkResult[5].coordinates.latitude, parkResult[5].coordinates.longitude];
    let park7Coords = [parkResult[6].coordinates.latitude, parkResult[6].coordinates.longitude];
    let park8Coords = [parkResult[7].coordinates.latitude, parkResult[7].coordinates.longitude];
    let park9Coords = [parkResult[8].coordinates.latitude, parkResult[8].coordinates.longitude];
    let park10Coords = [parkResult[9].coordinates.latitude, parkResult[9].coordinates.longitude];
    
    let park1 = L.marker(park1Coords).bindPopup('This is Littleton, CO.'),
        park2    = L.marker(park2Coords).bindPopup('This is Denver, CO.'),
        park3    = L.marker(park3Coords).bindPopup('This is Aurora, CO.'),
        park4    = L.marker(park4Coords).bindPopup('This is Golden, CO.'),
        park5    = L.marker(park5Coords).bindPopup('This is Golden, CO.'),
        park6    = L.marker(park6Coords).bindPopup('This is Golden, CO.'),
        park7   = L.marker(park7Coords).bindPopup('This is Golden, CO.'),
        park8   = L.marker(park8Coords).bindPopup('This is Golden, CO.'),
        park9    = L.marker(park9Coords).bindPopup('This is Golden, CO.'),
        park10   = L.marker(park10Coords).bindPopup('This is Golden, CO.');
    
    let parks = L.layerGroup([park1, park2, park3, park4, park5, park6, park7, park8, park9, park10]);

    /////////////////////beach data
    let beach1Coords = [beachResult[0].coordinates.latitude, beachResult[0].coordinates.longitude];
    let beach2Coords = [beachResult[1].coordinates.latitude, beachResult[1].coordinates.longitude];
    let beach3Coords = [beachResult[2].coordinates.latitude, beachResult[2].coordinates.longitude];
    let beach4Coords = [beachResult[3].coordinates.latitude, beachResult[3].coordinates.longitude];
    let beach5Coords = [beachResult[4].coordinates.latitude, beachResult[4].coordinates.longitude];
    let beach6Coords = [beachResult[5].coordinates.latitude, beachResult[5].coordinates.longitude];
    let beach7Coords = [beachResult[6].coordinates.latitude, beachResult[6].coordinates.longitude];
    let beach8Coords = [beachResult[7].coordinates.latitude, beachResult[7].coordinates.longitude];
    let beach9Coords = [beachResult[8].coordinates.latitude, beachResult[8].coordinates.longitude];
    let beach10Coords = [beachResult[9].coordinates.latitude, beachResult[9].coordinates.longitude];
    
    let beach1 = L.marker(beach1Coords).bindPopup('This is Littleton, CO.'),
        beach2    = L.marker(beach2Coords).bindPopup('This is Denver, CO.'),
        beach3    = L.marker(beach3Coords).bindPopup('This is Aurora, CO.'),
        beach4    = L.marker(beach4Coords).bindPopup('This is Golden, CO.'),
        beach5    = L.marker(beach5Coords).bindPopup('This is Golden, CO.'),
        beach6    = L.marker(beach6Coords).bindPopup('This is Golden, CO.'),
        beach7   = L.marker(beach7Coords).bindPopup('This is Golden, CO.'),
        beach8   = L.marker(beach8Coords).bindPopup('This is Golden, CO.'),
        beach9    = L.marker(beach9Coords).bindPopup('This is Golden, CO.'),
        beach10   = L.marker(beach10Coords).bindPopup('This is Golden, CO.');
    
    let beaches = L.layerGroup([beach1, beach2, beach3, beach4, beach5, beach6, beach7, beach8, beach9, beach10]);

    /////////////////////beach data
    
    let poi1Coords = [poiResult[0].coordinates.latitude, poiResult[0].coordinates.longitude];
    let poi2Coords = [poiResult[1].coordinates.latitude, poiResult[1].coordinates.longitude];
    let poi3Coords = [poiResult[2].coordinates.latitude, poiResult[2].coordinates.longitude];
    let poi4Coords = [poiResult[3].coordinates.latitude, poiResult[3].coordinates.longitude];
    let poi5Coords = [poiResult[4].coordinates.latitude, poiResult[4].coordinates.longitude];
    let poi6Coords = [poiResult[5].coordinates.latitude, poiResult[5].coordinates.longitude];
    let poi7Coords = [poiResult[6].coordinates.latitude, poiResult[6].coordinates.longitude];
    let poi8Coords = [poiResult[7].coordinates.latitude, poiResult[7].coordinates.longitude];
    let poi9Coords = [poiResult[8].coordinates.latitude, poiResult[8].coordinates.longitude];
    let poi10Coords = [poiResult[9].coordinates.latitude, poiResult[9].coordinates.longitude];
    
    let poi1 = L.marker(poi1Coords).bindPopup('This is Littleton, CO.'),
        poi2    = L.marker(poi2Coords).bindPopup('This is Denver, CO.'),
        poi3    = L.marker(poi3Coords).bindPopup('This is Aurora, CO.'),
        poi4    = L.marker(poi4Coords).bindPopup('This is Golden, CO.'),
        poi5    = L.marker(poi5Coords).bindPopup('This is Golden, CO.'),
        poi6    = L.marker(poi6Coords).bindPopup('This is Golden, CO.'),
        poi7   = L.marker(poi7Coords).bindPopup('This is Golden, CO.'),
        poi8   = L.marker(poi8Coords).bindPopup('This is Golden, CO.'),
        poi9    = L.marker(poi9Coords).bindPopup('This is Golden, CO.'),
        poi10   = L.marker(poi10Coords).bindPopup('This is Golden, CO.');
    
    let pois = L.layerGroup([poi1, poi2, poi3, poi4, poi5, poi6, poi7, poi8, poi9, poi10]);

    //Initialises the map
    const map = L.map('map', {layers: [satellite, cities, parks, beaches]}).setView([lat, lng], 3);

    let baseMaps = {
        "Satellite": satellite,
        "Voyager": voyager
    };

    let overlayMaps = {
        "Cities": cities,
        "Parks": parks,
        "Beaches": beaches,
        "Place of Interest": pois
    };
    
    // Create additional Control placeholders
    function addControlPlaceholders(map) {
        var corners = map._controlCorners,
            l = 'leaflet-',
            container = map._controlContainer;

        function createCorner(vSide, hSide) {
            let className = l + vSide + ' ' + l + hSide;

            corners[vSide + hSide] = L.DomUtil.create('div', className, container);
        }

        createCorner('verticalcenter', 'left');
        createCorner('verticalcenter', 'right');
    }

    addControlPlaceholders(map);

    // Zoom control position
    map.zoomControl.setPosition('verticalcenterright');

    //Layer control position
    let layerControl = L.control.layers(baseMaps, overlayMaps, {position: 'verticalcenterright'}).addTo(map);

    // Scale control position
    // L.control.scale({position: 'verticalcenterright'}).addTo(map);

    //User location borders
    L.geoJSON(findBorders(borders, countryName)).addTo(map);

    //Add user location marker
    var user = L.marker([lat, lng]).bindPopup('This is your wonderful self.').addTo(map);

    function findBorders(borders, countryName){
        for(let i = 0; i < borders.features.length; i++){
            if (borders.features[i].properties.name == countryName){
                return borders.features[i];
            } 
        }
    } 
}
