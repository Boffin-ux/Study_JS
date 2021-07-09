'use strict';
const startBtn = document.getElementById('start'),
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
   expensesAmount = document.querySelector('.expenses-amount'),
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount'),
   checkBoxDeposit = document.querySelector('#deposit-check'),
   depositBank = document.querySelector('.deposit-bank'),
   depositAmount = document.querySelector('.deposit-amount'),
   depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
   incomeItems = document.querySelectorAll('.income-items');

const checkNum = amount => {
   amount.addEventListener('input', () => {
      amount.value = amount.value.replace(/[^0-9]/g, '');
   });
};
const checkletter = titleletter => {
   titleletter.addEventListener('input', () => {
      titleletter.value = titleletter.value.replace(/[^а-яА-ЯёЁ .,]/g, '');
   });
};

const isNumber = n => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = n => {
   return isNaN(n) && typeof n === 'string';
};
class AppData {
   constructor() {
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
   }
   checkButton() {
      if (salaryAmount.value !== '') {
         startBtn.removeAttribute('disabled');
      }
   }
   start() {
      if (salaryAmount.value === '') {
         startBtn.setAttribute('disabled', true);
         return;
      }
      const dataInputs = document.querySelectorAll('.data input[type = text]');
      dataInputs.forEach(function (item) {
         item.setAttribute('disabled', true);
      });
      periodSelect.setAttribute('disabled', true);
      incomeAdd.setAttribute('disabled', true);
      expensesAdd.setAttribute('disabled', true);
      checkBoxDeposit.setAttribute('disabled', true);
      this.budget = +salaryAmount.value;
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpInc();
      this.getInfoDeposit();
      this.getBudget();
      this.showResult();
      this.addCookie();
      this.addLocalStorage();
      startBtn.style.display = 'none';
      cancelBtn.style.display = 'block';
   }
   showResult() {
      const _this = this;
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.ceil(this.budgetDay);
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('input', function () {
         incomePeriodValue.value = _this.calcPeriod();
      });
   }
   addExpIncBlock(elem, btnAdd) {
      const startStr = elem[0].className.split('-')[0];
      const cloneItems = elem[0].cloneNode(true);
      const elemAmount = cloneItems.querySelector(`.${startStr}-amount`);
      const elemIncome = cloneItems.querySelector(`.${startStr}-title`);
      elemAmount.value = '';
      elemIncome.value = '';
      checkletter(elemIncome);
      checkNum(elemAmount);
      elem[0].parentNode.insertBefore(cloneItems, btnAdd);
      elem = document.querySelectorAll(`.${startStr}-items`);

      if (btnAdd === incomeAdd) {
         incomeItems = elem;
      } else if (btnAdd === expensesAdd) {
         expensesItems = elem;
      }
      if (elem.length === 3) {
         btnAdd.style.display = 'none';
      }
   }
   getExpInc() {
      const count = item => {
         const startStr = item.className.split('-')[0];
         const itemTitle = item.querySelector(`.${startStr}-title`).value;
         const itemAmount = item.querySelector(`.${startStr}-amount`).value;
         if (itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle] = itemAmount;
         }
      };

