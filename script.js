const apiKey = "20da423906ccf27bec8c2d81c8f4a2eb";
const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");
const loadingEle = document.querySelector(".loading");
const errorEle = document.querySelector(".error");

formEle.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value.trim();
    
    if (!cityValue) {
        errorEle.textContent = "Please enter a city name.";
        errorEle.style.display = "block";
        return;
    }

    loadingEle.style.display = "block";
    errorEle.style.display = "none";
    weatherDataEle.style.display = "none";

    await getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response is not ok!");
        }

        const data = await response.json();
        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataEle.querySelector(".desc").textContent = `${description}`;
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
        weatherDataEle.style.display = "flex";
    } catch (err) {
        weatherDataEle.style.display = "none";
        errorEle.textContent = "An error occurred. Please try again.";
        errorEle.style.display = "block";
    } finally {
        loadingEle.style.display = "none";
    }
}
