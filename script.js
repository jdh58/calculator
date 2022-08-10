add = (a, b) => parseFloat(a) + parseFloat(b);
sub = (a, b) => a - b;
mult = (a, b) => a * b;
div = (a, b) => a / b;
pow = (a, b) => Math.pow(a, b);

function operate(operator, a, b) {
    console.log('dsa');
    if (operator == '+') { return add(a, b); }
    if (operator == '-') { return sub(a, b); }
    if (operator == '*') { return mult(a, b); }
    if (operator == '/') { return div(a, b); }
    if (operator == '^') { return pow(a, b); }
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

/* Store the second number that will be operated with the first */
function secondPressed(e) {
    /* Concatenate each number pressed to the 'second' variable until
    an operator is pressed */
    second += getId(e);
    // Display the numbers being entered
    screenText.textContent = second;
}

function equalsPressed() {
    /* Display the appropirate calculation between the first and
    second numbers, using the most recently pressed operator */
    screenText.textContent = operate(operator, first, second);

    /* To prepare for the next calulation, set first equal to the current
    answer, and reset second and operator to be empty */
    first = screenText.textContent;
    second = '';
    operator = '';

    /* This prevents the user from entering invalid inputs and crashing
    the calculator */
    if (screenText.textContent === '' || screenText.textContent === 'NaN'
    || screenText.textContent === 'Infinity') {
        screenText.textContent = 'ERROR';
    }
}

/* Gets the id for the clicked button. This function
prevents re-writing code and improves readability */
function getId(e) {
    /* If the user clicked the nested element, set the text equal to the
    parent button's id. If they pressed the button itself, do the same. */
    if (e.target.nodeName == 'P') {
        return e.composedPath()[1].id;
    } else {
        return e.target.id;
    }
}

/* Call when the clear button is pressed. Resets back to a default
state */
function clearPressed() {
    // Go back to waiting for the first press if it wasn't
    numButtons.forEach(button => button.removeEventListener('click', secondPressed));
    numButtons.forEach(button => button.addEventListener('click', numPressed));

    // Re-initialize values to the empty default ('')
    first = '';
    second = '';
    operator = '';
    screenText.textContent = '';
}