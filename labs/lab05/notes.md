Process reflection (in notes.md)
Answer in 4–6 sentences:

What did your getCategories function look like before you used Set, and how did the approach change?

With Set involved, the code was much more condensed and easier to read. It reminded me of using a for loop to grab items in an array, but instead this was more focused and able to grab the data better.

What happened when you tried to sort the array in place with .sort() without .slice() first?

Suppose I were to do that. The original data would have been changed. Which, in this assignment, we were asked not to. slice makes a copy of the data that we can edit without changing the original. 

How did you keep the active category filter applied when the sort order changed?

In the event listener, I made it so it reads the data for its own gauge (categories and sorting by price) and the other one as well. Anytime a change is made, the website checks both so the right data is printed.