const loadMap = (lat, lng, countryName) => {

    

    const map = L.map('map').setView([lat, lng], 3);
    
    let satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=PmYmuNRZMsQcvPp3DsmN', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(map);

    


    //adds scale to the map
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

// Change the position of the Zoom Control to a newly created placeholder.
map.zoomControl.setPosition('verticalcenterright');

// // You can also put other controls in the same placeholder.
// L.control.scale({position: 'verticalcenterright'}).addTo(map);
//     L.control.scale({
//         position: 'topright'
//     }).addTo(map);

    //add borders
    L.geoJSON(findBorders(borders, countryName)).addTo(map);

    var user = L.marker([lat, lng]).bindPopup('This is your wonderful self.').addTo(map);

    function findBorders(borders, countryName){
        for(let i = 0; i < borders.features.length; i++){
            if (borders.features[i].properties.name == countryName){
                return borders.features[i];
            } 
        }
    }

    var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    var cities = L.layerGroup([littleton, denver, aurora, golden]);


}