// Lab 04 – Trail Recommender and Distance Converter

// ─── Trail data (do not modify) ──────────────────────────────────────────
const trails = [
  { name: 'Lakeside Loop',       distance: 2.5,  hours: 1.5, level: 'beginner' },
  { name: 'Ridgeline Path',      distance: 5,    hours: 3,   level: 'beginner' },
  { name: 'Canyon Crossing',     distance: 8,    hours: 4.5, level: 'intermediate' },
  { name: 'Summit Approach',     distance: 12,   hours: 6,   level: 'intermediate' },
  { name: 'Granite Peak',        distance: 16,   hours: 7,   level: 'advanced' },
  { name: 'Wilderness Circuit',  distance: 20,   hours: 8,   level: 'advanced' },
];

// ─── DOM references ───────────────────────────────────────────────────────
const experienceSelect  = document.getElementById('experience');
const maxDistanceInput  = document.getElementById('max-distance');
const maxHoursInput     = document.getElementById('max-hours');
const findBtn           = document.getElementById('find-btn');
const recommendationDiv = document.getElementById('recommendation');

const incrementInput  = document.getElementById('increment');
const rowCountInput   = document.getElementById('row-count');
const generateBtn     = document.getElementById('generate-btn');
const tableOutputDiv  = document.getElementById('table-output');
const debugOutputText = document.getElementById('debug-output-text');// debug output text

// ─── Part 3: Trail recommender functions ─────────────────────────────────

// validateInputs(level, maxDistance, maxHours)
// Returns an error message string if any input is invalid, or null if all valid.
// Rules: level must be 'beginner'|'intermediate'|'advanced'
//        maxDistance must be 1–20
//        maxHours must be 1–8
function validateInputs(level, maxDistance, maxHours) {
  // TODO
  if (!['beginner', 'intermediate', 'advanced'].includes(level)) { // check if level is valid input
    //debugOutputText.textContent = "invalid level"; // debug message if level is invalid
    return 'Invalid level. Must be beginner, intermediate, or advanced.';
  }
  if (isNaN(maxDistance) || maxDistance < 1 || maxDistance > 20) { // check if maxDistance is a number and between the range of 1 and 20 miles
      //debugOutputText.textContent = "invalid max distance"; // debug message if maxDistance is invalid
    return 'Invalid max distance. Must be between 1 and 20 miles.';
  }
  if (isNaN(maxHours) || maxHours < 1 || maxHours > 8) { // check if maxHours is a number and within the range of 1 to 8 hours
    //debugOutputText.textContent = "invalid max hours"; // debug message if maxHours is invalid
    return 'Invalid max hours. Must be between 1 and 8 hours.';
  }
  //debugOutputText.textContent = "All inputs are valid."; // debug message if all inputs are valid
  return null; // all inputs are valid
}

// findTrail(level, maxDistance, maxHours)
// Returns the first trail matching all three criteria, or null if none match.
function findTrail(level, maxDistance, maxHours) {
  for (const trail of trails) {
    if (trail.level == level && trail.distance <= maxDistance && trail.hours <= maxHours) { // check if a trail matches criteria
      //debugOutputText.textContent = "matching trail: " + trail.name; // debug message if a trail is found
      //debugOutputText.appendChild(document.createTextNode(" Trail Name: " + trail.name + ", Distance: " + trail.distance + " miles, Hours: " + trail.hours + ", Difficulty: " + trail.level)); // debug message if a trail is found
      return trail; // return the first matching trail
    }
  }
  //debugOutputText.textContent = "no matching trail found"; // debug message 
  return null;
  
}

