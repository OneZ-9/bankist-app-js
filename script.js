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

/////////////////////////////////////////////////
// Functions
const deposits = movement => movement > 0;
const withdrawals = movement => movement < 0;

const displayMovements = (movements, sort = false) => {
  // Set containerMovements to empty
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // Adding movements to containerMovements
  movs.forEach(function (movement, i) {
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

const calcDisplayBalance = account => {
  const { movements } = account;

  account.balance = movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  labelBalance.textContent = `${account.balance} €`;
};

const calcDisplaySummary = account => {
  const { movements, interestRate } = account;

  // Display income
  const incomes = movements.filter(deposits).reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelSumIn.textContent = `${incomes} €`;

  // Display out
  const out = movements.filter(withdrawals).reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  // Display interest
  const interest = movements
    .filter(deposits)
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

const updateUI = account => {
  // Display movements
  displayMovements(account.movements);

  // Display balance
  calcDisplayBalance(account);

  // DIsplay summary
  calcDisplaySummary(account);
};

/////////////////////////////////////////////////
// Event handlers
let currentAccount;
let currentPin;
createUsernames(accounts);

///////////////////////////////////// Login ////////////////////////////////
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
    // inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  } else {
    alert('username or pin incorrect!');
  }
  inputLoginUsername.value = inputLoginPin.value = '';
});

////////////////////////////////// Transfer amount  //////////////////////////////////////
btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );

  if (
    receiverAccount &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Transaction
    receiverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);
    // Update UI
    updateUI(currentAccount);
    // Notify user
    alert(
      `Successfuly transferred amount ${amount} to ${receiverAccount.owner
        .split(' ')
        .at(0)}`
    );
  } else {
    alert('Cannot find the user to transfer!');
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

///////////////////////////////////// Request Loan ////////////////////////////////////
// User can request loan if has any deposit > 10% of request
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    alert('Loan proceed successfully!');
    updateUI(currentAccount);
  } else {
    alert('Cannot proceed loan');
  }

  inputLoanAmount.value = '';
});

//////////////////////////////////// Close account ///////////////////////////////////
btnClose.addEventListener('click', e => {
  e.preventDefault();

  const closeUsername = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  const closeAccountIndex = accounts.findIndex(
    acc => acc.username === closeUsername
  );

  if (
    closeUsername === currentAccount.username &&
    closePin === currentAccount.pin &&
    closeAccountIndex !== -1
  ) {
    // Delete from array
    accounts.splice(closeAccountIndex, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    alert(`User ${closeUsername} has successfully deleted!`);
  } else {
    alert('Incorrect username & pin or user has been already deleted');
  }
  inputCloseUsername.value = inputClosePin.value = '';

  console.log(accounts);
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
