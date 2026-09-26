//Lauren von Niederhausern: Tip and bill splitter takes a meal total, tip percentage, and number of people; outputs each person's share//

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

//A validation function that checks inputs and returns either null (valid) or an error message string
function validateInputs(mealTotal, tipPercentage, numPeople) {
    mealTotal = mealTotal.toFixed(2); //makes it so if they type below 2 decimal places and it will round to 2 decimal places
    if (isNaN(mealTotal) || mealTotal <= 0) {//Total cant be below 0 and must be a number
        //debugOutputText.textContent = "Meal total less than 0."; // debug message if meal total is invalid
        mealTotalInput.setAttribute('aria-invalid', 'true');
        return "Meal total must be a number and be more than $0.00.";
    }
    else{
        mealTotalInput.setAttribute('aria-invalid', 'false');
    }
    if (isNaN(tipPercentage) || tipPercentage < 0 || tipPercentage > 100) {// Tip percentage must be between 0 and 100 and must be a number
        //debugOutputText.textContent = "Tip percentage out of bounds."; // debug message if tip percentage is invalid
        tipPercentageInput.setAttribute('aria-invalid', 'true');
        return "Tip percentage must be a number between 0 and 100.";
    }
    else{
        tipPercentageInput.setAttribute('aria-invalid', 'false');
    }
    if (isNaN(numPeople) || numPeople <= 0 || !Number.isInteger(numPeople)) {// Number of people must be a positive integer and must be a number
        //debugOutputText.textContent = "Invalid number of people."; // debug message if number of people is invalid
        numPeopleInput.setAttribute('aria-invalid', 'true');
        return "Number of people must be a positive integer.";
    }
    else{    
        numPeopleInput.setAttribute('aria-invalid', 'false');
    }

    return null; // No errors
}

//A render function that accepts the result and updates the DOM — no calculation logic inside this function
function renderResult(result) {
    resultDiv.innerHTML = ''; // clear previous result
    const [totalAmount, tipAmount, totalAmountPerPerson] = result; // destructure the result array into individual variables
    //debugOutputText.textContent = 'total:' + totalAmount + " tip: "+ tipAmount + " per person: "+ totalAmountPerPerson + " DEBUG";
    resultDiv.innerHTML = `<br>Total Amount with Tip: $${totalAmount}<br>Tip Amount: $${tipAmount}<br>Total Amount Per Person: $${totalAmountPerPerson}`; // render the result in the DOM

}

//A click handler that orchestrates: read inputs → validate → calculate → render (or show error)
//TODO: Support keyboard submission (pressing Enter in any input field triggers the calculation)
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
    const totals = pureCalculation(total, tip, people );
    renderResult(totals); // present total + tip, tip itself, and the price per person

    //  calcHistory += totals;
    //  const history = displayLastResults(calcHistory);
    //save result
    //document.getElementById('result-output').textContent = result;
    //sessionStorage.setItem('lastCalculation', result);
});

//TO DO:Store the last calculation result in sessionStorage and restore it on page reload
// 1. Restore the result when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     const savedResult = sessionStorage.getItem('lastCalculation');
    
//     if (savedResult !== null) {
//         document.getElementById('result-output').textContent = savedResult;
//     }
// });

//TODO: Add a "calculation history" list showing the last three results
// const calcHistory = [];
// function displayLastResults(calcHistory){
//     for (results in calcHistory){
//         lastResults.innerHTML = 'last results: '+ results;
//     }
// }

