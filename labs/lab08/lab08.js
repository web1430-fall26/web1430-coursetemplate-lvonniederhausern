// Lab 08 – Open Library Book Search
// API endpoint: https://openlibrary.org/search.json?title=[query]&limit=12
// No API key required.

// ─── DOM references ───────────────────────────────────────────────────────
const form          = document.getElementById('search-form');
const input         = document.getElementById('search-input');
const resultsRegion = document.getElementById('results-region');

// ─── Part 2: API and data functions ──────────────────────────────────────

// fetchBooks(query)
// Async function that:
//   1. Fetches the Open Library search endpoint for the given query (encodeURIComponent)
//Fetches https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12   
//2. Checks response.ok — if false, throws new Error(`Request failed: ${response.status}`)
//   3. Parses and returns the JSON
// Response shape: { numFound: N, docs: [ { title, author_name, first_publish_year }, ... ] }
async function fetchBooks(query) {

  const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
// Parses and returns the JSON
  return await response.json();
//The response shape is:
// {
//   "numFound": 123,
//   "docs": [
//     {
//       "title": "Dune",
//       "author_name": ["Frank Herbert"],
//       "first_publish_year": 1965
//     }
//   ]
// }
}

// normalizeBooks(docs)
// Accepts the docs array from the API response.
// Returns a new array of plain objects with guaranteed properties:
//   { title, author, year }
// Provide defaults for missing fields:
//   title:  doc.title || 'Unknown Title'
//   author: doc.author_name?.[0] ?? 'Unknown Author'
//   year:   doc.first_publish_year || 'Unknown Year'
function normalizeBooks(docs) {

  return docs.map(doc => ({
    title: doc.title || 'Unknown Title',
    author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
    year: doc.first_publish_year || 'Unknown Year',
  }));

}

// ─── Part 3: UI state functions ───────────────────────────────────────────
// All functions clear resultsRegion and insert a new element using
// createElement + textContent (no innerHTML).

function showLoading() {
  // Clear resultsRegion, append a <p class="status-loading"> reading "Searching for books…"

  resultsRegion.replaceChildren();
  const loadingMessage = document.createElement('p');
  loadingMessage.className = 'status-loading';
  loadingMessage.textContent = 'Searching for books…';
  loadingMessage.classList.add('aria-describedby');
  loadingMessage.setAttribute('aria-describedby', 'status: searching for books');
  resultsRegion.appendChild(loadingMessage);
}

function showError(message) {
  // Clear resultsRegion, append a <p class="status-error"> with the provided message

  resultsRegion.replaceChildren();
  const errorMessage = document.createElement('p');
  errorMessage.className = 'status-error';
  errorMessage.textContent = message;
  errorMessage.classList.add('aria-describedby');
  errorMessage.setAttribute('aria-describedby', message);
  resultsRegion.appendChild(errorMessage);
}

function showEmpty() {
  // Clear resultsRegion, append a <p class="status-empty"> reading "No books found. Try a different search."

  resultsRegion.replaceChildren();
  const emptyMessage = document.createElement('p');
  emptyMessage.className = 'status-empty';
  emptyMessage.classList.add('aria-describedby');
  emptyMessage.setAttribute('aria-describedby', 'error: no books found');
  emptyMessage.textContent = 'No books found. Try a different search.';
  resultsRegion.appendChild(emptyMessage);
}

function renderBooks(books) {
  // Clear resultsRegion.
  // For each book, create an <article class="book-card"> containing:
  //   - title in an <h2>
  //   - author in a <p class="book-author">
  //   - year in a <p class="book-year">
  // Append all cards to resultsRegion.

  resultsRegion.replaceChildren();
  books.forEach(book => {
    const bookCard = document.createElement('article');
    bookCard.className = 'book-card';
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p class="book-author">by ${book.author}</p>
      <p class="book-year">${book.year}</p>
    `;
    resultsRegion.appendChild(bookCard);
  });
}

// ─── Part 4: Search handler ───────────────────────────────────────────────

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError('Please enter a search term.');
    return;
  }

  showLoading();

  try {
    // call fetchBooks, normalizeBooks, then renderBooks or showEmpty
    const data = await fetchBooks(query);
    const books = normalizeBooks(data.docs);

    if (books.length === 0) {
      showEmpty();
    } else {
      renderBooks(books);
    }
  } catch (error) {
    showError('Unable to load results. Please check your connection and try again.');
    console.error(error);
  }
});
