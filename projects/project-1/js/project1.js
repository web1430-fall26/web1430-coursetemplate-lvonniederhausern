//At least two interactive components functional, even if unpolished
//2 interactive conponents a button glows when hovered. accordian menu. 

//FEEDBACK: Good progress on the :root tokens, and the FAQ accordion works with aria-expanded. 
// Two things are missing for this milestone. (1) http://127.0.0.1:5500 only loads on your own computer, 
// so the project isn't deployed yet; publish it and submit the public URL. 
// (2) Project 1 is a style guide that documents your design system, not a store page. 
// You still need a Design tokens section (a color swatch for each --color-* variable with its name and hex value, 
// plus spacing and font-size samples) and a Typography section (h1-h4, a body paragraph, a blockquote, ol/ul, and code/pre).
//  See "Required sections" in the Project 1 brief. Also, the css\style.css and js\project1.js paths use backslashes; 
// change them to forward slashes (css/style.css) so they work on a web server.

//-----------------------nav menu-----------------------
//A mobile-friendly state: at narrow viewport, links collapse (can be CSS-only or JavaScript-toggled)
//If JavaScript-toggled: aria-expanded on the toggle button, keyboard-accessible open/close
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display ='';
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
                // Hide all tab panels (set hidden = true) TODO: simplify this
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
    tab.tabIndex = selected ? 0 : -1;      // roving tabindex
    panels[i].hidden = !selected;
  });
  tabs[newIndex].focus();                   // move focus with the selection
}


//-----------------------generate product cards-----------------------

const productGrid = document.getElementById('product-grid');
const productGridExample = document.getElementById('product-grid-example');
const mapTable = new Map();

function renderProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    if(!product.image){
        product.image='images/paintedrockfox.jpg'
        product.alt='rock with fox painted on it'
    }

    if(product.horizontal){
        card.classList.add('horiz-card');

        //product image first for horiz
        const img = document.createElement('img');
        img.classList.add('horiz-card-image');
        img.src = product.image;
        img.alt = product.alt;
        img.width = 200;  // Sets the width attribute to 200px
        img.height = 200; // Sets the height attribute to 200px
        card.appendChild(img);

        // Product name second for horiz
        const name = document.createElement('h2');
        name.textContent = product.name;
        card.appendChild(name);
    } else {
         // Product name in an <h2>
        const name = document.createElement('h2');
        name.textContent = product.name;
        card.appendChild(name);

        //product image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.alt;
        img.width = 200;  // Sets the width attribute to 200px
        img.height = 200; // Sets the height attribute to 200px
        card.appendChild(img);
    }

   
    
    // size in a <p> with class product-size
    const size = document.createElement('p');
    size.classList.add('product-size');
    size.textContent = "Rock Size: "+product.size;
    card.appendChild(size);

    // Formatted price in a <p> with class product-price
    const price = document.createElement('p');
    price.classList.add('product-price');
    price.textContent = formatPrice(product.price);
    card.appendChild(price);

    // A stock status indicator: a <span> reading "In Stock" or "Out of Stock", with class in-stock or out-of-stock accordingly
    const stockStatus = document.createElement('span');
    if (product.inStock) {
        stockStatus.classList.add('in-stock');
        stockStatus.textContent = 'In Stock  ';
    } else {
        stockStatus.classList.add('out-of-stock');
        stockStatus.textContent = 'Out of Stock  ';
    }
    card.appendChild(stockStatus);

    //add check boxs for product selection
    
    const checkBox = document.createElement('button');
    checkBox.classList.add('checkbox');
    checkBox.textContent = '☐';
    if (!product.inStock) {
        checkBox.disabled = true;
    } else {
        checkBox.disabled = false;
    }
    //check box code
    checkBox.addEventListener('click', () => {
        //  checkBox.textContent = '☑';
        checkBox.classList.toggle('active');
  
        // Optional: Change the text based on the current state
        if (checkBox.classList.contains('active')) {
            checkBox.textContent = '☑';
            mapTable.set(product.name, product.price);
        } else {
            checkBox.textContent = '☐';
            mapTable.delete(product.name);
        }
    });
    card.appendChild(checkBox);
    return card;
}

function renderProductList(productList, container) {
    container.innerHTML = '';
    if (productList.length === 0) {
        const noProducts = document.createElement('p');
        noProducts.textContent = 'No products found.';
        container.appendChild(noProducts);
        return;
    }
    const fragment = document.createDocumentFragment();
    productList.forEach(product => {
        fragment.appendChild(renderProductCard(product));
    });
    container.appendChild(fragment);
}

function formatPrice (amount) {
  return `$${amount.toFixed(2)}`;
}



// check user text imputs for email and address.
//-----------------------checks user input for email-----------------------
const emailInput = document.getElementById('email');

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

emailInput.addEventListener('blur', () => {
  const error = validateEmail(emailInput.value);
  if (error) showError(emailInput, error);
  else clearError(emailInput);
});

//-----------------------checks user input for address-----------------------
const addressInput = document.getElementById('address');

function validateAddress(value) {
    addressInput.setAttribute('aria-invalid', 'false');  
  if (!value.trim()){
    addressInput.setAttribute('aria-invalid', 'true');
    addressInput.setAttribute('aria-describedby', 'Error: Full address is required.');
    return 'Full address is required.';
  } else {
    addressInput.setAttribute('aria-invalid', 'false');
    addressInput.setAttribute('aria-describedby', 'full-Address-error');
  }

  return null;
}

addressInput.addEventListener('blur', () => {
  const error = validateAddress(addressInput.value);
  if (error) showError(addressInput, error);
  else clearError(addressInput);
});

//-----------------------checks user input for errors-----------------------
function showError(inputEl, message) {
  const errorEl = document.getElementById(`${inputEl.id}-error`);
  errorEl.textContent = "⚠️ ERROR: " + message;
  inputEl.setAttribute('aria-invalid', 'true');
  inputEl.classList.add('input-error');
}

function clearError(inputEl) {
  const errorEl = document.getElementById(`${inputEl.id}-error`);
  errorEl.textContent = '';
  inputEl.removeAttribute('aria-invalid');
  inputEl.classList.remove('input-error');
}

//add code for check out button, print recipt, and thanks for buying message
//-----------------------checkout button-----------------------
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
