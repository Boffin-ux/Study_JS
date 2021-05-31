'use strict';

let money = 45000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 500000;
let period = 6;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

const arrExpenses = addExpenses.toLowerCase().split(', ');
console.log('addExpenses: ', arrExpenses);

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt(
   'Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

const expensesOne = prompt('1. Введите обязательную статью расходов?');
const expensesTwo = prompt('2. Введите обязательную статью расходов?');

const amountOne = +prompt('1. Во сколько это обойдется?');
const amountTwo = +prompt('2. Во сколько это обойдется?');

const budgetMonth = money - (amountOne + amountTwo);
console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев');

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) {
   console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
   console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
   console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
   console.log('Что то пошло не так');
}
