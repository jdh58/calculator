/*function add(nums) {
    let sumAll = 0;
    for (let i = 0; i < nums.length; i++) {
        sumAll =+ nums[i];
    }
    return sumAll;
}*/

add = (a, b) => parseFloat(a) + parseFloat(b);
sub = (a, b) => a - b;
mult = (a, b) => a * b;
div = (a, b) => a / b;

function operate(operator, a, b) {
    console.log('dsa');
    if (operator == '+') { return add(a, b); }
    if (operator == '-') { return sub(a, b); }
    if (operator == '*') { return mult(a, b); }
    if (operator == '/') { return div(a, b); }
}

const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.operator')
const screenText = document.getElementById('screen-text');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
let first = '';
let operator = '';
let second = '';

numButtons.forEach(button => button.addEventListener('click', numPressed));
opButtons.forEach(button => button.addEventListener('click', opPressed));
equalsButton.addEventListener('click', equalsPressed);
clearButton.addEventListener('click', clearPressed);

function numPressed(e) {
    /* The first number of our operation should be all the numbers
    pressed up until the first operator is pressed */
    first += getId(e);
    /* Display the user input on the display */
    screenText.textContent = first;
}

function opPressed(e) {
    /* Once an operator is chosen, we want to record the second number in
    our operation, not our first. So we swap out the event listeners */
    numButtons.forEach(button => button.removeEventListener('click', numPressed));
    numButtons.forEach(button => button.addEventListener('click', secondPressed));
    /* If the user has already made one operation, pressing another should
    act as an equals button for the previous operation before perfoming the next*/
    if (second !== '') {
        screenText.textContent = operate(operator, first, second);
        first = screenText.textContent;
        second = '';
    }
    operator = getId(e);
}

function secondPressed(e) {
    second += getId(e);
    screenText.textContent = second;
}

function equalsPressed() {
    screenText.textContent = operate(operator, first, second);
    first = screenText.textContent;
    second = '';
    operator = '';
    if (screenText.textContent === '' || screenText.textContent === 'NaN') {
        screenText.textContent = 'ERROR';
    }
}

/* Gets the id for the clicked button. Prevents code re-writing
and improves readability */
function getId(e) {
    /* If the user clicked the nested element, set the text equal to
    the button's id. If they pressed the button, do the same. */
    if (e.target.nodeName == 'P') {
        return e.composedPath()[1].id;
    } else {
        return e.target.id;
    }
}

/* Call when the clear button is pressed. Resets back to a default
state */
function clearPressed() {
    numButtons.forEach(button => button.removeEventListener('click', secondPressed));
    numButtons.forEach(button => button.addEventListener('click', numPressed));
    first = '';
    second = '';
    operator = '';
    screenText.textContent = '';
}