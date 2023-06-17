
// code to dynamically create dropdown options
// var leagueNames = ['EPL', 'Bundesliga', 'LaLiga', 'Ligue1', 'SerieA']
// d3.select('#selDataset')   // select 'select' element from html with id = 'selDataset
//     .selectAll('option')
//     .data(leagueNames)
//     .enter()
//     .append('option')
//     .attr('value', value => value)
//     .text(value => value)

let map = null

function createMap(europeanStadiums) {
  // Create the tile layer that will be the background of our map.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Street Map": street,
    "Topographic": topo
  }


  // Create an overlayMaps object to hold the Stadiums layer.
  let overlayMaps = {
    "Footbal Stadiums": europeanStadiums
  }

  // Create the map object with options.
  let Coords = [55.3555, 4.1743];
  let mapZoomLevel = 6;
  let myMap = L.map("map-id", {
    center: Coords,
    zoom: mapZoomLevel,
    layers: [street, europeanStadiums]
  })

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)

  return myMap
}

// Create the createMarkers function.
function createMarkers(response) {
  console.log(response)
  // Pull the "stadiums" property from response.data
  let stadiums = response.features

  // Initialize an array to hold the Stadium markers.
  let stadiumMarkers = []
  console.log(stadiums)

  // Loop through the Stadiums array.
  for (let i = 0; i < stadiums.length; i++) {
    let stadium = stadiums[i]
    console.log(stadium)
    let stadCoords = [stadium.geometry.coordinates[0], stadium.geometry.coordinates[1]]
    console.log(stadCoords)

    var soccerIcon = L.icon({
      iconUrl: '../static/football_marker.png',
      iconSize: [50, 50], // Adjust the size of the icon as needed
    });


    // For each Stadium, create a marker, and bind a popup with the Stadiums's name.
    let stadiumMarker = L.marker((stadCoords), { icon: soccerIcon }).bindPopup(`<h4> ${stadium.properties.stadium_name} </h4>\
    <hr><h4>Capacity: ${stadium.properties.capacity}</h4><hr><h4>Fact: ${stadium.properties.stadium_fact} </h4>`)

    // Add the marker to the stadiumMarkers array.
    // console.log(stadCoords)
    stadiumMarkers.push(stadiumMarker)
  }
  console.log(stadiumMarkers)
  // Create a layer group that's made from the stadium markers array, and pass it to the createMap function.
  map = createMap(L.layerGroup(stadiumMarkers))
}


// Perform an API call to the Stadmium API to get the station information. Call createMarkers when it completes.
// d3.json('/api/stadiums').then(createMarkers(data))
d3.json("/api/stadiums").then(data => {
  response = data
  createMarkers(response)
})

// intial code to create sunburst chart using EPL data
d3.json('/api/goals/EPL').then(data => {
  console.log(data)
  let goals = data

  let dataSunburst = [{
    type: "sunburst",
    labels: [goals.labels],
    parents: [goals.parents],
    values: [goals.values],
    outsidetextfont: { size: 20, color: "#377eb8" },
    // leaf: {opacity: 0.4},
    marker: { line: { width: 2 } },
  }];

  let layoutSunburst = {
    width: 500,
    height: 500
  }


  Plotly.newPlot('sunburst', dataSunburst, layoutSunburst)//, sunlayout);

})

//var sunlayout = {
//  margin: {l: 0, r: 0, b: 0, t:0},
//  sunburstcolorway:["#636efa","#ef553b","#00cc96"],

function updateLeaflet(league) {
 
  // update leaflet code
  //  first we need to code to remove existing marker
  //  then vreate new markers based on league selected
  var selectedValue = league

  // Update map coordinates based on dropdown value
  switch (selectedValue) {
    case 'EPL':
      map.setView([52.3555, 1.1743], 5);
      break;
    case 'Bundesliga':
      map.setView([50.1109, 8.6821], 5);
      break;
    case 'LaLiga':
      map.setView([40.4168, 3.7038], 5);
      break;
    case 'Ligue1':
      map.setView([46.2276, 2.2137], 5);
      break;
    case 'SerieA':
      map.setView([41.8719, 12.5674], 5);
      break;
  }
}

