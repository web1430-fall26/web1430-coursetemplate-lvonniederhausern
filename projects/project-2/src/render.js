// render.js -  DOM rendering functions
const resultsPlace = document.getElementById('results-place');

// showLoading()— clears the results region, shows loading message
export function showLoading() {
    resultsPlace.replaceChildren();
    const loadingMessage = document.createElement('p');
    loadingMessage.className = 'status-loading';
    loadingMessage.textContent = 'Loading…';
    loadingMessage.classList.add('aria-describedby');
    loadingMessage.setAttribute('aria-describedby', 'status: searching for data');
    resultsPlace.appendChild(loadingMessage);
}

// showError(message)— clears the results region, shows error
export function showError(message) {
  resultsPlace.replaceChildren();
  const errorMessage = document.createElement('p');
  errorMessage.className = 'status-error';
  errorMessage.textContent = message;
  errorMessage.classList.add('aria-describedby');
  errorMessage.setAttribute('aria-describedby', message);
  resultsPlace.appendChild(errorMessage);
}

// showEmpty()— clears the results region, shows "no results" message
export function showEmpty() {
  resultsPlace.replaceChildren();
  const emptyMessage = document.createElement('p');
  emptyMessage.className = 'status-empty';
  emptyMessage.textContent = 'No results found.';
  emptyMessage.classList.add('aria-describedby');
  emptyMessage.setAttribute('aria-describedby', 'status: no results found');
  resultsPlace.appendChild(emptyMessage);
}

// renderResults(items)    — renders an array of normalized objects to the DOM
export function renderResults(items) { //TODO change the list sections to match incoming data
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
    `; // i know this isnt ideal code but i dont haver time to fix it.
    resultsPlace.appendChild(itemCard);
  });
}