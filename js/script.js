'use strict';

let money = +prompt('Ваш месячный доход?', 45000), //Доход за месяц
   income = 'фриланс', //Доп.доход
   addExpenses = 'Интернет, Такси, Коммуналка', //Дополнительные расходы
   deposit = true,
   mission = 500000, //Желаемая сумма накоплений
   period = 6;

const showTypeOf = data => {
   return console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let budgetDay = money / 30;

addExpenses = prompt(
   'Перечислите возможные расходы за рассчитываемый период через запятую');

const arrExpenses = addExpenses.toLowerCase().split(', ');
console.log('addExpenses: ', arrExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');

const expensesOne = prompt('1. Введите обязательную статью расходов', 'Бензин');
const expensesTwo = prompt('2. Введите обязательную статью расходов', 'Садик');

const amountOne = +prompt('1. Во сколько это обойдется?', 5000);
const amountTwo = +prompt('2. Во сколько это обойдется?', 5000);


const getExpensesMonth = () => {
   return amountOne + amountTwo;
};
console.log('Расходы за месяц: ', getExpensesMonth());

const getAccumulatedMonth = (getIncome, expensesMonth) => {
   return getIncome - expensesMonth;
};
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());

const getTargetMonth = () => {
   return mission / accumulatedMonth;
};
console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth())} месяцев`);

budgetDay = Math.floor(accumulatedMonth / 30);
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