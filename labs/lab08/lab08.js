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
  // TODO
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
  // TODO
// function normalizeBooks(docs) {
//   return docs.map(doc => ({
//     title: doc.title || 'Unknown Title',
//     author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
//     year: doc.first_publish_year || 'Unknown Year',
//   }));
// }

}

// ─── Part 3: UI state functions ───────────────────────────────────────────
// All functions clear resultsRegion and insert a new element using
// createElement + textContent (no innerHTML).

function showLoading() {
  // Clear resultsRegion, append a <p class="status-loading"> reading "Searching for books…"
  // TODO
}

function showError(message) {
  // Clear resultsRegion, append a <p class="status-error"> with the provided message
  // TODO
}

function showEmpty() {
  // Clear resultsRegion, append a <p class="status-empty"> reading "No books found. Try a different search."
  // TODO
}

function renderBooks(books) {
  // Clear resultsRegion.
  // For each book, create an <article class="book-card"> containing:
  //   - title in an <h2>
  //   - author in a <p class="book-author">
  //   - year in a <p class="book-year">
  // Append all cards to resultsRegion.
  // TODO
}

// ─── Part 4: Search handler ───────────────────────────────────────────────
// const form = document.getElementById('search-form');
// const input = document.getElementById('search-input');
// const resultsRegion = document.getElementById('results-region');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError('Please enter a search term.');
    return;
  }

  showLoading();
//  try {
//     const data = await fetchBooks(query);
//     const books = normalizeBooks(data.docs);

//     if (books.length === 0) {
//       showEmpty();
//     } else {
//       renderBooks(books);
//     }
  try {
    // TODO: call fetchBooks, normalizeBooks, then renderBooks or showEmpty
  } catch (error) {
    showError('Unable to load results. Please check your connection and try again.');
    console.error(error);
  }
});
