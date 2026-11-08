Project 2 Proposal – Milestone 1 Lauren von Niederhausern

Problem statement — who specifically, what task, why it is inconvenient today
Problem statement: Who specifically is this for? What task does the tool help them complete? Why is that task currently inconvenient without this tool? 

A weather app using the Open-Meteo (weather) — https://open-meteo.com API that tells you what the weather is like at certain locations and what to wear (sweater weather, etc.), with a saved list of locations the user wants to check. Usually, to see if I need a jacket, I stick my arm outside to feel the temperature. But since weather changes based on location, I'm not always accurate. This will fix that.

API — the endpoint URL, plus one real example of the raw JSON response
API: Which API provides the data needed to solve that problem? Paste the endpoint URL you will use. Paste one example of the raw JSON response (or a relevant excerpt).

Open-Meteo (weather) — https://open-meteo.com curl 
"https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m" 
{
  ...
  "current": {
    "time": "2022-01-01T15:00",
    "temperature_2m": 2.4,
    "wind_speed_10m": 11.9,
  },
  "hourly": {
    "time": ["2022-07-01T00:00","2022-07-01T01:00", ...],
    "wind_speed_10m": [3.16,3.02,3.3,3.14,3.2,2.95, ...],
    "temperature_2m": [13.7,13.3,12.8,12.3,11.8, ...],
    "relative_humidity_2m": [82,83,86,85,88,88,84,76, ...],
  }
}
It uses longitude and latitude, but I bet I can get it to work for popular cities.

Data model — one normalized item as a JavaScript object, each property typed and traced back to the raw response
Data model: What does one normalized item look like as a JavaScript object? List each property, its type, and where it comes from in the raw API response.

const weatherAtLocation = {
    //"data.item.latitude"
    latitude=52.52,
    //"data.item.longitude"
    longitude=13.41,
    //"data.item.current.time"
    time ="2022-01-01T15:00",
    //"data.item.current.temp"
    temperature_2m= 2.4,
    //"data.item.current.wind"
    wind_speed_10m= 11.9
}

UI sketch — loaded, loading, and error states
UI sketch: A wireframe showing the layout of the loaded state, the loading state, and the error state.

GitHub/web1430-coursetemplate-lvonniederhausern/projects/project-2/UTIsketch.jpg
UTIsketch is in project-2 folder.

localStorage plan — key name and the shape of the stored value
localStorage plan: What preferences or data will you persist? What is the key name and what does the stored value look like?

I will have an option to save location values so you can look up the weather there faster. The stored value will be savedLocation1, and I'll have 5 of those at max. It will save the longitude and latitude values for easy input.

API viability check — four bullets: CORS/browser access, rate limits or auth, attribution/terms, data reliability
API viability check: In 4 bullets, document CORS/browser access, rate limits or auth requirements, attribution or terms-of-use expectations, and how current/reliable the data appears to be.

• CORS/browser access: The API uses plain HTTP GET requests that return JSON.

• Rate limits or auth requirements: It's for non-commercial use, has no API key, and there's no sign-up or authentication required. You can make up to 10,000 daily API calls.

• Attribution & Terms of Use: The data is provided under the CC BY 4.0 data license, which permits users to freely use, redistribute, and use the data, provided that clear credit to Open-Meteo is given.

• Data Currency & Reliability: The data is robust and current; it is sourced from over 15 national weather services. It updates every 6 hours. 