async function getWeatherAndTimeByCity(cityName) {
  // 1. Convert city name to coordinates (Open-Meteo Geocoding API)
  const geoUrl = `https://open-meteo.com{encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`Location not found: ${cityName}`);
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // 2. Fetch weather & local timezone using those coordinates
  const weatherUrl = `https://open-meteo.com{latitude}&longitude=${longitude}&current=temperature_2m,precipitation,wind_speed_10m,cloud_cover&hourly=temperature_2m,precipitation,wind_speed_10m,cloud_cover&timezone=auto`;
  const weatherRes = await fetch(weatherUrl);
  const data = await weatherRes.json();

  // 3. Format the location's current local time cleanly
  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone: data.timezone,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  return {
    location: `${name}, ${country}`,
    timezone: data.timezone,
    localTime: localTime,
    currentWeather: {
      temperature: `${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
      precipitation: `${data.current.precipitation} ${data.current_units.precipitation}`,
      windSpeed: `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`,
      cloudCover: `${data.current.cloud_cover} ${data.current_units.cloud_cover}`,
    },
    hourly: data.hourly, // Arrays of hourly times & values matching your screenshot
  };
}

// Example usage:
getWeatherAndTimeByCity('Tokyo')
  .then((result) => console.log(result))
  .catch((err) => console.error(err));