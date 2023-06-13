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

