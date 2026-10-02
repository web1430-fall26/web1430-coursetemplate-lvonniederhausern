//In labs/lab05/lab05.js, write the following functions. Each must be a pure function — it should not modify products or any global state.
import { products } from './data.js';
const productList = products;
// filterByCategory(productList, category)
// Returns a new array containing only products where product.category === category. If category is 'All', returns the full list unchanged.ff
function filterByCategory (productList, category) {
  if (category === 'All') {
    return productList;
  }
  return productList.filter(product => product.category === category);
};


// getCategories(productList)
// Returns an array of unique category strings derived from the product list. The result should include 'All' as the first element.
// Example: ['All', 'Books', 'Apparel', 'Electronics', 'Accessories']
// Hint: use a Set to deduplicate: [...new Set(productList.map(p => p.category))]
function getCategories (productList) {
  const categories = [...new Set(productList.map(p => p.category))];
  return ['All', ...categories];
}

// formatPrice(amount)
// Returns a formatted price string: 49.99 → '$49.99'.
function formatPrice (amount) {
  return `$${amount.toFixed(2)}`;
}

// sortByPrice(productList, direction)
// Returns a new sorted array. direction is 'asc' (lowest first) or 'desc' (highest first). Do not mutate the original array — use .slice() before
//  sorting.
function sortByPrice (productList, direction) {
  const sorted = productList.slice().sort((a, b) => {
    if (direction === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  return sorted;
};

// In labs/lab05/lab05.js, on DOMContentLoaded:
document.addEventListener("DOMContentLoaded", (event) => {
    // Call renderCategoryFilter(getCategories(products), filterBar) to populate the filter
    renderCategoryFilter(getCategories(products), filterBar);
    
    // Call renderProductList(products, productGrid) to show all products initially
    renderProductList(products, productGrid);
    
    // Add a change listener to the category filter: when it changes, filter the products and re-render the list
    categoryFilter.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;

        // Filter products based on selection 
        let filtered;
        if (selectedCategory === 'all') {
            filtered = products;
        } else {
            filtered = products.filter(product => product.category === selectedCategory);
        }
        // Re-render the list
        renderProducts(filtered);
    });

    // Add a change listener to the sort select: when it changes, apply the sort and re-render (preserving any active category filter)

});



