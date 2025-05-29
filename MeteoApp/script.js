const form = document.getElementById('location-form');
const weatherDiv = document.getElementById('weather-result');
const geoBtn = document.getElementById('geo-btn');
const latInput = document.getElementById('latitude');
const lonInput = document.getElementById('longitude');

// Mappa weather_code -> icona e descrizione
const weatherIcons = {
    0:  { icon: "☀️", desc: "Soleggiato" },
    1:  { icon: "🌤️", desc: "Prevalentemente sereno" },
    2:  { icon: "🌤️", desc: "Parzialmente nuvoloso" },
    3:  { icon: "☁️", desc: "Nuvoloso" },
    45: { icon: "🌫️", desc: "Nebbia" },
    48: { icon: "🌫️", desc: "Nebbia" },
    51: { icon: "🌦️", desc: "Pioviggine leggera" },
    53: { icon: "🌦️", desc: "Pioviggine moderata" },
    55: { icon: "🌦️", desc: "Pioviggine intensa" },
    61: { icon: "🌧️", desc: "Pioggia leggera" },
    63: { icon: "🌧️", desc: "Pioggia moderata" },
    65: { icon: "🌧️", desc: "Pioggia intensa" },
    71: { icon: "🌨️", desc: "Neve leggera" },
    73: { icon: "🌨️", desc: "Neve moderata" },
    75: { icon: "🌨️", desc: "Neve intensa" },
    80: { icon: "⛈️", desc: "Rovesci leggeri" },
    81: { icon: "⛈️", desc: "Rovesci moderati" },
    82: { icon: "⛈️", desc: "Rovesci forti" },
    95: { icon: "⛈️", desc: "Temporale" },
    99: { icon: "⛈️", desc: "Temporale forte" }
};
