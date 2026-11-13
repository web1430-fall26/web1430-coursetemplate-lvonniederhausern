// main.js       — entry point: imports from events.js and initializes the app
// serves as the entry point for the application, importing event handlers from events.js and initializing the app on DOMContentLoaded.

//The entry point wires everything together:

// Entry point: initializes the product explorer on DOMContentLoaded.
import { products } from './data.js';
import { renderGrid } from './render.js';
import { buildFilter } from './events.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.getElementById('filter-bar');
  const productGrid = document.getElementById('product-grid');

  buildFilter(products, filterBar, productGrid);
  renderGrid(products, productGrid);
});