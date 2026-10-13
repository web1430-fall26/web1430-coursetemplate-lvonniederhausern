Project context — the fictional product or organization, and its audience

My fictional product will be painted rocks sold as paperweights for desks and other surfaces. The audience would mainly be desk workers. Workers, people who are at their desk for long periods of time and want some decoration to make it feel a bit more homey. It will also add some much-needed decoration and a burst of color to their otherwise paper-covered desks.

Colour palette — at least four named colours with hex values and confirmed contrast ratios
• Spartan Green (#18453B): Contrast ratio of 9.01:1 against white 
• Kelly Green (#008208): Contrast ratio of 4.64:1 against white 
• Excellence Green (#0B9A6D): Contrast ratio of 4.69:1 against white 
• Black (#000000): Contrast ratio of 21:1 against white

Typography plan — font families and a scale in rem
  Consolas, Courier New, and monospace. 
  --font-size-sm: 0.75rem;   /* 12px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-md: 1.25rem;   /* 20px */
  --font-size-lg: 1.5rem;    /* 24px */
  --font-size-xl: 2rem;      /* 32px */

Component list — the five components you will document
button - for checkout. role="button"
checkbox - for multi selection of products. aria-multiselectable="true"
card - holds products. aria="productCard" , aria-live="polite" 
text input - address imput for shipping. aria-describedby, aria-required="true" (to make it a requirement)
nav menu - navagate the site. role="menu", role="menuitem",  aria-current="page" 

the funcions may change based on future need.

Rough sketch — hand-drawn or digital, showing how the page is organised
projects\project-1\Project1RoughDraft.jpg

Accessibility plan — for each interactive pattern, how a keyboard user operates it and which ARIA attributes communicate its state

To start, the nav menu will be accessible through tabbing and selecting the Enter key on each selection. For the button, you will also be able to tab down to it and hit the Enter key to access the checkout. For the checkboxes, you will be able to tab down to each individual check mark and select it with either the Enter key or the mouse. Each product card should be able to be selected through tabbing. The text input should be accessed by the keyboard and submitted through Enter. I'm not entirely sure how much detail I'm supposed to go into this. But all actions covered or done through the mouse will be able to be replicated with just a keyboard. The Aria atributes are listed above.