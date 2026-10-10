//part 1

// Write a function initFaq(faqContainer) that:
function initFaq(faqContainer) {
    // Adds a single click listener to faqContainer (event delegation)
    faqContainer.addEventListener('click', (event) => {
        if (event.target.matches('.faq-question')) { // When a click is detected, checks if event.target.matches('.faq-question') 
            //if the selected element is a faq-question go through all the qs and find the matching answer.
            //grab aria-controls value of the clicked question
            const answerId = event.target.getAttribute('aria-controls');
            const answerEl = document.getElementById(answerId);
            // Toggles the clicked question open or closed
            if (answerEl.hidden) { //if the answer is hidden open it
                answerEl.hidden = false;
                event.target.setAttribute('aria-expanded', 'true');
                // Finds all other open questions and closes them (removes the hidden attribute trick: toggle hidden on the answer div, set aria-expanded to the correct string)
                for (const answer of document.getElementsByClassName("faq-answer")) {
                    if (answer !== answerEl) {
                        answer.hidden = true;
                        answer.setAttribute('aria-expanded', 'false');
                    }
                }
            } else { //if the answer is open, close it
                answerEl.hidden = true;
                event.target.setAttribute('aria-expanded', 'false');
            }
        }
    });
// Toggle aria-expanded between "true" and "false" (as strings — ARIA attributes are always strings)
// Toggle the hidden attribute on the associated answer panel (use answerEl.hidden = !answerEl.hidden or toggleAttribute('hidden'))
// For all other questions: set aria-expanded="false" and hidden = true (only one answer open at a time).
}

//part 2
// Write a function initTabs(tabListContainer) that handles both mouse and keyboard.
function initTabs(tabListContainer) {
    // Add a click listener to tabListContainer
    tabListContainer.addEventListener('click', (event) => {
        // When a [role="tab"] button is clicked:
        if (event.target.matches('[role="tab"]')) {
            // Set aria-selected="false" on all tab buttons
            const tabs = tabListContainer.querySelectorAll('[role="tab"]');
            tabs.forEach(tab => {
                tab.setAttribute('aria-selected', 'false');
                tab.tabIndex = -1; // Remove from tab order
                // Hide all tab panels (set hidden = true) TODO: simplify this
                const library = document.getElementById("panel-library");
                library.hidden = true;
                const gym = document.getElementById("panel-gym");
                gym.hidden = true;
                const dinning = document.getElementById("panel-dining");
                dinning.hidden = true;
            });
            event.target.setAttribute('aria-selected', 'true'); // Set aria-selected="true" on the clicked tab
            const tabId = event.target.getAttribute('aria-controls');
            tabId.tabIndex = 0; // Keep exactly one tab in the tab order: the selected tab gets tabIndex = 0, every other tab gets tabIndex = -1. Update this every time the selection changes — including on click.
            const panelEl = document.getElementById(tabId);
            console.log(tabId, panelEl);
            if (panelEl.hidden){
                panelEl.hidden = false; // Show the panel whose id matches event.target.getAttribute('aria-controls') (remove hidden)
            }else{
                panelEl.hidden = true;
            }

        }

        });
// Sets aria-selected="false" on all tab buttons
// Hides all tab panels (set hidden = true)
// Sets aria-selected="true" on the clicked tab
// Shows the panel whose id matches event.target.getAttribute('aria-controls') (remove hidden)


// Keyboard behaviour — roving tabindex

// Because these buttons carry role="tab" inside a role="tablist", they are one composite widget, not three separate buttons. 
// Assistive technology users expect one Tab press to enter the tablist, arrow keys to move between tabs, and the next Tab press to leave.
// See the roving-tabindex section of the Week 06 lecture notes for the reasoning and the full pattern.

    tabListContainer.addEventListener("keydown", (event) => {
        const tabs = Array.from(tabListContainer.querySelectorAll('[role="tab"]'));
        const current = tabs.indexOf(document.activeElement);
        if (current === -1) return;

        let next = null;
        if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
        if (event.key === "ArrowLeft")  next = (current - 1 + tabs.length) % tabs.length;
        if (event.key === "Home")       next = 0;
        if (event.key === "End")        next = tabs.length - 1;

        if (next !== null) {
            event.preventDefault();   // stop the arrow key from scrolling the page
            const panels = [document.getElementById("panel-library"),document.getElementById("panel-gym"),document.getElementById("panel-dining")]
            setActiveTab(tabs, panels, next);
        }
    });
}
// Add a keydown listener to tabListContainer. On ArrowRight / ArrowLeft, move the selection one tab forward or backward and wrap around at the ends. On Home / End, jump to the first or last tab.
// Call event.preventDefault() when you handle an arrow key, so the page does not scroll.
// Call .focus() on the newly selected tab, so focus and selection stay together.
// Factor the shared work into one selectTab(index) helper and call it from both the click and the keydown paths — the two should not have separate copies of the logic.

// Only the active tab is reachable by Tab; the rest are removed from the tab order.
// tabindex="-1" means "not in the tab order, but still focusable by script".
function setActiveTab(tabs, panels, newIndex) {
  tabs.forEach((tab, i) => {
    const selected = i === newIndex;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;      // roving tabindex
    panels[i].hidden = !selected;
  });
  tabs[newIndex].focus();                   // move focus with the selection
}


//part 3
// At the bottom of your script (or in a DOMContentLoaded handler):
// initFaq(document.querySelector('.faq'));
// initTabs(document.querySelector('.tab-list'));
document.addEventListener("DOMContentLoaded", (event) => {
    console.log('content loaded');
    initFaq(document.querySelector('.faq'));
    initTabs(document.querySelector('.tab-list'));
});
