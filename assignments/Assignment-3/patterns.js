// JavaScript requirements
// All three patterns in a single patterns.js file (or split into three files)
// Each pattern implemented as a named initialization function: initAccordion(), initTabs(), initFilter()
// All three called at the bottom of the file (or in DOMContentLoaded)
// No innerHTML for dynamic content — use classList for show/hide, textContent for count updates
// Event delegation where appropriate (accordion and filter)
// No onclick HTML attributes

// Patterns to implement
// You must implement all three of the following patterns. Each pattern must be built independently (no shared state between them).

// Pattern 1: Accordion / FAQ
// An accordion with at least four question-answer pairs. Rules:

// Only one answer can be open at a time (opening a new one closes the previous)
// Each trigger is a <button> inside an <h3> (or <h2>) — not a bare <div>
// aria-expanded="true"/"false" on the trigger button reflects open/closed state
// aria-controls on the button points to the answer panel's id
// The answer panel has id matching the aria-controls value
// Pattern 2: Tabbed interface
// A tab component with at least three tabs. Rules:

// Tabs use correct ARIA roles: role="tablist" on the container, role="tab" on each button, role="tabpanel" on each panel
// aria-selected="true" on the active tab, aria-selected="false" on inactive tabs
// Each tab has aria-controls pointing to its panel's id; each panel has aria-labelledby pointing to its tab's id
// Arrow key navigation: Left/Right arrow keys move focus between tabs (keyboard users should not have to Tab through every tab to reach the content)
// The active tab is visually distinct from inactive tabs
// Pattern 3: Live filter
// A list of at least eight items (cards, names, products — your choice) with a text input that filters visible items as the user types. Rules:

// Filtering updates the DOM without a full re-render (use CSS class hidden + classList.toggle)
// A count element below the input reads "Showing X of Y items" and updates on every keystroke
// The count element has aria-live="polite"
// Empty state: if no items match, display a "No results" message
// Input is labelled with a <label> (not just a placeholder)


