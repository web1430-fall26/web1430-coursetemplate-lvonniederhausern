Process reflection (in notes.md)
Answer in 4–6 sentences:

What is the difference between input and blur events, and why is blur more appropriate for validation timing?

Input events are triggered at every keystroke the user makes. This can make errors show up prematurely. Blur is triggered once the element is not in focus. That way, the user can finish typing before it checks their work.

How does aria-describedby connect an error message to an input, and why does this matter?

aria-describedby is an attribute added to the HTML input element. It is used to read the error message to those with screen readers. It offers accessibility and helps users know what error was triggered.

What happened to focus when a form error appeared? What did you need to do to return focus correctly?

The focus was moved to the first invalid field. In order to move the focus, you needed to fix the form error in the invalid field. This makes it easier for the user to recognize and fix their mistakes.