// events.js - event listener setup
// Named export: initSearch() (or equivalent)
// Attaches event listeners
// Calls functions from api.js, normalize.js, and render.js — no business logic of its own
import { fetchData } from './api.js';
import { normalizeData } from './normalize.js';
import { showLoading, showError, showEmpty, renderResults } from './render.js';

const bar          = document.getElementById('search-bar');
const input         = document.getElementById('search-input');
const detailsButtons = document.getElementById('results-place');

// details button click handler
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

export async function initSearch (){
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
}
