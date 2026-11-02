// In a file named app.js (or organized into modules if you prefer):

// fetchData(query)        — async, checks response.ok, throws on failure
// normalizeData(rawDocs)  — transforms raw API fields into clean, consistent objects
// showLoading()           — clears the results region, shows loading message
// showError(message)      — clears the results region, shows error
// showEmpty()             — clears the results region, shows "no results" message
// renderResults(items)    — renders an array of normalized objects to the DOM
// The normalization function must provide default values for any API fields that may be absent (e.g., author: doc.author_name?.[0] ?? 'Unknown').