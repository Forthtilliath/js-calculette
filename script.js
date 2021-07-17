const calcStd = document.querySelector('#simplecalc');
const calcSc = document.querySelector('#scientificalc');

const numbers = ['zero', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
const datasValuesCalcStd = [
    {
        class: 'multiplication',
        value: '*',
        text: 'x',
    },
    {
        class: 'division',
        value: '/',
        text: '/',
    },
    {
        class: 'addition',
        value: '+',
        text: '+',
    },
    {
        class: 'soustraction',
        value: '-',
        text: '-',
    },
    {
        class: 'virgule',
        value: '.',
        text: '.',
    },
    {
        class: 'del',
        text: 'DEL',
    },
    {
        class: 'reset',
        text: 'RESET',
    },
    {
        class: 'egal',
        text: '=',
    },
];
numbers.forEach((value, index) =>
    datasValuesCalcStd.push({
        class: value,
        value: index,
        text: index,
    }),
);

const datasValuesCalcSct = [
    ...datasValuesCalcStd,
    {
        class: 'pourcent',
        value: '%',
        text: '%',
    },
    {
        class: 'parentheseouverte',
        value: '(',
        text: '(',
    },
    {
        class: 'parentheseferme',
        value: ')',
        text: ')',
    },
    {
        class: 'racinecarree',
        value: '',
        text: '√',
    },
    {
        class: 'puissance',
        value: '%',
        text: '^',
    },
];

const calculatriceStandard = new Calculatrice(calcStd, datasValuesCalcStd);
const calculatriceScientific = new Calculatrice(calcSc, datasValuesCalcSct);
