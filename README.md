js-graph
========
[![Build Status](http://img.shields.io/travis/mhelvens/js-graph.svg)](https://travis-ci.org/mhelvens/js-graph)
[![Coverage Status](http://img.shields.io/coveralls/mhelvens/js-graph.svg)](https://coveralls.io/r/mhelvens/js-graph?branch=master)

`js-graph` is a javascript library for storing arbitrary data in mathematical (di)graphs,
as well as traversing and analyzing them in various ways. It was originally created to
track dependencies between options and modules. It is now rewritten in ECMAScript 6, but
ECMAScript 5 versions are shipped with it, automatically generated with [Babel](https://babeljs.io).

The library is fully functional and has 100% test-coverage, but the API is not yet
properly documented. You could, of course, read the tests in the `test` directory, but
user-friendly API documentation is forthcoming.

Feedback of any kind (questions, issues, pull requests) is greatly appreciated.


Files
-----

The `dist` directory offers different files for use in different circumstances.
Use the following table to determine which file to use in your situation.

| File                   | Description                                                                    | File-size |
| ---------------------- | ------------------------------------------------------------------------------ | ---------:|
| `js-graph.es6.js`      | For use in an ECMAScript 6 context, e.g., a modern browser or transpiler       |  14.8 kB  |
| `js-graph.js`          | Requires you to first load `babel/polyfill.js` or `babel/polyfill-browser.js`  |  36.0 kB  |
| `js-graph.min.js`      | Same as above, but minified                                                    |  16.2 kB  |
| `js-graph.full.js`     | Already includes `babel/polyfill.js`; ready for use in any context             | 124.3 kB  |
| `js-graph.full.min.js` | Same as above, but minified                                                    |  43.9 kB  |

If you don't know which one you need, you probably want `js-graph.full.min.js`.