      incomeItems.forEach(count);
      expensesItems.forEach(count);

      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   }
   getAddExpInc() {
      const addExpenses = additionalExpensesItem.value.split(',');
      const count = (item) => {
         if (typeof item === 'object') {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
               this.addIncome.push(itemValue);
            }
         } else {
            item = item.trim();
            if (item !== '') {
               this.addExpenses.push(item);
            }
         }
      };

      addExpenses.forEach(count);
      additionalIncomeItem.forEach(count);
   }
   getExpensesMonth() {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   }
   getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   }
   getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
   }
   getStatusIncome() {
      if (this.budgetDay >= 1200) {
         return ('У вас высокий уровень дохода');
      } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
         return ('У вас средний уровень дохода');
      } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else {
         return ('Что-то пошло не так');
      }
   }
   getInfoDeposit() {
      if (this.deposit) {
         if (depositAmount.value === '') {
            depositAmount.value = 0;
         }
         this.percentDeposit = depositPercent.value;
         this.moneyDeposit = depositAmount.value;
         depositBank.setAttribute('disabled', true);
         checkBoxDeposit.setAttribute('disabled', true);
      }
   }
   getPercent() {
      const getDepositPercent = +depositPercent.value;
      if (!isNumber(getDepositPercent) || (getDepositPercent < 0 || getDepositPercent > 100)) {
         alert('Введите корректное значение в поле проценты');
         depositPercent.value = 0;
      }
   }
   changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
         depositPercent.style.display = 'inline-block';
         this.percentDeposit = depositPercent.value;
         depositPercent.addEventListener('change', appData.getPercent);
      } else {
         depositPercent.value = valueSelect;
         depositPercent.style.display = 'none';
         depositPercent.removeEventListener('change', appData.getPercent);
      }
   }
   depositHandler() {
      if (checkBoxDeposit.checked) {
         depositBank.style.display = 'inline-block';
         depositAmount.style.display = 'inline-block';
         this.deposit = true;
         checkNum(depositAmount);
         depositBank.addEventListener('change', this.changePercent);
      } else {
         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
         depositAmount.value = '';
         this.deposit = false;
         depositBank.removeEventListener('change', this.changePercent);
      }
   }
   calcPeriod() {
      return this.budgetMonth * periodSelect.value;
   }
   addPeriodAmount() {
      this.periodAmount = +periodSelect.value;
      periodAmount.textContent = +this.periodAmount;
   }
   reset() {
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.addExpenses = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.periodAmount = 0;
      const allInputs = document.querySelectorAll('input');
      allInputs.forEach(function (item) {
         item.value = '';
      });
      const allDataInputs = document.querySelectorAll('.data input[type = text]');
      allDataInputs.forEach(function (item) {
         item.removeAttribute('disabled');
         item.value = '';
         periodSelect.value = 1;
         periodAmount.textContent = periodSelect.value = 1;
      });
      incomeAdd.removeAttribute('disabled');
      expensesAdd.removeAttribute('disabled');
      periodSelect.removeAttribute('disabled');
      const allResultInputs = document.querySelectorAll('.result input[type = text]');
      allResultInputs.forEach(function (item) {
         item.value = '';
      });
      salaryAmount.value = '';
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


      startBtn.style.display = 'block';
      cancelBtn.style.display = 'none';

      if (checkBoxDeposit.checked) {
         depositBank.removeAttribute('disabled');
         checkBoxDeposit.removeAttribute('disabled');
         depositPercent.style.display = 'none';
         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
      }
      checkBoxDeposit.removeAttribute('disabled');
      checkBoxDeposit.checked = false;
      this.deleteLocalStorage();
      this.deleteCookies();
   }
   eventsListeners() {
      if (localStorage.data) {
         this.showResultLocalStorage();
      }
      const _this = this;
      const startBind = _this.start.bind(_this);
      const resetBind = _this.reset.bind(_this);

      expensesAdd.addEventListener('click', function () {
         _this.addExpIncBlock(expensesItems, expensesAdd);
      });
      incomeAdd.addEventListener('click', function () {
         _this.addExpIncBlock(incomeItems, incomeAdd);
      });
      periodSelect.addEventListener('input', _this.addPeriodAmount);
      cancelBtn.addEventListener('click', resetBind);

      salaryAmount.addEventListener('input', function () {
         checkNum(salaryAmount);
         if (salaryAmount.value) {
            startBtn.removeAttribute('disabled');
            startBtn.addEventListener('click', startBind);
         }
      });

      checkNum(incomeAmount);
      checkNum(targetAmount);
      checkNum(expensesAmount);
      checkletter(incomeTitleInput);
      checkletter(additionalExpensesItem);
      checkletter(expensesTitleInput);
      additionalIncomeItem.forEach(function (item) {
         checkletter(item);
      });

      checkBoxDeposit.addEventListener('change', this.depositHandler.bind(this));
   }
   setCookie(key, value, year, month, day, path, domain, secure) {
      let cookieStr = `${encodeURI(key)}=${encodeURI(value)}`;
      if (year) {
         const expires = new Date(year, month - 1, day);
         cookieStr += '; expires=' + expires.toGMTString();
      }
      cookieStr += path ? `; path=${encodeURI(path)}` : '';
      cookieStr += domain ? `; domain=${encodeURI(domain)}` : '';
      cookieStr += secure ? '; secure' : '';

      document.cookie = cookieStr;
   }
   addCookie() {
      this.setCookie('budgetMonth', budgetMonthValue.value, 2022, 12, 1);
      this.setCookie('budgetDay', budgetDayValue.value, 2022, 12, 1);
      this.setCookie('expensesMonth', expensesMonthValue.value, 2022, 12, 1);
      this.setCookie('additionalIncomeValue', additionalIncomeValue.value, 2022, 12, 1);
      this.setCookie('additionalExpensesValue', additionalExpensesValue.value, 2022, 12, 1);
      this.setCookie('incomePeriodValue', incomePeriodValue.value, 2022, 12, 1);
      this.setCookie('targetMonthValue', targetMonthValue.value, 2022, 12, 1);
      this.setCookie('isLoad', true, 2022, 12, 1);
   }
   deleteCookies() {
      let cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
         let cookie = cookies[i];
         let eqPos = cookie.indexOf('=');
         let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
         document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
   }
   addLocalStorage() {
      const data = [{
         'budgetMonth': budgetMonthValue.value,
         'budgetDay': budgetDayValue.value,
         'expensesMonth': expensesMonthValue.value,
         'additionalIncomeValue': additionalIncomeValue.value,
         'additionalExpensesValue': additionalExpensesValue.value,
         'incomePeriodValue': incomePeriodValue.value,
         'targetMonthValue': targetMonthValue.value
      }];
      localStorage.data = JSON.stringify(data);
   }
   showResultLocalStorage() {
      if (this.checklocalStorage() === true) {
         startBtn.style.display = 'none';
         cancelBtn.style.display = 'block';

         startBtn.setAttribute('disabled', true);
         const dataInputs = document.querySelectorAll('.data input[type = text]');
         dataInputs.forEach(function (item) {
            item.setAttribute('disabled', true);
         });
         periodSelect.setAttribute('disabled', true);
         incomeAdd.setAttribute('disabled', true);
         expensesAdd.setAttribute('disabled', true);
         checkBoxDeposit.setAttribute('disabled', true);
         for (let key in JSON.parse(localStorage.data)[0]) {
            if (key === 'budgetMonth') {
               budgetMonthValue.value = JSON.parse(localStorage.data)[0][key];
            }
            if (key === 'budgetDay') {
               budgetDayValue.value = JSON.parse(localStorage.data)[0][key];
            }
            if (key === 'expensesMonth') {
               expensesMonthValue.value = JSON.parse(localStorage.data)[0][key];
            }
            if (key === 'additionalIncomeValue') {
               additionalIncomeValue.value = JSON.parse(localStorage.data)[0][key];
            }
            if (key === 'additionalExpensesValue') {
               additionalExpensesValue.value = JSON.parse(localStorage.data)[0][key];
            }
            if (key === 'incomePeriodValue') {
               incomePeriodValue.value = JSON.parse(localStorage.data)[0][key];
            }
            if (key === 'targetMonthValue') {
               targetMonthValue.value = JSON.parse(localStorage.data)[0][key];
            }
         }
      } else {
         this.deleteLocalStorage();
         this.deleteCookies();
      }
   }
   deleteLocalStorage() {
      if (localStorage.data) {
         delete localStorage.data;
      }
   }
   checklocalStorage() {
      let checkKey = true;
      let checkValue = true;
      const cookie = document.cookie.split(';');
      const getKeyCookie = cookie.map(item => {
         return item.replace(/\=[\s\D\d]*/g, '').trim();
      });
      const getValueCookie = cookie.map(item => {
         return item.replace(/\D*=/g, '').trim();
      });
      let getKeyLocalStorage = [];
      let getValueLocalStorage = [];

      for (let key in JSON.parse(localStorage.data)[0]) {
         getKeyLocalStorage.push(key);
         getValueLocalStorage.push(JSON.parse(localStorage.data)[0][key]);
      }
      getKeyLocalStorage.forEach(item => {
         if (!getKeyCookie.includes(item)) {
            checkKey = false;
         }
      });

      getValueLocalStorage.forEach((itemStorage, indexStorage) => {
         getValueCookie.forEach((item, index) => {
            if (item !== itemStorage && index !== indexStorage) {
               if (item === 'true') {
                  checkValue = true;
               } else {
                  checkValue = false;
               }
            }
         });
      });
      if (checkKey === false || checkValue === false) {
         return false;
      } else {
         return true;
      }
   }
}

const appData = new AppData();
appData.eventsListeners();

// (appData.getTargetMonth() > 0) ?
//    console.log(`Цель будет достигнута за ${Math.ceil(appData.getTargetMonth())} месяцев`) :
//    console.log('Цель не будет достигнута');

// console.log(appData.addExpenses.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join(', '));

// for (let key in appData) {
//    console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
// }