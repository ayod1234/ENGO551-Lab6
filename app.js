let client;
let map;
let marker;

// Initialize Map
function initMap() {
    map = L.map('map').setView([51.0447, -114.0719], 13); // Default to Calgary
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
}



// Within your simplify button event listener:
document.getElementById('simplifyBtn').addEventListener('click', () => {
    const layers = drawnItems.getLayers();
    if (layers.length === 0) return alert("Draw a line first!");

    const originalLayer = layers[0];
    
    // 1. Convert Leaflet layer to GeoJSON
    const geojson = originalLayer.toGeoJSON();

    // 2. Use Turf to simplify
    // tolerance: higher number = simpler line
    // highQuality: true uses Douglas-Peucker, false uses radial distance
    const options = { tolerance: 0.01, highQuality: true };
    const simplifiedGeoJSON = turf.simplify(geojson, options);

    // 3. Clear old simplified line and add the new one
    if (simplifiedLayer) map.removeLayer(simplifiedLayer);
    
    simplifiedLayer = L.geoJSON(simplifiedGeoJSON, {
        style: { color: '#ff4444', weight: 4, dashArray: '5, 10' }
    }).addTo(map);

    console.log("Original points:", geojson.geometry.coordinates.length);
    console.log("Simplified points:", simplifiedGeoJSON.geometry.coordinates.length);
});