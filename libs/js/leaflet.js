// Tile options for base layers
// let satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=PmYmuNRZMsQcvPp3DsmN', {
//     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
// }),
// voyager = L.tileLayer('https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}.png?key=PmYmuNRZMsQcvPp3DsmN', {
//     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
// }),


//Sets global variables
let userMarker;
let countryBorder;
let layerControl;

let userGroup = L.layerGroup([]);
let cityLayer = L.layerGroup([]);
let beachLayer = L.layerGroup([]);
let parkLayer = L.layerGroup([]);
let poiLayer = L.layerGroup([]);

var userMarkerIcon = L.AwesomeMarkers.icon({
icon: 'user-alt', 
markerColor: 'darkpurple',
prefix: 'fa', 
iconColor: '#FFFFFF'
});

var cityMarkerIcon = L.AwesomeMarkers.icon({
icon: 'city', 
markerColor: 'blue',
prefix: 'fa', 
iconColor: '#FFFFFF'
});

var parkMarkerIcon = L.AwesomeMarkers.icon({
icon: 'tree', 
markerColor: 'darkgreen',
prefix: 'fa', 
iconColor: '#FFFFFF'
});

var beachMarkerIcon = L.AwesomeMarkers.icon({
icon: 'umbrella-beach', 
markerColor: 'orange',
prefix: 'fa', 
iconColor: '#FFFFFF'
});

var poiMarkerIcon = L.AwesomeMarkers.icon({
icon: 'place-of-worship', 
markerColor: 'darkred',
prefix: 'fa', 
iconColor: '#FFFFFF'
});

//Initiates the map with the specified layer
map = L.map('map', {
    center: [0,0],
    zoom: 1,
});

let mapStyle1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(mapStyle1);

//Creates control placement functionality
addControlPlaceholders(map);

// Zoom control position
map.zoomControl.setPosition('verticalcenterright');

function loadLayers(){
    let countryName = coords[2].countryName;
    let lat = coords[0].latitude;
    let lng = coords[1].longitude;

    if (!userMarker) {
        userMarker = L.marker([lat,lng], {icon: userMarkerIcon});
        userMarker.addTo(userGroup);
        userGroup.addTo(map);
    }

    //Creates base layers object to be added to controls
    let baseMaps = {
        // "Satellite": satellite,
        // "Voyager": voyager,
        "Map": mapStyle1
    };

    let overlays = {
        'Location': userGroup,
        "Cities": cityLayer,
        "Parks": parkLayer,
        "Beaches": beachLayer,
        "Places of Interest": poiLayer
    }

    if (layerControl) {
        layerControl.remove();
    }
    layerControl = L.control.layers(baseMaps, overlays, {position: 'verticalcenterright'});
    layerControl.addTo(map);
    
    countryBorder = L.geoJSON(findBorders(borders, countryName));
    map.addLayer(countryBorder);
    map.flyTo([lat, lng], 4);  
}

function resetUserLocation() {
    map.removeLayer(countryBorder);
    map.removeLayer(userMarker);
    cityLayer = L.layerGroup([]); 
    beachLayer = L.layerGroup([]); 
    parkLayer = L.layerGroup([]); 
    poiLayer = L.layerGroup([]); 
}

function findBorders(borders, countryName){
    for(let i = 0; i < borders.features.length; i++){
        if (borders.features[i].properties.name == countryName){
            return borders.features[i];
        } 
    }
} 

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

