document//Lauren von Niederhausern: Tip and bill splitter takes a meal total, tip percentage, and number of people; outputs each person's share//

//values input by user
const mealTotalInput = document.getElementById('meal-total');
const tipPercentageInput = document.getElementById('tip-percentage');
const numPeopleInput = document.getElementById('num-people');
const calculateButton = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result-output');
const debugOutputText = document.getElementById('debug-output-text');// debug output text
const lastResults = document.getElementById('past-results');// used to print last results


// Required functions — each must be named and in its own const or function declaration:
//A pure calculation function that accepts inputs as arguments and returns the computed result — no DOM access inside this function
//A validation function that checks inputs and returns either null (valid) or an error message string
//A render function that accepts the result and updates the DOM — no calculation logic inside this function
//A click handler that orchestrates: read inputs → validate → calculate → render (or show error)
//No anonymous functions for named responsibilities. No logic inside event handlers beyond orchestration.


//A pure calculation function that accepts inputs as arguments and returns the computed result — no DOM access inside this function
function pureCalculation(mealTotal, tipPercentage, numPeople) {
    const tipAmount = mealTotal * (tipPercentage / 100); // calculate tip amount
    const totalAmount = mealTotal + tipAmount; // calculate total amount including tip
    const totalAmountPerPerson = totalAmount / numPeople; // calculate total amount per person
    //debugOutputText.textContent = "Meal Total: " + mealTotal.toFixed(2) + ", Tip Percentage: " + tipPercentage + ", Number of People: " + numPeople + ", Tip Amount: " + tipAmount.toFixed(2) + ", Total Amount: " + totalAmount.toFixed(2) + ", Total Amount Per Person: " + totalAmountPerPerson.toFixed(2); // debug message with all calculated values
    return [totalAmount.toFixed(2), tipAmount.toFixed(2), totalAmountPerPerson.toFixed(2)] ; // return all calculated values rounded to 2 decimal places in array

}

function ariaInvalidReset() {
    mealTotalInput.setAttribute('aria-invalid', 'false');
    tipPercentageInput.setAttribute('aria-invalid', 'false');
    numPeopleInput.setAttribute('aria-invalid', 'false');
}

//A validation function that checks inputs and returns either null (valid) or an error message string
//: All required conditions are caught with field-named messages (tested empty, non-numeric, negative, tip over 100, 0 and 2.5 people), 
// and aria-invalid is set. However, each input's aria-describedby points to an id (total-price-input, tip-percent-input, number-of-people-input) 
// that doesn't exist; errors go into #result-output instead.
// Add an error <span> with that id next to each input and put the message there.
//: aria-live="polite" on #result-output works well. Missing: the error spans that aria-describedby should reference 
// (those ids don't exist in index.html). Also, validateInputs returns at the first error,
//  so a later field can keep a stale aria-invalid="true" after it's fixed; reset all three before validating.
//change if statements to a switch. described by and error messages more direct.
function validateInputs(mealTotal, tipPercentage, numPeople) {
    const mealTotalFixed = mealTotal.toFixed(2); //makes it so if they type below 2 decimal places and it will round to 2 decimal places
    ariaInvalidReset(); // reset all aria-invalid attributes to false before validating
    switch (true) {
    case (isNaN(mealTotalFixed) ):
        mealTotalInput.setAttribute('aria-invalid', 'true');
        mealTotalInput.setAttribute('aria-describedby', 'Error: Meal total must be a number.');
        return "Meal total must be a number.";
    case (mealTotalFixed <= 0):
        mealTotalInput.setAttribute('aria-invalid', 'true');
        mealTotalInput.setAttribute('aria-describedby', 'Error: Meal total must be more than $0.00.');
        return "Meal total must be more than $0.00.";
    case (isNaN(tipPercentage)):
        tipPercentageInput.setAttribute('aria-invalid', 'true');
        tipPercentageInput.setAttribute('aria-describedby', 'Error: Tip percentage must be a number.');
        return "Tip percentage must be a number.";
    case ( tipPercentage < 0):
        tipPercentageInput.setAttribute('aria-invalid', 'true');
        tipPercentageInput.setAttribute('aria-describedby', 'Error: Tip percentage must be greater than 0.');
        return "Tip percentage must be greater than 0. Its rude to not tip.";
    case ( tipPercentage > 100):
        tipPercentageInput.setAttribute('aria-invalid', 'true');
        tipPercentageInput.setAttribute('aria-describedby', 'Error: Tip percentage must be less than or equal to 100.');
        return "Tip percentage must be less than or equal to 100.";
    case (isNaN(numPeople)):
        numPeopleInput.setAttribute('aria-invalid', 'true');
        numPeopleInput.setAttribute('aria-describedby', 'Error: Number of people must be a number.');
        return "Number of people must be a number.";
    case (numPeople <= 0):
        numPeopleInput.setAttribute('aria-invalid', 'true');
        numPeopleInput.setAttribute('aria-describedby', 'Error: Number of people must be a positive integer.');
        return "Number of people must be a positive integer.";
    case (numPeople % 1 !== 0):
        numPeopleInput.setAttribute('aria-invalid', 'true');
        numPeopleInput.setAttribute('aria-describedby', 'Error: Number of people must be a whole number.');
        return "Number of people must be a whole number. You can't split a person in half...";
    default:
        mealTotalInput.setAttribute('aria-invalid', 'false');
        tipPercentageInput.setAttribute('aria-invalid', 'false');
        numPeopleInput.setAttribute('aria-invalid', 'false');
        mealTotalInput.setAttribute('aria-describedby', 'total-price-input');
        tipPercentageInput.setAttribute('aria-describedby', 'tip-percent-input');
        numPeopleInput.setAttribute('aria-describedby', 'number-of-people-input');
        return null;
    }

    // if (isNaN(mealTotal) || mealTotal <= 0) {//Total cant be below 0 and must be a number
    //     //debugOutputText.textContent = "Meal total less than 0."; // debug message if meal total is invalid
    //     mealTotalInput.setAttribute('aria-invalid', 'true');
    //     return "Meal total must be a number and be more than $0.00.";
    // }
    // else{
    //     mealTotalInput.setAttribute('aria-invalid', 'false');
    // }

    // if (isNaN(tipPercentage) || tipPercentage < 0 || tipPercentage > 100) {// Tip percentage must be between 0 and 100 and must be a number
    //     //debugOutputText.textContent = "Tip percentage out of bounds."; // debug message if tip percentage is invalid
    //     tipPercentageInput.setAttribute('aria-invalid', 'true');
    //     return "Tip percentage must be a number between 0 and 100.";
    // }
    // else{
    //     tipPercentageInput.setAttribute('aria-invalid', 'false');
    // }

    // if (isNaN(numPeople) || numPeople <= 0 || !Number.isInteger(numPeople)) {// Number of people must be a positive integer and must be a number
    //     //debugOutputText.textContent = "Invalid number of people."; // debug message if number of people is invalid
    //     numPeopleInput.setAttribute('aria-invalid', 'true');
    //     return "Number of people must be a positive integer.";
    // }
    // else{    
    //     numPeopleInput.setAttribute('aria-invalid', 'false');
    // }

    // return null; // No errors
}

