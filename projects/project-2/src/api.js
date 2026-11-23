//api.js retireves data from weather api

import { fetchWeatherApi } from 'openmeteo';

async function fetchData(lat, lon) {
 const params = {
	latitude: lat,
	longitude: lon,
	hourly: ["temperature_2m", "precipitation", "wind_speed_10m", "cloud_cover"],
	timezone: "auto",
	wind_speed_unit: "mph",
	temperature_unit: "fahrenheit",
	precipitation_unit: "inch",
};

const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
const response = responses[0];

// Extract hourly values as a Float32Array
const hourly = response.hourly();
const temperatures = hourly.variables(0).valuesArray();
//console.log(temperatures);

// Process first location. Add a for-loop for multiple locations or weather models
//const response = responses[0];

const p = document.createElement("p");

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${Math.abs(latitude)}°${latitude < 0 ? 'S' : 'N'} ${Math.abs(longitude)}°${longitude < 0 ? 'W' : 'E'}`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0).valuesArray(),
		precipitation: hourly.variables(1).valuesArray(),
		wind_speed_10m: hourly.variables(2).valuesArray(),
		cloud_cover: hourly.variables(3).valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nHourly data:\n", weatherData.hourly)

// Convert to a compact JSON string
const jsonString = JSON.stringify(weatherData);

// Or convert to a formatted, readable JSON string (2-space indentation)
const prettyJsonString = JSON.stringify(weatherData, null, 2);

p.textContent = "Latitude: "+latitude+" Longitude: "+longitude;
p.textContent += prettyJsonString;
document.body.appendChild(p);

  return;
}

// function normalizeData(rawDocs) {
//      return rawDocs.map(doc => ({ // transform each raw doc into a normalized object change the fields to match your API response
//     lat: doc.title || 'Unknown Title',
//     lon: doc.author_name ? doc.author_name[0] : 'Unknown Author',
//     timezone: doc.first_publish_year || 'Unknown Year',
//     temp: doc.edition_count || 'Unknown Number of Editions',
//     precitptation: doc.language ? doc.language[0] : 'Unknown Language',
//     windSpeed: doc.ebook_access ? 'Available' : 'Not Available',
//     cloudCover: doc. 
//   }));
// }


document.addEventListener("DOMContentLoaded", async (event) => {
 fetchData(41.0782,-112.06);
});
