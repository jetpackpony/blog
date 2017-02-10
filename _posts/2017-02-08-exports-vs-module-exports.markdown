---
layout: post
title:  "Node.js module.exports and exports"
categories: javascript functions
---

When you create a module in Node.js you get 3 ways to expose the public properties of your module: via `module.exports`, via `exports` or via `this`.

## Where those variables come from

When you create a `.js` file for your module and then require it in another file your code gets read as a string and wrapped in a function expression. This code is currently at [bootstrap_node.js file](https://github.com/nodejs/node/blob/master/lib/internal/bootstrap_node.js){:target="\_blank"} (the contents of your module file goes in as a `scirpt` argument):

```javascript
NativeModule.wrap = function(script) {
  return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
};

NativeModule.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];
```

The value returned by `NativeModule.wrap` then gets run through V8 and becomes a js variable containing a function (this is not how it actually look but essentially is the same):

```javascript
var compiledWrapper = (function (exports, require, module, __filename, __dirname) {
  // code of your module here
});
```

Finally, this function gets called with `this` set to `module.exports` and proper arguments:

```javascript
compiledWrapper.apply(module.exports, [module.exports, require, module, filename, dirname]);
```

After all this the thing that gets returned from the initial `require` call is `module.exports`. So to expose parts of your module you have to either mutate `module.exports` object or replace the contents of `module.exports` property with another object.

## Mutating

As you can tell from the code above `module.exports` object is available in your module via 3 variables: `this`, `exports` and `module.exports`. It is important to understand that all of those point to the same object:

```javascript
console.log(this === exports && exports === module.exports); // prints 'true'
```

This means that mutating either one of those will allow us to export the properties through `require`:

```javascript
// module.js
this.one = "one";
exports.two = "two";
module.exports.three = "three";

// app.js
var module = require('./module');
console.log(module.one);  // prints "one"
console.log(module.two);  // prints "two"
console.log(module.three);  // prints "three"
```

In this example we add properties `one`, `two` and `three` to `module.exports` object via `this`, `exports` and `module.exports`. Then in the `app.js` file all of those properties are available to us in an object returned by `require`.

## Replacing

If you want to export one single thing like a function, you have to overwrite `module.exports` property with that value:

```javascript
// module.js
module.exports = function () {
  console.log("Yes, this is module");
};

// app.js
var module = require('./module');
module();  // prints "Yes, this is module"
```

However you can't do the same with `exports` variable since it refers directly to the `module.exports` object. If you overwrite `exports` it will just loose the reference to `module.exports` object but will not change it:

```javascript
// module.js
exports = function () {
  console.log("Yes, this is module");
};

// app.js
var module = require('./module');
module();  // prints "TypeError: module is not a function"
```

Trying to replace `this` will get you an `Uncaught ReferenceError: Invalid left-hand side in assignment` error since `this` is immutable and you can't change which object it points to.

For further reading refer to [Node.js module.exports docs](https://nodejs.org/docs/latest/api/modules.html#modules_module_exports){:target="\_blank"} and source code for [Node.js module.js file](https://github.com/nodejs/node/blob/master/lib/module.js){:target="\_blank"}
