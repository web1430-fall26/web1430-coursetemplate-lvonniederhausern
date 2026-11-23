// main.js - entry point: imports and initializes everything
import { initSearch } from "./events";

document.addEventListener("DOMContentLoaded", async (event) => {
    initSearch();
    console.log("DOM loaded");
    // You can safely select and manipulate elements here
});

// //WEATHER API
// const citys = [
//   { id: 1, name: "Alice", lat: 1, lon: 2 },
//   { id: 2, name: "Bob", lat: 1, lon: 2 },
//   { id: 3, name: "Charlie", lat: 1, lon: 2 }
// ];
// const selectElement = document.getElementById('roleSelect');

// citys.forEach((city) => {
//   const option = document.createElement('option');
//   option.value = city.name;
//   option.textContent = city.name;
//   selectElement.appendChild(option);
// });