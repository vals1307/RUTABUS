document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    const map = L.map('map').setView([23.2494, -106.4111], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    // Configuración específica para cada ruta (definida en cada HTML)
    if (typeof routeConfig !== 'undefined') {
        // Añadir marcadores para cada parada
        routeConfig.stops.forEach(stop => {
            L.marker(stop.coords)
                .bindPopup(`<b>${stop.name}</b>`)
                .addTo(map);
        });
        
        // Añadir línea de ruta
        if (routeConfig.coords && routeConfig.coords.length > 1) {
            L.polyline(routeConfig.coords, {
                color: '#0078D7',
                weight: 6,
                opacity: 0.8
            }).addTo(map);
            
            // Ajustar vista del mapa para mostrar toda la ruta
            map.fitBounds(routeConfig.coords);
        }
    }
});