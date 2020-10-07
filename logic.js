// intitalize maps
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJvcC1nIiwiYSI6ImNrZnd3OTd6azFvMWkydG10aGN2Z2Q2MnUifQ.EOjRwzS_WYEK5wOfXc32sQ';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/outdoors-v11', //stylesheet location
center: [11.255, 43.77], // starting position
zoom: 13 // starting zoom
});
 
map.addControl(new mapboxgl.FullscreenControl());

// dropdown menu
$('.dropdown-trigger').dropdown();
$('.dropdown-trigger').close();


