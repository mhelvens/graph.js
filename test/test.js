/* load all './test/*-spec.es6.js' files */
let context = require.context('.', true, /\-spec\.es6\.js$/);
context.keys().forEach(context);
