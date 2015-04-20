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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	"use strict";
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Graph class /////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @public
	 * @class Graph
	 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
	 */
	
	var Graph = (function () {
		function Graph() {
			_classCallCheck(this, Graph);
	
			this._vertices = new Map(); // Map.< string, * >
			this._edges = new Map(); // Map.< string, Map.<string, *> >
			this._reverseEdges = new Map(); // Map.< string, Set.<*> >
			this._vertexCount = 0;
			this._edgeCount = 0;
		}
	
		_createClass(Graph, [{
			key: "addNewVertex",
	
			//////////////////////////////
			////////// Vertices //////////
			//////////////////////////////
	
			////////// creating them //////////
	
			/**
	   * Add a new vertex to this graph.
	   * @throws {Graph.VertexExistsError} if a vertex with this key already exists
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
	   */
			value: function addNewVertex(key, value) {
				if (this.hasVertex(key)) {
					throw new Graph.VertexExistsError(key, this._vertices.get(key));
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param  key    {string} the key belonging to the vertex
	   * @param [value] {*}      the value to store in this vertex
	   */
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				this._vertices.set(key, value);
			}
		}, {
			key: "ensureVertex",
	
			/**
	   * Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
	   * If it does not yet exist, a new vertex is added with the given value.
	   * @param  key    {string} the key for the vertex
	   * @param [value] {*}      the value to store if a new vertex is added
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
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				if (this._edges.get(key).size > 0 || this._reverseEdges.get(key).size > 0) {
					throw new Graph.HasConnectedEdgesError(key);
				}
				this._vertices["delete"](key);
				this._vertexCount -= 1;
			}
		}, {
			key: "destroyExistingVertex",
	
			/**
	   * Remove an existing vertex from this graph, as well as all edges connected to it.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
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
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
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
	   * Use {@link Graph#hasVertex} to distinguish these cases.
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
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
			value: function addNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new Graph.VertexNotExistsError(from);
					} else {
						throw new Graph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
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
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
			value: function createNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				this.ensureVertex(from);
				this.ensureVertex(to);
				this.addNewEdge(from, to, value);
			}
		}, {
			key: "setEdge",
	
			/**
	   * Set the value of an existing edge in this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this edge
	   */
			value: function setEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					throw new Graph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from).set(to, value);
			}
		}, {
			key: "spanEdge",
	
			/**
	   * Make sure an edge between the `from` and `to` vertices in this graph.
	   * If one already exists, nothing is done.
	   * If one does not yet exist, a new edge is added with the given value.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
			value: function spanEdge(from, to, value) {
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new Graph.VertexNotExistsError(from);
					} else {
						throw new Graph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
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
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
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
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
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
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
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
	   * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeExistingEdge(from, to) {
				if (!this.hasEdge(from, to)) {
					throw new Graph.EdgeNotExistsError(from, to);
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
	   * Use {@link Graph#hasEdge} to distinguish these cases.
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
	   * for (var it = graph.vertices(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices()) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link Graph#@@iterator}
	   */
			value: regeneratorRuntime.mark(function vertices() {
				var done, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, key, value;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion3 = true;
							_didIteratorError3 = false;
							_iteratorError3 = undefined;
							context$2$0.prev = 4;
							_iterator3 = this._vertices[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
								context$2$0.next = 17;
								break;
							}
	
							_step3$value = _slicedToArray(_step3.value, 2);
							key = _step3$value[0];
							value = _step3$value[1];
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 14;
								break;
							}
	
							done.add(key);
							context$2$0.next = 14;
							return [key, value];
	
						case 14:
							_iteratorNormalCompletion3 = true;
							context$2$0.next = 6;
							break;
	
						case 17:
							context$2$0.next = 23;
							break;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError3 = true;
							_iteratorError3 = context$2$0.t0;
	
						case 23:
							context$2$0.prev = 23;
							context$2$0.prev = 24;
	
							if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
								_iterator3["return"]();
							}
	
						case 26:
							context$2$0.prev = 26;
	
							if (!_didIteratorError3) {
								context$2$0.next = 29;
								break;
							}
	
							throw _iteratorError3;
	
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
	   * A {@link Graph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
	   * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
	   * @method Graph#@@iterator
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (let [key, value] of graph) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link Graph#vertices}
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
	   * for (var it = graph.edges(), fromToVal = it.next(); !it.done;) {
	   *     var from  = fromToVal[0],
	   *         to    = fromToVal[1],
	   *         value = fromToVal[2];
	   *     // iterates over all edges of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, to, value] of graph.edges()) {
	   *     // iterates over all vertices of the graph
	   * }
	   */
			value: regeneratorRuntime.mark(function edges() {
				var done, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, from, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Map();
							_iteratorNormalCompletion4 = true;
							_didIteratorError4 = false;
							_iteratorError4 = undefined;
							context$2$0.prev = 4;
							_iterator4 = this._edges.keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
								context$2$0.next = 40;
								break;
							}
	
							from = _step4.value;
	
							if (!done.has(from)) {
								done.set(from, new Set());
							}
							_iteratorNormalCompletion5 = true;
							_didIteratorError5 = false;
							_iteratorError5 = undefined;
							context$2$0.prev = 12;
							_iterator5 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 14:
							if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
								context$2$0.next = 23;
								break;
							}
	
							to = _step5.value;
	
							if (!(this.hasEdge(from, to) && !done.get(from).has(to))) {
								context$2$0.next = 20;
								break;
							}
	
							done.get(from).add(to);
							context$2$0.next = 20;
							return [from, to, this._edges.get(from).get(to)];
	
						case 20:
							_iteratorNormalCompletion5 = true;
							context$2$0.next = 14;
							break;
	
						case 23:
							context$2$0.next = 29;
							break;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.t1 = context$2$0["catch"](12);
							_didIteratorError5 = true;
							_iteratorError5 = context$2$0.t1;
	
						case 29:
							context$2$0.prev = 29;
							context$2$0.prev = 30;
	
							if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
								_iterator5["return"]();
							}
	
						case 32:
							context$2$0.prev = 32;
	
							if (!_didIteratorError5) {
								context$2$0.next = 35;
								break;
							}
	
							throw _iteratorError5;
	
						case 35:
							return context$2$0.finish(32);
	
						case 36:
							return context$2$0.finish(29);
	
						case 37:
							_iteratorNormalCompletion4 = true;
							context$2$0.next = 6;
							break;
	
						case 40:
							context$2$0.next = 46;
							break;
	
						case 42:
							context$2$0.prev = 42;
							context$2$0.t2 = context$2$0["catch"](4);
							_didIteratorError4 = true;
							_iteratorError4 = context$2$0.t2;
	
						case 46:
							context$2$0.prev = 46;
							context$2$0.prev = 47;
	
							if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
								_iterator4["return"]();
							}
	
						case 49:
							context$2$0.prev = 49;
	
							if (!_didIteratorError4) {
								context$2$0.next = 52;
								break;
							}
	
							throw _iteratorError4;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the outgoing edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesFrom(from), toVertexEdge = it.next(); !it.done;) {
	   *     var to          = toVertexEdge[0],
	   *         vertexValue = toVertexEdge[1],
	   *         edgeValue   = toVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
	   *     // iterates over all outgoing edges of the `from` vertex
	   * }
	   */
			value: function verticesFrom(from) {
				if (!this.hasVertex(from)) {
					throw new Graph.VertexNotExistsError(from);
				}
				return this._verticesFrom(from);
			}
		}, {
			key: "_verticesFrom",
			value: regeneratorRuntime.mark(function _verticesFrom(from) {
				var done, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, to;
	
				return regeneratorRuntime.wrap(function _verticesFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion6 = true;
							_didIteratorError6 = false;
							_iteratorError6 = undefined;
							context$2$0.prev = 4;
							_iterator6 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step6.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 12;
							return [to, this._vertices.get(to), this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion6 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t3 = context$2$0["catch"](4);
							_didIteratorError6 = true;
							_iteratorError6 = context$2$0.t3;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
								_iterator6["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError6) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError6;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the incoming edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesTo(to), fromVertexEdge = it.next(); !it.done;) {
	   *     var from        = fromVertexEdge[0],
	   *         vertexValue = fromVertexEdge[1],
	   *         edgeValue   = fromVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
	   *     // iterates over all incoming edges of the `to` vertex
	   * }
	   */
			value: function verticesTo(to) {
				if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				return this._verticesTo(to);
			}
		}, {
			key: "_verticesTo",
			value: regeneratorRuntime.mark(function _verticesTo(to) {
				var done, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, from;
	
				return regeneratorRuntime.wrap(function _verticesTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion7 = true;
							_didIteratorError7 = false;
							_iteratorError7 = undefined;
							context$2$0.prev = 4;
							_iterator7 = this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step7.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 12;
							return [from, this._vertices.get(from), this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion7 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t4 = context$2$0["catch"](4);
							_didIteratorError7 = true;
							_iteratorError7 = context$2$0.t4;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
								_iterator7["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError7) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError7;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathFrom(from), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices reachable from `from`
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathFrom(from)) {
	   *     // iterates over all vertices reachable from `from`
	   * }
	   */
			value: function verticesWithPathFrom(from) {
				if (!this.hasVertex(from)) {
					throw new Graph.VertexNotExistsError(from);
				}
				return this._verticesWithPathFrom(from, new Set());
			}
		}, {
			key: "_verticesWithPathFrom",
			value: regeneratorRuntime.mark(function _verticesWithPathFrom(from, done) {
				var _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, to;
	
				return regeneratorRuntime.wrap(function _verticesWithPathFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion8 = true;
							_didIteratorError8 = false;
							_iteratorError8 = undefined;
							context$2$0.prev = 3;
							_iterator8 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step8.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 11;
							return [to, this._vertices.get(to)];
	
						case 11:
							return context$2$0.delegateYield(this._verticesWithPathFrom(to, done), "t5", 12);
	
						case 12:
							_iteratorNormalCompletion8 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t6 = context$2$0["catch"](3);
							_didIteratorError8 = true;
							_iteratorError8 = context$2$0.t6;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
								_iterator8["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError8) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError8;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathTo(to), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathTo(to)) {
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   */
			value: function verticesWithPathTo(to) {
				if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				return this._verticesWithPathTo(to, new Set());
			}
		}, {
			key: "_verticesWithPathTo",
			value: regeneratorRuntime.mark(function _verticesWithPathTo(to, done) {
				var _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, from;
	
				return regeneratorRuntime.wrap(function _verticesWithPathTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion9 = true;
							_didIteratorError9 = false;
							_iteratorError9 = undefined;
							context$2$0.prev = 3;
							_iterator9 = this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step9.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 11;
							return [from, this._vertices.get(from)];
	
						case 11:
							return context$2$0.delegateYield(this._verticesWithPathTo(from, done), "t7", 12);
	
						case 12:
							_iteratorNormalCompletion9 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t8 = context$2$0["catch"](3);
							_didIteratorError9 = true;
							_iteratorError9 = context$2$0.t8;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
								_iterator9["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError9) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError9;
	
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
	   * for (var it = graph.vertices_topologically(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices_topologically()) {
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   */
			value: regeneratorRuntime.mark(function vertices_topologically() {
				var marked2$0, visited, handled, _this, visit, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _step11$value, a;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visit = function visit(a) {
								var i, cycle, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _step10$value, b;
	
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
											throw new Graph.CycleError(cycle);
	
										case 5:
											if (handled.has(a)) {
												context$3$0.next = 36;
												break;
											}
	
											_iteratorNormalCompletion10 = true;
											_didIteratorError10 = false;
											_iteratorError10 = undefined;
											context$3$0.prev = 9;
											_iterator10 = _this.verticesTo(a)[Symbol.iterator]();
	
										case 11:
											if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
												context$3$0.next = 18;
												break;
											}
	
											_step10$value = _slicedToArray(_step10.value, 1);
											b = _step10$value[0];
											return context$3$0.delegateYield(visit(b), "t9", 15);
	
										case 15:
											_iteratorNormalCompletion10 = true;
											context$3$0.next = 11;
											break;
	
										case 18:
											context$3$0.next = 24;
											break;
	
										case 20:
											context$3$0.prev = 20;
											context$3$0.t10 = context$3$0["catch"](9);
											_didIteratorError10 = true;
											_iteratorError10 = context$3$0.t10;
	
										case 24:
											context$3$0.prev = 24;
											context$3$0.prev = 25;
	
											if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
												_iterator10["return"]();
											}
	
										case 27:
											context$3$0.prev = 27;
	
											if (!_didIteratorError10) {
												context$3$0.next = 30;
												break;
											}
	
											throw _iteratorError10;
	
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
								}, marked2$0[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
							};
	
							marked2$0 = [visit].map(regeneratorRuntime.mark);
							visited = [];
							handled = new Set();
							_this = this;
							_iteratorNormalCompletion11 = true;
							_didIteratorError11 = false;
							_iteratorError11 = undefined;
							context$2$0.prev = 8;
							_iterator11 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
								context$2$0.next = 18;
								break;
							}
	
							_step11$value = _slicedToArray(_step11.value, 1);
							a = _step11$value[0];
	
							if (handled.has(a)) {
								context$2$0.next = 15;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t11", 15);
	
						case 15:
							_iteratorNormalCompletion11 = true;
							context$2$0.next = 10;
							break;
	
						case 18:
							context$2$0.next = 24;
							break;
	
						case 20:
							context$2$0.prev = 20;
							context$2$0.t12 = context$2$0["catch"](8);
							_didIteratorError11 = true;
							_iteratorError11 = context$2$0.t12;
	
						case 24:
							context$2$0.prev = 24;
							context$2$0.prev = 25;
	
							if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
								_iterator11["return"]();
							}
	
						case 27:
							context$2$0.prev = 27;
	
							if (!_didIteratorError11) {
								context$2$0.next = 30;
								break;
							}
	
							throw _iteratorError11;
	
						case 30:
							return context$2$0.finish(27);
	
						case 31:
							return context$2$0.finish(24);
	
						case 32:
						case "end":
							return context$2$0.stop();
					}
				}, vertices_topologically, this, [[8, 20, 24, 32], [25,, 27, 31]]);
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
				var _iteratorNormalCompletion12 = true;
				var _didIteratorError12 = false;
				var _iteratorError12 = undefined;
	
				try {
					for (var _iterator12 = this.edges()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
						var _step12$value = _slicedToArray(_step12.value, 2);
	
						var from = _step12$value[0];
						var to = _step12$value[1];
						this.removeEdge(from, to);
					}
				} catch (err) {
					_didIteratorError12 = true;
					_iteratorError12 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
							_iterator12["return"]();
						}
					} finally {
						if (_didIteratorError12) {
							throw _iteratorError12;
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
				var _iteratorNormalCompletion13 = true;
				var _didIteratorError13 = false;
				var _iteratorError13 = undefined;
	
				try {
					for (var _iterator13 = this.vertices()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
						var _step13$value = _slicedToArray(_step13.value, 1);
	
						var v = _step13$value[0];
						this.destroyVertex(v);
					}
				} catch (err) {
					_didIteratorError13 = true;
					_iteratorError13 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
							_iterator13["return"]();
						}
					} finally {
						if (_didIteratorError13) {
							throw _iteratorError13;
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
	   * @param other {Graph} the other graph to compare this one to
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
	
				if (!(other instanceof Graph)) {
					return false;
				}
				if (this.vertexCount() !== other.vertexCount()) {
					return false;
				}
				if (this.edgeCount() !== other.edgeCount()) {
					return false;
				}
				var _iteratorNormalCompletion14 = true;
				var _didIteratorError14 = false;
				var _iteratorError14 = undefined;
	
				try {
					for (var _iterator14 = this.vertices()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
						var _step14$value = _slicedToArray(_step14.value, 2);
	
						var key = _step14$value[0];
						var value = _step14$value[1];
	
						if (!other.hasVertex(key)) {
							return false;
						}
						if (!eq(value, other.vertexValue(key), key)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError14 = true;
					_iteratorError14 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
							_iterator14["return"]();
						}
					} finally {
						if (_didIteratorError14) {
							throw _iteratorError14;
						}
					}
				}
	
				var _iteratorNormalCompletion15 = true;
				var _didIteratorError15 = false;
				var _iteratorError15 = undefined;
	
				try {
					for (var _iterator15 = this.edges()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
						var _step15$value = _slicedToArray(_step15.value, 3);
	
						var from = _step15$value[0];
						var to = _step15$value[1];
						var value = _step15$value[2];
	
						if (!other.hasEdge(from, to)) {
							return false;
						}
						if (!eq(value, other.edgeValue(from, to), from, to)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError15 = true;
					_iteratorError15 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
							_iterator15["return"]();
						}
					} finally {
						if (_didIteratorError15) {
							throw _iteratorError15;
						}
					}
				}
	
				return true;
			}
		}, {
			key: "cycle",
	
			/**
	   * Find any directed cycle in this graph.
	   * @returns {?array} an array with the keys of a cycle in order;
	   *                   `null`, if there is no cycle
	   */
			value: function cycle() {
				var _this7 = this;
	
				var visited = []; // stack
				var handled = new Set();
	
				var visit = (function (_visit) {
					function visit(_x) {
						return _visit.apply(this, arguments);
					}
	
					visit.toString = function () {
						return _visit.toString();
					};
	
					return visit;
				})(function (a) {
					/* if a cycle is found, record it and return */
					var i = visited.indexOf(a);
					if (i >= 0) {
						return visited.slice(i);
					}
	
					/* if this vertex was already handled, no cycle can be found here */
					if (handled.has(a)) {
						return null;
					}
					handled.add(a);
	
					/* recursively visit successors to check for cycles */
					visited.push(a);
					var _iteratorNormalCompletion16 = true;
					var _didIteratorError16 = false;
					var _iteratorError16 = undefined;
	
					try {
						for (var _iterator16 = _this7.verticesFrom(a)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
							var _step16$value = _slicedToArray(_step16.value, 1);
	
							var b = _step16$value[0];
	
							var result = visit(b);
							if (result) {
								return result;
							}
						}
					} catch (err) {
						_didIteratorError16 = true;
						_iteratorError16 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
								_iterator16["return"]();
							}
						} finally {
							if (_didIteratorError16) {
								throw _iteratorError16;
							}
						}
					}
	
					visited.pop();
				});
	
				var _iteratorNormalCompletion17 = true;
				var _didIteratorError17 = false;
				var _iteratorError17 = undefined;
	
				try {
					for (var _iterator17 = this.vertices()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
						var _step17$value = _slicedToArray(_step17.value, 1);
	
						var a = _step17$value[0];
	
						var result = visit(a);
						if (result) {
							return result;
						}
					}
				} catch (err) {
					_didIteratorError17 = true;
					_iteratorError17 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
							_iterator17["return"]();
						}
					} finally {
						if (_didIteratorError17) {
							throw _iteratorError17;
						}
					}
				}
	
				return null;
			}
		}, {
			key: "hasCycle",
	
			/**
	   * Test whether this graph contains a directed cycle.
	   * @returns {boolean} whether this graph contains a directed cycle
	   */
			value: function hasCycle() {
				return !!this.cycle();
			}
		}, {
			key: "path",
	
			/**
	   * Find any path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {?array} an array with the keys of the path found between the two vertices,
	   *                   including those two vertices themselves; `null` if no such path exists
	   */
			value: function path(from, to) {
				var _this8 = this;
	
				if (!this.hasVertex(from) || !this.hasVertex(to)) {
					return null;
				}
	
				var visited = [];
	
				/* recursive auxiliary function: find a path from 'current' to 'to' */
				var hasPathAux = (function (_hasPathAux) {
					function hasPathAux(_x2) {
						return _hasPathAux.apply(this, arguments);
					}
	
					hasPathAux.toString = function () {
						return _hasPathAux.toString();
					};
	
					return hasPathAux;
				})(function (current) {
					visited.push(current);
					if (_this8.hasEdge(current, to)) {
						return [].concat(visited, [to]);
					}
					var _iteratorNormalCompletion18 = true;
					var _didIteratorError18 = false;
					var _iteratorError18 = undefined;
	
					try {
						for (var _iterator18 = _this8.verticesFrom(current)[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
							var _step18$value = _slicedToArray(_step18.value, 1);
	
							var next = _step18$value[0];
	
							if (visited.indexOf(next) === -1) {
								var result = hasPathAux(next);
								if (result) {
									return result;
								}
							}
						}
					} catch (err) {
						_didIteratorError18 = true;
						_iteratorError18 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
								_iterator18["return"]();
							}
						} finally {
							if (_didIteratorError18) {
								throw _iteratorError18;
							}
						}
					}
	
					visited.pop();
					return null;
				});
	
				return hasPathAux(from);
			}
		}, {
			key: "hasPath",
	
			/**
	   * Test whether there is a directed path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {boolean} whether such a path exists
	   */
			value: function hasPath(from, to) {
				return !!this.path(from, to);
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
	   * @returns {Graph} a clone of this graph
	   */
			value: function clone() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = new Graph();
				var _iteratorNormalCompletion19 = true;
				var _didIteratorError19 = false;
				var _iteratorError19 = undefined;
	
				try {
					for (var _iterator19 = this.vertices()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
						var _step19$value = _slicedToArray(_step19.value, 2);
	
						var key = _step19$value[0];
						var val = _step19$value[1];
	
						result.addVertex(key, tr(val, key));
					}
				} catch (err) {
					_didIteratorError19 = true;
					_iteratorError19 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
							_iterator19["return"]();
						}
					} finally {
						if (_didIteratorError19) {
							throw _iteratorError19;
						}
					}
				}
	
				var _iteratorNormalCompletion20 = true;
				var _didIteratorError20 = false;
				var _iteratorError20 = undefined;
	
				try {
					for (var _iterator20 = this.edges()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
						var _step20$value = _slicedToArray(_step20.value, 3);
	
						var from = _step20$value[0];
						var to = _step20$value[1];
						var val = _step20$value[2];
	
						result.addEdge(from, to, tr(val, from, to));
					}
				} catch (err) {
					_didIteratorError20 = true;
					_iteratorError20 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
							_iterator20["return"]();
						}
					} finally {
						if (_didIteratorError20) {
							throw _iteratorError20;
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
	   * @returns {Graph} a clone of this graph
	   */
			value: function transitiveReduction() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = this.clone(tr);
				var _iteratorNormalCompletion21 = true;
				var _didIteratorError21 = false;
				var _iteratorError21 = undefined;
	
				try {
					for (var _iterator21 = this.vertices()[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
						var _step21$value = _slicedToArray(_step21.value, 1);
	
						var x = _step21$value[0];
						var _iteratorNormalCompletion22 = true;
						var _didIteratorError22 = false;
						var _iteratorError22 = undefined;
	
						try {
							for (var _iterator22 = this.vertices()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
								var _step22$value = _slicedToArray(_step22.value, 1);
	
								var y = _step22$value[0];
	
								if (result.hasEdge(x, y)) {
									var _iteratorNormalCompletion23 = true;
									var _didIteratorError23 = false;
									var _iteratorError23 = undefined;
	
									try {
										for (var _iterator23 = this.vertices()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
											var _step23$value = _slicedToArray(_step23.value, 1);
	
											var z = _step23$value[0];
	
											if (result.hasPath(y, z)) {
												result.removeEdge(x, z);
											}
										}
									} catch (err) {
										_didIteratorError23 = true;
										_iteratorError23 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
												_iterator23["return"]();
											}
										} finally {
											if (_didIteratorError23) {
												throw _iteratorError23;
											}
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError22 = true;
							_iteratorError22 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
									_iterator22["return"]();
								}
							} finally {
								if (_didIteratorError22) {
									throw _iteratorError22;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError21 = true;
					_iteratorError21 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
							_iterator21["return"]();
						}
					} finally {
						if (_didIteratorError21) {
							throw _iteratorError21;
						}
					}
				}
	
				return result;
			}
		}]);
	
		return Graph;
	})();
	
	exports["default"] = Graph;
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.VertexExistsError = (function (_Error) {
		function VertexExistsError(key, value) {
			_classCallCheck(this, VertexExistsError);
	
			var _this = new _Error();
	
			_this.__proto__ = VertexExistsError.prototype;
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexExistsError
	   * @instance
	   * @type {Set.<{ key: string, value }>}
	   */
			_this.vertices = new Set();
			_this.v(key, value);
			return _this;
		}
	
		_inherits(VertexExistsError, _Error);
	
		_createClass(VertexExistsError, [{
			key: "v",
			value: function v(key, value) {
				this.vertices.add({ key: key, value: value });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
				this.message = "This graph has " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
					return v.key;
				}).join("', '") + "'";
			}
		}]);
	
		return VertexExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.VertexNotExistsError = (function (_Error2) {
		function VertexNotExistError(key) {
			_classCallCheck(this, VertexNotExistError);
	
			var _this2 = new _Error2();
	
			_this2.__proto__ = VertexNotExistError.prototype;
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexNotExistsError
	   * @instance
	   * @type {Set.<{ key: string }>}
	   */
			_this2.vertices = new Set();
			_this2.v(key);
			return _this2;
		}
	
		_inherits(VertexNotExistError, _Error2);
	
		_createClass(VertexNotExistError, [{
			key: "v",
			value: function v(key) {
				this.vertices.add({ key: key });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
				this.message = "This graph does not have " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
					return v.key;
				}).join("', '") + "'";
			}
		}]);
	
		return VertexNotExistError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.EdgeExistsError = (function (_Error3) {
		function EdgeExistsError(from, to, value) {
			_classCallCheck(this, EdgeExistsError);
	
			var _this3 = new _Error3();
	
			_this3.__proto__ = EdgeExistsError.prototype;
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string, value }>}
	   */
			_this3.edges = new Set();
			_this3.e(from, to, value);
			return _this3;
		}
	
		_inherits(EdgeExistsError, _Error3);
	
		_createClass(EdgeExistsError, [{
			key: "e",
			value: function e(from, to, value) {
				this.edges.add({ from: from, to: to, value: value });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var edges = [];
				var _iteratorNormalCompletion24 = true;
				var _didIteratorError24 = false;
				var _iteratorError24 = undefined;
	
				try {
					for (var _iterator24 = this.edges[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
						var _step24$value = _step24.value;
						var from = _step24$value.from;
						var to = _step24$value.to;
	
						edges.push("('" + from + "', '" + to + "')");
					}
				} catch (err) {
					_didIteratorError24 = true;
					_iteratorError24 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
							_iterator24["return"]();
						}
					} finally {
						if (_didIteratorError24) {
							throw _iteratorError24;
						}
					}
				}
	
				var anEdges = edges.length === 1 ? "an edge" : "edges";
				this.message = "This graph has " + anEdges + " " + edges.join(", ");
			}
		}]);
	
		return EdgeExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.EdgeNotExistsError = (function (_Error4) {
		function EdgeNotExistsError(from, to) {
			_classCallCheck(this, EdgeNotExistsError);
	
			var _this4 = new _Error4();
	
			_this4.__proto__ = EdgeNotExistsError.prototype;
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeNotExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string }>}
	   */
			_this4.edges = new Set();
			_this4.e(from, to);
			return _this4;
		}
	
		_inherits(EdgeNotExistsError, _Error4);
	
		_createClass(EdgeNotExistsError, [{
			key: "e",
			value: function e(from, to) {
				this.edges.add({ from: from, to: to });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var edges = [];
				var _iteratorNormalCompletion25 = true;
				var _didIteratorError25 = false;
				var _iteratorError25 = undefined;
	
				try {
					for (var _iterator25 = this.edges[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
						var _step25$value = _step25.value;
						var from = _step25$value.from;
						var to = _step25$value.to;
	
						edges.push("('" + from + "', '" + to + "')");
					}
				} catch (err) {
					_didIteratorError25 = true;
					_iteratorError25 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
							_iterator25["return"]();
						}
					} finally {
						if (_didIteratorError25) {
							throw _iteratorError25;
						}
					}
				}
	
				var anEdges = edges.length === 1 ? "an edge" : "edges";
				this.message = "This graph does not have " + anEdges + " " + edges.join(", ");
			}
		}]);
	
		return EdgeNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a vertex is expected not to have connected edges, but does.
	 * @extends Error
	 */
	Graph.HasConnectedEdgesError = (function (_Error5) {
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			var _this5 = new _Error5();
	
			_this5.__proto__ = HasConnectedEdgesError.prototype;
	
			/**
	   * the key of the relevant vertex
	   * @public
	   * @constant key
	   * @memberof Graph.HasConnectedEdgesError
	   * @instance
	   * @type {string}
	   */
			_this5.key = key;
			_this5.message = "The '" + key + "' vertex has connected edges";
			return _this5;
		}
	
		_inherits(HasConnectedEdgesError, _Error5);
	
		return HasConnectedEdgesError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
	 * @extends Error
	 */
	Graph.CycleError = (function (_Error6) {
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			var _this6 = new _Error6();
	
			_this6.__proto__ = CycleError.prototype;
	
			/**
	   * the vertices involved in the cycle
	   * @public
	   * @constant cycle
	   * @memberof Graph.CycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			_this6.cycle = cycle;
			_this6.message = "This graph contains a cycle: " + cycle;
			return _this6;
		}
	
		_inherits(CycleError, _Error6);
	
		return CycleError;
	})(Error);
	module.exports = exports["default"];
	// stack

/***/ }
/******/ ])
});
;
//# sourceMappingURL=graph.js.map