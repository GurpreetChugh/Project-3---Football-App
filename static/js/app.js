// code to dynamically create dropdown options
var leagueNames = ['EPL', 'Bundesliga', 'LaLiga', 'Ligue1', 'SerieA']
d3.select('#selDataset')   // select 'select' element from html with id = 'selDataset
    .selectAll('option')
    .data(leagueNames)
    .enter()
    .append('option')
    .attr('value', value => value)
    .text(value => value)

// Initial code to create a leaflet map using EPL data

let url = '/api/stadiums'
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
  let stadiums = response.features

  // Initialize an array to hold the Stadium markers.
  let stadiumMarkers = []
  // console.log(stadiums)

  // Loop through the Stadiums array.
  for (let i = 0; i < stadiums.length; i++) {
    let stadium = stadiums[i]
    let stadCoords = [stadium.geometry.coordinates[0], stadium.geometry.coordinates[1]]

    var soccerIcon = L.icon({
      iconUrl: '/football_marker.png',
      iconSize: [50, 50], // Adjust the size of the icon as needed
    });
    
    
    // For each Stadium, create a marker, and bind a popup with the Stadiums's name.
    let stadiumMarker = L.marker((stadCoords),{icon: soccerIcon}).bindPopup(`<h1> ${stadium.properties.stadium}</h1><hr><h2>Capcity: ${stadium.properties.cap}</h2><hr><h3>Fact: ${stadium.properties.trivia}</h3>`)
    
    // Add the marker to the stadiumMarkers array.
    // console.log(stadCoords)
    stadiumMarkers.push(stadiumMarker)
  }
  // Create a layer group that's made from the stadium markers array, and pass it to the createMap function.
  createMap(L.layerGroup(stadiumMarkers ))
}


// Perform an API call to the Stadmium API to get the station information. Call createMarkers when it completes.
d3.json(url).then(createMarkers);

// intial code to create sunburst chart using EPL data



//  intial code to create bar+line chart using EPL data

d3.json("/api/wages/points/EPL").then(data => {
    console.log(data)
    let leagueWagePoints = data

    let xPoints = leagueWagePoints.points.slice(0,6); // avg points for all the seasons for top 6 teams
    let xWage = leagueWagePoints.avg_wage.slice(0,6); // avg wage for all the seasons for top 6 teams
    let yLabels = leagueWagePoints.squad_name.slice(0,6); // Top 6 team labels

    let traceBar = {
        x: xPoints,
        y: yLabels,
        xaxis: 'x1',
        yaxis: 'y1',
        type: 'bar',
        marker: {
          color: 'rgba(204,0,0,0.6)',  // color based on league
          line: {
                color: 'rgba(204,0,0,1.0)',
                width: 1
                }
        },
        name: 'Points',
        orientation: 'h'
      };

    let traceLine = {
        x: xWage,
        y: yLabels,
        xaxis: 'x2',
        yaxis: 'y1',
        mode: 'lines+markers',
        line: {
          color: 'rgba(204,0,0,0.6)' //  color based on league
        },
        name: 'Wage in USD Million'
      };
      var data = [traceBar, traceLine];
  
    let layoutBarLine = {
    title: 'Average Points and Wage for top 6 teams in 5 seasons(2017-2022)',
        xaxis1: {
          range: [Math.min(...xPoints)-10, Math.max(...xPoints)+10],
          domain: [0, 0.5],
          zeroline: false,
          showline: false,
          showticklabels: true,
          showgrid: true
        },
        xaxis2: {
          range: [Math.min(...xWage)-20, Math.max(...xWage)+20],
          domain: [0.5, 1],
          zeroline: false,
          showline: false,
          showticklabels: true,
          showgrid: true,
          side: 'top',
          dtick: 20
        },
        legend: {
          x: 0.029,
          y: 1.238,
          font: {
            size: 10
          }
        },
        margin: {
          l: 100,
          r: 20,
          t: 200,
          b: 70
        },
        width: 400,
        height: 400,
        // paper_bgcolor: 'rgb(248,248,255)',
        // plot_bgcolor: 'rgb(248,248,255)',
        annotations: []
  };

  for ( let i = 0 ; i < xPoints.length ; i++ ) {
    let result1 = {
      xref: 'x1',
      yref: 'y1',
      x: xPoints[i]+2.3,
      y: yLabels[i],
      text: xPoints[i],
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(128,128,128)'   
      },
       showarrow: false,
    };
    var result2 = {
      xref: 'x2',
      yref: 'y1',
      x: xWage[i] + 5,
      y: yLabels[i],
      text: xWage[i] + 'M',
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(128,128,128)' 
      },
       showarrow: false
    };
    layout.annotations.push(result1, result2);
  }
  
  Plotly.newPlot('barline', data, layout);
}
)
//  with above page will load with EPL data by default

