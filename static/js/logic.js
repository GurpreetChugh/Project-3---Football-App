// Store our API endpoint as queryUrl.
let queryUrl = fetch('stadiums_final.geojson')
.then(response => response.json())
.then(data => {
  // Process the GeoJSON data
  console.log(data);
  // Access specific properties or features
  // console.log(features);
  // console.log(feature[0].properties);
  // ...
})
.catch(error => {
  console.error('Error:', error);
});

// let url = '/api'
let Coords = [46.8182, 8.2275 ];
let mapZoomLevel = 5;


// Create the createMap function.
function createMap (europeanStadiums) {

  // Create the tile layer that will be the background of our map.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Street Map" : street,
    "Topographic" : topo
  }
  

  // Create an overlayMaps object to hold the Stadiums layer.
  let overlayMaps = {
    "Footbal Stadiums" : europeanStadiums
 }

  // Create the map object with options.
  let myMap = L.map("map", {
    center: Coords,
    zoom: mapZoomLevel,
    layers: [street, europeanStadiums]
  })

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)
}

// Create the createMarkers function.
function createMarkers(response) {

  // Pull the "stadiums" property from response.data.
  let stadiums = response.features

  // Initialize an array to hold the Stadium markers.
  let stadiumMarkers = []
  // console.log(stadiums)

  // Loop through the Stadiums array.
  for (let i = 0; i < stadiums.length; i++) {
    let stadium = stadiums[i]
    let stadCoords = [stadium.geometry.coordinates[1], stadium.geometry.coordinates[0]]

    var soccerIcon = L.icon({
      iconUrl: 'static/football_marker.png',
      iconSize: [50, 50], // Adjust the size of the icon as needed
    });
    
    
    // For each Stadium, create a marker, and bind a popup with the Stadiums's name.
    let stadiumMarker = L.marker((stadCoords),{icon: soccerIcon}).bindPopup(`<h1> ${stadium.properties.Stadium}, ${stadium.properties.City}, ${stadium.properties.Country}</h1><hr><h2>Capcity: ${stadium.properties.Cap}</h2><hr><h3>Fact: ${stadium.properties.Trivia}</h3>`)
    
    // Add the marker to the stadiumMarkers array.
    // console.log(stadCoords)
    stadiumMarkers.push(stadiumMarker)
  }
  // Create a layer group that's made from the stadium markers array, and pass it to the createMap function.
  createMap(L.layerGroup(stadiumMarkers ))
}


// Perform an API call to the Stadmium API to get the station information. Call createMarkers when it completes.
d3.json('stadiums_final.geojson').then(createMarkers);