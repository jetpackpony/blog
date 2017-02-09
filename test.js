/*
var foo = function bar() {
  console.log(typeof foo);  // prints 'function'
  console.log(typeof bar);  // prints 'function'
};
foo();
console.log(typeof bar);  // prints 'undefined'

console.log(typeof foo);  // prints 'undefined'
var foo = function () {};
console.log(typeof foo);  // prints 'function'

(function () {
  console.log('immediately executed');
})(); // prints 'immediately executed'

var module = (function() {
  var baz = 'baz';
  function foo() { }
  function bar() { }

  return {
    foo: foo,
    bar: bar,
    baz: baz
  };
})();

console.log(typeof foo);  // prints 'undefined'
console.log(typeof bar);  // prints 'undefined'
console.log(typeof baz);  // prints 'undefined'

console.log(typeof module.foo);  // prints 'function'
console.log(typeof module.bar);  // prints 'function'
console.log(typeof module.baz);  // prints 'string'

var foo = function foo() {}();
(function foo() {})();
bar(function foo() {}());
function foo(num) {
  console.log('foo called');  // this is never calle
}(1);

var foo = function foo(num) { console.log(num) }(1);  // prints '1'
(function foo(num) { console.log(num); }(1)); // prints '1'
!function foo(num) { console.log(num); }(1);  // prints '1'


(function () {})();
(function () {}());



var a = function (f) {
  console.log(f);
}
(function problem(){ return "problem"; }())


var a = function (f) {
  console.log(f); // prints "problem"
}
("problem")
*/


var a = function (f) {
  console.log(f);
};
(function problem(){ return "problem"; }())
