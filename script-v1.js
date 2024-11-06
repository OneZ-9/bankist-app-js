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
  pin: 2222,
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
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
//// SLICE ////
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); // (3) ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // (2) ['c', 'd'] --> length (4-2) = (2)

// Negative begin parameter
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(-2)); // (2) ['d', 'e']

// Negative end parameter
console.log(arr.slice(1, -2)); // (2) ['b', 'c']

// Shallow copy array
console.log(arr.slice()); // (5) ['a', 'b', 'c', 'd', 'e']
*/

//// SPLICE ////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.splice(-1)); // ['e'] delete last element
console.log(arr); // (4) ['a', 'b', 'c', 'd']

console.log(arr.splice(2)); // (2) ['c', 'd']
console.log(arr); // (2) ['a', 'b']  extracted elements deleted from original array


// Delete count
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.splice(1, 2)); // (2) ['b', 'c']
console.log(arr); // (3) ['a', 'd', 'e']
*/

/*
//// REVERSE ////
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse()); // (5) ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // (5) ['f', 'g', 'h', 'i', 'j'] mutate original arr2
*/

/*
//// CONCAT ////
const arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

const letters = arr.concat(arr2);
console.log(letters); // (10) ['a', 'b', 'c', 'd', 'e', 'j', 'i', 'h', 'g', 'f']


//// JOIN ////
const arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr);
console.log(arr.join('-')); // a-b-c-d-e


//// AT ////
const arr = [23, 11, 64];

console.log(arr.at(0)); // 23
console.log(arr.at(-2)); // 11

console.log('chamod'.at(0)); // c
console.log('chamod'.at(-1)); // d
*/

/*
////  Get last element of array ////
const arr = [23, 11, 64];

// BRACKET NOTATION
console.log(arr[arr.length - 1]); // 64

// SLICE
console.log(arr.slice(-1)); // [64]
console.log(arr.slice(-1)[0]); // 64

// At
console.log(arr.at(-1)); // 64
*/

//// forEach ////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of
// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

/*
Movement 1: You deposited 200
Movement 2: You deposited 450
Movement 3: You withdrew 400
Movement 4: You deposited 3000
Movement 5: You withdrew 650
Movement 6: You withdrew 130
Movement 7: You deposited 70
Movement 8: You deposited 1300
*/
// console.log('---forEach---');

// forEach
// movements.forEach(function (movement) {
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

// 0: function(200, 0, arr)
// 1: function(450, 1, arr)
// 2: function(400, 2, arr)
// ...

/*
Movement 1: You deposited 200
Movement 2: You deposited 450
Movement 3: You withdrew 400
Movement 4: You deposited 3000
Movement 5: You withdrew 650
Movement 6: You withdrew 130
Movement 7: You deposited 70
Movement 8: You deposited 1300
*/

//// forEach with Maps
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// Map
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

/*
USD: United States dollar
script.js:223 EUR: Euro
script.js:223 GBP: Pound sterling
*/

// Set
// const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique); // Set(3) {'USD', 'EUR', 'GBP'}

// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}`);
// });

/*
USD
EUR
GBP
*/

//// Map method ////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsDescriptions = movements.map((mov, i, arr) => {
//   return `Movement ${i + 1}: You deposited ${
//     mov > 0 ? 'deposited' : 'withdrew'
//   }`;
// if (mov > 0) {
//   return `Movement ${i + 1}: You deposited ${mov}`;
// } else {
//   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
// }
// });

// console.log(movementsDescriptions);

/*

0: "Movement 1: You deposited 200"
1: "Movement 2: You deposited 450"
2: "Movement 3: You withdrew 400"
3: "Movement 4: You deposited 3000"
4: "Movement 5: You withdrew 650"
5: "Movement 6: You withdrew 130"
6: "Movement 7: You deposited 70"
7: "Movement 8: You deposited 1300"

length: 8
[[Prototype]]: Array(0)
*/

//// Filter method ////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const filterDeposits = movements.filter((mov, i, arr) => mov > 0);
const filterWithdrawals = movements.filter(mov => mov < 0);

console.log(filterDeposits); // (5) [200, 450, 3000, 70, 1300]
console.log(filterWithdrawals); // (3) [-400, -650, -130]
*/

/*
//// Reduce method ////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce((acc, cur, i, arr) => {
  return acc + cur;
}, 0);

console.log(balance); // 3840

// Maximum value
const maxVal = movements.reduce((acc, cur) => {
  if (acc > cur) return acc;
  else return cur;
}, movements.at(0));

console.log(maxVal); // 3000
*/

//// Find method ////
// console.log(accounts);
/*
(4) [{…}, {…}, {…}, {…}]
0: {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111}
1: {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222}
2: {owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333}
3: {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444}
length: 4
*/

// const account = accounts.find(acc => acc.owner === 'Chamod Tharuka');
// console.log(account);
// {owner: 'Chamod Tharuka', movements: Array(8), interestRate: 1.5, pin: 2222}

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
