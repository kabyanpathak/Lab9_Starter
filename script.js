'use strict';

class DivisionByZeroError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DivisionByZeroError';
    }
}

window.onerror = function(message, source, lineno, colno, error) {
    console.log(`Global error: ${message} at ${source}:${lineno}:${colno}`);
    return false;
};

function deepest() {
    console.trace();
}

function deeper() {
    deepest();
}

function deep() {
    deer();
}

function deer() {
    deeper();
}

function handleBtnClick() {
    deep();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const output = document.querySelector('output');
    const firstNumInput = document.querySelector('#first-num');
    const secondNumInput = document.querySelector('#second-num');
    const operatorSelect = document.querySelector('#operator');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstNum = firstNumInput.value.trim();
            const secondNum = secondNumInput.value.trim();
            const operator = operatorSelect.value;

            try {
                if (firstNum === '' || secondNum === '') {
                    throw new ReferenceError('Inputs cannot be empty.');
                }

                if (operator === '/' && Number(secondNum) === 0) {
                    throw new DivisionByZeroError('Division by zero.');
                }

                const result = eval(`${firstNum} ${operator} ${secondNum}`);

                if (Number.isNaN(result)) {
                    throw new TypeError('Result is NaN.');
                }

                output.innerHTML = result;

            } catch (error) {
                console.error(`Error: ${error.message}`);
                output.innerHTML = 'Calculation error.';
            } finally {
                console.log('Calculation finished.');
            }
        });
    }

    const errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

    errorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.textContent.trim();

            switch (action) {
                case 'Console Log':
                    console.log('Log statement Demo.');
                    break;

                case 'Console Error':
                    console.error('Error statement.');
                    break;

                case 'Console Count':
                    console.count('Count Button');
                    break;

                case 'Console Warn':
                    console.warn('Warning statement.');
                    break;

                case 'Console Assert':
                    console.assert(1 === 2, 'Assertion failed: the numbers don\'t match.');
                    break;

                case 'Console Clear':
                    console.clear();
                    break;

                case 'Console Dir':
                    console.dir(btn);
                    break;

                case 'Console dirxml':
                    console.dirxml(btn);
                    break;

                case 'Console Group Start':
                    console.group('Group');
                    break;

                case 'Console Group End':
                    console.groupEnd('Group');
                    break;

                case 'Console Table':
                    console.table([
                        { name: 'Software Engineering', num: 110 },
                        { name: 'Programming Languages', num: 130 },
                        { name: 'Advanced Software Engineering', num: 112 }
                    ]);
                    break;

                case 'Start Timer':
                    console.time('Timer Button');
                    break;

                case 'End Timer':
                    console.timeEnd('Timer Button');
                    break;

                case 'Console Trace':
                    handleBtnClick();
                    break;

                case 'Trigger a Global Error':
                    triggerUnhandledGlobalException();
                    break;

                default:
                    break;
            }
        });
    });
});
