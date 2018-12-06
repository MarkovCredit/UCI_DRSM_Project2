var markers= new L.markerClusterGroup();
var Director= new L.markerClusterGroup();


// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});


var street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
})

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark,
  Street: street
};

// Overlays that may be toggled on or off
var overlayMaps = {
  All_Jobs:markers,
  Data_Director:DirectorLayer
};

var myMap = L.map("map", {
  center: [38.7, -98.95],
  zoom: 5,
  layers: [ light, markers, Director]
});




// Use the list of sample names to populate the select options
  d3.json("/jobs", function(json_data) {

      var markers = L.markerClusterGroup();

  	  // Loop through data
      for (var i = 0; i < json_data.length; i++) {

         // Set the data location property to a variable
        var Latitude = json_data[i].Latitude;

        var Longitude = json_data[i].Longitude;

        // Check for location property
        if (Latitude, Longitude) {

        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([Latitude, Longitude])
        .bindPopup("City: " + json_data[i].City +
                    "<br> Title: " + json_data[i].Title +
                    "<br> Designations: " + json_data[i].Designation +
                    "<br> Company: " + json_data[i].Company
        ));
        }
      }
      myMap.addLayer(markers);

      var Director = L.markerClusterGroup();

  	  // Loop through data
      for (var i = 0; i < json_data.length; i++) {

        if (json_data[i].Designation === "Data Director") {

         // Set the data location property to a variable
        var Latitude = json_data[i].Latitude;

        var Longitude = json_data[i].Longitude;

        // Check for location property
        if (Latitude, Longitude) {

        // Add a new marker to the cluster group and bind a pop-up
        Director.addLayer(L.marker([Latitude, Longitude])
        .bindPopup("City: " + json_data[i].City +
                    "<br> Title: " + json_data[i].Title +
                    "<br> Designations: " + json_data[i].Designation +
                    "<br> Company: " + json_data[i].Company
        ));
        }
        }
      }
      var DirectorLayer = L.layerGroup(Director);
      
});

L.control.layers(baseMaps, overlayMaps, {collapsed: false }).addTo(myMap);