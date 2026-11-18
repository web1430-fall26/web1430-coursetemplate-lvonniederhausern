Rationale (in rationale.md)
Write 4–6 sentences addressing:

What was the single hardest dependency to untangle when splitting the monolithic file?

Figuring out how to export initSearch from events.js to main.js took a while because initially I didn't have a function for this. It was all done in the DOMContentLoaded. Plus, all the JS files import into events.js, making it the glue that holds my program together.

How did you decide which functions belonged in api.js vs render.js vs utils.js?

Personally, I didn't have any programs to go into utils.js. I'm sure I'll find something later, but for api.js and render.js, I just followed the instructions. api.js holds only the fetch functions, and render.js holds the DOM rendering functions.

What did the dist/ folder contain that your src/ folder does not, and what does that tell you about what Vite did?

The dist/ folder holds the production-ready files, whereas my src/ folder holds the human-readable code. It holds a compiled index.html file, which Vite processes and optimizes for browser performance.

What would you organize differently if this project were going to grow to ten files?

I would probably have render.js divided into more JS files since it holds the most functions out of all of mine. 