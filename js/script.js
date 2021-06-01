'use strict';

let money = +prompt('Ваш месячный доход?', 45000),
   income = 'фриланс',
   addExpenses = 'Интернет, Такси, Коммуналка',
   deposit = true,
   mission = 500000,
   period = 6;

const showTypeOf = data => {
   return console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('addExpenses length: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

const arrExpenses = addExpenses.toLowerCase().split(', ');
console.log('addExpenses: ', arrExpenses);

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

addExpenses = prompt(
   'Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

const expensesOne = prompt('1. Введите обязательную статью расходов?', 'Бензин');
const expensesTwo = prompt('2. Введите обязательную статью расходов?', 'Садик');

const amountOne = +prompt('1. Во сколько это обойдется?', 5000);
const amountTwo = +prompt('2. Во сколько это обойдется?', 5000);

const budgetMonth = money - (amountOne + amountTwo);
console.log('Бюджет на месяц: ', budgetMonth);

console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев`);

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

const getStatusIncome = () => {
   if (budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
   } else if (budgetDay >= 600 && budgetDay < 1200) {
      return ('У вас средний уровень дохода');
   } else if (budgetDay >= 0 && budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
   } else {
      return ('Что то пошло не так');
   }
};
console.log(getStatusIncome());

const getExpensesMonth = () => {
   return amountOne + amountTwo;
};
console.log('getExpensesMonth: ', getExpensesMonth());
const getAccumulatedMonth = () => {

};

const accumulatedMonth = getAccumulatedMonth;