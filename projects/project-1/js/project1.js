//At least two interactive components functional, even if unpolished
//2 interactive conponents a button glows when hovered. accordian menu. 

// accordian menu
function initFaq(faqContainer) {
    // Adds a single click listener to faqContainer (event delegation)
    faqContainer.addEventListener('click', (event) => {
        if (event.target.matches('.faq-question')) { // When a click is detected, checks if event.target.matches('.faq-question') 
            //if the selected element is a faq-question go through all the qs and find the matching answer.
            //grab aria-controls value of the clicked question
            const answerId = event.target.getAttribute('aria-controls');
            const answerEl = document.getElementById(answerId);
            // Toggles the clicked question open or closed
            if (answerEl.hidden) { //if the answer is hidden open it
                answerEl.hidden = false;
                event.target.setAttribute('aria-expanded', 'true');
                // Finds all other open questions and closes them (removes the hidden attribute trick: toggle hidden on the answer div, set aria-expanded to the correct string)
                for (const answer of document.getElementsByClassName("faq-answer")) {
                    if (answer !== answerEl) {
                        answer.hidden = true;
                        answer.setAttribute('aria-expanded', 'false');
                    }
                }
            } else { //if the answer is open, close it
                answerEl.hidden = true;
                event.target.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

// add place to generate product cards

//add check boxs for product selection

// check user text imputs for email and address.

//add code for check out button, print recipt, and thanks for buying message

// DOM listener
document.addEventListener("DOMContentLoaded", (event) => {
    console.log('content loaded');
    initFaq(document.querySelector('.faq'));
});
