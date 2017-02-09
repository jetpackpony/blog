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

### Immediately executed functions

You can create a function and immediately execute it. This creates the scope contents of which is unavailable outside:

```javascript
(function () {
  console.log('immediately executed');
})(); // prints 'immediately executed'
```

This keeps everything defined inside a function away from the outside scope. This mechanism is used to implement modules in javascript. For example:

```javascript
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
```

In this code functions `foo`, `bar` and `baz` are kept away from the outside scope while made available through module variable.

As mentioned above, doing the same with function declarations is not possible:

```javascript
function foo() {}();  // SyntaxError: Unexpected token )
```

This throws a syntax error because in javascript parentheses enclose expressions and `()` is not a valid expression. If you pass an argument in the parenthesis, the error goes away:

```javascript
function foo(num) {
  console.log('foo called');  // this is never called
}(1);
```

But the function never gets called because the interpreter reads is as a function declaration followed by a separate javascript expression:

```javascript
function foo (num) {
  console.log('foo called');  // this is never called
}

(1);
```

However the same examples with function expressions work as expected:

```javascript
var foo = function foo(num) { console.log(num) }(1);  // prints '1'
(function foo(num) { console.log(num); }(1)); // prints '1'
!function foo(num) { console.log(num); }(1);  // prints '1'
```

There are three ways to immediately invoke a function. First we've seen before:

```javascript
var a = function () {}();
```

The downside of this way is it cannot be called on its own, meaning you always need a variable assignment or other operations to make it a function expression, otherwise it will become a function declaration.

The other two ways are very similar:

```javascript
(function () {})();
(function () {}());
```

In fact they will produce exactly the same result. But the second one is called Crockford's style and is the recommended approach. He [motivates it this way](http://javascript.crockford.com/code.html):

 > When a function is to be invoked immediately, the entire invocation expression should be wrapped in parens so that it is clear that the value being produced is the result of the function and not the function itself.

So in the first example the result returned from the expression is a function, which is then being called by `()`. In the second example the function is created, then being called and then the result of the execution is returned as expression value. The second one makes it more clear what is going on.

### Semicolon after function expressions

Function expressions should end with semicolons. Most of the time you can safely omit semicolons, but there are situations when omitting then will result in unexpected behavior. For example:

```javascript
var a = function (f) {
  console.log(f);
}
(function problem(){ return "problem"; }())
```

It looks like all that we are doing is creating an anonymous function and then immediate invoking some other function. But without the semicolon after the anonymous function what actually happens is anonymous function is called with the result of the execution of the `problem` function. It is easier to see if we write it this way:

```javascript
var a = function (f) {
  console.log(f); // prints "problem"
}
("problem")
```

If we add a semicolon after the anonymous function it does not get called and everything behaves as expected:

```javascript
var a = function (f) {
  console.log(f);
};
(function problem(){ return "problem"; }())
```




freaky ways to create a function
new Function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
getting global:
var global = new Function('return this')();
