Console experiments:

'5' + 3 returns '53' because when you use the + operator in java script with a  string and a number the computer does a type coercion. it converts the number into a string and concatenates them.
'5' - 3 returns 2 because the javascript operator of - only makes sense in a math sense. so the computer does another type coercion changing the string into a number to do the math.
'5' == 5 returns true because the == is an operator in java script which checks if two values are equal by converting them to the same type before comparing them. The string 5 and the number 5 are equal.
'5' === 5 returns false because the === operator in javascript compares two values to see if they are identical. since '5' is a string and 5 is not they are not identical and it returns false.
0 == false returns true because in javascript faluse converts to zero. so when the computer converts both values to the same type 0 equals 0 which is true. 
0===false returns false since the number 0 and the boolean false are not identical. 
null == undefined returns true because a null is the intentional absence of a value and undefined is when a value isnt defined, when the computer converts them to the same type they are equal.
null === undefined returns false since a null and a undefined value are not identical to eachother.

typeof 'hello' returns 'string' because the '' characters indicate a string.
typeof 42 returns 'number' because 42 is a number.
typeof true returns 'boolean' because true and falses are booleans
typeof undefined returns 'undefined' because the type is not defined.
typeof null returns 'object' because of a bug. 000 is a type tag reserved for objects and null pointers consist of all zeros. null is a primitive data type not an object.
typeof [] returns 'object' because arrays are not considered a data type and the computer treats arays as an object type.
typeof {} returns 'object' because a plain set of curly braces creates a plain object type.

'  hello world  '.trim() returns 'hello world' because trim in javascript removes extra spaces or whitespace from the text before printing it.
'hello world'.includes('world') returns true because .includes checks if that word is part of the string, if it is it returns true.
'hello world'.toUpperCase() returns 'HELLO WORLD' because .toUpperCase makes all the letters capitalized.
'hello world'.replace('world', 'JavaScript') returns 'hello JavaScript' because .replace replaces a word with a slected word. 
'hello'.length returns 5 because .length checks how long a string is. in this case hello has 5 letters.

Debugging:
Spelling error with variable name: changed nextYeer to nextYear on line 12 so that it matches the variable name.
return `Hi ${name}! You are ${numericAge} years old. Next year you will be ${nextYear} years old.`; 
Uncaught ReferenceError ReferenceError: nextYeer is not defined was the error code that pointed out nextYEER.

Spelling error with variable name: changed mesage to message on line 16 so that it matches the variable name.
console.log(message);
 at <anonymous> (<node_internals>/internal/modules/cjs/loader:1651:16) this was the error code that had me check line 16.

Changed text to say strict equality instead of loose equality on line 20 because == is loose equality and === is strict equality. Changed to match the case.
console.log('Age matched with strict equality');
there was no error code. but this message wasnt displayed till it was fixed.

Process reflection:
Which type coercion result surprised you most, and why?
i think the - operation was the most suprising. mainly because the + worked very different from it. usualy + and - are direct oposites. but with + the computer just converted them to a string first before concatinating them while the - converted them to numbers before doing the math.

What was the hardest bug to find in Part 3, and what clue in the error message led you to it?
i had a hard time reading the error messages. they were long and pretty technical. most of the time i looked at the numbers and the line number that corresponded. The 3rd error was the one that took the most thought. once i noticed that the text and operator didn't match up all it took was a quick google of the definitions to fix the mistake.