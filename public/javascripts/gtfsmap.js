var mymap = L.map('mapid').setView([34.6737, 133.9233], 14);

L.tileLayer(
	'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{ attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }
).addTo(mymap);

var geojsonMarkerOptions = {
	radius: 8,
	fillColor: "#ff7800",
	color: "#000",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};

getStops();

function onEachFeature(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.stop_name) {
		layer.bindPopup(feature.properties.stop_name);
	}
}

async function getStops(){
	const response = await fetch('stops');
	const json =  await response.json();
	
	L.geoJSON(json, {
		onEachFeature: onEachFeature,
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, geojsonMarkerOptions);
		}
	}).addTo(mymap);
}
