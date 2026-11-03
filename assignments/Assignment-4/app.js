// In a file named app.js (or organized into modules if you prefer):

// fetchData(query)        — async, checks response.ok, throws on failure
// normalizeData(rawDocs)  — transforms raw API fields into clean, consistent objects
// showLoading()           — clears the results region, shows loading message
// showError(message)      — clears the results region, shows error
// showEmpty()             — clears the results region, shows "no results" message
// renderResults(items)    — renders an array of normalized objects to the DOM
// The normalization function must provide default values for any API fields that may be absent (e.g., author: doc.author_name?.[0] ?? 'Unknown').
const bar          = document.getElementById('search-bar');
const input         = document.getElementById('search-input');
const resultsPlace = document.getElementById('results-place');

// fetchData(query)— async, checks response.ok, throws on failure
async function fetchData(query) {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12`); // change the URL 

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
// Parses and returns the JSON
  return await response.json();
}

// normalizeData(rawDocs)— transforms raw API fields into clean, consistent objects
function normalizeData(rawDocs) {
     return rawDocs.map(doc => ({ // transform each raw doc into a normalized object change the fields to match your API response
    title: doc.title || 'Unknown Title',
    author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
    year: doc.first_publish_year || 'Unknown Year',
  }));
}

// showLoading()— clears the results region, shows loading message
function showLoading() {
    resultsPlace.replaceChildren();
    const loadingMessage = document.createElement('p');
    loadingMessage.className = 'status-loading';
    loadingMessage.textContent = 'Loading…';
    loadingMessage.classList.add('aria-describedby');
    loadingMessage.setAttribute('aria-describedby', 'status: searching for data');
    resultsPlace.appendChild(loadingMessage);
}

// showError(message)— clears the results region, shows error
function showError(message) {
  resultsPlace.replaceChildren();
  const errorMessage = document.createElement('p');
  errorMessage.className = 'status-error';
  errorMessage.textContent = message;
  errorMessage.classList.add('aria-describedby');
  errorMessage.setAttribute('aria-describedby', message);
  resultsPlace.appendChild(errorMessage);
}

// showEmpty()— clears the results region, shows "no results" message
function showEmpty() {
  resultsPlace.replaceChildren();
  const emptyMessage = document.createElement('p');
  emptyMessage.className = 'status-empty';
  emptyMessage.textContent = 'No results found.';
  emptyMessage.classList.add('aria-describedby');
  emptyMessage.setAttribute('aria-describedby', 'status: no results found');
  resultsPlace.appendChild(emptyMessage);
}

// renderResults(items)    — renders an array of normalized objects to the DOM
function renderResults(items) { //TODO change the list sections to match incoming data
  resultsPlace.replaceChildren();
  const list = document.createElement('ul');
  items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.title} by ${item.author} (${item.year})`;
    list.appendChild(listItem);
  });
    resultsPlace.appendChild(list);
}

// Search handler 
