const money = 45000;
const income = 'фриланс';
const addExpenses = 'Интернет, Такси, Коммуналка';
const deposit = true;
const mission = 500000;
const period = 6;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

const arrExpenses = addExpenses.toLowerCase().split(', ');
console.log('addExpenses: ', arrExpenses);

const budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);