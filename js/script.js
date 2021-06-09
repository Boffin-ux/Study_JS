'use strict';
let startBtn = document.getElementById('start'),
   incomeAdd = document.getElementsByTagName('button')[0],
   expensesAdd = document.getElementsByTagName('button')[1],
   depositCheck = document.querySelector('#deposit-check'),
   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
   budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
   budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
   incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
   targetMonthValue = document.getElementsByClassName('target_month-value')[0],
   salaryAmount = document.querySelector('.salary-amount'),
   incomeTitle = document.querySelector('.income-title'),
   // incomeAmount = document.querySelector('.income-amount'),
   expensesTitle = document.querySelector('.expenses-title'),
   expensesItems = document.querySelectorAll('.expenses-items'),
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount'),
   incomeItems = document.querySelectorAll('.income-items');

let isNumber = n => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};
let isString = n => {
   return isNaN(n) && typeof n === 'string';
};

let appData = {
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   income: {},
   incomeMonth: 0,
   addIncome: [],
   expenses: {},
   expensesMonth: 0,
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   periodAmount: 0,
   start: () => {
      appData.budget = +salaryAmount.value;
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();

      appData.showResult();
      // appData.getStatusIncome();
      // appData.getInfoDeposit();
   },
   showResult: () => {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = Math.ceil(appData.budgetDay);
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcPeriod();
      periodSelect.addEventListener('input', () => {
         incomePeriodValue.value = appData.calcPeriod();
      });
   },
   addExpensesBlock: () => {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
         expensesAdd.style.display = 'none';
      }
   },
   getExpenses: () => {
      expensesItems.forEach(item => {
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
         }
      });
   },
   addIncomeBlock: () => {
      const cloneIncomeItems = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
         incomeAdd.style.display = 'none';
      }
   },
   getIncome: () => {
      incomeItems.forEach(item => {
         let itemIncomes = item.querySelector('.income-title').value;
         let cashIncomes = item.querySelector('.income-amount').value;
         if (itemIncomes !== '' && cashIncomes !== '') {
            appData.income[itemIncomes] = cashIncomes;
         }
      });
      for (let key in appData.income) {
         appData.incomeMonth += +appData.income[key];
      }
   },
   getAddExpenses: () => {
      const addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            appData.addExpenses.push(item);
         }
      });
   },
   getAddIncome: () => {
      additionalIncomeItem.forEach(item => {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            appData.addIncome.push(itemValue);
         }
      });
   },
   getExpensesMonth: () => {
      for (let key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
   },
   getBudget: () => {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: () => {
      return targetAmount.value / appData.budgetMonth;
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
   calcPeriod: () => {
      return appData.budgetMonth * periodSelect.value;
   },
   addPeriodAmount: () => {
      appData.periodAmount = +periodSelect.value;
      periodAmount.textContent = +appData.periodAmount;
   }
};
startBtn.disabled = true;

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.addPeriodAmount);

salaryAmount.addEventListener('input', () => {
   if (salaryAmount.value) {
      startBtn.disabled = false;
      startBtn.addEventListener('click', appData.start);
   }
});
// (appData.getTargetMonth() > 0) ?
//    console.log(`Цель будет достигнута за ${Math.ceil(appData.getTargetMonth())} месяцев`) :
//    console.log('Цель не будет достигнута');

// console.log(appData.addExpenses.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join(', '));

// for (let key in appData) {
//    console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
// }