Process reflection (in notes.md)
Answer in 4–6 sentences:

What happened when you tried to store a preferences object directly without JSON.stringify?

If you don't use JSON.stringify(), the object is converted into a string rather than kept as key-value or preference data. This is because  JavaScript automatically calls .toString() on objects.

How did you test the "first visit" experience after preferences were already stored?

I used an incognito window to prevent cookies and local storage from saving my preferences.

What is the difference between localStorage and sessionStorage, and would sessionStorage be appropriate for reading preferences? Why or why not?

localStorage keeps data indefinitely until explicitly deleted. sessionStorage destroys data when the session ends, for example, when you close a window or browser tab. sessionStorage wouldn't be appropriate since once the session ends, none of the preferences would be saved the next time you open it. localStorage would keep the preferences until deleted.