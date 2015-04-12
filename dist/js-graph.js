(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["JsGraph"] = factory();
	else
		root["JsGraph"] = factory();
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _createComputedClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var prop = props[i]; prop.configurable = true; if (prop.value) prop.writable = true; Object.defineProperty(target, prop.key, prop); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @public
	 * @class JsGraph
	 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
	 */
	
	var JsGraph = (function () {
		function JsGraph() {
			_classCallCheck(this, JsGraph);
	
			this._vertices = new Map(); // Map.< string, * >
			this._edges = new Map(); // Map.< string, Map.<string, *> >
			this._reverseEdges = new Map(); // Map.< string, Set.<*> >
			this._vertexCount = 0;
			this._edgeCount = 0;
		}
	
		_createComputedClass(JsGraph, [{
			key: "addNewVertex",
	
			//////////////////////////////
			////////// Vertices //////////
			//////////////////////////////
	
			////////// creating them //////////
	
			/**
	   * Add a new vertex to this graph.
	   * @throws {JsGraph.VertexExistsError} if a vertex with this key already exists
	   * @param key   {string} the key with which to refer to this new vertex
	   * @param value {*}      the value to store in this new vertex
	   */
			value: function addNewVertex(key, value) {
				if (this.hasVertex(key)) {
					throw new JsGraph.VertexExistsError(key, this._vertices.get(key));
				}
				this._vertices.set(key, value);
				this._edges.set(key, new Map());
				this._reverseEdges.set(key, new Set());
				this._vertexCount += 1;
			}
		}, {
			key: "setVertex",
	
			/**
	   * Set the value of an existing vertex in this graph.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key   {string} the key belonging to the vertex
	   * @param value {*}      the value to store in this vertex
	   */
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				this._vertices.set(key, value);
			}
		}, {
			key: "ensureVertex",
	
			/**
	   * Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
	   * If it does not yet exist, a new vertex is added with the given value.
	   * @param key   {string} the key for the vertex
	   * @param value {*}      the value to store if a new vertex is added
	   */
			value: function ensureVertex(key, value) {
				if (!this.hasVertex(key)) {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "addVertex",
	
			/**
	   * Add a new vertex to this graph. If a vertex with this key already exists,
	   * the value of that vertex is overwritten.
	   * @param key   {string} the key with which to refer to this new vertex
	   * @param value {*}      the value to store in this new vertex
	   */
			value: function addVertex(key, value) {
				if (this.hasVertex(key)) {
					this.setVertex(key, value);
				} else {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "removeExistingVertex",
	
			////////// removing them //////////
	
			/**
	   * Remove an existing vertex from this graph.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	   * @throws {JsGraph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				if (this._edges.get(key).size > 0 || this._reverseEdges.get(key).size > 0) {
					throw new JsGraph.HasConnectedEdgesError(key);
				}
				this._vertices["delete"](key);
				this._vertexCount -= 1;
			}
		}, {
			key: "destroyExistingVertex",
	
			/**
	   * Remove an existing vertex from this graph, as well as all edges connected to it.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.verticesFrom(key)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var to = _step$value[0];
	
						this.removeEdge(key, to);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.verticesTo(key)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 1);
	
						var from = _step2$value[0];
	
						this.removeEdge(from, key);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
	
				this.removeExistingVertex(key);
			}
		}, {
			key: "removeVertex",
	
			/**
	   * Remove an existing vertex from this graph.
	   * If a vertex with this key does not exist, nothing happens.
	   * @throws {JsGraph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeVertex(key) {
				if (this.hasVertex(key)) {
					this.removeExistingVertex(key);
				}
			}
		}, {
			key: "destroyVertex",
	
			/**
	   * Remove a vertex from this graph, as well as all edges connected to it.
	   * If a vertex with this key does not exist, nothing happens.
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyVertex(key) {
				if (this.hasVertex(key)) {
					this.destroyExistingVertex(key);
				}
			}
		}, {
			key: "vertexCount",
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of vertices in the whole graph
	   */
			value: function vertexCount() {
				return this._vertexCount;
			}
		}, {
			key: "hasVertex",
	
			/**
	   * Ask whether a vertex with a given key exists.
	   * @param key {string} the key to query
	   * @returns {boolean} whether there is a vertex with the given key
	   */
			value: function hasVertex(key) {
				return this._vertices.has(key);
			}
		}, {
			key: "vertexValue",
	
			/**
	   * Get the value associated with the vertex of a given key.
	   * @param key {string} the key to query
	   * @returns {*} the value associated with the vertex of the given key.
	   * Note that a return value of `undefined` can mean
	   *
	   * 1. that there is no such vertex, or
	   * 2. that the stored value is actually `undefined`.
	   *
	   * Use {@link JsGraph#hasVertex} to distinguish these cases.
	   */
			value: function vertexValue(key) {
				return this._vertices.get(key);
			}
		}, {
			key: "addNewEdge",
	
			///////////////////////////
			////////// Edges //////////
			///////////////////////////
	
			////////// adding them //////////
	
			/**
	   * Add a new edge to this graph.
	   * @throws {JsGraph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this new edge
	   */
			value: function addNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new JsGraph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new JsGraph.VertexNotExistsError(from);
					} else {
						throw new JsGraph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				this._edges.get(from).set(to, value);
				this._reverseEdges.get(to).add(from);
				this._edgeCount += 1;
			}
		}, {
			key: "createNewEdge",
	
			/**
	   * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @throws {JsGraph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this new edge
	   */
			value: function createNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new JsGraph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				this.ensureVertex(from);
				this.ensureVertex(to);
				this.addNewEdge(from, to, value);
			}
		}, {
			key: "setEdge",
	
			/**
	   * Set the value of an existing edge in this graph.
	   * @throws {JsGraph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this edge
	   */
			value: function setEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					throw new JsGraph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from).set(to, value);
			}
		}, {
			key: "spanEdge",
	
			/**
	   * Make sure an edge between the `from` and `to` vertices in this graph.
	   * If one already exists, nothing is done.
	   * If one does not yet exist, a new edge is added with the given value.
	   * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store if a new edge is added
	   */
			value: function spanEdge(from, to, value) {
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new JsGraph.VertexNotExistsError(from);
					} else {
						throw new JsGraph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				if (!this.hasEdge(from, to)) {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: "addEdge",
	
			/**
	   * Add a new edge to this graph. If an edge between `from` and `to` already exists,
	   * the value of that edge is overwritten.
	   * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this new edge
	   */
			value: function addEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: "ensureEdge",
	
			/**
	   * Make sure an edge between the `from` and `to` vertices exists in this graph.
	   * If it already exists, nothing is done.
	   * If it does not yet exist, a new edge is added with the given value.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store if a new edge is added
	   */
			value: function ensureEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "createEdge",
	
			/**
	   * Add a new edge to this graph. If an edge between the `from` and `to`
	   * vertices already exists, the value of that edge is overwritten.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store if a new edge is added
	   */
			value: function createEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "removeExistingEdge",
	
			////////// removing them //////////
	
			/**
	   * Remove an existing edge from this graph.
	   * @throws {JsGraph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeExistingEdge(from, to) {
				if (!this.hasEdge(from, to)) {
					throw new JsGraph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from)["delete"](to);
				this._reverseEdges.get(to)["delete"](from);
				this._edgeCount -= 1;
			}
		}, {
			key: "removeEdge",
	
			/**
	   * Remove an edge from this graph.
	   * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeEdge(from, to) {
				if (this.hasEdge(from, to)) {
					this.removeExistingEdge(from, to);
				}
			}
		}, {
			key: "edgeCount",
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of edges in the whole graph
	   */
			value: function edgeCount() {
				return this._edgeCount;
			}
		}, {
			key: "hasEdge",
	
			/**
	   * Ask whether an edge between given `from` and `to` vertices exist.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
	   */
			value: function hasEdge(from, to) {
				return this.hasVertex(from) && this.hasVertex(to) && this._edges.has(from) && this._edges.get(from).has(to);
			}
		}, {
			key: "edgeValue",
	
			/**
	   * Get the value associated with the edge between given `from` and `to` vertices.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {*} the value associated with the edge between the given `from` and `to` vertices
	   * Note that a return value of `undefined` can mean
	   *
	   * 1. that there is no such edge, or
	   * 2. that the stored value is actually `undefined`.
	   *
	   * Use {@link JsGraph#hasEdge} to distinguish these cases.
	   */
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this._edges.get(from).get(to) : undefined;
			}
		}, {
			key: "vertices",
	
			///////////////////////////////////////////////
			//////////// ES6 Iterable interfaces //////////
			///////////////////////////////////////////////
	
			/**
	   * Iterate over all vertices of the graph, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.vertices(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.vertices()) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link JsGraph#@@iterator}
	   */
			value: regeneratorRuntime.mark(function vertices() {
				var _this = this;
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._vertices[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 17;
								break;
							}
	
							_step$value = _slicedToArray(_step.value, 2);
							key = _step$value[0];
							value = _step$value[1];
	
							if (!(_this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 14;
								break;
							}
	
							done.add(key);
							context$2$0.next = 14;
							return [key, value];
	
						case 14:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 17:
							context$2$0.next = 23;
							break;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t0;
	
						case 23:
							context$2$0.prev = 23;
							context$2$0.prev = 24;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 26:
							context$2$0.prev = 26;
	
							if (!_didIteratorError) {
								context$2$0.next = 29;
								break;
							}
	
							throw _iteratorError;
	
						case 29:
							return context$2$0.finish(26);
	
						case 30:
							return context$2$0.finish(23);
	
						case 31:
						case "end":
							return context$2$0.stop();
					}
				}, vertices, this, [[4, 19, 23, 31], [24,, 26, 30]]);
			})
		}, {
			key: Symbol.iterator,
	
			/**
	   * A {@link JsGraph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
	   * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
	   * @method JsGraph#@@iterator
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (let [key, value] of jsGraph) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link JsGraph#vertices}
	   */
			value: function () {
				return this.vertices();
			}
		}, {
			key: "edges",
	
			/**
	   * Iterate over all edges of the graph, in no particular order.
	   * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.edges(), fromToVal = it.next(); !it.done;) {
	   *     var from  = fromToVal[0],
	   *         to    = fromToVal[1],
	   *         value = fromToVal[2];
	   *     // iterates over all edges of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, to, value] of jsGraph.edges()) {
	   *     // iterates over all vertices of the graph
	   * }
	   */
			value: regeneratorRuntime.mark(function edges() {
				var _this = this;
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Map();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._edges.keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 40;
								break;
							}
	
							from = _step.value;
	
							if (!done.has(from)) {
								done.set(from, new Set());
							}
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							context$2$0.prev = 12;
							_iterator2 = _this._edges.get(from).keys()[Symbol.iterator]();
	
						case 14:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								context$2$0.next = 23;
								break;
							}
	
							to = _step2.value;
	
							if (!(_this.hasEdge(from, to) && !done.get(from).has(to))) {
								context$2$0.next = 20;
								break;
							}
	
							done.get(from).add(to);
							context$2$0.next = 20;
							return [from, to, _this._edges.get(from).get(to)];
	
						case 20:
							_iteratorNormalCompletion2 = true;
							context$2$0.next = 14;
							break;
	
						case 23:
							context$2$0.next = 29;
							break;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.t1 = context$2$0["catch"](12);
							_didIteratorError2 = true;
							_iteratorError2 = context$2$0.t1;
	
						case 29:
							context$2$0.prev = 29;
							context$2$0.prev = 30;
	
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
	
						case 32:
							context$2$0.prev = 32;
	
							if (!_didIteratorError2) {
								context$2$0.next = 35;
								break;
							}
	
							throw _iteratorError2;
	
						case 35:
							return context$2$0.finish(32);
	
						case 36:
							return context$2$0.finish(29);
	
						case 37:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 40:
							context$2$0.next = 46;
							break;
	
						case 42:
							context$2$0.prev = 42;
							context$2$0.t2 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t2;
	
						case 46:
							context$2$0.prev = 46;
							context$2$0.prev = 47;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 49:
							context$2$0.prev = 49;
	
							if (!_didIteratorError) {
								context$2$0.next = 52;
								break;
							}
	
							throw _iteratorError;
	
						case 52:
							return context$2$0.finish(49);
	
						case 53:
							return context$2$0.finish(46);
	
						case 54:
						case "end":
							return context$2$0.stop();
					}
				}, edges, this, [[4, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
			})
		}, {
			key: "verticesFrom",
	
			/**
	   * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the outgoing edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesFrom(from), toVertexEdge = it.next(); !it.done;) {
	   *     var to          = toVertexEdge[0],
	   *         vertexValue = toVertexEdge[1],
	   *         edgeValue   = toVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [to, vertexValue, edgeValue] of jsGraph.verticesFrom(from)) {
	   *     // iterates over all outgoing edges of the `from` vertex
	   * }
	   */
			value: function verticesFrom(from) {
				if (!this.hasVertex(from)) {
					throw new JsGraph.VertexNotExistsError(from);
				}
				return this._verticesFrom(from);
			}
		}, {
			key: "_verticesFrom",
			value: regeneratorRuntime.mark(function _verticesFrom(from) {
				var _this = this;
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, to;
	
				return regeneratorRuntime.wrap(function _verticesFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._edges.get(from).keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 12;
							return [to, _this._vertices.get(to), _this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t3 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t3;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesFrom, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "verticesTo",
	
			/**
	   * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the incoming edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesTo(to), fromVertexEdge = it.next(); !it.done;) {
	   *     var from        = fromVertexEdge[0],
	   *         vertexValue = fromVertexEdge[1],
	   *         edgeValue   = fromVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, vertexValue, edgeValue] of jsGraph.verticesTo(to)) {
	   *     // iterates over all incoming edges of the `to` vertex
	   * }
	   */
			value: function verticesTo(to) {
				if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				return this._verticesTo(to);
			}
		}, {
			key: "_verticesTo",
			value: regeneratorRuntime.mark(function _verticesTo(to) {
				var _this = this;
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from;
	
				return regeneratorRuntime.wrap(function _verticesTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 12;
							return [from, _this._vertices.get(from), _this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t4 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t4;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesTo, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "verticesWithPathFrom",
	
			/**
	   * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesWithPathFrom(from), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices reachable from `from`
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.verticesWithPathFrom(from)) {
	   *     // iterates over all vertices reachable from `from`
	   * }
	   */
			value: function verticesWithPathFrom(from) {
				if (!this.hasVertex(from)) {
					throw new JsGraph.VertexNotExistsError(from);
				}
				return this._verticesWithPathFrom(from, new Set());
			}
		}, {
			key: "_verticesWithPathFrom",
			value: regeneratorRuntime.mark(function _verticesWithPathFrom(from, done) {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, to;
	
				return regeneratorRuntime.wrap(function _verticesWithPathFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = _this._edges.get(from).keys()[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 11;
							return [to, _this._vertices.get(to)];
	
						case 11:
							return context$2$0.delegateYield(_this._verticesWithPathFrom(to, done), "t5", 12);
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t6 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t6;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesWithPathFrom, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "verticesWithPathTo",
	
			/**
	   * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesWithPathTo(to), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.verticesWithPathTo(to)) {
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   */
			value: function verticesWithPathTo(to) {
				if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				return this._verticesWithPathTo(to, new Set());
			}
		}, {
			key: "_verticesWithPathTo",
			value: regeneratorRuntime.mark(function _verticesWithPathTo(to, done) {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from;
	
				return regeneratorRuntime.wrap(function _verticesWithPathTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = _this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 11;
							return [from, _this._vertices.get(from)];
	
						case 11:
							return context$2$0.delegateYield(_this._verticesWithPathTo(from, done), "t7", 12);
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t8 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t8;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesWithPathTo, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "vertices_topologically",
	
			/**
	   * Iterate over all vertices of the graph in topological order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.vertices_topologically(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.vertices_topologically()) {
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   */
			value: regeneratorRuntime.mark(function vertices_topologically() {
				var _this2 = this;
	
				var visit = regeneratorRuntime.mark(function visit(a) {
					var i, cycle, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, b;
	
					return regeneratorRuntime.wrap(function visit$(context$3$0) {
						while (1) switch (context$3$0.prev = context$3$0.next) {
							case 0:
								visited.push(a);
								i = visited.indexOf(a);
	
								if (!(i !== visited.length - 1)) {
									context$3$0.next = 5;
									break;
								}
	
								cycle = visited.slice(i + 1).reverse();
								throw new JsGraph.CycleError(cycle);
	
							case 5:
								if (handled.has(a)) {
									context$3$0.next = 36;
									break;
								}
	
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								context$3$0.prev = 9;
								_iterator = _this.verticesTo(a)[Symbol.iterator]();
	
							case 11:
								if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
									context$3$0.next = 18;
									break;
								}
	
								_step$value = _slicedToArray(_step.value, 1);
								b = _step$value[0];
								return context$3$0.delegateYield(visit(b), "t9", 15);
	
							case 15:
								_iteratorNormalCompletion = true;
								context$3$0.next = 11;
								break;
	
							case 18:
								context$3$0.next = 24;
								break;
	
							case 20:
								context$3$0.prev = 20;
								context$3$0.t10 = context$3$0["catch"](9);
								_didIteratorError = true;
								_iteratorError = context$3$0.t10;
	
							case 24:
								context$3$0.prev = 24;
								context$3$0.prev = 25;
	
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
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
								if (!_this.hasVertex(a)) {
									context$3$0.next = 35;
									break;
								}
	
								context$3$0.next = 35;
								return [a, _this._vertices.get(a)];
	
							case 35:
								handled.add(a);
	
							case 36:
								visited.pop();
	
							case 37:
							case "end":
								return context$3$0.stop();
						}
					}, visit, this, [[9, 20, 24, 32], [25,, 27, 31]]);
				});
	
				var visited, handled, _this, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, a;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visited = [];
							handled = new Set();
							_this = _this2;
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 6;
							_iterator = _this2.vertices()[Symbol.iterator]();
	
						case 8:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 16;
								break;
							}
	
							_step$value = _slicedToArray(_step.value, 1);
							a = _step$value[0];
	
							if (handled.has(a)) {
								context$2$0.next = 13;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t11", 13);
	
						case 13:
							_iteratorNormalCompletion = true;
							context$2$0.next = 8;
							break;
	
						case 16:
							context$2$0.next = 22;
							break;
	
						case 18:
							context$2$0.prev = 18;
							context$2$0.t12 = context$2$0["catch"](6);
							_didIteratorError = true;
							_iteratorError = context$2$0.t12;
	
						case 22:
							context$2$0.prev = 22;
							context$2$0.prev = 23;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 25:
							context$2$0.prev = 25;
	
							if (!_didIteratorError) {
								context$2$0.next = 28;
								break;
							}
	
							throw _iteratorError;
	
						case 28:
							return context$2$0.finish(25);
	
						case 29:
							return context$2$0.finish(22);
	
						case 30:
						case "end":
							return context$2$0.stop();
					}
				}, vertices_topologically, this, [[6, 18, 22, 30], [23,, 25, 29]]);
			})
		}, {
			key: "clearEdges",
	
			//////////////////////////////
			////////// Clearing //////////
			//////////////////////////////
	
			/**
	   * Remove all edges from the graph, but leave the vertices intact.
	   */
			value: function clearEdges() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.edges()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var from = _step$value[0];
						var to = _step$value[1];
						this.removeEdge(from, to);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "clear",
	
			/**
	   * Remove all edges and vertices from the graph, putting it back in its initial state.
	   */
			value: function clear() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var v = _step$value[0];
						this.destroyVertex(v);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "equals",
	
			////////////////////////////////////////
			////////// (Advanced) Queries //////////
			////////////////////////////////////////
	
			/**
	   * Ask whether this graph and another graph are equal.
	   * Two graphs are equal if they have the same vertices and the same edges.
	   * @param other {JsGraph} the other graph to compare this one to
	   * @param [eq] {function(*, *, string, ?string): boolean}
	   *     a custom equality function for stored values; defaults to `===`
	   *     comparison; The first two arguments are the two values to compare.
	   *     If they are vertex values, the third argument is the vertex key.
	   *     If they are edge values, the third and fourth argument are the
	   *     `from` and `to` keys respectively. (So you can test the fourth
	   *     argument to distinguish the two cases.)
	   * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
	   */
			value: function equals() {
				var other = arguments[0] === undefined ? undefined : arguments[0];
				var eq = arguments[1] === undefined ? function (x, y, from, to) {
					return x === y;
				} : arguments[1];
	
				if (!(other instanceof JsGraph)) {
					return false;
				}
				if (this.vertexCount() !== other.vertexCount()) {
					return false;
				}
				if (this.edgeCount() !== other.edgeCount()) {
					return false;
				}
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var key = _step$value[0];
						var value = _step$value[1];
	
						if (!other.hasVertex(key)) {
							return false;
						}
						if (!eq(value, other.vertexValue(key), key)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.edges()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 3);
	
						var from = _step2$value[0];
						var to = _step2$value[1];
						var value = _step2$value[2];
	
						if (!other.hasEdge(from, to)) {
							return false;
						}
						if (!eq(value, other.edgeValue(from, to), from, to)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
	
				return true;
			}
		}, {
			key: "hasCycle",
	
			/**
	   * Test whether the graph contains a directed cycle.
	   * @returns {boolean} `false`, if there is no cycle; a truthy value if there *is* a cycle
	   *                    (not necessarily `true`; future versions of the library might return
	   *                     a description of the cycle)
	   */
			value: function hasCycle() {
				var _this = this;
	
				var visited = new Set();
				var handled = new Set();
	
				var visit = function (a) {
					/* if a cycle is found, record it and return */
					if (visited.has(a)) {
						return true;
					}
	
					/* if this vertex was already handled, no cycle can be found here */
					if (handled.has(a)) {
						return false;
					}
					handled.add(a);
	
					/* recursively visit successors to check for cycles */
					visited.add(a);
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = _this.verticesFrom(a)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _slicedToArray(_step.value, 1);
	
							var b = _step$value[0];
	
							if (visit(b)) {
								return true;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					visited["delete"](a);
				};
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var a = _step$value[0];
	
						if (visit(a)) {
							return true;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				return false;
			}
		}, {
			key: "hasPath",
	
			/**
	   * Test whether there is a directed path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {boolean} `false`, if there is no such path; a truthy value if there *is* such a path
	   *                    (not necessarily `true`; future versions of the library might return
	   *                     a description of the path)
	   */
			value: function hasPath(from, to) {
				var _this = this;
	
				if (!this.hasVertex(from) || !this.hasVertex(to)) {
					return false;
				}
	
				var visited = new Set();
	
				/* Recursive auxiliary function: Is there a path from 'current' to 'to'? */
				var hasPathAux = function (current) {
					if (_this.hasEdge(current, to)) {
						return true;
					}
					visited.add(current);
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = _this.verticesFrom(current)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _slicedToArray(_step.value, 1);
	
							var next = _step$value[0];
	
							if (!visited.has(next) && hasPathAux(next)) {
								return true;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					visited["delete"](current);
					return false;
				};
	
				return hasPathAux(from);
			}
		}, {
			key: "clone",
	
			/////////////////////////////
			////////// Cloning //////////
			/////////////////////////////
	
			/**
	   * Create a clone of this graph.
	   * @param [tr] {function(*, string, ?string): *}
	   *     a custom transformation function for stored values; defaults to
	   *     the identity function; The first argument is the value to clone.
	   *     If it is a vertex value, the third argument is the vertex key.
	   *     If it is an edge value, the third and fourth argument are the
	   *     `from` and `to` keys respectively. (So you can test the fourth
	   *     argument to distinguish the two cases.)
	   * @returns {JsGraph} a clone of this graph
	   */
			value: function clone() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = new JsGraph();
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var key = _step$value[0];
						var val = _step$value[1];
	
						result.addVertex(key, tr(val, key));
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.edges()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 3);
	
						var from = _step2$value[0];
						var to = _step2$value[1];
						var val = _step2$value[2];
	
						result.addEdge(from, to, tr(val, from, to));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
	
				return result;
			}
		}, {
			key: "transitiveReduction",
	
			/**
	   * Create a clone of this graph, but without any transitive edges.
	   * @param [tr] {function(*, string, ?string): *}
	   *     a custom transformation function for stored values; defaults to
	   *     the identity function; The first argument is the value to clone.
	   *     If it is a vertex value, the third argument is the vertex key.
	   *     If it is an edge value, the third and fourth argument are the
	   *     `from` and `to` keys respectively. (So you can test the fourth
	   *     argument to distinguish the two cases.)
	   * @returns {JsGraph} a clone of this graph
	   */
			value: function transitiveReduction() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = this.clone(tr);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var x = _step$value[0];
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;
	
						try {
							for (var _iterator2 = this.vertices()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var _step2$value = _slicedToArray(_step2.value, 1);
	
								var y = _step2$value[0];
	
								if (result.hasEdge(x, y)) {
									var _iteratorNormalCompletion3 = true;
									var _didIteratorError3 = false;
									var _iteratorError3 = undefined;
	
									try {
										for (var _iterator3 = this.vertices()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
											var _step3$value = _slicedToArray(_step3.value, 1);
	
											var z = _step3$value[0];
	
											if (result.hasPath(y, z)) {
												result.removeEdge(x, z);
											}
										}
									} catch (err) {
										_didIteratorError3 = true;
										_iteratorError3 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
												_iterator3["return"]();
											}
										} finally {
											if (_didIteratorError3) {
												throw _iteratorError3;
											}
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
									_iterator2["return"]();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				return result;
			}
		}]);
	
		return JsGraph;
	})();
	
	module.exports = JsGraph;
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
	 * @extends Error
	 */
	JsGraph.VertexExistsError = (function (_Error) {
		function VertexExistsError(key, value) {
			_classCallCheck(this, VertexExistsError);
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof JsGraph.VertexExistsError
	   * @instance
	   * @type {Set.<{ key: string, value }>}
	   */
			this.vertices = new Set();
			this.v(key, value);
		}
	
		_inherits(VertexExistsError, _Error);
	
		_createClass(VertexExistsError, {
			v: {
				value: function v(key, value) {
					this.vertices.add({ key: key, value: value });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
					this.message = "This graph has " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
						return v.key;
					}).join("', '") + "'";
				}
			}
		});
	
		return VertexExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
	 * @extends Error
	 */
	JsGraph.VertexNotExistsError = (function (_Error2) {
		function VertexNotExistError(key) {
			_classCallCheck(this, VertexNotExistError);
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof JsGraph.VertexNotExistsError
	   * @instance
	   * @type {Set.<{ key: string }>}
	   */
			this.vertices = new Set();
			this.v(key);
		}
	
		_inherits(VertexNotExistError, _Error2);
	
		_createClass(VertexNotExistError, {
			v: {
				value: function v(key) {
					this.vertices.add({ key: key });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
					this.message = "This graph does not have " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
						return v.key;
					}).join("', '") + "'";
				}
			}
		});
	
		return VertexNotExistError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
	 * @extends Error
	 */
	JsGraph.EdgeExistsError = (function (_Error3) {
		function EdgeExistsError(from, to, value) {
			_classCallCheck(this, EdgeExistsError);
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof JsGraph.EdgeExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string, value }>}
	   */
			this.edges = new Set();
			this.e(from, to, value);
		}
	
		_inherits(EdgeExistsError, _Error3);
	
		_createClass(EdgeExistsError, {
			e: {
				value: function e(from, to, value) {
					this.edges.add({ from: from, to: to, value: value });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var edges = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _step.value;
							var from = _step$value.from;
							var to = _step$value.to;
	
							edges.push("('" + from + "', '" + to + "')");
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph has " + anEdges + " " + edges.join(", ");
				}
			}
		});
	
		return EdgeExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
	 * @extends Error
	 */
	JsGraph.EdgeNotExistsError = (function (_Error4) {
		function EdgeNotExistsError(from, to) {
			_classCallCheck(this, EdgeNotExistsError);
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof JsGraph.EdgeNotExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string }>}
	   */
			this.edges = new Set();
			this.e(from, to);
		}
	
		_inherits(EdgeNotExistsError, _Error4);
	
		_createClass(EdgeNotExistsError, {
			e: {
				value: function e(from, to) {
					this.edges.add({ from: from, to: to });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var edges = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _step.value;
							var from = _step$value.from;
							var to = _step$value.to;
	
							edges.push("('" + from + "', '" + to + "')");
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph does not have " + anEdges + " " + edges.join(", ");
				}
			}
		});
	
		return EdgeNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a vertex is expected not to have connected edges, but does.
	 * @extends Error
	 */
	JsGraph.HasConnectedEdgesError = (function (_Error5) {
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			/**
	   * the key of the relevant vertex
	   * @public
	   * @constant key
	   * @memberof JsGraph.HasConnectedEdgesError
	   * @instance
	   * @type {string}
	   */
			this.key = key;
			this.message = "The '" + key + "' vertex has connected edges";
		}
	
		_inherits(HasConnectedEdgesError, _Error5);
	
		return HasConnectedEdgesError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
	 * @extends Error
	 */
	JsGraph.CycleError = (function (_Error6) {
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			/**
	   * the vertices involved in the cycle
	   * @public
	   * @constant cycle
	   * @memberof JsGraph.CycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			this.cycle = cycle;
			this.message = "This graph contains a cycle: " + cycle;
		}
	
		_inherits(CycleError, _Error6);
	
		return CycleError;
	})(Error);
	// stack

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-graph.js.map