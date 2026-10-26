// render.js (rendering utilities) is for visual presintation, contains pure functions and classes, 
// takes data and outputs it on the screen, formats things for display


//-----------------------nav menu-----------------------
//on project1.js
//-----------------------accordian menu-----------------------
//on project1.js
//-----------------------tabs-----------------------
//on project1.js

//-----------------------generate product cards-----------------------
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

//-----------------------checks user input for email-----------------------

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

//-----------------------checkout button-----------------------
//on project1.js
console.log('works on render side');
