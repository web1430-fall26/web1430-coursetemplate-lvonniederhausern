Process reflection (in notes.md)
Answer in 4–6 sentences:

Why is event delegation better than adding a click listener to each individual button?

Event delegation is better because it attaches a single event listener to one common element rather than building tons of event listeners for each individual button. This makes it so there's less memory used, it simplifies the code for easier maintenance, and it allows for automatic support for dynamic elements. 

What does aria-expanded communicate, and to whom?

It helps people with screen readers know whether a dropdown, menu, accordion, or disclosure widget is open or closed.

What would break if you used display: none in JavaScript directly instead of toggling the hidden attribute and controlling visibility through CSS?

When you use display: none in JavaScript, it breaks the original layout behavior. When you use it in CSS, the hidden attribute works like a switch you can toggle.

Why does the tablist use roving tabindex while the accordion does not?

The roving tabindex is used to cycle between tabs, acting like a lazy susan. To get to a tab after leaving, you need to cycle through all the tabs again to reach it. This wouldn't work well with an accordion.