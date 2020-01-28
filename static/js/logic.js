var ACCESS_TOKEN = "pk.eyJ1IjoibWNvcmRyYXk4OCIsImEiOiJjazQwbmxyNjUwM2xzM2xtazRoNmtlMWhrIn0.XOMf2ncEjcflROwuTTp8Ug"
// var mymap = L.map('map').setView([51.505, -0.09], 13);

var backgroundmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: ACCESS_TOKEN
});

var map = L.map("map", {
    center: [
      41, -95
    ],
    zoom: 3
  });


  backgroundmap.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(thedata){
    function createColor(mag){
        if (mag != 0){
            return "#ff3333"
        }
    }

    L.geoJSON(thedata, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng);
        },
        style: function (feature) {
            return {color: feature.properties.color,
                fillColor: createColor(feature.properties.mag)}
        },
        onEachFeature: function (feature, layer) {layer.bindPopup()}
    }).addTo(map);


})
    