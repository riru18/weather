document.getElementById('searchButton').addEventListener('click', function () {
    var cityName = document.getElementById('searchInput').value;
    getWeather(cityName);
});

function getWeather(cityName) {

    document.getElementById('weatherContainer').innerHTML = "";
    var apiKey = '4b362f15a49d41359b10deeaf50b0746';
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.weather && data.weather.length > 0) {
                var iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                var youtubeVideoId;
                switch (data.weather[0].main.toLowerCase()) {
                    case "rain":
                        youtubeVideoId = "B6eL_N0N5KI";
                        break;
                    case "clear":
                        youtubeVideoId = "hUjUhZ1Yy7Y";
                        break;
                    case "clouds":
                        youtubeVideoId = "WOIZGtgdwdI";
                        break;
                    // Añade más casos para otros tipos de clima
                }

                document.getElementById('weatherContainer').innerHTML = `
                <h1>Clima en ${data.name}</h1>
                <img src="${iconUrl}" alt="Weather icon">
                <p>${data.weather[0].description}</p>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Humedad: ${data.main.humidity}%</p>
                <div id="map" class="map" style="width: 100%; height: 400px;"></div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
            `;
                displayMap(data.coord.lat, data.coord.lon);
            } else {
                document.getElementById('weatherContainer').innerHTML = `
                <h2>No se pudo obtener el clima para ${cityName}</h2>
            `;
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayMap(lat, lon) {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: 12
        })
    });
}




