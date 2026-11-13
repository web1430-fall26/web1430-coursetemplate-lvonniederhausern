//events.js     — buildFilter, DOMContentLoaded handler (imports from render and utils)
// handles the building of the filter UI and sets up the DOMContentLoaded event listeners, using functions from render.js and utils.js.

//Move buildFilter here. Import what it needs. Accept the products array, active category state, and DOM containers as parameters 
// — don't reach for globals.

// Sets up filter button event listeners.
import { getCategories, filterProducts } from './utils.js';
import { renderGrid } from './render.js';

export function buildFilter(products, filterContainer, gridContainer) {
  getCategories(products).forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      const filtered = filterProducts(products, cat);
      renderGrid(filtered, gridContainer);
    });
    filterContainer.append(btn);
  });
}

// function buildFilter() {
//   const bar = document.getElementById('filter-bar');
//   getCategories().forEach(cat => {
//     const btn = document.createElement('button');
//     btn.textContent = cat;
//     btn.addEventListener('click', () => {
//       activeCategory = cat;
//       renderAll();
//     });
//     bar.append(btn);
//   });
// }