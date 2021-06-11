'use strict';
let startBtn = document.getElementById('start'),
   cancelBtn = document.getElementById('cancel'),
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
   incomeTitleInput = document.querySelector('input.income-title'),
   incomeAmount = document.querySelector('.income-amount'),
   expensesTitle = document.querySelector('.expenses-title'),
   expensesTitleInput = document.querySelector('input.expenses-title'),
   expensesItems = document.querySelectorAll('.expenses-items'),
   expensesAmount = document.querySelector('.expenses-amount'),
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount'),
   checkBoxDeposit = document.querySelector('#deposit-check'),
   incomeItems = document.querySelectorAll('.income-items');

let checkNum = amount => {
   amount.addEventListener('input', () => {
      amount.value = amount.value.replace(/[^0-9]/g, '');
   });
};

let checkletter = titleletter => {
   titleletter.addEventListener('input', () => {
      titleletter.value = titleletter.value.replace(/[^а-яА-ЯёЁ .,]/g, '');
   });
};

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
   allInputs: [],
   start: function () {
      if (salaryAmount.value === '') {
         startBtn.setAttribute('disabled', true);
         return;
      }
      this.budget = +salaryAmount.value;
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.blockInputs();
      this.showResult();
      startBtn.style.display = 'none';
      cancelBtn.style.display = 'block';

   },
   showResult: function () {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.ceil(this.budgetDay);
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('input', () => {
         incomePeriodValue.value = this.calcPeriod();
      });
   },
   addExpensesBlock: function () {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      let expensesAmount = cloneExpensesItem.querySelector('.expenses-amount');
      let itemExpenses = cloneExpensesItem.querySelector('.expenses-title');
      expensesAmount.value = '';
      itemExpenses.value = '';
      checkletter(itemExpenses);
      checkNum(expensesAmount);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
         expensesAdd.style.display = 'none';
      }
   },
   getExpenses: function () {
      expensesItems.forEach(item => {
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
         }
      });
   },
   addIncomeBlock: function () {
      const cloneIncomeItems = incomeItems[0].cloneNode(true);
      let incomeAmount = cloneIncomeItems.querySelector('.income-amount');
      let itemIncome = cloneIncomeItems.querySelector('.income-title');
      incomeAmount.value = '';
      itemIncome.value = '';
      checkletter(itemIncome);
      checkNum(incomeAmount);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
         incomeAdd.style.display = 'none';
      }
   },
   getIncome: function () {
      incomeItems.forEach(item => {
         let itemIncomes = item.querySelector('.income-title').value;
         let cashIncomes = item.querySelector('.income-amount').value;
         if (itemIncomes !== '' && cashIncomes !== '') {
            this.income[itemIncomes] = cashIncomes;
         }
      });
      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   },
   getAddExpenses: function () {
      const addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      });
   },
   getAddIncome: function () {
      additionalIncomeItem.forEach(item => {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });
   },
   getExpensesMonth: function () {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   },
   getBudget: function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return targetAmount.value / this.budgetMonth;
   },
   getStatusIncome: function () {
      if (this.budgetDay >= 1200) {
         return ('У вас высокий уровень дохода');
      } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
         return ('У вас средний уровень дохода');
      } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else {
         return ('Что-то пошло не так');
      }
   },
   getInfoDeposit: function () {
      this.deposit = confirm('Есть ли у вас депозит в банке?');
      if (this.deposit) {
         do {
            this.percentDeposit = prompt('Какой годовой процент', '10');
         } while (!isNumber(this.percentDeposit));
         do {
            this.mission = prompt('Какая сумма заложена?', 10000);
         } while (!isNumber(this.mission));
      }
   },
   calcPeriod: function () {
      return this.budgetMonth * periodSelect.value;
   },
   addPeriodAmount: function () {
      this.periodAmount = +periodSelect.value;
      periodAmount.textContent = +this.periodAmount;
   },
   blockInputs: function () {
      this.getAllInputs();
      this.allInputs.forEach(item => {
         item.readOnly = true;
      });
   },
   reset: function () {
      this.getAllInputs();
      this.resetInput();
      incomeItems = document.querySelectorAll('.income-items');
      for (let i = 1; i < incomeItems.length; i++) {
         incomeItems[i].parentNode.removeChild(incomeItems[i]);
         incomeAdd.style.display = 'block';
      }
      expensesItems = document.querySelectorAll('.expenses-items');
      for (let i = 1; i < expensesItems.length; i++) {
         expensesItems[i].parentNode.removeChild(expensesItems[i]);
         expensesAdd.style.display = 'block';
      }
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.periodAmount = 0;

      this.unBlockInputs();
      this.removePeriodAmount();
      startBtn.style.display = 'block';
      cancelBtn.style.display = 'none';
      checkBoxDeposit.checked = false;

   },
   resetInput: function () {
      this.allInputs.forEach(item => {
         item.value = '';
      });
   },
   unBlockInputs: function () {
      this.allInputs.forEach(item => {
         item.readOnly = false;
      });
   },
   removePeriodAmount: function () {
      this.periodAmount = 1;
      periodAmount.textContent = +this.periodAmount;
      periodSelect.value = 1;
   },
   getAllInputs: function () {
      this.allInputs = document.querySelectorAll('input');
   },
};

let startBind = appData.start.bind(appData);
let resetBind = appData.reset.bind(appData);

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.addPeriodAmount);
cancelBtn.addEventListener('click', resetBind);

salaryAmount.addEventListener('input', function () {
   checkNum(salaryAmount);
   if (salaryAmount.value) {
      startBtn.disabled = false;
      startBtn.addEventListener('click', startBind);
   }
});

checkNum(incomeAmount);
checkNum(targetAmount);
checkNum(expensesAmount);
checkletter(incomeTitleInput);
checkletter(additionalExpensesItem);
checkletter(expensesTitleInput);
additionalIncomeItem.forEach(item => {
   checkletter(item);
});

// (appData.getTargetMonth() > 0) ?
//    console.log(`Цель будет достигнута за ${Math.ceil(appData.getTargetMonth())} месяцев`) :
//    console.log('Цель не будет достигнута');

// console.log(appData.addExpenses.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join(', '));

// for (let key in appData) {
//    console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
// }