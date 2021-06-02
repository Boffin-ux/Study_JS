'use strict';

let isNumber = n => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, //Доход за месяц
   income = 'фриланс', //Доп.доход
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), //Дополнительные расходы
   deposit = true,
   mission = 500000, //Желаемая сумма накоплений
   period = 6;

let start = () => {
   do {
      money = prompt('Ваш месячный доход?');
   }
   while (!isNumber(money));
};
start();


const showTypeOf = data => {
   return console.log(data, typeof (data));
};

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses = [];

let getExpensesMonth = () => {
   let sum = 0;
   let amount;
   for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов');
      amount = prompt('Во сколько это обойдется?');
      while (!isNumber(amount)) {
         amount = prompt('Во сколько это обойдется?');
      }
      sum += +amount;
   }
   return sum;
};

const expensesAmonth = getExpensesMonth();

const getAccumulatedMonth = () => {
   return money - expensesAmonth;
};
const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = () => {
   return mission / accumulatedMonth;
};


const budgetDay = Math.floor(accumulatedMonth / 30);


const getStatusIncome = () => {
   if (budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
   } else if (budgetDay >= 600 && budgetDay < 1200) {
      return ('У вас средний уровень дохода');
   } else if (budgetDay >= 0 && budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
   } else {
      return ('Что-то пошло не так');
   }
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));
console.log('Расходы за месяц: ', expensesAmonth);

(getTargetMonth() > 0) ?
   console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth())} месяцев`) :
   console.log('Цель не будет достигнута');

console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());