const loadMap = (lat, lng, countryName) => {

    //Tile options for base layers
    let satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=PmYmuNRZMsQcvPp3DsmN', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }),
    voyager = L.tileLayer('https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}.png?key=PmYmuNRZMsQcvPp3DsmN', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    });


    let littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    let cities = L.layerGroup([littleton, denver, aurora, golden]);

    // base layers defined for controls

    //Initialises the map
    const map = L.map('map', {layers: [satellite, cities]}).setView([lat, lng], 3);

    let baseMaps = {
        "Satellite": satellite,
        "Voyager": voyager
    };

    let overlayMaps = {
        "Cities": cities
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