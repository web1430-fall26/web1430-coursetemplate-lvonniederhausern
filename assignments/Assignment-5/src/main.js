// main.js - entry point: imports and initializes everything
// Imports initSearch from events.js and calls it
// Entry point only — no logic besides initialization
import { initSearch } from "./events";

document.addEventListener("DOMContentLoaded", async (event) => {
    initSearch();
    console.log("DOM loaded");
    // You can safely select and manipulate elements here
});