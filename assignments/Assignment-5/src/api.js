//api.js - fetch functions only
// Named export: fetchBooks(query) (or equivalent for your API)
// Checks response.ok; throws a descriptive error if false
// No DOM access — no document.getElementById, no querySelector

// fetchData(query)— async, checks response.ok, throws on failure
export async function fetchData(query) {
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