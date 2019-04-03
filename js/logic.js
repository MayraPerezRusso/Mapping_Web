
function markerSize(mag) {
  return mag * 15000;
}

function colorRange(magnituge) {

  switch (true) {
    case magnituge >= 5.0:
      return 'red';
      break;

    case magnituge >= 4.0:
      return 'orangered';
      break;

    case magnituge >= 3.0:
      return 'orange';
      break;

    case magnituge >= 2.0:
      return 'gold';
      break;

    case magnituge >= 1.0:
      return 'yellow';
      break;

    default:
      return 'greenyellow';
  };
};
// Create the createMap function 
var map = L.map("map-id", {
  center: [39.73915, -104.9847],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);
var geojson;
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url, function (response) {

  console.log(response.features[1]);


  var earthquake = [];
  // Loop through data
  for (var i = 0; i < response.features.length; i++) {

    // Set the data location property to a variable
    var location = response.features[i];

    // Check for location property
    if (location) {


      L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
        stroke: false,
        fillOpacity: 0.75,
        color: colorRange(location.properties.mag),
        fillColor: colorRange(location.properties.mag),
        radius: markerSize(location.properties.mag)
      })
        .bindPopup("<h1>" + location.properties.place + "</h1> <hr> <h3>Capacity: " + location.properties.mag)
        .addTo(map);
    }


  }
  var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function (myMap) {
    var legend_loc = L.DomUtil.create("div", "info legend"),
      levels = [0, 1, 2, 3, 4, 5]

    // Loop through magnitude intervals and generate a label with a colored square for each interval
    for (var i = 0; i < levels.length; i++) {
      legend_loc.innerHTML += '<h style="background-color: ' + colorRange(levels[i]) + ' ">""""</h> ' + [i] + (levels[i + 1] ? '&ndash;' +
        levels[i + 1] + '<br>' : '+');
    }
    return legend_loc;
  };

  legend.addTo(map);

});