//  then we  write the code to handle event change when we select the league from drop down


// function updateLeaflet(league) {
//     d3.json(league API).then(data => {
//         let response = data;
//         // update leaflet code
//         //  first we need to code to remove existing marker
//         //  then vreate new markers based on league selected
      function onDropdownChange() {
        var selectedValue = d3.select('leaguenames').property('value');

        // Update map coordinates based on dropdown value
        switch (selectedValue) {
          case 'EPL':
            map.setview([52.3555, 1.1743], 5)
          case 'Bundesligua':
            map.setview([50.1109, 8.6821], 5);
            break;
          case 'LaLiga':
            map.setview([40.4168, 3.7038], 5);
            break;
            case 'Ligue1':
              map.setview([46.2276, 2.2137], 5);
            break;
          case 'SerieA':
            map.setview([41.8719, 12.5674], 5);
            break;
        }
      }
      // Add event listener for dropdown change
      d3.select('leagname').on('change', onDropdownChange);
//     })
// }


// function updateSunburst(league) {
//     d3.json(league API).then(data => {
//         let response = data;

//         // update sunburst code
//     })
// }

function updateBarLine(league) {
    let base_url = "api/wages/points/"

    d3.json(`${base_url}${league}`).then(data => {
        let updatedWagePoints = data;
        let xPoints = updatedWagePoints.points.slice(0,6);  
        let xWage = updatedWagePoints.avg_wage.slice(0,6);
        let yLabels = leagueWagePoints.squad_name.slice(0,6);

        if (league = 'EPL') {
          colorMarker = 'rgba(204,0,0,0.6)'
          colorMarkerLine = 'rgba(204,0,0,1.0)'
        }  else if (league = 'Bundesliga') {
          colorMarker= 'rgba(255,204,0,0.6)'
          colorMarkerLine = 'rgba(255,204,0,1.0)' 
        } else if (league = 'SerieA') {
          colorMarker = 'rgba(0,146,70,0.6)'
          colorMarkerLine = 'rgba(0,146,70,1.0)' 
        } else if (league = 'LaLiga') {
          colorMarker = 'rgba(170,0,0,0.6)'
          colorMarkerLine = 'rgba(170,0,0,1.0)' 
        } else if (league = 'Ligue1') {
          colorMarker = 'rgba(0,35,150,0.6)'
          colorMarkerLine = 'rgba(0,35,150,1.0)'
        } 


        let updatedData = [
          {
            x: [xPoints],
            y: [yLabels],
            marker: {
                color: colorMarker,
                line: {color: colorMarkerLine}          
            }
          },
          {
            x: [xWage],
            y: [yLabels],
            line: {color: colorMarker}
          }

        ]

        Plotly.restyle('bar', updatedData, [0, 1])
    })
}



d3.select('select').on('change', function() {
    let league_selected = this.value

//     updateLeaflet(league_selected)

//     updateSunburst(league_selected)

    updateBarLine(league_selected)

})

