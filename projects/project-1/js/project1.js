//At least two interactive components functional, even if unpolished
//2 interactive conponents a button glows when hovered. accordian menu. 

//FEEDBACK: Good progress on the :root tokens, and the FAQ accordion works with aria-expanded. 
// Two things are missing for this milestone. (1) http://127.0.0.1:5500 only loads on your own computer, 
// so the project isn't deployed yet; publish it and submit the public URL. 
// (2) Project 1 is a style guide that documents your design system, not a store page. 
// You still need a Design tokens section (a color swatch for each --color-* variable with its name and hex value, 
// plus spacing and font-size samples) and a Typography section (h1-h4, a body paragraph, a blockquote, ol/ul, and code/pre).
//  See "Required sections" in the Project 1 brief. Also, the css\style.css and js\project1.js paths use backslashes; 
// change them to forward slashes (css/style.css) so they work on a web server.

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
const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', (event) => {
        if (event.target.matches('.checkoutButton')) { 
            const ThankYouMessage = document.getElementById('ThankYouMessage');
            ThankYouMessage.replaceChildren();
            ThankYouMessage.append("Thank you for your purchase!");
        }
    });

// DOM listener
document.addEventListener("DOMContentLoaded", (event) => {
    console.log('content loaded');
    initFaq(document.querySelector('.faq'));
});
