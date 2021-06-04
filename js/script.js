'use strict';

let isNumber = n => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};
let money, //Доход за месяц
   start = () => {
      do {
         money = prompt('Ваш месячный доход?');
      }
      while (!isNumber(money));
   };
start();

let appData = {
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   mission: 500000,
   period: 6,
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   asking: () => {
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      for (let i = 0; i < 2; i++) {
         const expenseItem = prompt('Введите обязательную статью расходов');
         let amount = prompt('Во сколько это обойдется?');
         while (!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');
         }
         appData.expenses[expenseItem] = +amount;
      }
   },
   getExpensesMonth: () => {
      for (let key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
   },
   getBudget: () => {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: () => {
      return appData.mission / appData.budgetMonth;
   },
   getStatusIncome: () => {
      if (appData.budgetDay >= 1200) {
         return ('У вас высокий уровень дохода');
      } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
         return ('У вас средний уровень дохода');
      } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else {
         return ('Что-то пошло не так');
      }
   }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ', appData.expensesMonth);

(appData.getTargetMonth() > 0) ?
   console.log(`Цель будет достигнута за ${Math.ceil(appData.getTargetMonth())} месяцев`) :
   console.log('Цель не будет достигнута');

console.log(appData.getStatusIncome());

for (let key in appData) {
   console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
}
