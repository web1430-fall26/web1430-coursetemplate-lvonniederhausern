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

// add place to generate product cards
//-----------------------generate product cards-----------------------

const productGrid = document.getElementById('product-grid');

function renderProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    // Product name in an <h2>
    const name = document.createElement('h2');
    name.textContent = product.name;
    card.appendChild(name);
    
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
        } else {
            checkBox.textContent = '☐';
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
            ThankYouMessage.replaceChildren();
            ThankYouMessage.append("Thank you for your purchase!");
            for(product in products){
                if (select = true){
                    console.log('object was slected');
                } else{
                    console.log('object');
                }
            }

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
    renderProductList(products, productGrid);
});
