// render.js     — renderCard, renderAll (imports from utils and data)
//handles rendering of product cards and the product list to the DOM, using helper functions from utils.js and data from data.js.

//Move renderCard and renderAll here. Import formatPrice from utils.js. 
// Accept productList and container as parameters instead of querying the DOM inside the function.

// Renders product cards and the product grid.
import { formatPrice } from './utils.js';

export function renderCard(product) { ... }

export function renderGrid(productList, container) {
  container.replaceChildren();   // safe way to clear all children
  productList.forEach(p => container.append(renderCard(p)));
}