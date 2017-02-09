/*
var foo = function bar() {
  console.log(typeof foo);  // prints 'function'
  console.log(typeof bar);  // prints 'function'
};
foo();
console.log(typeof bar);  // prints 'undefined'
*/

console.log(typeof foo);  // prints 'undefined'
var foo = function () {};
console.log(typeof foo);  // prints 'function'
