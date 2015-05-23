(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Graph"] = factory();
	else
		root["Graph"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(91);


/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Iterate over all vertices of a graph in topological order.
	 * @param graph {Graph} the graph to iterate over;
	 *                      if this is called as a method added through
	 *                      {@link Graph.plugin}, this argument is skipped
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = vertices_topologically(graph), kv; !(kv = it.next()).done;) {
	 *     var key   = kv.value[0],
	 *         value = kv.value[1];
	 *     // iterates over all vertices of the graph in topological order
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of vertices_topologically(graph)) {
	 *     // iterates over all vertices of the graph in topological order
	 * }
	 */
	exports["default"] = vertices_topologically;
	var marked0$0 = [vertices_topologically].map(regeneratorRuntime.mark);
	
	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }
	
	function vertices_topologically(graph) {
		var marked1$0, visited, handled, visit, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, key;
	
		return regeneratorRuntime.wrap(function vertices_topologically$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					visit = function visit(key) {
						var i, cycle, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, nextKey;
	
						return regeneratorRuntime.wrap(function visit$(context$2$0) {
							while (1) switch (context$2$0.prev = context$2$0.next) {
								case 0:
									visited.push(key);
									i = visited.indexOf(key);
	
									if (!(i !== visited.length - 1)) {
										context$2$0.next = 5;
										break;
									}
	
									cycle = visited.slice(i + 1).reverse();
									throw new graph.constructor.CycleError(cycle);
	
								case 5:
									if (handled.has(key)) {
										context$2$0.next = 36;
										break;
									}
	
									_iteratorNormalCompletion = true;
									_didIteratorError = false;
									_iteratorError = undefined;
									context$2$0.prev = 9;
									_iterator = graph.verticesTo(key)[Symbol.iterator]();
	
								case 11:
									if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
										context$2$0.next = 18;
										break;
									}
	
									_step$value = _slicedToArray(_step.value, 1);
									nextKey = _step$value[0];
									return context$2$0.delegateYield(visit(nextKey), "t19", 15);
	
								case 15:
									_iteratorNormalCompletion = true;
									context$2$0.next = 11;
									break;
	
								case 18:
									context$2$0.next = 24;
									break;
	
								case 20:
									context$2$0.prev = 20;
									context$2$0.t20 = context$2$0["catch"](9);
									_didIteratorError = true;
									_iteratorError = context$2$0.t20;
	
								case 24:
									context$2$0.prev = 24;
									context$2$0.prev = 25;
	
									if (!_iteratorNormalCompletion && _iterator["return"]) {
										_iterator["return"]();
									}
	
								case 27:
									context$2$0.prev = 27;
	
									if (!_didIteratorError) {
										context$2$0.next = 30;
										break;
									}
	
									throw _iteratorError;
	
								case 30:
									return context$2$0.finish(27);
	
								case 31:
									return context$2$0.finish(24);
	
								case 32:
									if (!graph.hasVertex(key)) {
										context$2$0.next = 35;
										break;
									}
	
									context$2$0.next = 35;
									return graph.vertex(key);
	
								case 35:
									handled.add(key);
	
								case 36:
									visited.pop();
	
								case 37:
								case "end":
									return context$2$0.stop();
							}
						}, marked1$0[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
					};
	
					marked1$0 = [visit].map(regeneratorRuntime.mark);
					visited = [];
					handled = new Set();
					_iteratorNormalCompletion2 = true;
					_didIteratorError2 = false;
					_iteratorError2 = undefined;
					context$1$0.prev = 7;
					_iterator2 = graph.vertices()[Symbol.iterator]();
	
				case 9:
					if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
						context$1$0.next = 17;
						break;
					}
	
					_step2$value = _slicedToArray(_step2.value, 1);
					key = _step2$value[0];
	
					if (handled.has(key)) {
						context$1$0.next = 14;
						break;
					}
	
					return context$1$0.delegateYield(visit(key), "t21", 14);
	
				case 14:
					_iteratorNormalCompletion2 = true;
					context$1$0.next = 9;
					break;
	
				case 17:
					context$1$0.next = 23;
					break;
	
				case 19:
					context$1$0.prev = 19;
					context$1$0.t22 = context$1$0["catch"](7);
					_didIteratorError2 = true;
					_iteratorError2 = context$1$0.t22;
	
				case 23:
					context$1$0.prev = 23;
					context$1$0.prev = 24;
	
					if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
						_iterator2["return"]();
					}
	
				case 26:
					context$1$0.prev = 26;
	
					if (!_didIteratorError2) {
						context$1$0.next = 29;
						break;
					}
	
					throw _iteratorError2;
	
				case 29:
					return context$1$0.finish(26);
	
				case 30:
					return context$1$0.finish(23);
	
				case 31:
				case "end":
					return context$1$0.stop();
			}
		}, marked0$0[0], this, [[7, 19, 23, 31], [24,, 26, 30]]);
	}
	
	;
	module.exports = exports["default"];
	// stack

/***/ }

/******/ })
});
;
//# sourceMappingURL=vertices_topologically.js.map