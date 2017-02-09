---
layout: post
title:  "Functions in javascript. Part 1"
categories: javascript functions
---
There are two main ways to create a function in javascript. A *function declaration* and a *function expression*. The following describes the differences between the two. For a complete guide to functions check [Functions article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

## Function Declarations

A function declaration is a statement which starts with a `function` keyword followed by a function name. It should be a part of a scope and not a part of any expression (assignment or `new` call, etc.):

```javascript
function foo(arg1, arg2) {
  // body of a function goes here
  function bar() {  }
}
```

Both of the above are a *function declarations*.

Function declarations:

 - have to have a name (can't be anonymous)
 - are hoisted, meaning they can be called in the beginning of a scope before they are declared

```javascript
console.log(typeof foo);  // prints 'function'
function foo() { }
```

 - can't be executed immediately
 - don't require a semicolon after them

## Function Expressions

A *function expression* is a different way to create a function. The interpreter differs the function expression from declaration by the surrounding context. If an expression involving `function` keyword starts with something other that `function` keyword, it becomes function expression:

```javascript
var foo = function foo() {};
foo(function () {});
(function bar() {}());
```

The first example creates a function and assigns it to a `foo` variable. The second example calls a function `foo` with a new function passed as an argument. The third example crates a function and calls it immediately.

Function expressions:

 - can be either named or anonymous
 - are not hoisted, meaning they are declared at the point where the expression is executed
 - can be executed immediately
 - require a semicolon after them

### Named and anonymous function expressions

Function expressions can be either named or anonymous:

```javascript
// Anonymous
var foo = function () {};

// Named
var foo = function foo() {};
```

There are 2 differences between those:

 - anonymous functions show up on a stack trace as `(anonymous)` and named functions show up with their names, which makes stack traces more readable and debugging much easier
 - named functions are declared as functions inside their own scope:

```javascript
(function foo() {
  console.log(typeof foo); // prints 'function'
}());

(function () {
  // no way to call itself here
}());
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

Function expressions can only be accessed via a variable they are assigned to so they can't be accessed before they are declared:

```javascript
console.log(typeof foo);  // prints 'undefined'
var foo = function () {};
console.log(typeof foo);  // prints 'function'
```

### Immediately executed functions

You can create a function and immediately execute it. This creates a closed scope unavailable outside:

```javascript
(function () {
  console.log('immediately executed');
}()); // prints 'immediately executed'
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
}());

console.log(typeof foo);  // prints 'undefined'
console.log(typeof bar);  // prints 'undefined'
console.log(typeof baz);  // prints 'undefined'

console.log(typeof module.foo);  // prints 'function'
console.log(typeof module.bar);  // prints 'function'
console.log(typeof module.baz);  // prints 'string'
```

In this code functions `foo`, `bar` and variable `baz` are kept inside the immediately invoked function scope and are not available in the outside scope directly. However they are made available via module variable.

As mentioned above, immediately invoking a *function declaration* is not possible:

```javascript
function foo() {}();  // SyntaxError: Unexpected token )
```

This throws a syntax error because in javascript parentheses enclose expressions and `()` is not a valid expression. If you pass an argument in the parenthesis `(1)` becomes a valid expression and the error goes away:

```javascript
function foo(num) {
  console.log('foo called');  // this is never called
}(1);
```

But the function never gets called because the interpreter reads this as a *function declaration* followed by a separate javascript expression:

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

The downside of this way is it cannot be called on its own, meaning you always need a variable assignment or other operation to make it a function expression, otherwise it will become a function declaration.

The other two ways are very similar to each other:

```javascript
(function () {})();
(function () {}());
```

In fact they will produce exactly the same result. The second one is called Crockford's style and is the recommended approach. He [motivates it this way](http://javascript.crockford.com/code.html):

 > When a function is to be invoked immediately, the entire invocation expression should be wrapped in parens so that it is clear that the value being produced is the result of the function and not the function itself.

So in the first example the result returned from the expression is a function, which is then being called by `()`. In the second example the function is created, then being called and then the result of the execution is returned as the value of the expression. The second one makes it more clear what is going on.

### Semicolon after function expressions

Function expressions should be followed by semicolons. Most of the time you can safely omit semicolons, but there are situations when omitting then will result in unexpected behavior. For example:

```javascript
var a = function (f) {
  console.log(f);
}
(function problem(){ return "problem"; }())
```

It looks like all that we are doing is creating an anonymous function and then immediately invoking some other function. But without a semicolon after the anonymous function what actually happens is the anonymous function is called with the result of the execution of the `problem` function. It is easier to see if we replace the second function with a value:

```javascript
var a = function (f) {
  console.log(f); // prints "problem"
}
("problem")
```

This will print "problem". If we add a semicolon after the anonymous function it doesn't get called and everything behaves as expected:

```javascript
var a = function (f) {
  console.log(f);
};
(function problem(){ return "problem"; }())
```

## Function constructor

There is a third way of creating functions which is rarely used and not recommended due to security and performance reasons. You can use a `Function` constructor to create functions:

```javascript
var x = new Function('a', 'console.log(a)');
x('test');  // prints 'test'
```

When a function is created this way the only two scopes that are available inside it are it's own and global. So for example (this example doesn't work in node):

```javascript
var scope = 'outer';
(function () {
  var scope = 'inner';
  (new Function('', 'console.log(scope)')());   // prints 'outer'
}());
```

If you run it in the browser, it will print 'outer'. This doesn't work in node because any node script is run inside an immediately invoked function, so the expression `var scope = 'outer';` is actually not in a global scope. So what node actually runs looks more like this:

```javascript
// global scope here
(function () {
  var scope = 'outer';
  (function () {
    var scope = 'inner';
    (new Function('', 'console.log(scope)')());
  }());
}());
```

And that's it. Part 2 describing `bind()`, `this` and ES6 features is coming soon.
