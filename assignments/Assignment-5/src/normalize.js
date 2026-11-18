// normalize.js -  data transformation functions
// Named export: normalizeBooks(docs) (or equivalent)
// Pure function: input in, output out, no side effects
// Provides defaults for all fields that may be absent

// normalizeData(rawDocs)— transforms raw API fields into clean, consistent objects
export function normalizeData(rawDocs) {
     return rawDocs.map(doc => ({ // transform each raw doc into a normalized object change the fields to match your API response
    title: doc.title || 'Unknown Title',
    author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
    year: doc.first_publish_year || 'Unknown Year',
    editions: doc.edition_count || 'Unknown Number of Editions',
    language: doc.language ? doc.language[0] : 'Unknown Language',
    ebookAccess: doc.ebook_access ? 'Available' : 'Not Available',
  }));
}
