# Functions in javascript

There are two main ways to create a function in javascript. A *function declaration* and a *function expression*. The following describes the differences between the two. For a complete guide to funcitons check [Functions article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

## Function Declaration

A function declaration is a statement which start with the word `function` followed by a name. It is only a *function declaration* if it is a part of a scope and not a part of expression (assignment or `new` call, etc.):

```
function foo(arg1, arg2) {
  // body of a function
  function bar() {  }
}
```
Both of the above are a *function declarations*.

Function declarations:

 - have to have a name (can not be anonymous)
 - are hoisted, meaning they can be called in the begining of the scope before they are declared
   ```javascript
     console.log(foo());
     function foo() { }
   ```
 - can not be executed immediately
 - because they are hoisted and cannot be executed immediately, they don't require a semicolon at the end of the declaration

## Function Expression




function expressions with named functions
examples of calling functions of both types before/after declaration
example of expression without semicolon
examples and difference of calling function-expressions with (funciton() {}()) and (function() {})() - the returned result???

freaky ways to create a function
new Function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
getting global:
var global = new Function('return this')();
