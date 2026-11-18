ARCHITECTURE.md — A short document (5–15 lines) inside assignments/assignment-5/ that diagrams which files import from which. A plain-text diagram is fine:
main.js → events.js → api.js
                    → normalize.js
                    → render.js
api.js, normalize.js, and render.js all export their respective funtions into events.js. api.js holds fetchData, normalize.js holds normalizeData, and render.js holds showLoading, showError, showEmpty, and renderResults. events.js holds the event listeners and exports initSearch() which is imported into main.js. main.js holds the dom content loaded that runs initSearch().