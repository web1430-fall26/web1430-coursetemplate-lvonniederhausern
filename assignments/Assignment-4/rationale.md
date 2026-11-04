Rationale (in rationale.md)
Write 5–7 sentences addressing:

What API did you choose and what data story does your page tell?

 I chose the Open Library Search API — https://openlibrary.org/search.json. The data story of my page is basically an online library search site. It gives you a large selection of books to search through and read details on them.

How does your normalization function protect your rendering code from inconsistent API responses?

If any fields are left empty or undefined when normalizing the data, it lists them as unknown instead. This makes it so the data can still be read even when unavailable.

Walk through one error path: what happens in the UI when the request fails?

My program will use a try-catch case. For example, after the loading screen, my program has a try case where it awaits the data. If the computer is unable to access the data from the API, it will catch an error that says to check your connection. 

What would you add or change if you were building this for a real audience?

I would make it so you have pages of cards so I don't have to limit the amount of data read in. I'm one of those people who prefers more information.

What did you verify about CORS support, rate limits, attribution, and data reliability before you committed to this API?

Browser access: The Open Library Search API supports cross-origin browser requests, so CORS will not block my app.
Rate limits / auth: Does the API limit how often you can request data, and do you need a key? No key is needed, and the Open Library Search API does enforce rate limits.
Attribution / terms: no since there are no copyrights over any of the matirial its all open source.
Data reliability: the data is moderately stable, yet the data is updated in real time. If any fields are missing, they will be replaced with Unknown, but if the service is down, it will have an error message pop up to check the connection.