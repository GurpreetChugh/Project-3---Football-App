// code to dynamically create dropdown options
leagues = ['EPL', 'Bundesliga', 'LaLiga', 'Ligue1', 'SerieA']
d3.select('#selDataset')   // select 'select' element from html with id = 'selDataset
    .selectAll('option')
    .data(leagues)
    .enter()
    .append('option')
    .attr('value', value => value)
    .text(value => value)

// Initial code to create a leaflet map using EPL data
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
let Coords = [52.3555, 1.1743];
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

  // Pull the "stadiums" property from response.data and filter for England
  let stadiums = response.features.filter(function(feature) {
    return feature.properties.Country === "England";
  })

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
    let stadiumMarker = L.marker((stadCoords),{icon: soccerIcon}).bindPopup(`<h1> ${stadium.properties.Stadium}</h1><hr><h2>Capcity: ${stadium.properties.Cap}</h2><hr><h3>Fact: ${stadium.properties.Trivia}</h3>`)
    
    // Add the marker to the stadiumMarkers array.
    // console.log(stadCoords)
    stadiumMarkers.push(stadiumMarker)
  }
  // Create a layer group that's made from the stadium markers array, and pass it to the createMap function.
  createMap(L.layerGroup(stadiumMarkers ))
}


// Perform an API call to the Stadmium API to get the station information. Call createMarkers when it completes.
d3.json('stadiums_final.geojson').then(createMarkers);

// intial code to create sunburst chart using EPL data



//  intial code to create bar+line chart using EPL data

// var xPoints = [  ]; // avg points for all the seasons for top 6 teams
  
// var xWage = [ ]; // avg wage for all the seasons for top 6 teams
  
// var yLabels = []; // Top 6 team labels
  
// var traceBar = {
//     x: xPoints,
//     y: yLabels,
//     xaxis: 'x1',
//     yaxis: 'y1',
//     type: 'bar',
//     marker: {
//       color: 'rgba(50,171,96,0.6)',  // color based on league
//     //   line: {
//     //     color: 'rgba(50,171,96,1.0)',
//     //     width: 1
//     //   }
//     },
//     name: 'Points',
//     orientation: 'h'
//   };
  
//   var traceLine = {
//     x: xWage,
//     y: yLabels,
//     xaxis: 'x2',
//     yaxis: 'y1',
//     mode: 'lines+markers',
//     line: {
//       color: 'rgb(128,0,128)' //  color based on league
//     },
//     name: 'Wage'
//   };
  
//   var data = [traceBar, traceLine];
  
//   var layout = {
//     title: 'Average Points and Wage for top 6 teams in 5 seasons(2017-2022)',
//     xaxis1: {
//       range: [0, 100],
//       domain: [0, 0.5],
//       zeroline: false,
//       showline: false,
//       showticklabels: true,
//       showgrid: true
//     },
//     xaxis2: {
//       range: [100000000, 210000000],
//       domain: [0.5, 1],
//       zeroline: false,
//       showline: false,
//       showticklabels: true,
//       showgrid: true,
//       side: 'top',
//       dtick: 25000000
//     },
//     legend: {
//       x: 0.029,
//       y: 1.238,
//       font: {
//         size: 10
//       }
//     },
//     margin: {
//       l: 100,
//       r: 20,
//       t: 200,
//       b: 70
//     },
//     width: 600,
//     height: 600,
//     paper_bgcolor: 'rgb(248,248,255)',
//     plot_bgcolor: 'rgb(248,248,255)',
//     annotations: [
//     //   {
//     //     xref: 'paper',
//     //     yref: 'paper',
//     //     x: -0.2,
//     //     y: -0.109,
//     //     text: 'OECD ' + '(2015), Household savings (indicator), ' + 'Household net worth (indicator). doi: ' + '10.1787/cfc6f499-en (Accessed on 05 June 2015)',
//     //     showarrow: false,
//     //     font:{
//     //       family: 'Arial',
//     //       size: 10,
//     //       color: 'rgb(150,150,150)'
//     //     }
//     //   }
//     ]
//   };
  
//   for ( var i = 0 ; i < xPoints.length ; i++ ) {
//     var result = {
//       xref: 'x1',
//       yref: 'y1',
//       x: xPoints[i]+2.3,
//       y: yLabels[i],
//       text: xPoints[i],
//       font: {
//         family: 'Arial',
//         size: 12,
//         // color: 'rgb(50, 171, 96)' // color based on league
//       },
//        showarrow: false,
//     };
//     var result2 = {
//       xref: 'x2',
//       yref: 'y1',
//       x: xWage[i] + 10000000,
//       y: yLabels[i],
//       text: xWage[i] + ' M',
//       font: {
//         family: 'Arial',
//         size: 12,
//         // color: 'rgb(128, 0, 128)' //  color based on league
//       },
//        showarrow: false
//     };
//     layout.annotations.push(result, result2);
//   }
  
//   Plotly.newPlot('bar', data, layout);




//  with above page will load with EPL data by default

//  then we  write the code to handle event change when we select the league from drop down


// function update_leaflet(league) {
//     d3.json(league API).then(data => {
//         let response = data;
//         // update leaflet code
//         //  first we need to code to remove existing marker
//         //  then vreate new markers based on league selected

//     })
// }


// function update_sunBurst(league) {
//     d3.json(league API).then(data => {
//         let response = data;

//         // update sunburst code
//     })
// }

// function update_bar(league) {
//     d3.json(league API).then(data => {
//         let response = data;

//         // update bar code
//         let xPoints = []  // based on league selected
//         let xWage = [] // based on new league selected
//         let yLabels = [] // based on new league selected

//         let updateBar = {
//             x: [[xPoints], [xWage]],
//             y: [yLabels],
//             marker: {
//                 color: ['color 1', 'color 2']           
//             }
//         }

//         Plotly.restyle('bar', updateBar, [0, 1])
//     })
// }



// d3.select('select').on('change', function() {

//     update_leaflet(this.value)

//     update_sunburts(this.value)

//     update_bar(this.value)

// })

