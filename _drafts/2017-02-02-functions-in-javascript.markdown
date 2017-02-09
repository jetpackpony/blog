---
layout: post
title:  "Functions in javascript"
categories: javascript functions
---
There are two main ways to create a function in javascript. A *function declaration* and a *function expression*. The following describes the differences between the two. For a complete guide to functions check [Functions article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

## Function Declaration

A function declaration is a statement which start with the word `function` followed by a name. It is only a *function declaration* if it is a part of a scope and not a part of expression (assignment or `new` call, etc.):

```javascript
function foo(arg1, arg2) {
  // body of a function
  function bar() {  }
}
```
Both of the above are a *function declarations*.

Function declarations:

 - have to have a name (can not be anonymous)
 - are hoisted, meaning they can be called in the beginning of the scope before they are declared

```javascript
console.log(foo());
function foo() { }
```

 - can not be executed immediately
 - because they are hoisted and cannot be executed immediately, they don't require a semicolon at the end of the declaration

## Function Expression

Function expression is a different way to create a function. The interpreter differs the function expression from declaration by the surrounding context. Generally if an expression involving `function` keyword starts with something other that `function` keyword, it becomes function expression:

```javascript
var foo = function foo() {};
foo(function() {});
(function bar() {})();
```

The first example creates a function and assigns it to a `foo` variable. The second example calls a function `foo` with a new function passed as an argument. The third example crates a function and calls it immediately.

Function expressions:

 - can be either named or anonymous
 - are not hoisted, meaning they are declared and the point of the expression execution
 - can be executed immediately
 - require a semicolon after the expression

### Named and anonymous function expressions

Function expressions can be either named or anonymous. Here is anonymous:

```javascript
var foo = function () {};
```

Here is the same expression with the named function:

```javascript
var foo = function foo() {};
```

There are 2 differences between those:

 - anonymous functions show up on a stack trace as `(anonymous)` and named functions show up with their names, which makes stack traces more readble and debugging much easier
 - named functions are declared as functions inside their own scope:

```javascript
(function foo() {
  console.log(typeof foo); // prints 'function'
})();

(function () {
  // no way to call itself here
})();
```

Named function expressions will declare the function inside itself, but not in the outer scope:

```javascript
var foo = function bar() {
  console.log(typeof foo);  // prints 'function'
  console.log(typeof bar);  // prints 'function'
};
foo();
console.log(typeof bar);  // prints 'undefined'
```

In this example `bar()` is available inside itself but not in the outer scope. While`foo()` is available everywhere: in the outside scope after it's declaration and inside `bar()` because the function inherits the outer scope.

### Not hoisted

Function expressions can only be accessed via a variable they are assigned to, so before they are declared their value is undefined:

```javascript
console.log(typeof foo);  // prints 'undefined'
var foo = function () {};
console.log(typeof foo);  // prints 'function'
```



examples and difference of calling function-expressions with (function() {}()) and (function() {})() - the returned result???
example of expression without semicolon

freaky ways to create a function
new Function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
getting global:
var global = new Function('return this')();
