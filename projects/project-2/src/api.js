//api.js retireves data from weather api
const lat = 52.52; // Example latitude
const lon = 13.405; // Example longitude
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;
export async function fetchData(query) {
  //Open Library Search API — https://openlibrary.org/search.json
  const response = await fetch(apiUrl);      
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
// Parses and returns the JSON
  console.log("weather response:", response);
  return await response.json();
}
//import { fetchWeatherApi } from "openmeteo";

// const params = {
// 	latitude: 41.0782,
// 	longitude: -112.06,
// 	hourly: ["temperature_2m", "precipitation", "wind_speed_10m", "cloud_cover"],
// 	timezone: "auto",
// 	wind_speed_unit: "mph",
// 	temperature_unit: "fahrenheit",
// 	precipitation_unit: "inch",
// };
// const url = "https://api.open-meteo.com/v1/forecast";
// const responses = await fetchWeatherApi(url, params);

// // Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];

// // Attributes for timezone and location
// const latitude = response.latitude();
// const longitude = response.longitude();
// const elevation = response.elevation();
// const timezone = response.timezone();
// const timezoneAbbreviation = response.timezoneAbbreviation();
// const utcOffsetSeconds = response.utcOffsetSeconds();

// console.log(
// 	`\nCoordinates: ${Math.abs(latitude)}°${latitude < 0 ? 'S' : 'N'} ${Math.abs(longitude)}°${longitude < 0 ? 'W' : 'E'}`,
// 	`\nElevation: ${elevation}m asl`,
// 	`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
// 	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
// );

// const hourly = response.hourly()!;

// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
// 	hourly: {
// 		time: Array.from(
// 			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
// 			(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
// 		),
// 		temperature_2m: hourly.variables(0)!.valuesArray(),
// 		precipitation: hourly.variables(1)!.valuesArray(),
// 		wind_speed_10m: hourly.variables(2)!.valuesArray(),
// 		cloud_cover: hourly.variables(3)!.valuesArray(),
// 	},
// };

// // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
// console.log("\nHourly data:\n", weatherData.hourly)
