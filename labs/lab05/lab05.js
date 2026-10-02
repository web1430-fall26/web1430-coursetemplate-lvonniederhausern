//In labs/lab05/lab05.js, write the following functions. Each must be a pure function — it should not modify products or any global state.
import { products } from './data.js';

const productList = products;
// filterByCategory(productList, category)
// Returns a new array containing only products where product.category === category. If category is 'All', returns the full list unchanged.
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
// Returns a new sorted array. direction is 'asc' (lowest first) or 'desc' (highest first). Do not mutate the original array — use .slice() before sorting.
function sortByPrice (productList, direction) {
  const sorted = productList.slice().sort((a, b) => {
    if (direction === 'asc') {
      return a.price - b.price;
    } else if (direction === 'desc') {
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
        //renderProducts(filtered);
        renderProductList(filtered, productGrid);
    });

    // Add a change listener to the sort select: when it changes, apply the sort and re-render (preserving any active category filter)
    sortSelect.addEventListener('change', (event) => {
        const sortOrder = sortSelect.value;
        const selectedCategory = categoryFilter.value;
        let filtered;
        if (selectedCategory === 'all') {
            filtered = products;
        } else {
            filtered = products.filter(product => product.category === selectedCategory);
        }
        const sorted = sortByPrice(filtered, sortOrder);
        renderProducts(sorted);
    });
        //check if this is better:
        //  const selectedCategory = event.target.value;
        // const sortOrder = sortSelect.value;
        // if (selectedCategory === 'all') {
        //     renderProducts(sortByPrice(products, sortOrder));
        // } else {
        //     const filtered = products.filter(product => product.category === selectedCategory);
        //     renderProducts(sortByPrice(filtered, sortOrder));
        // }
        // renderProducts(filtered);
});

// renderProductCard(product)
// Creates and returns an <article> element with class product-card containing:
function renderProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    // Product name in an <h2>
    const name = document.createElement('h2');
    name.textContent = product.name;
    card.appendChild(name);
    
    // Category in a <p> with class product-category
    const category = document.createElement('p');
    category.classList.add('product-category');
    category.textContent = product.category;
    card.appendChild(category);

    // Formatted price in a <p> with class product-price
    const price = document.createElement('p');
    price.classList.add('product-price');
    price.textContent = formatPrice(product.price);
    card.appendChild(price);

    // A stock status indicator: a <span> reading "In Stock" or "Out of Stock", with class in-stock or out-of-stock accordingly
    const stockStatus = document.createElement('span');
    stockStatus.classList.add(product.inStock ? 'in-stock' : 'out-of-stock');
    stockStatus.textContent = product.inStock ? 'In Stock' : 'Out of Stock';
    card.appendChild(stockStatus);

    // A <button> reading "Add to Cart" that is disabled when inStock is false
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    if (!product.inStock) {
        addToCartButton.disabled = true;
    } else {
        addToCartButton.disabled = false;
    }
    card.appendChild(addToCartButton);

    return card;
}

// renderProductList(productList, container)
// Clears container and appends a renderProductCard(product) for each product in the list. If the list is empty, display a <p> reading "No products found."
function renderProductList(productList, container) {
    container.innerHTML = '';
    if (productList.length === 0) {
        const noProducts = document.createElement('p');
        noProducts.textContent = 'No products found.';
        container.appendChild(noProducts);
    } else {
        productList.forEach(product => {
            container.appendChild(renderProductCard(product));
        });
    }
}

// renderCategoryFilter(categories, container)
// Renders a <select> element into container with one <option> per category. The value of each option should equal the category string.
function renderCategoryFilter(categories, container) {
    const select = document.createElement('select');
    select.id = 'category-filter';

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    select.appendChild(allOption);

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });

    container.appendChild(select);
}
