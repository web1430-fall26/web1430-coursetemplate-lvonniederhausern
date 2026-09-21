// Lab 03 – Debugging Exercise
// This file contains THREE bugs. Do not rewrite the logic.
// Read the error messages in the Console and fix only what is broken.
// In notes.md, record: the line number, what was wrong, and what the error message said.

const userName = 'Casey';
const userAge = '28';

function buildWelcome(name, age) {
  const numericAge = parseInt(age);
  const nextYear = numericAge + 1;
  return `Hi ${name}! You are ${numericAge} years old. Next year you will be ${nextYear} years old.`; //spelling error with variable name: changed nextYeer to nextYear on line 12 so that it matches the variable name.
}

const message = buildWelcome(userName, userAge)
console.log(message); //spelling error with variable name: changed mesage to message on line 16 so that it matches the variable name.

if (userAge === 28) { 
  console.log('Age matched with strict equality'); //changed text to say strict equality instead of loose equality on line 20 because == is loose equality and === is strict equality. Changed to match the case.
}
