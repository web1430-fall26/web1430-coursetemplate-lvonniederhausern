//part 1
// Write a function initFaq(faqContainer) that:

// Adds a single click listener to faqContainer (event delegation)
// When a click is detected, checks if event.target.matches('.faq-question')
// Finds all other open questions and closes them (removes the hidden attribute trick: toggle hidden on the answer div, set aria-expanded to the correct string)
// Toggles the clicked question open or closed
// Specifically, for the clicked button:

// Toggle aria-expanded between "true" and "false" (as strings — ARIA attributes are always strings)
// Toggle the hidden attribute on the associated answer panel (use answerEl.hidden = !answerEl.hidden or toggleAttribute('hidden'))
// For all other questions: set aria-expanded="false" and hidden = true (only one answer open at a time).

//part 2
// Write a function initTabs(tabListContainer) that handles both mouse and keyboard.

// Click behaviour

// Add a click listener to tabListContainer
// When a [role="tab"] button is clicked:
// Set aria-selected="false" on all tab buttons
// Hide all tab panels (set hidden = true)
// Set aria-selected="true" on the clicked tab
// Show the panel whose id matches event.target.getAttribute('aria-controls') (remove hidden)
// Keyboard behaviour — roving tabindex

// Because these buttons carry role="tab" inside a role="tablist", they are one composite widget, not three separate buttons. Assistive technology users expect one Tab press to enter the tablist, arrow keys to move between tabs, and the next Tab press to leave. See the roving-tabindex section of the Week 06 lecture notes for the reasoning and the full pattern.

// Keep exactly one tab in the tab order: the selected tab gets tabIndex = 0, every other tab gets tabIndex = -1. Update this every time the selection changes — including on click.
// Add a keydown listener to tabListContainer. On ArrowRight / ArrowLeft, move the selection one tab forward or backward and wrap around at the ends. On Home / End, jump to the first or last tab.
// Call event.preventDefault() when you handle an arrow key, so the page does not scroll.
// Call .focus() on the newly selected tab, so focus and selection stay together.
// Factor the shared work into one selectTab(index) helper and call it from both the click and the keydown paths — the two should not have separate copies of the logic.

// Do not apply roving tabindex to the accordion in Part 1. Each accordion header is an independent toggle, so all of them stay in the natural tab order.

// Sets aria-selected="false" on all tab buttons
// Hides all tab panels (set hidden = true)
// Sets aria-selected="true" on the clicked tab
// Shows the panel whose id matches event.target.getAttribute('aria-controls') (remove hidden)

//part 3
// At the bottom of your script (or in a DOMContentLoaded handler):

// initFaq(document.querySelector('.faq'));
// initTabs(document.querySelector('.tab-list'));