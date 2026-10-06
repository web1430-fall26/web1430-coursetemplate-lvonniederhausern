

Rationale (in rationale.md)
Write 4–6 sentences addressing:

What calculator did you build and who is it for?

I built the tip and bill splitter. It's for people trying to evenly split the bill at a restaurant. You enter the total, your tip percentage, and how many people there are. Then it returns how much everyone individually owes. 

How did you separate calculation logic from rendering logic, and why does that separation matter?

I calculated the total in a separate function that returned the totals; those totals were then displayed with a separate function. Keeping the calculations and renderings separate. It makes your code much cleaner if you separate your code into functions. 

(Clear answers on what you built, edge cases, and extensions (the point about not capping tips is a good insight). The separation answer only says it makes code cleaner; explain why it matters, e.g. pureCalculation can be tested without the page, and the display can change without touching the math.)

It keeps your core data/algorithms completely seperare from the interface or screen. This seperation matters because it allows for better testablility, reusablility and maintenance. It makes sure that the visual aspects dont effect the math. 

What edge cases did your validation catch, and did you discover any you hadn't anticipated?

It caught if your total was 0 or a negative number, which makes sense. It also had an edge case if your tip percentage was over 100 % or if you tried to enter the number of people as less than 0. I think personally the percentage shouldn't have an upper limit because people might want to overtip if they were really impressed with service.

What would you add if you extended this tool?

I want to make it more accessibility-friendly, but I struggle with programming that. If I wanted to get into more detail, I could make it so that if one person's meal was more expensive than the average, they had to pay a larger portion of the bill.
