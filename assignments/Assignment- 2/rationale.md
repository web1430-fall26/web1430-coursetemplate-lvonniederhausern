(Clear answers on what you built, edge cases, and extensions (the point about not capping tips is a good insight). The separation answer only says it makes code cleaner; explain why it matters, e.g. pureCalculation can be tested without the page, and the display can change without touching the math.)

Rationale (in rationale.md)
Write 4–6 sentences addressing:

What calculator did you build and who is it for?

I built the tip and bill splitter. It's for people trying to evenly split the bill at a restaurant. You enter the total, your tip percentage, and how many people there are. Then it returns how much everyone individually owes, the full total, and the tip price. it cauculates how much the tip is based on the total and percentage. Then it adds that amount to the price giving you the Total Bill. the total bill is then divided evenly by the number of people there giving you the split bill.

How did you separate calculation logic from rendering logic, and why does that separation matter?

I calculated the total in a separate function that returned the totals; those totals were then displayed with a separate function. Keeping the calculations and renderings separate. It makes your code much cleaner if you separate your code into functions. It keeps your core data/algorithms completely seperare from the interface or screen. This seperation matters because it allows for better testablility, reusablility and maintenance. It makes sure that the visual asspects dont effect the math. 

What edge cases did your validation catch, and did you discover any you hadn't anticipated?

if the meal total was less than 0 or not a number it had an edge case. if the percentage wasnt a number or wasnt between 0 and 100 there would be an error. and if the number of people wasnt a number or less than 1 there was an error. i almost forgot about making sure the number of people was a whole number so i added that this time. I think personally the percentage shouldn't have an upper limit because people might want to overtip if they were really impressed with service.

What would you add if you extended this tool?

 If I wanted to get into more detail, I could make it so that if one person's meal was more expensive than the average, they had to pay a larger portion of the bill. 
