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
  //Open Library Search API — https://openlibrary.org/search.json
  const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20&fields=title,author_name,first_publish_year,edition_count,language,ebook_access`); 
  //const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12`); // change the URL 
      
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
// Parses and returns the JSON
  //console.log("allData response:", allData);
  return await response.json();
}

// normalizeData(rawDocs)— transforms raw API fields into clean, consistent objects
function normalizeData(rawDocs) {
     return rawDocs.map(doc => ({ // transform each raw doc into a normalized object change the fields to match your API response
    title: doc.title || 'Unknown Title',
    author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
    year: doc.first_publish_year || 'Unknown Year',
    editions: doc.edition_count || 'Unknown Number of Editions',
    language: doc.language ? doc.language[0] : 'Unknown Language',
    ebookAccess: doc.ebook_access ? 'Available' : 'Not Available',
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
  // resultsPlace.replaceChildren();
  // const list = document.createElement('ul');
  // items.forEach(item => {
  //   const listItem = document.createElement('li');
  //   listItem.textContent = `${item.title} by ${item.author} (${item.year})`;
  //   list.appendChild(listItem);
  // });
  //   resultsPlace.appendChild(list);

  resultsPlace.replaceChildren();
  items.forEach(item => {
    const itemCard = document.createElement('article');
    itemCard.className = 'item-card';
    itemCard.innerHTML = `
      <h2>${item.title}</h2>
      <p class="book-author">by ${item.author}</p>
      <p class="book-year">${item.year}</p>
      <button class="details-button">Details</button>
      <p class="book-editions" hidden>${item.editions}</p>
      <p class="book-language" hidden>${item.language}</p>
      <p class="book-ebook-access" hidden>${item.ebookAccess}</p>
    `;
    resultsPlace.appendChild(itemCard);
  });
}

// details button click handler
const detailsButtons = document.getElementById('results-place');
detailsButtons.addEventListener('click', (event) => {
  if (event.target.classList.contains('details-button')) { //if details button is clicked add more info about the book
    const bookCard = event.target.closest('.item-card');
    const allCards = Array.from(document.querySelectorAll('.item-card'));
    // 2. Filter out the one you currently have
    const allOtherCards = allCards.filter(card => card !== bookCard);
    allOtherCards.forEach(card => card.classList.remove('selected'));
    bookCard.classList.add('selected');
   document.getElementById('detail-view').innerHTML = `
      <h3>${bookCard.querySelector('h2').textContent}</h3>
      <p class="book-author">Author: written ${bookCard.querySelector('.book-author').textContent}</p>
      <p class="book-year">Year: ${bookCard.querySelector('.book-year').textContent}</p>
      <p class="book-editions">Number of Editions: ${bookCard.querySelector('.book-editions').textContent}</p>
      <p class="book-language">Language: ${bookCard.querySelector('.book-language').textContent}</p>
      <p class="book-ebook-access">eBook Access: ${bookCard.querySelector('.book-ebook-access').textContent}</p>
    `;
  }
    const detailView = document.getElementById('detail-view');
    detailsButtons.addEventListener('click', () => {
    detailView.focus();
    detailView.scrollIntoView({ behavior: 'smooth' });
    
    });
});

// Search handler 
bar.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError('Please enter a search term.');
    return;
  }

  showLoading();

  try {
    const data = await fetchData(query);
    const books = normalizeData(data.docs);

    if (books.length === 0) {
      showEmpty();
    } else {
      renderResults(books);
    }
  } catch (error) {
    showError('Unable to load results. Please check your connection and try again.');
    console.error(error);
  }
});



document.addEventListener("DOMContentLoaded", async (event) => {
  document.getElementById("page-site").setAttribute("hidden", true);
  document.getElementById("loading-site").removeAttribute("hidden");
  try{
    const initalLoadView = await fetchData("A");
    const firstBooks = normalizeData(initalLoadView.docs);
    renderResults(firstBooks);
  }catch (error){
    showError('Unable to load site. Please check your connection and try again.');
    console.error(error);
  }finally{
    document.getElementById("loading-site").setAttribute("hidden", true);
    document.getElementById("page-site").removeAttribute("hidden");
    
  }
 
    console.log("DOM loaded");
    
    // You can safely select and manipulate elements here
   
});
