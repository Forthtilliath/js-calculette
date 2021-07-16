// Les champs pour les résultats
const numFinal = document.querySelector('#output');
const screenCalc = document.querySelector('.screen-calc');

// Les boutons
const btnValues = document.querySelectorAll('.value');
const btnClear = document.querySelector('#reset');
const btnSolution = document.querySelector('#egal');
const btnDel = document.querySelector('#del');

const operators = ['*', '/', '+', '-', '.'];
let calcul = '';
const maxLength = 12;

btnValues.forEach((btn) => btn.addEventListener('click', (e) => display(e.target)));
btnClear.addEventListener('click', clear);
btnSolution.addEventListener('click', solution);
btnDel.addEventListener('click', del);

function setDisplay(textVisible = '', textHidden = '') {
    numFinal.innerText = textVisible;
    calcul = textHidden.toString();
}

/**
 * Vérifie si la dernière valeur était un opérateur
 */
function lastValueIsOperator() {
    return operators.includes(calcul.split('').pop());
}

/**
 * Vérifie si la valeur courrante était un opérateur
 */
function isOperator(value) {
    return operators.includes(value);
}

/**
 * Réinitialise le contenu
 */
function clear() {
    setDisplay('0');
}

/**
 * Supprime la dernière valeur
 */
function del() {
    if (numFinal.innerText.length === 1) clear();
    else setDisplay(numFinal.innerText.slice(0, -1), calcul.slice(0, -1));
}

function removeZero() {
    if (numFinal.innerText === '0') {
        setDisplay();
    }
}

function display(button) {
    removeZero();
    console.log(numFinal.innerText.length >= maxLength);
    if (numFinal.innerText.length >= maxLength) {
        screenCalc.classList.add('error');
        return;
    }
    screenCalc.classList.remove('error');
    if (lastValueIsOperator() && isOperator(button.value)) {
        del();
    }
    setDisplay(numFinal.innerText + button.innerText, calcul + button.value);
}

function solution() {
    removeZero();
    let resolu = eval(calcul);
    setDisplay(resolu, resolu);
}
