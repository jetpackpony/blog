Exports vs. module exports in nodejs - how the module is packed in the anonymous function that is called right away and module.exports returned after,
they both point to the same object.
But you can overwrite module.exports but not exports.
If you overwrite module.exports, modifying exports after that will not work, since the link to an object is broken and not to return.
exports provide a shortcut for module.exports. But should be carefull not to overwrite it!

https://nodejs.org/docs/latest/api/modules.html#modules_module_exports
this all happens in:
https://github.com/nodejs/node/blob/master/lib/module.js


