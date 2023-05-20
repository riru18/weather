document.getElementById('searchButton').addEventListener('click', function () {
    var cityName = document.getElementById('searchInput').value;
    getWeather(cityName);
});

function getWeather(cityName) {
    var apiKey = '4b362f15a49d41359b10deeaf50b0746';
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.weather && data.weather.length > 0) {
                document.getElementById('weatherContainer').innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
            } else {
                document.getElementById('weatherContainer').innerHTML = `
                <h2>Could not get weather for ${cityName}</h2>
            `;
            }
        })
        .catch(error => console.error('Error:', error));
}
