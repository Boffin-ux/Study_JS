'use strict';
const startBtn = document.getElementById('start'),
   incomeAdd = document.getElementsByTagName('button')[0],
   expensesAdd = document.getElementsByTagName('button')[1],
   depositCheck = document.querySelector('#deposit-check'),
   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
   budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
   incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
   targetMonthValue = document.getElementsByClassName('target_month-value')[0],
   salaryAmount = document.querySelector('.salary-amount'),
   incomeTitle = document.querySelector('.income-title'),
   incomeAmount = document.querySelector('.income-amount'),
   expensesTitle = document.querySelector('.expenses-title'),
   expensesAmount = document.querySelector('.expenses-amount'),
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount'),

   periodSelect = document.querySelector('.period-select');


periodSelect.addEventListener('click', () => {

});
let isNumber = n => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};
let isString = n => {
   return isNaN(n) && typeof n === 'string';
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
   percentDeposit: 0,
   moneyDeposit: 0,
   mission: 500000,
   period: 6,
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   asking: () => {

      if (confirm('Есть ли у вас дополнительный источник заработка')) {
         let itemIncome;
         do {
            itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
         }
         while (!isString(itemIncome));

         let cashIncome;
         do {
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
         }
         while (!isNumber(cashIncome));
         appData.income[itemIncome] = cashIncome;
      }

      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет,такси');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      for (let i = 0; i < 2; i++) {
         let expenseItem = prompt('Введите обязательную статью расходов');
         while (!isString(expenseItem)) {
            expenseItem = prompt('Введите обязательную статью расходов');
         }
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
   },
   getInfoDeposit: () => {
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      if (appData.deposit) {
         do {
            appData.percentDeposit = prompt('Какой годовой процент', '10');
         } while (!isNumber(appData.percentDeposit));
         do {
            appData.mission = prompt('Какая сумма заложена?', 10000);
         } while (!isNumber(appData.mission));
      }
   },
   calcSavedMoney: () => {
      return appData.budgetMonth * appData.period;
   }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();
appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);

(appData.getTargetMonth() > 0) ?
   console.log(`Цель будет достигнута за ${Math.ceil(appData.getTargetMonth())} месяцев`) :
   console.log('Цель не будет достигнута');

console.log(appData.getStatusIncome());

console.log(appData.addExpenses.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join(', '));

for (let key in appData) {
   console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
}