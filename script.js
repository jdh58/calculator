/*function add(nums) {
    let sumAll = 0;
    for (let i = 0; i < nums.length; i++) {
        sumAll =+ nums[i];
    }
    return sumAll;
}*/

add = (a, b) => a + b;
sub = (a, b) => a - b;
mult = (a, b) => a * b;
div = (a, b) => a / b;

function operate(operator, a, b) {
    if (operator == '+') { return add(a, b); }
    if (operator == '-') { return sub(a, b); }
    if (operator == '*') { return mult(a, b); }
    if (operator == '/') { return div(a, b); }
}

const buttons = document.querySelectorAll('.buttons');
const screenText = document.getElementById('screen-text');

buttons.forEach(button => button.addEventListener('click', runPressed));

function runPressed(e) {
    // Declare text as an empty string
    let text = '';

    /* If the user clicked the nested element, set the text equal to
    the button's id. If they pressed the button, do the same. */
    if (e.target.nodeName == 'P') {
        text = e.composedPath()[1].id;
    } else {
        text = e.target.id;
    }

    screenText.textContent += text;

    // If the user pressed clear, wipe the screen
    if (text === 'clear') {
        screenText.textContent = '';
    }

    if (text === '=') {

    }
}