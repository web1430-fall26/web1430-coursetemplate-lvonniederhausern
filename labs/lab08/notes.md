Process reflection (in notes.md)
Answer in 4–6 sentences:

What does response. okok tell you that the catch block does not?

response.ok tells you whether the server returned a successful HTTP status code, whereas a catch block only triggers if the request failed at the network level.

What happened when you removed an await — which one caused the most confusing error?

I have 3 awaits. The first one, when removed, caused the fetch request to fail due to it being undefined. The second didn't cause any visible errors when I tested it, except the page loaded faster. The third one threw an error since the map was undefined. This was probably because the data hadn't been read into the map yet.

How did you make the loading and error states accessible to a screen reader, not just visually?

To make the loading and error states accessible to a screen reader, I added an aria-describedby with the error message text so it can be accessed by screen readers. This, along with aria-polite, makes it so changes are read aloud for the user. 