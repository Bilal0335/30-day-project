const apikey = '74c7287116baa73ce9d8ed68eaf7ddbc';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      document.querySelector('.error').style.display = 'block';
      document.querySelector('.weather').style.display = 'none';
      return;
    }

    const data = await response.json();
    console.log(data);

    // Display main weather info
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    // Get weather condition
    const condition = data.weather[0].main.toLowerCase(); // e.g., "clouds"
    const description = data.weather[0].description;
    console.log('Condition:', condition);
    console.log('Description:', description);

    // Set appropriate icon
    switch (condition) {
      case 'clouds':
        weatherIcon.src = './images/clouds.png';
        break;
      case 'clear':
        weatherIcon.src = './images/clear.png';
        break;
      case 'rain':
        weatherIcon.src = './images/rain.png';
        break;
      case 'snow':
        weatherIcon.src = './images/snow.png';
        break;
      case 'drizzle':
        weatherIcon.src = './images/drizzle.png';
        break;
      case 'mist':
        weatherIcon.src = './images/mist.png';
        break;
      default:
        weatherIcon.src = './images/default.png'; // Add a fallback icon
        break;
    }

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
    
  } catch (error) {
    console.error('Error:', error);
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  }
}

// Default city on load
checkWeather('Karachi');

// Search button event
searchBtn.addEventListener('click', () => {
  const city = searchBox.value.trim();
  if (city !== '') {
    checkWeather(city);
  }
});


searchBox.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchBtn.click();  // Triggers above listener
    searchBox.blur();   // ✅ Just to be safe again
    searchBtn.blur();   // ✅ Remove focus from button
  }
});