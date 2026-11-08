// Lab 09 – Preference Panels and Saved UI Settings

// ─── Constants ────────────────────────────────────────────────────────────
//Default preferences constant
const DEFAULTS = {
  theme:    'light',
  fontSize: 'medium',
  spacing:  'normal',
};
const STORAGE_KEY = 'reading-prefs';

// ─── Part 3: Preferences functions ───────────────────────────────────────

// loadPreferences()
// Reads from localStorage. Returns the stored preferences object,
// or a copy of DEFAULTS if nothing is stored or if JSON.parse fails.
function loadPreferences() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULTS };
  try {
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULTS };
  }
}

// savePreferences(prefs)
// Serializes the prefs object and writes it to localStorage.
function savePreferences(prefs) {
//  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
 try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    //throw Object.assign(new Error(), { name: 'QuotaExceededError' })
  } catch (err) {
    if (err.name === 'QuotaExceededError') {
      //Testing quota exceeded: You cannot easily fill storage in a lab setting, 
      // but you can verify your code handles the path correctly by temporarily replacing localStorage.setItem(...) 
      // with throw Object.assign(new Error(), { name: 'QuotaExceededError' }) inside savePreferences, reloading,
      //  and confirming the warning appears without a JavaScript crash.
      // Storage is full — preferences will not persist this session.
      // Show a non-intrusive warning rather than crashing.
      console.warn('localStorage quota exceeded. Preferences will not be saved this session.');
      showStorageWarning(); // implement below
    }
  }
}

//Add showStorageWarning() to your JS and a matching element to your HTML:
function showStorageWarning() {
  const warning = document.getElementById('storage-warning');
  if (warning) warning.hidden = false;
}

// applyPreferences(prefs, articleEl)
// Applies the preference object to articleEl by swapping CSS classes.
// Removes all existing theme-*, font-*, and spacing-* classes first,
// then adds the new ones.
function applyPreferences(prefs, articleEl) {
  articleEl.className = articleEl.className
    .split(' ')
    .filter(cls =>
      !cls.startsWith('theme-') &&
      !cls.startsWith('font-') &&
      !cls.startsWith('spacing-')
    )
    .join(' ');

  articleEl.classList.add(`theme-${prefs.theme}`);
  articleEl.classList.add(`font-${prefs.fontSize}`);
  articleEl.classList.add(`spacing-${prefs.spacing}`);
}

// syncRadioButtons(prefs)
// Sets the correct radio button to checked based on the prefs object.
//After loading prefs, this function sets the correct radio button to checked:
function syncRadioButtons(prefs) {
  document.querySelector(`[name="theme"][value="${prefs.theme}"]`).checked = true;
  document.querySelector(`[name="font-size"][value="${prefs.fontSize}"]`).checked = true;
  document.querySelector(`[name="spacing"][value="${prefs.spacing}"]`).checked = true;
}

// ─── Part 4: Initialize ───────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const article = document.getElementById('article');
  const panel   = document.getElementById('preferences-panel');
  const resetBtn = document.getElementById('reset-btn');

  // 1. Load preferences and apply them immediately (before anything else renders)
  const prefs = loadPreferences();
  applyPreferences(prefs, article);
  syncRadioButtons(prefs);

  // 2. Listen for radio button changes
  // TODO: Add a 'change' listener to panel.
  // When a radio changes, load the current prefs, update the changed property,
  // save the updated prefs, and apply them.
  // Listen for changes to any radio button group
   document.querySelector('#preferences-panel').addEventListener('change', (event) => {
    const updated = loadPreferences();

    if (event.target.name === 'theme') updated.theme = event.target.value;
    if (event.target.name === 'font-size') updated.fontSize = event.target.value;
    if (event.target.name === 'spacing') updated.spacing = event.target.value;

    savePreferences(updated);
    applyPreferences(updated, article);
  });

  // 3. Reset button
  // TODO: Add a 'click' listener to resetBtn.
  // Save DEFAULTS, apply DEFAULTS, and sync the radio buttons.
  document.getElementById('reset-btn').addEventListener('click', () => {
    savePreferences({ ...DEFAULTS });
    applyPreferences(DEFAULTS, article);
    syncRadioButtons(DEFAULTS);
  });
});
