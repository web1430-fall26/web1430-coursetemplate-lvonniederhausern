Process reflection (in labs/lab10/notes.md)
Answer in 4–6 sentences:

What global variables did the original bundle rely on, and how did you eliminate them?

In the bundle, one of the global variables was let activeCategory = 'All'; this was removed in utils by automatically setting the initial filter to All in the getCategories and filterProducts functions. 

What happened when you forgot export on a function you were trying to import?

The browser would throw a syntax error because functions outside the file are private unless exported. Meaning the computer is unable to access the function.

What does the dist/ folder contain that src/ does not, and who is it for?

The dist folder is for web servers and end users. Src is for the developers. dist folder contains the transpiled code, files, and media files. 