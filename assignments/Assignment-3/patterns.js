// JavaScript requirements
// All three patterns in a single patterns.js file (or split into three files)
// Each pattern implemented as a named initialization function: initAccordion(), initTabs(), initFilter()
// All three called at the bottom of the file (or in DOMContentLoaded)
// No innerHTML for dynamic content — use classList for show/hide, textContent for count updates
// Event delegation where appropriate (accordion and filter)
// No onclick HTML attributes

// Patterns to implement
// You must implement all three of the following patterns. Each pattern must be built independently (no shared state between them).

// Pattern 1: Accordion / FAQ
// An accordion with at least four question-answer pairs. Rules:
// Only one answer can be open at a time (opening a new one closes the previous)
// Each trigger is a <button> inside an <h3> (or <h2>) — not a bare <div>
// aria-expanded="true"/"false" on the trigger button reflects open/closed state
// aria-controls on the button points to the answer panel's id
// The answer panel has id matching the aria-controls value
// lab 06 part 1 matches this. just use header instead of div
function initAccordion(faqContainer) {
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

}

// Pattern 2: Tabbed interface
// A tab component with at least three tabs. Rules:
// Tabs use correct ARIA roles: role="tablist" on the container, role="tab" on each button, role="tabpanel" on each panel
// aria-selected="true" on the active tab, aria-selected="false" on inactive tabs
// Each tab has aria-controls pointing to its panel's id; each panel has aria-labelledby pointing to its tab's id
// Arrow key navigation: Left/Right arrow keys move focus between tabs (keyboard users should not have to Tab through every tab to reach the content)
// The active tab is visually distinct from inactive tabs
//browser tab vibe. clicking between website tabs. part 2 lab 06.
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

function setActiveTab(tabs, panels, newIndex) {
  tabs.forEach((tab, i) => {
    const selected = i === newIndex;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1; // roving tabindex
    panels[i].hidden = !selected;
  });
  tabs[newIndex].focus(); // move focus with the selection
}


// Pattern 3: Live filter
// A list of at least eight items (cards, names, products — your choice) with a text input that filters visible items as the user types. Rules:
// Filtering updates the DOM without a full re-render (use CSS class hidden + classList.toggle) TODO:
// A count element below the input reads "Showing X of Y items" and updates on every keystroke
// The count element has aria-live="polite" TODO:
// Empty state: if no items match, display a "No results" message
// Input is labelled with a <label> (not just a placeholder)
// last lab orginizing live data. use event handlers, event listeners, and sutch. lab 05 has great resources. 
//TODO: still need help here
const container = document.getElementById('product-container');
function initFilter() {
    const prankItems = [
  { id: 1,  name: 'Plastic Spider',       category: "a" },
  { id: 2,  name: 'Whoopiee cushion',     category: "a" },
  { id: 3,  name: 'Shock button',         category: "b" },
  { id: 4,  name: 'Joke book',            category: "b" },
  { id: 5,  name: 'Fake snow',            category: "c" },
  { id: 6,  name: 'Magic kit',            category: "c" },
  { id: 7,  name: 'Clingwrap',            category: "d" },
  { id: 8,  name: 'Jumpscare kit',        category: "d" }
];
    const search = document.getElementById('searchbar');    
    //console.log(search);
    search.addEventListener('change', (event) => { 
        container.replaceChildren();
         const searchText = event.target.value;
         console.log(searchText);
         let noMatch =0
        prankItems.forEach ((item) => {
            // //use prankItems.includes()
            // if (Number(searchText)<9 && Number(searchText)>0){
            //     if (item.id == Number(searchText)){
            //         const Products = document.createElement('p');
            //         Products.textContent = item.name;
            //         container.appendChild(Products);
            //          console.log("1");
            //     }
            //     else{
            //          const noProducts = document.createElement('p');
            //          noProducts.textContent = 'No products found.';
            //         container.appendChild(noProducts);
            //          console.log("2");
            //     }
            // }
            // else {
            //     // if (prankItems.includes(searchText.lowercase )){
            //     //     console.log('triggered');
            //     // }
            //     if (item.name.lowercase == searchText.lowercase){
            //         const Products = document.createElement('p');
            //         Products.textContent = item.name;
            //         container.appendChild(Products);
            //          console.log("3");
            //     }
            //     else if (item.category.lowercase == searchText.lowercase){
            //         const Products = document.createElement('p');
            //         Products.textContent = item.name;
            //         container.appendChild(Products);
            //          console.log("4");

            //     }else{
            //         const noProducts = document.createElement('p');
            //          noProducts.textContent = 'No products found.';
            //         container.appendChild(noProducts);
            //          console.log("5");
            //     }

            // } //else {
            // //      const noProducts = document.createElement('p');
            // //      noProducts.textContent = 'No products found.';
            // //      container.appendChild(noProducts);
            // // }
            const prankName = item.name.toLowerCase();
            //console.log(prankName);
            if (searchText.toLowerCase() === prankName.toLowerCase()){
                console.log("matched through name: "+prankName);
                console.log(searchText);
                const Products = document.createElement('p');
                     Products.textContent = item.name;
                     container.appendChild(Products);
            
                const Counter = document.createElement('p');
                     Counter.textContent = " Showing "+item.id +" of 8 items.";
                     container.appendChild(Counter);
            }
            else if (Number(searchText) === item.id){
                console.log("matched through id: "+prankName);
                const Products = document.createElement('p');
                     Products.textContent = item.name;
                     container.appendChild(Products);
            }
            else{
                console.log("no matches");
                noMatch += 1;
            } 
        });

        if (noMatch == 8){
            const Products = document.createElement('p');
            Products.textContent = "No results";
            container.appendChild(Products);
        }

    });

}


document.addEventListener("DOMContentLoaded", (event) => {
    console.log('content loaded');
    initAccordion(document.querySelector('.faq'));
    initTabs(document.querySelector('.tab-list'));
    initFilter();
});

