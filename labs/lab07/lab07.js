// Lab 07 – Accessible Form Validation

// ─── DOM references ───────────────────────────────────────────────────────
const form          = document.getElementById('registration-form');
const nameInput     = document.getElementById('full-name');
const emailInput    = document.getElementById('email');
const phoneInput    = document.getElementById('phone');
const studentIdInput = document.getElementById('student-id');
const eventSelect   = document.getElementById('event-select');
const confirmation  = document.getElementById('confirmation');
const confirmDetails = document.getElementById('confirmation-details');

// ─── Part 2: Validation functions ────────────────────────────────────────
// Each returns an error string if invalid, or null if valid.
// write these pure validation functions that return an error string if invalid or null if valid:

function ariaInvalidReset() {
  nameInput.setAttribute('aria-invalid', 'false');
  emailInput.setAttribute('aria-invalid', 'false');
  phoneInput.setAttribute('aria-invalid', 'false');
  studentIdInput.setAttribute('aria-invalid', 'false');
  eventSelect.setAttribute('aria-invalid', 'false');
}

function validateName(value) {
  ariaInvalidReset(); // reset all aria-invalid attributes to false before validating
  if (!value.trim()){
    nameInput.setAttribute('aria-invalid', 'true');
    nameInput.setAttribute('aria-describedby', 'Error: Full name is required.');
    return 'Full name is required.';
  } else {
    nameInput.setAttribute('aria-invalid', 'false');
    nameInput.setAttribute('aria-describedby', 'full-name-error');
  }

  if (value.trim().length < 2){
  nameInput.setAttribute('aria-invalid', 'true');
  nameInput.setAttribute('aria-describedby', 'Error: Name must be at least 2 characters.');
  return 'Name must be at least 2 characters.';
  } else {
    nameInput.setAttribute('aria-invalid', 'false');
    nameInput.setAttribute('aria-describedby', 'full-name-error');
  }

  return null;
}

function validateEmail(value) {
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

function validatePhone(value) {
  // Optional — only validate format if a value was entered
  if (!value.trim()) return null;
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length < 10){
    phoneInput.setAttribute('aria-invalid', 'true');
    phoneInput.setAttribute('aria-describedby', 'Error: Phone number must have at least 10 digits.');
    return 'Phone number must have at least 10 digits.';
  } else {
    phoneInput.setAttribute('aria-invalid', 'false');
    phoneInput.setAttribute('aria-describedby', 'phone-error');
  }

  return null;
}

function validateStudentId(value) {
  if (!value.trim()){
    studentIdInput.setAttribute('aria-invalid', 'true'); // when clicked again for some reason this is changes to false but aria describedby stays? it still works though, just odd. 
    studentIdInput.setAttribute('aria-describedby', 'Error: Student ID is required.');
    return 'Student ID is required.';
  } else {
    studentIdInput.setAttribute('aria-invalid', 'false');
    studentIdInput.setAttribute('aria-describedby', 'student-id-error');
  }

  if (!/^\d{7,9}$/.test(value.trim())){
    studentIdInput.setAttribute('aria-invalid', 'true'); // when clicked again for some reason this is changes to false but aria describedby stays? it still works though, just odd. 
    studentIdInput.setAttribute('aria-describedby', 'Error: Student ID must be 7–9 digits.');
    return 'Student ID must be 7–9 digits.';
  } else {
    studentIdInput.setAttribute('aria-invalid', 'false');
    studentIdInput.setAttribute('aria-describedby', 'student-id-error');
  }

  return null;
}

function validateEvent(value) {
  if (!value){
    eventSelect.setAttribute('aria-invalid', 'true'); // when clicked again for some reason this is changes to false but aria describedby stays? it still works though, just odd.
    eventSelect.setAttribute('aria-describedby', 'Error: Please select a workshop.');
    return 'Please select a workshop.';
  } else {
    eventSelect.setAttribute('aria-invalid', 'false'); // when clicked again for some reason this is changes to false but aria describedby stays? it still works though, just odd. 
    eventSelect.setAttribute('aria-describedby', 'event-select-error');

  }

  return null;
}

// ─── Part 3: Error display functions ─────────────────────────────────────

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

// Part 4: Validation timing
// On blur (early feedback)
// For the Name and Email fields, add a blur listener that validates when the user leaves the field. 
// TODO: Only show an error if the field was touched and is invalid — do not show errors on fields the user has not interacted with yet.

// ─── Part 4a: Blur validation (early feedback on name + email) ────────────
// Add blur listeners for nameInput and emailInput.
// Show the error if invalid, clear it if valid.

//const nameInput = document.getElementById('full-name');
nameInput.addEventListener('blur', () => {
  const error = validateName(nameInput.value);
  if (error) showError(nameInput, error);
  else clearError(nameInput);
});

emailInput.addEventListener('blur', () => {
  const error = validateEmail(emailInput.value);
  if (error) showError(emailInput, error);
  else clearError(emailInput);
});

// ─── Part 4b: Submit handler ──────────────────────────────────────────────
// Add a submit listener to `form`.
// 1. event.preventDefault()
// 2. Validate all five required fields
// 3. Show errors on invalid fields; clear errors on valid fields
// 4. If any errors: focus the first invalid field and return
// 5. If all valid: hide the form, show confirmation with a summary, move focus to confirmation


//const form = document.getElementById('registration-form');
form.addEventListener('submit', (event) => { // On submit The form's submit handler should:
  event.preventDefault(); // Call event.preventDefault()

  const fields = [
    { el: nameInput, validate: validateName },
    { el: emailInput, validate: validateEmail },
    { el: phoneInput, validate: validatePhone },
    { el: studentIdInput, validate: validateStudentId },
    { el: eventSelect, validate: validateEvent },
  ];

  let firstError = null;

  fields.forEach(({ el, validate }) => { // Validate all required fields
    const error = validate(el.value);
    if (error) {
      showError(el, error); // Show errors for all invalid fields

      if (!firstError) firstError = el;
    } else {
      clearError(el); 
    }
  });

  if (firstError) {
    firstError.focus(); // If any field is invalid, move focus to the first invalid field
    return;
  }

  // If all fields are valid, hide the form, populate #confirmation-details with a summary, show #confirmation, and move focus to #confirmation
  // All valid — show confirmation
  const confirmation = document.getElementById('confirmation');
  const details = document.getElementById('confirmation-details');
  details.textContent = `${nameInput.value.trim()} has been registered for ${eventSelect.options[eventSelect.selectedIndex].text}.`;
  form.hidden = true;
  confirmation.hidden = false;
  confirmation.focus();
});
