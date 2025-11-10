async function getWeather() {
    let city = document.getElementById("city").value;
    if (!city) return;

    // Fetching from the api to get the latitude and longitude of the city
    let geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    // Parsing the data to json so that we can use it
    let geoData = await geo.json();

    // If the city is not found, results will be undefined so handiling that edge case
    if (!geoData.results) {
        document.getElementById("box").innerHTML = "city not found ✘";
        return;
    }
    // Got the latitude and longitude from the geoData

    let lat = geoData.results[0].latitude;
    let lon = geoData.results[0].longitude;

    // Fetching the weather data using the latitude and longitude
    let api = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    let data = await api.json();

    // Getting the required data from the fetched data like temperature, windspeed and winddirection
    let temp = data.current_weather.temperature;
    let wind = data.current_weather.windspeed;
    let windDirection = data.current_weather.winddirection;

    document.getElementById("box").innerHTML =
        `🌤 ${temp}°C<br>💨 ${wind} km/h <br>💨 ${windDirection}`;
}