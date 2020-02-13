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
function createStyle(feature){
    return {
        fillColor: createColor(feature.properties.mag),
        color: feature.properties.color, 
        radius: multiMag(feature.properties.mag)
    }
}





function multiMag(mag){
    if (mag == 0 ){
        return 1
    }
    else {
        return mag*5
    }
}

function createColor(mag){
        
        if (mag > 5){
            return "#FF0000"
        }
        if (mag > 4){
            return "#B45F04"
        }
        if (mag > 3){
            return "#FACC2E"
        }
        if (mag > 2){
            return "#FFFF00"
        }
        if (mag > 1){
            return "#BFFF00"
        }
        else {
            return "#6E6E6E"
        }
    }

    L.geoJSON(thedata, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: createStyle,
        
        onEachFeature: function (feature, layer) {layer.bindPopup("Location: " + feature.properties.place + "<br>Mag: " + feature.properties.mag)}
    }).addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    var grades = [0, 1, 2, 3, 4, 5];
    var colors = ["#6E6E6E", "#BFFF00", "FFFF00", "#FACC2E", "#B45F04", "#FF0000"];

    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}

return div;
};

legend.addTo(map);

})
    