// renderRecommendation(trail)
// Updates recommendationDiv.
// If trail is null: "No trail matches your criteria. Try adjusting your distance or time."
// If trail found: show name, distance, hours, and difficulty.
// Use createElement + textContent — no innerHTML.
function renderRecommendation(trail) {
  recommendationDiv.innerHTML = ''; // clear previous result
  if (trail === null) {
    const trailnotfound = document.createElement('p');
    trailnotfound.textContent = "No trail matches your criteria. Try adjusting your distance or time.";
    recommendationDiv.appendChild(trailnotfound);
    //debugOutputText.textContent = "no trail found render recommendation"; // debug message if no trail is found

  }
  else if (trail != null) {
    //debugOutputText.textContent = "found trail render recommendation: " + trail.name; // debug message if a trail is found
    const trailfound = document.createElement('p');
    trailfound.textContent = "Trail Name: " + trail.name + ", Distance: " + trail.distance + " miles, Hours: " + trail.hours + ", Difficulty: " + trail.level;
    recommendationDiv.appendChild(trailfound);
  }
  else { // i know this is redundant but i wanted to make sure that if the trail is null, it will return null
    return null;
  }
  return null;

}

// Button handler
findBtn.addEventListener('click', () => {
  // TODO: read values → validate → findTrail → renderRecommendation
  for (const trail of trails) {
    const level = experienceSelect.value;
    const maxDistance = parseFloat(maxDistanceInput.value);
    const maxHours = parseFloat(maxHoursInput.value);
    const validationCheck = validateInputs(level, maxDistance, maxHours); // returns error message if any input is invalid, or null if all valid
    if (validationCheck !== null) { // if any input is invalid, display error message and return
      recommendationDiv.textContent = validationCheck;
      return;
    }
    const trailFound = findTrail(level, maxDistance, maxHours);
    renderRecommendation(trailFound); // render recommendation based on trail found
  }
});

// ─── Part 4: Distance converter functions ────────────────────────────────

// milesToKm(miles)
// Returns miles converted to kilometers (miles × 1.60934), rounded to 2 decimal places.
function milesToKm(miles) {
  kilometers = miles * 1.60934; //convert miles to kilometers
  return kilometers.toFixed(2); //returns and rounds kilometers to 2 decimal places
}

// renderTable(increment, rows)
// Guard clauses: rows must be 1–20; increment must be >= 0.1
// Builds a <table> with columns Miles | Kilometers using createElement.
// Renders into tableOutputDiv.
function renderTable(increment, rows) {
  tableOutputDiv.innerHTML = ''; // clear previous result
  if (rows < 1 || rows > 20) { // check if rows is between 1 and 20
    tableOutputDiv.textContent = 'Invalid row count. Must be between 1 and 20.';
    return;
  }
  else if (increment < 0.1) { // check if increment is at least 0.1
    tableOutputDiv.textContent = 'Invalid increment. Must be at least 0.1.';
    return;
  }
  else {
    // --- for astetic purposes, I added a title to the table as well.
    tableOutputDiv.textContent = 'Miles: --- Kilometers:'; // title of the table
  //  debugOutputText.textContent = 'Increment: ' + increment + ', Rows: ' + rows; // debug message for increment and rows
    for (let i = 0; i < rows; i++) {
      const miles = increment * (i + 1); // calculate miles based on increment and row number
      const kilometers = milesToKm(miles); // convert miles to kilometers
      const row = document.createElement('tr'); // create a new table row
      const milesCell = document.createElement('td'); // create a new table cell for miles
      milesCell.textContent = miles.toFixed(2) +" --- "; // set the text content of the miles cell to the calculated miles, rounded to 2 decimal places
      const kilometersCell = document.createElement('td'); // create a new table cell for kilometers
      kilometersCell.textContent = kilometers; // set the text content of the kilometers cell to the calculated kilometers
      row.appendChild(milesCell); // append the miles cell to the row
      row.appendChild(kilometersCell); // append the kilometers cell to the row
      tableOutputDiv.appendChild(row); // append the row to the table output div
    }
  }
}

generateBtn.addEventListener('click', () => {
  const increment = parseFloat(incrementInput.value);
  const rows      = parseInt(rowCountInput.value, 10);
  renderTable(increment, rows);
});
