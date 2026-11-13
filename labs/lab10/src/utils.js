// utils.js      — formatPrice, getCategories, filterProducts (exported)
//provides helper functions to format prices, get categories, and filter products.

//Move formatPrice, getCategories, and filterProducts here. Each must be a named export. 
// getCategories and filterProducts accept productList as a parameter — remove the reference to the global products variable.

// Pure utility functions for formatting and filtering product data.

// export function formatPrice(amount) { ... }
// export function getCategories(productList) { ... }
// export function filterProducts(productList, category) { ... }

export function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

export function getCategories(productList) {
  const cats = productList.map(p => p.category);
  return ['All', ...new Set(cats)];
}

export function filterProducts(productList, category) {
  if (category === 'All') return productList;
  return productList.filter(p => p.category === category);
}
