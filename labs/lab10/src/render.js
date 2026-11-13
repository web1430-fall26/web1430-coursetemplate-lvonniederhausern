// render.js     — renderCard, renderAll (imports from utils and data)
//handles rendering of product cards and the product list to the DOM, using helper functions from utils.js and data from data.js.

//Move renderCard and renderAll here. Import formatPrice from utils.js. 
// Accept productList and container as parameters instead of querying the DOM inside the function.

// Renders product cards and the product grid.
import { formatPrice } from './utils.js';

// export function renderCard(product) { ... }

// export function renderGrid(productList, container) {
//   container.replaceChildren();   // safe way to clear all children
//   productList.forEach(p => container.append(renderCard(p)));
// }

export function renderGrid(productList, container) {
  container.replaceChildren();   // safe way to clear all children
  productList.forEach(p => container.append(renderCard(p)));
}

export function renderCard(product) {
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  h2.textContent = product.name;
  const price = document.createElement('p');
  price.textContent = formatPrice(product.price);
  const cat = document.createElement('p');
  cat.textContent = product.category;
  article.append(h2, price, cat);
  return article;
}

export function renderAll(productList, container) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  const filtered = filterProducts(activeCategory);
  filtered.forEach(p => grid.append(renderCard(p)));
}
