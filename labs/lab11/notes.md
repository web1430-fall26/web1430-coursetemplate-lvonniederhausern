Process reflection (in labs/lab11/notes.md)
Answer in 4–6 sentences:

When you changed selectedDepartment.value, what happened in the template and why?

When you change selectedDepartment .value, it filters the cards by the department selected. This is because there are if statements that check which department is selected and which cards have that same department, so it can display them. 

What is the difference between ref() and computed() — when would you use each?

a ref() creates a reactive state variable or reactive data. computed() creates a value that is derived from other reactive state. So it recalculates automatically when the data changes. You use ref() for strings, numbers, booleans, and arrays. computed() is for when you need to calculate or create a value that's dependent on other states, like combining, sorting, or formatting existing data.

What does key do in a v-for, and what happens if you omit it?

The :key gives each item in a V-for loop a unique identity so the computer can track each element accurately with Vue's virtual DOM. Removing the :key causes the computer to match based on index, which leads to bugs and unnecessary DOM updates. 