// Add event listener for dropdown change

d3.selectAll('#selDataset').on('change', function () {
  console.log(this.value)
  selectedValue(this.value)
})

//         // update sunburst code
//     })
// }

function updateBarLine(league) {
  url = "/api/wages/points/" + league
  d3.json(url).then(data => {
    console.log(data)
    let leagueWagePoints = data

    let xPoints = leagueWagePoints.points.slice(0, 6); // avg points for all the seasons for top 6 teams
    let xWage = leagueWagePoints.avg_wage.slice(0, 6); // avg wage for all the seasons for top 6 teams
    let yLabels = leagueWagePoints.squad_name.slice(0, 6); // Top 6 team labels

    for (let i = 0; i < xPoints.length; i++) {
      xPoints[i] = xPoints[i].toFixed(2)
    }
    let colorMarker;
    let colorMarkerLine;

    if (leagueWagePoints.league === 'EPL') {
      colorMarker = 'rgba(204,0,0,0.6)'
      colorMarkerLine = 'rgba(204,0,0,1.0)'
    } else if (leagueWagePoints.league === 'Bundesliga') {
      colorMarker = 'rgba(255,204,0,0.6)'
      colorMarkerLine = 'rgba(255,204,0,1.0)'
    } else if (leagueWagePoints.league === 'SerieA') {
      colorMarker = 'rgba(0,146,70,0.6)'
      colorMarkerLine = 'rgba(0,146,70,1.0)'
    } else if (leagueWagePoints.league === 'LaLiga') {
      colorMarker = 'rgba(170,0,0,0.6)'
      colorMarkerLine = 'rgba(170,0,0,1.0)'
    } else if (leagueWagePoints.league === 'Ligue1') {
      colorMarker = 'rgba(0,35,150,0.6)'
      colorMarkerLine = 'rgba(0,35,150,1.0)'
    }

    let traceBar = {
      x: xPoints,
      y: yLabels,
      xaxis: 'x1',
      yaxis: 'y1',
      type: 'bar',
      marker: {
        color: colorMarker,  // color based on league
        line: {
          color: colorMarkerLine,
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
        color: colorMarker //  color based on league
      },
      name: 'Wage in USD Million'
    };
    var data = [traceBar, traceLine];

    let layoutBarLine = {
      title: 'Average Points and Wage for top 6 teams in 5 seasons(2017-2022)',
      xaxis1: {
        range: [Math.min(xPoints) - 10, Math.max(xPoints) + 10],
        domain: [0, 0.5],
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true
      },
      xaxis2: {
        range: [Math.min(xWage) - 20, Math.max(xWage) + 20],
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
      width: 800,
      height: 600,
      // paper_bgcolor: 'rgb(248,248,255)',
      // plot_bgcolor: 'rgb(248,248,255)',
      annotations: []
    };

    for (let i = 0; i < xPoints.length; i++) {
      let result1 = {
        xref: 'x1',
        yref: 'y1',
        x: xPoints[i] + 5,
        y: yLabels[i],
        text: xPoints[i],
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(128,128,128)'
        },
        showarrow: false,
      };
      let result2 = {
        xref: 'x2',
        yref: 'y1',
        x: xWage[i] + 15,
        y: yLabels[i],
        text: xWage[i] + 'M',
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(128,128,128)'
        },
        showarrow: false
      };
      layoutBarLine.annotations.push(result1, result2);
    }

    Plotly.newPlot('barline', data, layoutBarLine);
  })
}


function optionChanged(value) {
  console.log(value)
  updateBarLine(value)
  updateLeaflet(value)
}

updateBarLine('EPL') // populate barline graph for EPL when page initially loads