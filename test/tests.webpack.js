/* load all './test/*-spec.es6.js' files */
var context = require.context('.', true, /\-spec\.es6\.js$/);
context.keys().forEach(context);
