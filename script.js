'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Chamod Tharuka',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 7777,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// Array of objects
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Functions
const displayMovements = movements => {
  // Set containerMovements to empty
  containerMovements.innerHTML = '';

  // Adding movements to containerMovements
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
          </div>
          <div class="movements__value">${movement} €</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = movements => {
  const balance = movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  labelBalance.textContent = `${balance} €`;
};

const calcDisplaySummary = account => {
  const { movements, interestRate } = account;

  // Display income
  const incomes = movements
    .filter(movement => movement > 0)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  labelSumIn.textContent = `${incomes} €`;

  // Display out
  const out = movements
    .filter(movement => movement < 0)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  // Display interest
  const interest = movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(intr => intr >= 1)
    .reduce((acc, intr) => {
      return acc + intr;
    }, 0);
  labelSumInterest.textContent = `${interest} €`;
};

const createUsernames = accounts => {
  // produce side effects
  // do some work without returning anything
  // add account.username property to account
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};

// Event handlers
let currentAccount;
let currentPin;
createUsernames(accounts);

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;
    containerApp.style.opacity = 100;

    // Clear the input fields
    // equality operator works right to left
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements
    displayMovements(currentAccount.movements);

    // Display balance
    calcDisplayBalance(currentAccount.movements);

    // DIsplay summary
    calcDisplaySummary(currentAccount);
  } else {
    inputLoginUsername.value = inputLoginPin.value = '';
    alert('username or pin incorrect!');
  }
});

// const euroToUsd = 1.1;
// const calcDepositsUsd = movements => {
//   const totalDepositsUsd = movements
//     .filter(movement => movement > 0)
//     .map(movement => movement * euroToUsd)
//     .reduce((acc, dep) => {
//       return acc + dep;
//     }, 0);

//   return totalDepositsUsd;
// };

// console.log(calcDepositsUsd(account1.movements));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
