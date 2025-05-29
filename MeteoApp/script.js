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

function getWeatherIcon(code) {
    return weatherIcons[code] || { icon: "❓", desc: "Sconosciuto" };
}

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const lat = latInput.value;
    const lon = lonInput.value;

    weatherDiv.textContent = "Caricamento...";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m,weather_code`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Errore nella richiesta API");
        const data = await res.json();

        if (!data.current) {
            weatherDiv.textContent = "Dati meteo non disponibili per queste coordinate.";
            return;
        }

         window.lastWeather = data;

        const c = data.current;
        const weather = getWeatherIcon(c.weather_code);

        weatherDiv.innerHTML = `
            <div style="font-size:2.5em">${weather.icon}</div>
            <b>${weather.desc}</b><br>
            <b>Latitudine:</b> ${data.latitude}<br>
            <b>Longitudine:</b> ${data.longitude}<br>
            <b>Temperatura:</b> ${c.temperature_2m} °C<br>
            <b>Umidità:</b> ${c.relative_humidity_2m} %<br>
            <b>Precipitazioni:</b> ${c.precipitation} mm<br>
            <b>Pioggia:</b> ${c.rain} mm<br>
            <b>Copertura nuvolosa:</b> ${c.cloud_cover} %<br>
            <b>Vento:</b> ${c.wind_speed_10m} km/h<br>
            <b>Weather code:</b> ${c.weather_code}
        `;
    } catch (err) {
        weatherDiv.textContent = "Errore: " + err.message;
    }
});

// Geolocalizzazione
geoBtn.addEventListener('click', function() {
    if (!navigator.geolocation) {
        alert("Geolocalizzazione non supportata dal browser.");
        return;
    }
    geoBtn.disabled = true;
    geoBtn.textContent = "Ricerca posizione...";
    navigator.geolocation.getCurrentPosition(
        pos => {
            latInput.value = pos.coords.latitude.toFixed(4);
            lonInput.value = pos.coords.longitude.toFixed(4);
            geoBtn.disabled = false;
            geoBtn.textContent = "Usa la mia posizione";
        },
        err => {
            alert("Impossibile ottenere la posizione.");
            geoBtn.disabled = false;
            geoBtn.textContent = "Usa la mia posizione";
        }
    );
});

