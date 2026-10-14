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

function validateName(value) {
  if (!value.trim()) return 'Full name is required.';
  if (value.trim().length < 2) return 'Name must be at least 2 characters.';
  return null;
}

function validateEmail(value) {
  if (!value.trim()) return 'Email address is required.';
  if (!value.includes('@') || !value.includes('.')) return 'Please enter a valid email address.';
  return null;
}

function validatePhone(value) {
  // Optional — only validate format if a value was entered
  if (!value.trim()) return null;
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length < 10) return 'Phone number must have at least 10 digits.';
  return null;
}

function validateStudentId(value) {
  if (!value.trim()) return 'Student ID is required.';
  if (!/^\d{7,9}$/.test(value.trim())) return 'Student ID must be 7–9 digits.';
  return null;
}

function validateEvent(value) {
  if (!value) return 'Please select a workshop.';
  return null;
}

// ─── Part 3: Error display functions ─────────────────────────────────────

function showError(inputEl, message) {
  const errorEl = document.getElementById(`${inputEl.id}-error`);
  errorEl.textContent = message;
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
// Only show an error if the field was touched and is invalid — do not show errors on fields the user has not interacted with yet.

// ─── Part 4a: Blur validation (early feedback on name + email) ────────────
// TODO: Add blur listeners for nameInput and emailInput.
// Show the error if invalid, clear it if valid.

// const nameInput = document.getElementById('full-name');
// nameInput.addEventListener('blur', () => {
//   const error = validateName(nameInput.value);
//   if (error) showError(nameInput, error);
//   else clearError(nameInput);
// });

// On submit The form's submit handler should:
// Call event.preventDefault()
// Validate all required fields
// Show errors for all invalid fields
// If any field is invalid, move focus to the first invalid field
// If all fields are valid, hide the form, populate #confirmation-details with a summary, show #confirmation, and move focus to #confirmation

// ─── Part 4b: Submit handler ──────────────────────────────────────────────
// TODO: Add a submit listener to `form`.
// 1. event.preventDefault()
// 2. Validate all five required fields
// 3. Show errors on invalid fields; clear errors on valid fields
// 4. If any errors: focus the first invalid field and return
// 5. If all valid: hide the form, show confirmation with a summary, move focus to confirmation


// const form = document.getElementById('registration-form');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const fields = [
//     { el: nameInput, validate: validateName },
//     { el: emailInput, validate: validateEmail },
//     { el: phoneInput, validate: validatePhone },
//     { el: studentIdInput, validate: validateStudentId },
//     { el: eventSelect, validate: validateEvent },
//   ];

//   let firstError = null;

//   fields.forEach(({ el, validate }) => {
//     const error = validate(el.value);
//     if (error) {
//       showError(el, error);
//       if (!firstError) firstError = el;
//     } else {
//       clearError(el);
//     }
//   });

//   if (firstError) {
//     firstError.focus();
//     return;
//   }

//   // All valid — show confirmation
//   const confirmation = document.getElementById('confirmation');
//   const details = document.getElementById('confirmation-details');
//   details.textContent = `${nameInput.value.trim()} has been registered for ${eventSelect.options[eventSelect.selectedIndex].text}.`;
//   form.hidden = true;
//   confirmation.hidden = false;
//   confirmation.focus();
// });

// Testing requirements
// Test each of the following manually:

// [ ] Submit with all fields empty → errors appear on all required fields
// [ ] Focus moves to first invalid field on failed submit
// [ ] Fix all errors and resubmit → confirmation appears and receives focus
// [ ] Tab through the entire form using keyboard only — all fields reachable
// [ ] Check that error spans are announced by enabling a screen reader (VoiceOver on Mac, NVDA on Windows)
// [ ] Phone field: leave blank → no error; enter "555" → error appears