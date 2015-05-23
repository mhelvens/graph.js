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

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Symbols for private members /////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	var _vertices = Symbol("vertices");
	exports._vertices = _vertices;
	var _edges = Symbol("edges");
	exports._edges = _edges;
	var _reverseEdges = Symbol("reverse edges");
	exports._reverseEdges = _reverseEdges;
	var _sources = Symbol("sources");
	exports._sources = _sources;
	var _sinks = Symbol("sinks");
	exports._sinks = _sinks;
	var _edgeCount = Symbol("edge count");
	
	exports._edgeCount = _edgeCount;
	var _extractTwoArgs = Symbol("extract ([a, b]) or (a, b) arguments");
	exports._extractTwoArgs = _extractTwoArgs;
	var _extractThreeArgs = Symbol("extract ([[a, b], c]), ([a, b], c) or (a, b, c) arguments");
	
	exports._extractThreeArgs = _extractThreeArgs;
	var _listeners = Symbol("listeners");
	exports._listeners = _listeners;
	var _trigger = Symbol("trigger");
	
	exports._trigger = _trigger;
	var _verticesFrom = Symbol("vertices from");
	exports._verticesFrom = _verticesFrom;
	var _verticesTo = Symbol("vertices to");
	exports._verticesTo = _verticesTo;
	var _edgesFrom = Symbol("edges from");
	exports._edgesFrom = _edgesFrom;
	var _edgesTo = Symbol("edges to");
	exports._edgesTo = _edgesTo;
	var _verticesWithPathTo = Symbol("vertices with path to");
	exports._verticesWithPathTo = _verticesWithPathTo;
	var _verticesWithPathFrom = Symbol("vertices with path from");
	exports._verticesWithPathFrom = _verticesWithPathFrom;
	var _paths = Symbol("paths");
	
	exports._paths = _paths;
	var _expectVertices = Symbol("expect vertices");
	exports._expectVertices = _expectVertices;
	var _expectVerticesAbsent = Symbol("expect vertex absent");
	exports._expectVerticesAbsent = _expectVerticesAbsent;
	var _expectEdges = Symbol("expect edge");
	exports._expectEdges = _expectEdges;
	var _expectEdgesAbsent = Symbol("expect edge absent");
	exports._expectEdgesAbsent = _expectEdgesAbsent;
	var _expectNoConnectedEdges = Symbol("expect no connected edges");
	exports._expectNoConnectedEdges = _expectNoConnectedEdges;

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Graph.vertices_topologically ////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	exports['default'] = addTopologicalIteration;
	
	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }
	
	var _extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges = __webpack_require__(9);
	
	function addTopologicalIteration(Graph) {
	
		Object.assign(Graph.prototype, /** @lends Graph.prototype */{
	
			/**
	   * Iterate over all vertices of the graph in topological order.
	   * @returns {Iterator} an ES6 iterator yielding vertices
	   * @example
	   * for (var it = graph.vertices_topologically(), kv; !(kv = it.next()).done;) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices_topologically()) {
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   */
			vertices_topologically: regeneratorRuntime.mark(function vertices_topologically() {
				var marked2$0, visited, handled, _this, visit, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, key;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visit = function visit(key) {
								var i, cycle, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, nextKey;
	
								return regeneratorRuntime.wrap(function visit$(context$3$0) {
									while (1) switch (context$3$0.prev = context$3$0.next) {
										case 0:
											visited.push(key);
											i = visited.indexOf(key);
	
											if (!(i !== visited.length - 1)) {
												context$3$0.next = 5;
												break;
											}
	
											cycle = visited.slice(i + 1).reverse();
											throw new Graph.CycleError(cycle);
	
										case 5:
											if (handled.has(key)) {
												context$3$0.next = 36;
												break;
											}
	
											_iteratorNormalCompletion = true;
											_didIteratorError = false;
											_iteratorError = undefined;
											context$3$0.prev = 9;
											_iterator = _this.verticesTo(key)[Symbol.iterator]();
	
										case 11:
											if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
												context$3$0.next = 18;
												break;
											}
	
											_step$value = _slicedToArray(_step.value, 1);
											nextKey = _step$value[0];
											return context$3$0.delegateYield(visit(nextKey), 't19', 15);
	
										case 15:
											_iteratorNormalCompletion = true;
											context$3$0.next = 11;
											break;
	
										case 18:
											context$3$0.next = 24;
											break;
	
										case 20:
											context$3$0.prev = 20;
											context$3$0.t20 = context$3$0['catch'](9);
											_didIteratorError = true;
											_iteratorError = context$3$0.t20;
	
										case 24:
											context$3$0.prev = 24;
											context$3$0.prev = 25;
	
											if (!_iteratorNormalCompletion && _iterator['return']) {
												_iterator['return']();
											}
	
										case 27:
											context$3$0.prev = 27;
	
											if (!_didIteratorError) {
												context$3$0.next = 30;
												break;
											}
	
											throw _iteratorError;
	
										case 30:
											return context$3$0.finish(27);
	
										case 31:
											return context$3$0.finish(24);
	
										case 32:
											if (!_this.hasVertex(key)) {
												context$3$0.next = 35;
												break;
											}
	
											context$3$0.next = 35;
											return _this.vertex(key);
	
										case 35:
											handled.add(key);
	
										case 36:
											visited.pop();
	
										case 37:
										case 'end':
											return context$3$0.stop();
									}
								}, marked2$0[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
							};
	
							marked2$0 = [visit].map(regeneratorRuntime.mark);
							visited = [];
							handled = new Set();
							_this = this;
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							context$2$0.prev = 8;
							_iterator2 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								context$2$0.next = 18;
								break;
							}
	
							_step2$value = _slicedToArray(_step2.value, 1);
							key = _step2$value[0];
	
							if (handled.has(key)) {
								context$2$0.next = 15;
								break;
							}
	
							return context$2$0.delegateYield(visit(key), 't21', 15);
	
						case 15:
							_iteratorNormalCompletion2 = true;
							context$2$0.next = 10;
							break;
	
						case 18:
							context$2$0.next = 24;
							break;
	
						case 20:
							context$2$0.prev = 20;
							context$2$0.t22 = context$2$0['catch'](8);
							_didIteratorError2 = true;
							_iteratorError2 = context$2$0.t22;
	
						case 24:
							context$2$0.prev = 24;
							context$2$0.prev = 25;
	
							if (!_iteratorNormalCompletion2 && _iterator2['return']) {
								_iterator2['return']();
							}
	
						case 27:
							context$2$0.prev = 27;
	
							if (!_didIteratorError2) {
								context$2$0.next = 30;
								break;
							}
	
							throw _iteratorError2;
	
						case 30:
							return context$2$0.finish(27);
	
						case 31:
							return context$2$0.finish(24);
	
						case 32:
						case 'end':
							return context$2$0.stop();
					}
				}, vertices_topologically, this, [[8, 20, 24, 32], [25,, 27, 31]]);
			})
	
		});
	}
	
	;
	module.exports = exports['default'];
	// stack

/***/ }

/******/ })
});
;
//# sourceMappingURL=addTopologicalIteration.js.map