// Lab 03 – Console Exercises and Small Programs
// Implement each function below. Do not delete the test calls at the bottom.

// ─── Exercise 1: Greeting ─────────────────────────────────────────────────
// Returns "Hello, [name]! Welcome to WEB 1430."
// If name is empty or only whitespace, returns "Hello, stranger!"

function greet(name) {
  if ( name === '' || name.trim() === '' ) { // Check if name is empty or only whitespace
    return "Hello, stranger!";
  }
  return `Hello, ${name}! Welcome to WEB 1430.`; // welcome name to WEB 1430
}

console.log(greet('Jordan'));   // Expected: "Hello, Jordan! Welcome to WEB 1430." yes
console.log(greet('  '));       // Expected: "Hello, stranger!" yes 
console.log(greet(''));         // Expected: "Hello, stranger!" yes

// ─── Exercise 2: Celsius to Fahrenheit ───────────────────────────────────
// Formula: (celsius * 9/5) + 32
// Returns a string formatted to one decimal place: "72.5°F"
// Hint: number.toFixed(1) returns a string with one decimal place.

function toFahrenheit(celsius) {
  if (typeof celsius !== 'number') {
    return "Invalid input";
  } // Checks if the input is a number
  const fahrenheit = (celsius * 9/5) + 32; // Converts Celsius to Fahrenheit
  return `${fahrenheit.toFixed(1)}°F`; //formats and returns temp 
}

console.log(toFahrenheit(0));     // Expected: "32.0°F" yes
console.log(toFahrenheit(100));   // Expected: "212.0°F" yes
console.log(toFahrenheit(-40));   // Expected: "-40.0°F" yes

// ─── Exercise 3: Password strength ───────────────────────────────────────
// Returns "strong" if length >= 12
// Returns "medium" if length is 8–11
// Returns "weak" if length < 8
// Returns "invalid" if password is not a string or is empty

function checkPassword(password) {
  if (typeof password !== 'string' || password.length === 0) { // makes sure password is a string and not blank
    return "invalid";
  }
  if (password.length >= 12) { // if password is 12 characters or more the password is strong
    return "strong";
  }
  if (password.length >= 8) { // if password is 8-11 characters the password is medium strength
    return "medium";
  }
  else {
    return "weak"; // else the password is weak
  }
}

console.log(checkPassword('abc'));               // Expected: "weak" yes
console.log(checkPassword('MyPass123'));         // Expected: "medium" yes
console.log(checkPassword('MyLongP@ssword!'));   // Expected: "strong" yes
console.log(checkPassword(''));                  // Expected: "invalid" yes
console.log(checkPassword(12345));               // Expected: "invalid" yes

// ─── Exercise 4: Initials ─────────────────────────────────────────────────
// Accepts a full name string, returns the initials in uppercase with dots.
// "Jordan Alex Smith" → "J.A.S."
// Handle extra spaces gracefully.
// Hint: .trim().split(' ') — filter out empty strings from double spaces.

function getInitials(fullName) {
  if (typeof fullName !== 'string' || fullName.trim() === '') { // makes sure fullName is a string and not blank
    return '';
  }
  const names = fullName.trim().split(' ').filter(Boolean);
  return names.map(name => name[0].toUpperCase()).join('.'); //formats and prints the initals. (just for curiosity purposes is it possible to make it recognize last names with spaces? like von Niederhausern prints only a V? )
}

console.log(getInitials('Jordan Smith'));          // Expected: "J.S." yes 
console.log(getInitials('Maria Elena Vargas'));    // Expected: "M.E.V." yes 
console.log(getInitials('  Sam   Lee  '));         // Expected: "S.L." yes
