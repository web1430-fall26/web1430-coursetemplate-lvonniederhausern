//In labs/lab05/lab05.js, write the following functions. Each must be a pure function — it should not modify products or any global state.

// filterByCategory(productList, category)
// Returns a new array containing only products where product.category === category. If category is 'All', returns the full list unchanged.

// getCategories(productList)
// Returns an array of unique category strings derived from the product list. The result should include 'All' as the first element.
// Example: ['All', 'Books', 'Apparel', 'Electronics', 'Accessories']
// Hint: use a Set to deduplicate: [...new Set(productList.map(p => p.category))]

// formatPrice(amount)
// Returns a formatted price string: 49.99 → '$49.99'.

// sortByPrice(productList, direction)
// Returns a new sorted array. direction is 'asc' (lowest first) or 'desc' (highest first). Do not mutate the original array — use .slice() before sorting.