//A render function that accepts the result and updates the DOM — no calculation logic inside this function
function renderResult(result) {
    resultDiv.innerHTML = ''; // clear previous result
    const [totalAmount, tipAmount, totalAmountPerPerson] = result; // destructure the result array into individual variables
    //debugOutputText.textContent = 'total:' + totalAmount + " tip: "+ tipAmount + " per person: "+ totalAmountPerPerson + " DEBUG";
    resultDiv.innerHTML = `<br>Total Amount with Tip: $${totalAmount}<br>Tip Amount: $${tipAmount}<br>Total Amount Per Person: $${totalAmountPerPerson}`; // render the result in the DOM

}

function handleCalculate(total, tip, people) {
    const totals = pureCalculation(total, tip, people);
    renderResult(totals);
    saveResult(totals); // present total + tip, tip itself, and the price per person
}

function saveResult(totals) {
    //save result function input totals
    const result = totals;
    addCalculation(result[0],result[2])
    document.getElementById('past-results').textContent = "Previous Total: $"+ result[0]+ " Previous Amount Per Person: $"+ result[2];
    sessionStorage.setItem('lastTotal', result[0]);     //Save to sessionStorage
    sessionStorage.setItem('lastPart', result[2]);
}

//A click handler that orchestrates: read inputs → validate → calculate → render (or show error)
//pureCalculation, validateInputs, and renderResult are cleanly separated. 
// But the click handler is an anonymous arrow function that also writes #past-results, calls addCalculation, and saves to sessionStorage. 
// Move that work into named functions (e.g. handleCalculate, saveResult) so the handler only orchestrates.
calculateButton.addEventListener('click', () => {
    const total = parseFloat(mealTotalInput.value);
    const tip = parseFloat(tipPercentageInput.value);
    const people = parseFloat(numPeopleInput.value);
    //debugOutputText.textContent = 'this displayes if button pressed';
    const validationCheck = validateInputs(total, tip, people); // returns error message if any input is invalid, or null if all valid
    if (validationCheck !== null) { // if any input is invalid, display error message and return
      resultDiv.textContent = validationCheck;
      return;
    }
    // handleCalculations 
    handleCalculate(total, tip, people);
    
});

//Store the last result in sessionStorage and restore it on page reload
document.addEventListener('DOMContentLoaded', () => {
    const savedResult = sessionStorage.getItem('lastTotal');
    const savedPortion = sessionStorage.getItem('lastPart');
    
    if (savedResult !== null && savedPortion !== null) {
        document.getElementById('past-results').textContent = "Previous Total: $"+ savedResult + " Previous Amount Per Person: $"+ savedPortion;
    }
});

//calculation history list showing the last three results
const calculationHistory = [];

function addCalculation(billTotal, pricePerPerson) {
  const entry = { bill: billTotal, price: pricePerPerson };
  calculationHistory.unshift(entry); // add new entry
  if (calculationHistory.length > 3) {
    calculationHistory.pop(); // delete oldest item from the end
  }
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = ''; // Clear current list
  
  // Loop through the history array and create <li> elements
  calculationHistory.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `Total Bill: ${item.bill}    Price Per Person: ${item.price}`;
    historyList.appendChild(li);
  });
}

//TODO: Support keyboard submission (pressing Enter in any input field triggers the calculation)
//not enough time to figure this part out. 
