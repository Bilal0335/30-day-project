const apikey = '74c7287116baa73ce9d8ed68eaf7ddbc';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

// ✅ Auto-focus input on page load
window.addEventListener('load', () => {
  searchBox.focus();
});

async function checkweather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
  const response = await fetch(url);

  if (!response.ok) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    return;
  }

  const data = await response.json();
  console.log(data);

  document.querySelector('.error').style.display = 'none';
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

  const condition = data.weather[0].main;

  if (condition === 'Clouds') {
    weatherIcon.src = './images/clouds.png';
  } else if (condition === 'Clear') {
    weatherIcon.src = './images/clear.png';
  } else if (condition === 'Rain') {
    weatherIcon.src = './images/rain.png';
  } else if (condition === 'Snow') {
    weatherIcon.src = './images/snow.png';
  } else if (condition === 'Drizzle') {
    weatherIcon.src = './images/drizzle.png';
  } else if (condition === 'Mist') {
    weatherIcon.src = './images/mist.png';
  }

  document.querySelector('.weather').style.display = 'block';
}

searchBtn.addEventListener('click', () => {
  checkweather(searchBox.value);
  searchBox.blur();     // ✅ Remove focus from input
  searchBtn.blur();     // ✅ Remove focus from button
});

searchBox.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchBtn.click();  // Triggers above listener
    searchBox.blur();   // ✅ Just to be safe again
    searchBtn.blur();   // ✅ Remove focus from button
  }
});

