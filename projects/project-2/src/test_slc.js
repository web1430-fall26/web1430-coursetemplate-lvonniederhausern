async function getSaltLakeCityWeatherAndTime() {
  // Salt Lake City, UT coordinates
  const latitude = 40.7608;
  const longitude = -111.8910;

  // Fetch current & hourly weather with auto timezone and US units
  const url = `https://open-meteo.com?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,wind_speed_10m,cloud_cover&hourly=temperature_2m,precipitation,wind_speed_10m,cloud_cover&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`;

  const response = await fetch(url);
  const data = await response.json();

  // Format the current local time in Salt Lake City (America/Denver)
  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone: data.timezone, // "America/Denver"
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  return {
    location: 'Salt Lake City, Utah',
    timezone: data.timezone,
    localTime: localTime,
    currentWeather: {
      temperature: `${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
      precipitation: `${data.current.precipitation} ${data.current_units.precipitation}`,
      windSpeed: `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`,
      cloudCover: `${data.current.cloud_cover} ${data.current_units.cloud_cover}`,
    },
    hourly: {
      time: data.hourly.time,
      temperature_2m: data.hourly.temperature_2m,
      precipitation: data.hourly.precipitation,
      wind_speed_10m: data.hourly.wind_speed_10m,
      cloud_cover: data.hourly.cloud_cover,
    },
  };
}

// Run the function
getSaltLakeCityWeatherAndTime()
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
