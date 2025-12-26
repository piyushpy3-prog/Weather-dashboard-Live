const apiKey = 'aa7274d226705a669f431018e59269c3';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();

        // Update UI
        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} km/h`;
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Change background based on weather
        updateBackground(data.weather[0].main);

    } catch (error) {
        alert(error.message);
    }
}

function updateBackground(condition) {
    const body = document.body;
    const colors = {
        Clear: 'linear-gradient(135deg, #f5af19, #f12711)',
        Clouds: 'linear-gradient(135deg, #bdc3c7, #2c3e50)',
        Rain: 'linear-gradient(135deg, #4b6cb7, #182848)',
        Snow: 'linear-gradient(135deg, #83a4d4, #b6fbff)',
        Default: 'linear-gradient(135deg, #1e3c72, #2a5298)'
    };
    body.style.background = colors[condition] || colors.Default;
}

searchBtn.addEventListener('click', () => checkWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkWeather(cityInput.value);
});

// Default Load
checkWeather('INDIA');