// project1.js (interactive pattern initialization) is for setting up interactive elements when the page loads, holding event listeners, 
// and calls functions from render.js, update the screen based on user input.

//FIXED BUGS:
//change th aria lable when they change. aria expanded needs to change. DONE
// and FAQ triggers retain stale expanded states. DONE
//faq accordian make sure aria expanded changes DONE 
//e mobile toggle has no aria-expanded, DONE
// button table overflows the 375px viewport to 552px; DONE
// nav to tabs, cards, and colors 41, 59, 70, 89 anywhere i have h3 or DONE
//margines cannot be hardcoded. DONE
//--space-md is labeled 0.3rem but defined as 0.4rem DONE
//@ media quieries should be in base DONE 
//base should have brand color things. DONE
//swap these There is still mixing: render.js validates email/address while project1.js contains formatPrice, DONE

//-----------------------nav menu-----------------------
//A mobile-friendly state: at narrow viewport, links collapse (can be CSS-only or JavaScript-toggled)
//If JavaScript-toggled: aria-expanded on the toggle button, keyboard-accessible open/close
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display ='';
    mobileMenu.setAttribute('aria-expanded', navLinks.classList.contains('active') ? 'false' : 'true');
  navLinks.classList.toggle('active');
    navLinks.addEventListener('click', () => {
        navLinks.style.display = 'none';
        
    });
});

//-----------------------accordian menu-----------------------
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
                        for (const question of document.getElementsByClassName("faq-question")) {
                            if (question.getAttribute('aria-controls') === answer.id) {
                                question.setAttribute('aria-expanded', 'false');
                            }
                        }
                    }
                }
            } else { //if the answer is open, close it
                answerEl.hidden = true;
                event.target.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

//-----------------------tabs-----------------------
//  Tabs At least three tabs. Correct ARIA roles (tablist, tab, tabpanel). Arrow key navigation between tabs.
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
                // Hide all tab panels (set hidden = true) 
                const typo = document.getElementById("panel-typo");
                typo.hidden = true;
                const button = document.getElementById("panel-button");
                button.hidden = true;
                const scale = document.getElementById("panel-scale");
                scale.hidden = true;
                const space = document.getElementById("panel-space");
                space.hidden = true;
            });
            event.target.setAttribute('aria-selected', 'true'); // Set aria-selected="true" on the clicked tab
            const tabId = event.target.getAttribute('aria-controls');
            tabId.tabIndex = 0; // Keep exactly one tab in the tab order: the selected tab gets tabIndex = 0, every other tab gets tabIndex = -1. Update this every time the selection changes — including on click.
            const panelEl = document.getElementById(tabId);
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
            const panels = [document.getElementById("panel-typo"),document.getElementById("panel-button"),document.getElementById("panel-scale"),document.getElementById("panel-space")]
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

//-----------------------generate product cards-----------------------
const productGrid = document.getElementById('product-grid');
const productGridExample = document.getElementById('product-grid-example');
const mapTable = new Map();

//-----------------------checks user input for email-----------------------
const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', () => {
  const error = validateEmail(emailInput.value);
  if (error) showError(emailInput, error);
  else clearError(emailInput);
});

function validateEmail(value) {
    emailInput.setAttribute('aria-invalid', 'false');  
    if (!value.trim()){ 
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.setAttribute('aria-describedby', 'Error: Email address is required.');
        return 'Email address is required.';
    } else {
        emailInput.setAttribute('aria-invalid', 'false');
        emailInput.setAttribute('aria-describedby', 'email-error');
    }
    if (!value.includes('@') || !value.includes('.')){ 
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.setAttribute('aria-describedby', 'Error: Please enter a valid email address.');
        return 'Please enter a valid email address.';
    } else {
        emailInput.setAttribute('aria-invalid', 'false');
        emailInput.setAttribute('aria-describedby', 'email-error');
    } 
    return null;
}

//-----------------------checks user input for address-----------------------
const addressInput = document.getElementById('address');

addressInput.addEventListener('blur', () => {
  const error = validateAddress(addressInput.value);
  if (error) showError(addressInput, error);
  else clearError(addressInput);
});

//-----------------------checks user input for errors-----------------------
//on render.js

//-----------------------checkout button-----------------------
// code for check out button, print recipt, and thanks for buying message
const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', (event) => {
    event.preventDefault(); // Call event.preventDefault()

    const fields = [
    { el: emailInput, validate: validateEmail },
    { el: addressInput, validate: validateAddress },
    ];

    let firstError = null;

    fields.forEach(({ el, validate }) => { // Validate all required fields
        const error = validate(el.value);
        if (error) {
            showError(el, error); // Show errors for all invalid fields
            if (!firstError) firstError = el;
        } else {
        clearError(el); 
            const ThankYouMessage = document.getElementById('ThankYouMessage');
            const recipt = document.getElementById('recipt');
            let total = 0;
            ThankYouMessage.replaceChildren();
            recipt.replaceChildren();
            ThankYouMessage.append("Thank you for your purchase!");
            recipt.style.whiteSpace = "pre-line"; // Tells HTML to render \n as a line break
            recipt.append('Recipt:\n');
            mapTable.forEach((value, key) => {
                total+=value;
                recipt.append(key +' Price: $' +value+'\n');
            });
            recipt.append('Total: $'+ total.toFixed(2))
        }
    });
    if (firstError) {
        firstError.focus(); // If any field is invalid, move focus to the first invalid field
        return;
    }

});

// DOM listener
document.addEventListener("DOMContentLoaded", (event) => {
    console.log('content loaded');
    initFaq(document.querySelector('.faq'));
    renderProductList( exampleProduct, productGridExample);
    renderProductList(products, productGrid);
    initTabs(document.querySelector('.tab-list'));
});

console.log('project1.js works');