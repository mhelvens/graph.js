(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
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

	module.exports = __webpack_require__(39);


/***/ },

/***/ 39:
/***/ function(module, exports) {

	'use strict';
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Symbols for private members /////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var _bind = Function.prototype.bind;
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	var _get = function get(_x9, _x10, _x11) { var _again = true; _function: while (_again) { var object = _x9, property = _x10, receiver = _x11; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x9 = parent; _x10 = property; _x11 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _vertices = Symbol("vertices");
	var _edges = Symbol("edges");
	var _reverseEdges = Symbol("reverse edges");
	var _sources = Symbol("sources");
	var _sinks = Symbol("sinks");
	var _edgeCount = Symbol("edge count");
	
	var _listeners = Symbol("listeners");
	var _trigger = Symbol("trigger");
	
	var _verticesFrom = Symbol("vertices from");
	var _verticesTo = Symbol("vertices to");
	var _verticesWithPathTo = Symbol("vertices with path to");
	var _verticesWithPathFrom = Symbol("vertices with path from");
	var _paths = Symbol("paths");
	
	var _expectVertices = Symbol("expect vertices");
	var _expectVerticesAbsent = Symbol("expect vertex absent");
	var _expectEdges = Symbol("expect edge");
	var _expectEdgesAbsent = Symbol("expect edge absent");
	var _expectNoConnectedEdges = Symbol("expect no connected edges");
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Graph class /////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @class Graph
	 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
	 *
	 * @description Constructor arguments can be used to supply initial vertices and edges.
	 * @param ...parts {Array.<Array>}
	 *        a short notation for vertices and edges to initially add to the graph;
	 *        A vertex should be an array of the form `[key, value]`.
	 *        An edge should be an array of the form `[[from, to], value]`.
	 *        Later values of vertices or edges in this list will overwrite earlier
	 *        values, but vertices need not precede their edges. Vertices that are
	 *        connected but store no value need not be listed at all.
	 * @example
	 * var map = new Graph(
	 *     ['Amsterdam',             { population: 825000 }], // vertex
	 *     ['Leiden',                { population: 122000 }], // vertex
	 *     [['Amsterdam', 'Leiden'], { distance:   "40km" }]  // edge
	 * );
	 */
	
	var Graph = (function () {
		function Graph() {
			_classCallCheck(this, Graph);
	
			/* storage */
			this[_vertices] = new Map(); // Map.< string, * >
			this[_edges] = new Map(); // Map.< string, Map.<string, *> >
	
			/* bookkeeping */
			this[_reverseEdges] = new Map(); // Map.< string, Set.<*> >
			this[_sources] = new Set(); // Set.< string >
			this[_sinks] = new Set(); // Set.< string >
			this[_edgeCount] = 0;
	
			/* listeners */
			this[_listeners] = new Map();
	
			/* add vertices and values from constructor arguments */
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
					parts[_key] = arguments[_key];
				}
	
				for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2);
	
					var key = _step$value[0];
					var value = _step$value[1];
	
					if (Array.isArray(key)) {
						/////////////// an edge
	
						var _key2 = _slicedToArray(key, 2);
	
						var from = _key2[0];
						var to = _key2[1];
	
						this.createEdge(from, to, value);
					} else {
						//////////////////////////////// a vertex
						this.addVertex(key, value);
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
		}
	
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
		//  // Errors //////////////////////////////////////////////////////////////////////////////////////
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
		/**
	  * @class
	  * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
	  * @extends Error
	  */
	
		/////////////////////////////////////
		////////// Event Handling //////////
		/////////////////////////////////////
	
		/**
	  * Register an event handler.
	  * @param event   {string}   the event to listen for
	  * @param handler {Function} the function to call for each such event fired, receiving its corresponding value
	  */
	
		_createClass(Graph, [{
			key: "on",
			value: function on(event, handler) {
				if (!this[_listeners].has(event)) {
					this[_listeners].set(event, new Set());
				}
				this[_listeners].get(event).add(handler);
			}
	
			/**
	   * Deregister a previously registered event handler.
	   * @param event   {string}   the event used to originally register a handler
	   * @param handler {Function} the handler originally registered
	   */
		}, {
			key: "off",
			value: function off(event, handler) {
				if (this[_listeners].has(event)) {
					this[_listeners].get(event)["delete"](handler);
				}
			}
		}, {
			key: _trigger,
			value: function value(event, _value) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = (this[_listeners].get(event) || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var handler = _step2.value;
	
						handler(_value);
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
	
			/**
	   * An event that is triggered just after a vertex is added to this graph.
	   * Handlers receive the new vertex `[key, value]` as an argument.
	   * @event vertex-added
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered just after a vertex is removed from this graph.
	   * Handlers receive the vertex key as an argument.
	   * @event vertex-removed
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered after a vertex in this graph is modified.
	   * It is also triggered after any {@link #Graph#event_vertex-added|"vertex-added"} event.
	   * Handlers receive the vertex `[key, value]` as an argument.
	   * @event vertex-modified
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered just after an edge is added to this graph.
	   * Handlers receive the new edge `[[from, to], value]` as an argument.
	   * @event edge-added
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered just after an edge is removed from this graph.
	   * Handlers receive the edge key `[from, to]` as an argument.
	   * @event edge-removed
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered after an edge in this graph is modified.
	   * It is also triggered after any {@link #Graph#event_edge-added|"edge-added"} event.
	   * Handlers receive the edge `[[from, to], value]` as an argument.
	   * @event edge-modified
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
	
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
		}, {
			key: "addNewVertex",
			value: function addNewVertex(key, value) {
				this[_expectVerticesAbsent](key);
				this[_vertices].set(key, value);
				this[_edges].set(key, new Map());
				this[_reverseEdges].set(key, new Set());
				this[_sources].add(key);
				this[_sinks].add(key);
				this[_trigger]('vertex-added', [key, value]);
				this[_trigger]('vertex-modified', [key, value]);
			}
	
			/**
	   * Set the value of an existing vertex in this graph.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param  key    {string} the key belonging to the vertex
	   * @param [value] {*}      the value to store in this vertex
	   */
		}, {
			key: "setVertex",
			value: function setVertex(key, value) {
				this[_expectVertices](key);
				this[_vertices].set(key, value);
				this[_trigger]('vertex-modified', [key, value]);
			}
	
			/**
	   * Make sure a vertex with a specific key exists in this graph. If it already exists,
	   * do nothing. If it does not yet exist, add a new vertex with the given value.
	   * @param  key    {string} the key for the vertex
	   * @param [value] {*}      the value to store if a new vertex is added
	   */
		}, {
			key: "ensureVertex",
			value: function ensureVertex(key, value) {
				if (!this.hasVertex(key)) {
					this.addNewVertex(key, value);
				}
			}
	
			/**
	   * Add a new vertex to this graph. If a vertex with this key already exists,
	   * the value of that vertex is overwritten.
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
	   */
		}, {
			key: "addVertex",
			value: function addVertex(key, value) {
				if (this.hasVertex(key)) {
					this.setVertex(key, value);
				} else {
					this.addNewVertex(key, value);
				}
			}
	
			////////// removing them //////////
	
			/**
	   * Remove an existing vertex from this graph.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "removeExistingVertex",
			value: function removeExistingVertex(key) {
				this[_expectVertices](key);
				this[_expectNoConnectedEdges](key);
				this[_vertices]["delete"](key);
				this[_sources]["delete"](key);
				this[_sinks]["delete"](key);
				this[_trigger]('vertex-removed', key);
			}
	
			/**
	   * Remove an existing vertex from this graph, as well as all edges connected to it.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "destroyExistingVertex",
			value: function destroyExistingVertex(key) {
				this[_expectVertices](key);
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;
	
				try {
					for (var _iterator3 = this.verticesFrom(key)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var _step3$value = _slicedToArray(_step3.value, 1);
	
						var to = _step3$value[0];
						this.removeEdge(key, to);
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
	
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;
	
				try {
					for (var _iterator4 = this.verticesTo(key)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _step4$value = _slicedToArray(_step4.value, 1);
	
						var from = _step4$value[0];
						this.removeEdge(from, key);
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
							_iterator4["return"]();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}
	
				this.removeExistingVertex(key);
			}
	
			/**
	   * Remove an existing vertex from this graph.
	   * If a vertex with this key does not exist, nothing happens.
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "removeVertex",
			value: function removeVertex(key) {
				if (this.hasVertex(key)) {
					this.removeExistingVertex(key);
				}
			}
	
			/**
	   * Remove a vertex from this graph, as well as all edges connected to it.
	   * If a vertex with this key does not exist, nothing happens.
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "destroyVertex",
			value: function destroyVertex(key) {
				if (this.hasVertex(key)) {
					this.destroyExistingVertex(key);
				}
			}
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of vertices in the whole graph
	   */
		}, {
			key: "vertexCount",
			value: function vertexCount() {
				return this[_vertices].size;
			}
	
			/**
	   * Ask whether a vertex with a given key exists.
	   * @param key {string} the key to query
	   * @returns {boolean} whether there is a vertex with the given key
	   */
		}, {
			key: "hasVertex",
			value: function hasVertex(key) {
				return this[_vertices].has(key);
			}
	
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
		}, {
			key: "vertexValue",
			value: function vertexValue(key) {
				return this[_vertices].get(key);
			}
	
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
		}, {
			key: "addNewEdge",
			value: function addNewEdge(from, to, value) {
				this[_expectEdgesAbsent]([from, to]);
				this[_expectVertices](from, to);
				this[_edges].get(from).set(to, value);
				this[_reverseEdges].get(to).add(from);
				this[_edgeCount] += 1;
				this[_sources]["delete"](to);
				this[_sinks]["delete"](from);
				this[_trigger]('edge-added', [[from, to], value]);
				this[_trigger]('edge-modified', [[from, to], value]);
			}
	
			/**
	   * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
		}, {
			key: "createNewEdge",
			value: function createNewEdge(from, to, value) {
				this[_expectEdgesAbsent]([from, to]);
				this.ensureVertex(from);
				this.ensureVertex(to);
				this.addNewEdge(from, to, value);
			}
	
			/**
	   * Set the value of an existing edge in this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this edge
	   */
		}, {
			key: "setEdge",
			value: function setEdge(from, to, value) {
				this[_expectEdges]([from, to]);
				this[_edges].get(from).set(to, value);
				this[_trigger]('edge-modified', [[from, to], value]);
			}
	
			/**
	   * Make sure an edge between the `from` and `to` vertices in this graph.
	   * If one already exists, nothing is done.
	   * If one does not yet exist, a new edge is added with the given value.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
		}, {
			key: "spanEdge",
			value: function spanEdge(from, to, value) {
				this[_expectVertices](from, to);
				if (!this.hasEdge(from, to)) {
					this.addNewEdge(from, to, value);
				}
			}
	
			/**
	   * Add a new edge to this graph. If an edge between `from` and `to` already exists,
	   * the value of that edge is overwritten.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
		}, {
			key: "addEdge",
			value: function addEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.addNewEdge(from, to, value);
				}
			}
	
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
		}, {
			key: "ensureEdge",
			value: function ensureEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					this.createNewEdge(from, to, value);
				}
			}
	
			/**
	   * Add a new edge to this graph. If an edge between the `from` and `to`
	   * vertices already exists, the value of that edge is overwritten.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
		}, {
			key: "createEdge",
			value: function createEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.createNewEdge(from, to, value);
				}
			}
	
			////////// removing them //////////
	
			/**
	   * Remove an existing edge from this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
		}, {
			key: "removeExistingEdge",
			value: function removeExistingEdge(from, to) {
				this[_expectEdges]([from, to]);
				this[_edges].get(from)["delete"](to);
				this[_reverseEdges].get(to)["delete"](from);
				this[_edgeCount] -= 1;
				if (this.inDegree(to) === 0) {
					this[_sources].add(to);
				}
				if (this.outDegree(from) === 0) {
					this[_sinks].add(from);
				}
				this[_trigger]('edge-removed', [from, to]);
			}
	
			/**
	   * Remove an edge from this graph.
	   * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
		}, {
			key: "removeEdge",
			value: function removeEdge(from, to) {
				if (this.hasEdge(from, to)) {
					this.removeExistingEdge(from, to);
				}
			}
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of edges in the whole graph
	   */
		}, {
			key: "edgeCount",
			value: function edgeCount() {
				return this[_edgeCount];
			}
	
			/**
	   * Ask whether an edge between given `from` and `to` vertices exist.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
	   */
		}, {
			key: "hasEdge",
			value: function hasEdge(from, to) {
				return this.hasVertex(from) && this.hasVertex(to) && this[_edges].has(from) && this[_edges].get(from).has(to);
			}
	
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
		}, {
			key: "edgeValue",
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this[_edges].get(from).get(to) : undefined;
			}
	
			///////////////////////////////////////////////
			//////////// ES6 Iterable interfaces //////////
			///////////////////////////////////////////////
	
			/**
	   * Iterate over all vertices of the graph, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.vertices(), kv; !(kv = it.next()).done;) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices()) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link Graph#@@iterator}
	   */
		}, {
			key: "vertices",
			value: regeneratorRuntime.mark(function vertices() {
				var done, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _step5$value, key, value;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion5 = true;
							_didIteratorError5 = false;
							_iteratorError5 = undefined;
							context$2$0.prev = 4;
							_iterator5 = this[_vertices][Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
								context$2$0.next = 17;
								break;
							}
	
							_step5$value = _slicedToArray(_step5.value, 2);
							key = _step5$value[0];
							value = _step5$value[1];
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 14;
								break;
							}
	
							done.add(key);
							context$2$0.next = 14;
							return [key, value];
	
						case 14:
							_iteratorNormalCompletion5 = true;
							context$2$0.next = 6;
							break;
	
						case 17:
							context$2$0.next = 23;
							break;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError5 = true;
							_iteratorError5 = context$2$0.t0;
	
						case 23:
							context$2$0.prev = 23;
							context$2$0.prev = 24;
	
							if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
								_iterator5["return"]();
							}
	
						case 26:
							context$2$0.prev = 26;
	
							if (!_didIteratorError5) {
								context$2$0.next = 29;
								break;
							}
	
							throw _iteratorError5;
	
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
		}, {
			key: Symbol.iterator,
			value: function value() {
				return this.vertices();
			}
	
			/**
	   * Iterate over all edges of the graph, in no particular order.
	   * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.edges(), kv; !(kv = it.next()).done;) {
	   *     var from  = kv.value[0],
	   *         to    = kv.value[1],
	   *         value = kv.value[2];
	   *     // iterates over all edges of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, to, value] of graph.edges()) {
	   *     // iterates over all vertices of the graph
	   * }
	   */
		}, {
			key: "edges",
			value: regeneratorRuntime.mark(function edges() {
				var done, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, from, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Map();
							_iteratorNormalCompletion6 = true;
							_didIteratorError6 = false;
							_iteratorError6 = undefined;
							context$2$0.prev = 4;
							_iterator6 = this[_edges].keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
								context$2$0.next = 40;
								break;
							}
	
							from = _step6.value;
	
							done.set(from, new Set());
							_iteratorNormalCompletion7 = true;
							_didIteratorError7 = false;
							_iteratorError7 = undefined;
							context$2$0.prev = 12;
							_iterator7 = this[_edges].get(from).keys()[Symbol.iterator]();
	
						case 14:
							if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
								context$2$0.next = 23;
								break;
							}
	
							to = _step7.value;
	
							if (!(this.hasEdge(from, to) && !done.get(from).has(to))) {
								context$2$0.next = 20;
								break;
							}
	
							done.get(from).add(to);
							context$2$0.next = 20;
							return [from, to, this[_edges].get(from).get(to)];
	
						case 20:
							_iteratorNormalCompletion7 = true;
							context$2$0.next = 14;
							break;
	
						case 23:
							context$2$0.next = 29;
							break;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.t0 = context$2$0["catch"](12);
							_didIteratorError7 = true;
							_iteratorError7 = context$2$0.t0;
	
						case 29:
							context$2$0.prev = 29;
							context$2$0.prev = 30;
	
							if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
								_iterator7["return"]();
							}
	
						case 32:
							context$2$0.prev = 32;
	
							if (!_didIteratorError7) {
								context$2$0.next = 35;
								break;
							}
	
							throw _iteratorError7;
	
						case 35:
							return context$2$0.finish(32);
	
						case 36:
							return context$2$0.finish(29);
	
						case 37:
							_iteratorNormalCompletion6 = true;
							context$2$0.next = 6;
							break;
	
						case 40:
							context$2$0.next = 46;
							break;
	
						case 42:
							context$2$0.prev = 42;
							context$2$0.t1 = context$2$0["catch"](4);
							_didIteratorError6 = true;
							_iteratorError6 = context$2$0.t1;
	
						case 46:
							context$2$0.prev = 46;
							context$2$0.prev = 47;
	
							if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
								_iterator6["return"]();
							}
	
						case 49:
							context$2$0.prev = 49;
	
							if (!_didIteratorError6) {
								context$2$0.next = 52;
								break;
							}
	
							throw _iteratorError6;
	
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
	
			/**
	   * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the outgoing edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesFrom(from), kv; !(kv = it.next()).done;) {
	   *     var to          = kv.value[0],
	   *         vertexValue = kv.value[1],
	   *         edgeValue   = kv.value[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
	   *     // iterates over all outgoing edges of the `from` vertex
	   * }
	   */
		}, {
			key: "verticesFrom",
			value: function verticesFrom(from) {
				this[_expectVertices](from);
				return this[_verticesFrom](from);
			}
		}, {
			key: _verticesFrom,
			value: regeneratorRuntime.mark(function value(from) {
				var done, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, to;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion8 = true;
							_didIteratorError8 = false;
							_iteratorError8 = undefined;
							context$2$0.prev = 4;
							_iterator8 = this[_edges].get(from).keys()[Symbol.iterator]();
	
						case 6:
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
							context$2$0.next = 12;
							return [to, this[_vertices].get(to), this[_edges].get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion8 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError8 = true;
							_iteratorError8 = context$2$0.t0;
	
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
				}, value, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the incoming edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesTo(to), kv; !(kv = it.next()).done;) {
	   *     var from        = kv.value[0],
	   *         vertexValue = kv.value[1],
	   *         edgeValue   = kv.value[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
	   *     // iterates over all incoming edges of the `to` vertex
	   * }
	   */
		}, {
			key: "verticesTo",
			value: function verticesTo(to) {
				this[_expectVertices](to);
				return this[_verticesTo](to);
			}
		}, {
			key: _verticesTo,
			value: regeneratorRuntime.mark(function value(to) {
				var done, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, from;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion9 = true;
							_didIteratorError9 = false;
							_iteratorError9 = undefined;
							context$2$0.prev = 4;
							_iterator9 = this[_reverseEdges].get(to)[Symbol.iterator]();
	
						case 6:
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
							context$2$0.next = 12;
							return [from, this[_vertices].get(from), this[_edges].get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion9 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError9 = true;
							_iteratorError9 = context$2$0.t0;
	
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
				}, value, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathFrom(from), kv; !(kv = it.next()).done;) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices reachable from `from`
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathFrom(from)) {
	   *     // iterates over all vertices reachable from `from`
	   * }
	   */
		}, {
			key: "verticesWithPathFrom",
			value: function verticesWithPathFrom(from) {
				this[_expectVertices](from);
				return this[_verticesWithPathFrom](from, new Set());
			}
		}, {
			key: _verticesWithPathFrom,
			value: regeneratorRuntime.mark(function value(from, done) {
				var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, to;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion10 = true;
							_didIteratorError10 = false;
							_iteratorError10 = undefined;
							context$2$0.prev = 3;
							_iterator10 = this[_edges].get(from).keys()[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step10.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 11;
							return [to, this[_vertices].get(to)];
	
						case 11:
							return context$2$0.delegateYield(this[_verticesWithPathFrom](to, done), "t0", 12);
	
						case 12:
							_iteratorNormalCompletion10 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t1 = context$2$0["catch"](3);
							_didIteratorError10 = true;
							_iteratorError10 = context$2$0.t1;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
								_iterator10["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError10) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError10;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, value, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathTo(to), kv; !(kv = it.next()).done;) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathTo(to)) {
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   */
		}, {
			key: "verticesWithPathTo",
			value: function verticesWithPathTo(to) {
				this[_expectVertices](to);
				return this[_verticesWithPathTo](to, new Set());
			}
		}, {
			key: _verticesWithPathTo,
			value: regeneratorRuntime.mark(function value(to, done) {
				var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, from;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion11 = true;
							_didIteratorError11 = false;
							_iteratorError11 = undefined;
							context$2$0.prev = 3;
							_iterator11 = this[_reverseEdges].get(to)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step11.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 11;
							return [from, this[_vertices].get(from)];
	
						case 11:
							return context$2$0.delegateYield(this[_verticesWithPathTo](from, done), "t0", 12);
	
						case 12:
							_iteratorNormalCompletion11 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t1 = context$2$0["catch"](3);
							_didIteratorError11 = true;
							_iteratorError11 = context$2$0.t1;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
								_iterator11["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError11) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError11;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, value, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices that have no incoming edges, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.sources(), kv; !(kv = it.next()).done;) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices with no incoming edges
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.sources()) {
	   *     // iterates over all vertices with no incoming edges
	   * }
	   */
		}, {
			key: "sources",
			value: regeneratorRuntime.mark(function sources() {
				var done, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, key;
	
				return regeneratorRuntime.wrap(function sources$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion12 = true;
							_didIteratorError12 = false;
							_iteratorError12 = undefined;
							context$2$0.prev = 4;
							_iterator12 = this[_sources][Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							key = _step12.value;
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(key);
							context$2$0.next = 12;
							return [key, this.vertexValue(key)];
	
						case 12:
							_iteratorNormalCompletion12 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError12 = true;
							_iteratorError12 = context$2$0.t0;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
								_iterator12["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError12) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError12;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, sources, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices that have no outgoing edges, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.sinks(), kv; !(kv = it.next()).done;) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices with no outgoing edges
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.sinks()) {
	   *     // iterates over all vertices with no outgoing edges
	   * }
	   */
		}, {
			key: "sinks",
			value: regeneratorRuntime.mark(function sinks() {
				var done, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, key;
	
				return regeneratorRuntime.wrap(function sinks$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion13 = true;
							_didIteratorError13 = false;
							_iteratorError13 = undefined;
							context$2$0.prev = 4;
							_iterator13 = this[_sinks][Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							key = _step13.value;
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(key);
							context$2$0.next = 12;
							return [key, this.vertexValue(key)];
	
						case 12:
							_iteratorNormalCompletion13 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError13 = true;
							_iteratorError13 = context$2$0.t0;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
								_iterator13["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError13) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError13;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, sinks, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices of the graph in topological order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
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
		}, {
			key: "vertices_topologically",
			value: regeneratorRuntime.mark(function vertices_topologically() {
				var marked2$0, visited, handled, _this, visit, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, _step15$value, a;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visit = function visit(a) {
								var i, cycle, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _step14$value, b;
	
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
	
											_iteratorNormalCompletion14 = true;
											_didIteratorError14 = false;
											_iteratorError14 = undefined;
											context$3$0.prev = 9;
											_iterator14 = _this.verticesTo(a)[Symbol.iterator]();
	
										case 11:
											if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
												context$3$0.next = 18;
												break;
											}
	
											_step14$value = _slicedToArray(_step14.value, 1);
											b = _step14$value[0];
											return context$3$0.delegateYield(visit(b), "t0", 15);
	
										case 15:
											_iteratorNormalCompletion14 = true;
											context$3$0.next = 11;
											break;
	
										case 18:
											context$3$0.next = 24;
											break;
	
										case 20:
											context$3$0.prev = 20;
											context$3$0.t1 = context$3$0["catch"](9);
											_didIteratorError14 = true;
											_iteratorError14 = context$3$0.t1;
	
										case 24:
											context$3$0.prev = 24;
											context$3$0.prev = 25;
	
											if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
												_iterator14["return"]();
											}
	
										case 27:
											context$3$0.prev = 27;
	
											if (!_didIteratorError14) {
												context$3$0.next = 30;
												break;
											}
	
											throw _iteratorError14;
	
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
											return [a, _this[_vertices].get(a)];
	
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
							_iteratorNormalCompletion15 = true;
							_didIteratorError15 = false;
							_iteratorError15 = undefined;
							context$2$0.prev = 8;
							_iterator15 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done) {
								context$2$0.next = 18;
								break;
							}
	
							_step15$value = _slicedToArray(_step15.value, 1);
							a = _step15$value[0];
	
							if (handled.has(a)) {
								context$2$0.next = 15;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t0", 15);
	
						case 15:
							_iteratorNormalCompletion15 = true;
							context$2$0.next = 10;
							break;
	
						case 18:
							context$2$0.next = 24;
							break;
	
						case 20:
							context$2$0.prev = 20;
							context$2$0.t1 = context$2$0["catch"](8);
							_didIteratorError15 = true;
							_iteratorError15 = context$2$0.t1;
	
						case 24:
							context$2$0.prev = 24;
							context$2$0.prev = 25;
	
							if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
								_iterator15["return"]();
							}
	
						case 27:
							context$2$0.prev = 27;
	
							if (!_didIteratorError15) {
								context$2$0.next = 30;
								break;
							}
	
							throw _iteratorError15;
	
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
	
			//////////////////////////////
			////////// Clearing //////////
			//////////////////////////////
	
			/**
	   * Remove all edges from the graph, but leave the vertices intact.
	   */
		}, {
			key: "clearEdges",
			value: function clearEdges() {
				var _iteratorNormalCompletion16 = true;
				var _didIteratorError16 = false;
				var _iteratorError16 = undefined;
	
				try {
					for (var _iterator16 = this.edges()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
						var _step16$value = _slicedToArray(_step16.value, 2);
	
						var from = _step16$value[0];
						var to = _step16$value[1];
						this.removeEdge(from, to);
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
			}
	
			/**
	   * Remove all edges and vertices from the graph, putting it back in its initial state.
	   */
		}, {
			key: "clear",
			value: function clear() {
				var _iteratorNormalCompletion17 = true;
				var _didIteratorError17 = false;
				var _iteratorError17 = undefined;
	
				try {
					for (var _iterator17 = this.vertices()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
						var _step17$value = _slicedToArray(_step17.value, 1);
	
						var v = _step17$value[0];
						this.destroyVertex(v);
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
			}
	
			////////////////////////////////////////
			////////// (Advanced) Queries //////////
			////////////////////////////////////////
	
			/**
	   * Ask whether `this` graph and a given `other` graph are equal.
	   * Two graphs are equal if they have the same vertices and the same edges.
	   * @param other {Graph} the other graph to compare to `this` one
	   * @param [eqV] {function(*, *, string): boolean}
	   *     a custom equality function for values stored in vertices;
	   *     defaults to `===` comparison; The first two arguments are the
	   *     values to compare. The third is the corresponding `key`.
	   * @param [eqE] {function(*, *, string, string): boolean}
	   *     a custom equality function for values stored in edges;
	   *     defaults to the function given for `trV`; The first two arguments
	   *     are the values to compare. The third and fourth are the `from`
	   *     and `to` keys respectively.
	   * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
	   */
		}, {
			key: "equals",
			value: function equals(other) {
				var eqV = arguments.length <= 1 || arguments[1] === undefined ? function (x, y) {
					return x === y;
				} : arguments[1];
				var eqE = arguments.length <= 2 || arguments[2] === undefined ? eqV : arguments[2];
				return (function () {
					if (!(other instanceof Graph)) {
						return false;
					}
					if (this.vertexCount() !== other.vertexCount()) {
						return false;
					}
					if (this.edgeCount() !== other.edgeCount()) {
						return false;
					}
					var _iteratorNormalCompletion18 = true;
					var _didIteratorError18 = false;
					var _iteratorError18 = undefined;
	
					try {
						for (var _iterator18 = this.vertices()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
							var _step18$value = _slicedToArray(_step18.value, 2);
	
							var key = _step18$value[0];
							var value = _step18$value[1];
	
							if (!other.hasVertex(key)) {
								return false;
							}
							if (!eqV(value, other.vertexValue(key), key)) {
								return false;
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
	
					var _iteratorNormalCompletion19 = true;
					var _didIteratorError19 = false;
					var _iteratorError19 = undefined;
	
					try {
						for (var _iterator19 = this.edges()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
							var _step19$value = _slicedToArray(_step19.value, 3);
	
							var from = _step19$value[0];
							var to = _step19$value[1];
							var value = _step19$value[2];
	
							if (!other.hasEdge(from, to)) {
								return false;
							}
							if (!eqE(value, other.edgeValue(from, to), from, to)) {
								return false;
							}
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
	
					return true;
				}).apply(this, arguments);
			}
	
			/**
	   * Iterate over all simple directed cycles in this graph, in no particular order.
	   * If you mutate the graph in between iterations, behavior of the iterator
	   * becomes unspecified. (So, don't.)
	   * @returns { Iterator.< Array.<string> > }
	   *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
	   *          Each iterated value is an array containing the vertex keys describing the cycle.
	   *          These arrays will contain each vertex key only once — even the first/last one.
	   * @example
	   * for (var it = graph.cycles(), kv; !(kv = it.next()).done;) {
	   *     var cycle = kv.value;
	   *     // iterates over all cycles of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let cycle of graph.cycles()) {
	   *     // iterates over all cycles of the graph
	   * }
	   */
		}, {
			key: "cycles",
			value: regeneratorRuntime.mark(function cycles() {
				var marked2$0, pointStack, markedStack, mark, _this, backtrack, _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, _step20$value, a;
	
				return regeneratorRuntime.wrap(function cycles$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							backtrack = function backtrack(v) {
								var out = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
								var _arr, _i, _arr$_i, w, o, u;
	
								return regeneratorRuntime.wrap(function backtrack$(context$3$0) {
									while (1) switch (context$3$0.prev = context$3$0.next) {
										case 0:
											pointStack.push(v);
											mark.add(v);
											markedStack.push(v);
											_arr = [].concat(_toConsumableArray(_this.verticesFrom(v)));
											_i = 0;
	
										case 5:
											if (!(_i < _arr.length)) {
												context$3$0.next = 23;
												break;
											}
	
											_arr$_i = _slicedToArray(_arr[_i], 1);
											w = _arr$_i[0];
	
											if (!(w < pointStack[0])) {
												context$3$0.next = 10;
												break;
											}
	
											return context$3$0.abrupt("continue", 20);
	
										case 10:
											if (!(w === pointStack[0])) {
												context$3$0.next = 16;
												break;
											}
	
											context$3$0.next = 13;
											return [].concat(pointStack);
	
										case 13:
											out.found = true;
											context$3$0.next = 20;
											break;
	
										case 16:
											if (mark.has(w)) {
												context$3$0.next = 20;
												break;
											}
	
											o = {};
											return context$3$0.delegateYield(backtrack(w, o), "t0", 19);
	
										case 19:
											out.found = out.found || o.found;
	
										case 20:
											_i++;
											context$3$0.next = 5;
											break;
	
										case 23:
											if (out.found) {
												u = undefined;
	
												do {
													u = markedStack.pop();
													mark["delete"](u);
												} while (u !== v);
											}
											pointStack.pop();
	
										case 25:
										case "end":
											return context$3$0.stop();
									}
								}, marked2$0[0], this);
							};
	
							marked2$0 = [backtrack].map(regeneratorRuntime.mark);
							pointStack = [];
							markedStack = undefined, mark = undefined;
							_this = this;
							_iteratorNormalCompletion20 = true;
							_didIteratorError20 = false;
							_iteratorError20 = undefined;
							context$2$0.prev = 8;
							_iterator20 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done) {
								context$2$0.next = 19;
								break;
							}
	
							_step20$value = _slicedToArray(_step20.value, 1);
							a = _step20$value[0];
	
							markedStack = [];
							mark = new Set();
							return context$2$0.delegateYield(backtrack(a), "t0", 16);
	
						case 16:
							_iteratorNormalCompletion20 = true;
							context$2$0.next = 10;
							break;
	
						case 19:
							context$2$0.next = 25;
							break;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.t1 = context$2$0["catch"](8);
							_didIteratorError20 = true;
							_iteratorError20 = context$2$0.t1;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.prev = 26;
	
							if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
								_iterator20["return"]();
							}
	
						case 28:
							context$2$0.prev = 28;
	
							if (!_didIteratorError20) {
								context$2$0.next = 31;
								break;
							}
	
							throw _iteratorError20;
	
						case 31:
							return context$2$0.finish(28);
	
						case 32:
							return context$2$0.finish(25);
	
						case 33:
						case "end":
							return context$2$0.stop();
					}
				}, cycles, this, [[8, 21, 25, 33], [26,, 28, 32]]);
			})
	
			/**
	   * Find any directed cycle in this graph.
	   * @returns {?Array} an array containing the vertex keys describing the cycle; `null`, if there is no cycle;
	   *                   The array will contain each vertex key only once — even the first/last one.
	   */
		}, {
			key: "cycle",
			value: function cycle() {
				var result = this.cycles().next();
				return result.done ? null : result.value;
			}
	
			/**
	   * Test whether this graph contains a directed cycle.
	   * @returns {boolean} whether this graph contains any directed cycle
	   */
		}, {
			key: "hasCycle",
			value: function hasCycle() {
				return !this.cycles().next().done;
			}
	
			/**
	   * Iterate over all paths between two given keys in this graph, in no particular order.
	   * If you mutate the graph in between iterations, behavior of the iterator
	   * becomes unspecified. (So, don't.)
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @returns { Iterator.< Array.<string> > }
	   *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
	   *          Each iterated value is an array containing the vertex-keys describing the path.
	   * @example
	   * for (var it = graph.paths(), kv; !(kv = it.next()).done;) {
	   *     var path = kv.value;
	   *     // iterates over all paths between `from` and `to` in the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let path of graph.paths()) {
	   *     // iterates over all paths between `from` and `to` in the graph
	   * }
	   */
		}, {
			key: "paths",
			value: function paths(from, to) {
				this[_expectVertices](from, to);
				return this[_paths](from, to);
			}
		}, {
			key: _paths,
			value: regeneratorRuntime.mark(function value(from, to) {
				var marked2$0, stack, _this, pathsFromPrefix;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							pathsFromPrefix = function pathsFromPrefix(current) {
								var _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, _step21$value, next;
	
								return regeneratorRuntime.wrap(function pathsFromPrefix$(context$3$0) {
									while (1) switch (context$3$0.prev = context$3$0.next) {
										case 0:
											stack.push(current);
											_iteratorNormalCompletion21 = true;
											_didIteratorError21 = false;
											_iteratorError21 = undefined;
											context$3$0.prev = 4;
											_iterator21 = _this.verticesFrom(current)[Symbol.iterator]();
	
										case 6:
											if (_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done) {
												context$3$0.next = 19;
												break;
											}
	
											_step21$value = _slicedToArray(_step21.value, 1);
											next = _step21$value[0];
	
											if (!(next === to)) {
												context$3$0.next = 14;
												break;
											}
	
											context$3$0.next = 12;
											return [].concat(stack, [to]);
	
										case 12:
											context$3$0.next = 16;
											break;
	
										case 14:
											if (!(stack.indexOf(next) === -1)) {
												context$3$0.next = 16;
												break;
											}
	
											return context$3$0.delegateYield(pathsFromPrefix(next), "t0", 16);
	
										case 16:
											_iteratorNormalCompletion21 = true;
											context$3$0.next = 6;
											break;
	
										case 19:
											context$3$0.next = 25;
											break;
	
										case 21:
											context$3$0.prev = 21;
											context$3$0.t1 = context$3$0["catch"](4);
											_didIteratorError21 = true;
											_iteratorError21 = context$3$0.t1;
	
										case 25:
											context$3$0.prev = 25;
											context$3$0.prev = 26;
	
											if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
												_iterator21["return"]();
											}
	
										case 28:
											context$3$0.prev = 28;
	
											if (!_didIteratorError21) {
												context$3$0.next = 31;
												break;
											}
	
											throw _iteratorError21;
	
										case 31:
											return context$3$0.finish(28);
	
										case 32:
											return context$3$0.finish(25);
	
										case 33:
											stack.pop();
	
										case 34:
										case "end":
											return context$3$0.stop();
									}
								}, marked2$0[0], this, [[4, 21, 25, 33], [26,, 28, 32]]);
							};
	
							marked2$0 = [pathsFromPrefix].map(regeneratorRuntime.mark);
							stack = [];
							_this = this;
							return context$2$0.delegateYield(pathsFromPrefix(from), "t0", 5);
	
						case 5:
						case "end":
							return context$2$0.stop();
					}
				}, value, this);
			})
	
			/**
	   * Find any path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @returns {?Array} an array with the keys of the path found between the two vertices,
	   *                   including those two vertices themselves; `null` if no such path exists
	   */
		}, {
			key: "path",
			value: function path(from, to) {
				var result = this.paths(from, to).next();
				return result.done ? null : result.value;
			}
	
			/**
	   * Test whether there is a directed path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @returns {boolean} whether such a path exists
	   */
		}, {
			key: "hasPath",
			value: function hasPath(from, to) {
				return !this.paths(from, to).next().done;
			}
	
			/**
	   * Get the number of edges going out of a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges going out of the `key` vertex
	   */
		}, {
			key: "outDegree",
			value: function outDegree(key) {
				this[_expectVertices](key);
				return this[_edges].get(key).size;
			}
	
			/**
	   * Get the number of edges coming into a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges coming into the `key` vertex
	   */
		}, {
			key: "inDegree",
			value: function inDegree(key) {
				this[_expectVertices](key);
				return this[_reverseEdges].get(key).size;
			}
	
			/**
	   * Get the number of edges connected to a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges connected to the `key` vertex
	   */
		}, {
			key: "degree",
			value: function degree(key) {
				return this.outDegree(key) + this.inDegree(key);
			}
	
			///////////////////////////////////////
			////////// Cloning and stuff //////////
			///////////////////////////////////////
	
			/**
	   * Merge another graph into this graph.
	   * @param other {Graph} the other graph to merge into this one
	   * @param [mV] {function(*, *, string): *}
	   *     a custom merge function for values stored in vertices;
	   *     defaults to whichever of the two values is not `undefined`,
	   *     giving preference to that of the other graph; The first and
	   *     second arguments are the vertex values of `this` graph and the
	   *     `other` graph respectively. The third is the corresponding `key`.
	   * @param [mE] {function(*, *, string, string): *}
	   *     a custom merge function for values stored in edges;
	   *     defaults to whichever of the two values is not `undefined`,
	   *     giving preference to that of the other graph; The first and
	   *     second arguments are the edge values of `this` graph and the
	   *     `other` graph respectively. The third and fourth are the
	   *     corresponding `from` and `to` keys.
	   */
		}, {
			key: "mergeIn",
			value: function mergeIn(other, mV, mE) {
				if (!mV) {
					mV = function (v1, v2) {
						return typeof v2 === 'undefined' ? v1 : v2;
					};
				}
				if (!mE) {
					mE = mV;
				}
				var _iteratorNormalCompletion22 = true;
				var _didIteratorError22 = false;
				var _iteratorError22 = undefined;
	
				try {
					for (var _iterator22 = other.vertices()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
						var _step22$value = _slicedToArray(_step22.value, 1);
	
						var key = _step22$value[0];
	
						this.addVertex(key, mV(this.vertexValue(key), other.vertexValue(key), key));
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
	
				var _iteratorNormalCompletion23 = true;
				var _didIteratorError23 = false;
				var _iteratorError23 = undefined;
	
				try {
					for (var _iterator23 = other.edges()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
						var _step23$value = _slicedToArray(_step23.value, 2);
	
						var from = _step23$value[0];
						var to = _step23$value[1];
	
						this.addEdge(from, to, mE(this.edgeValue(from, to), other.edgeValue(from, to), from, to));
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
	
			/**
	   * Create a clone of this graph.
	   * @param [trV] {function(*, string): *}
	   *     a custom transformation function for values stored in vertices;
	   *     defaults to the identity function; The first argument is the
	   *     value to clone. The second is the corresponding `key`.
	   * @param [trE] {function(*, string, string): *}
	   *     a custom transformation function for values stored in edges;
	   *     defaults to the function given for `trV`; The first argument
	   *     is the value to clone. The second and third are the `from`
	   *     and `to` keys respectively.
	   * @returns {Graph} a clone of this graph
	   */
		}, {
			key: "clone",
			value: function clone() {
				var trV = arguments.length <= 0 || arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
				var trE = arguments.length <= 1 || arguments[1] === undefined ? trV : arguments[1];
				return (function () {
					var result = new Graph();
					result.mergeIn(this, function (v1, v2, key) {
						return trV(v2, key);
					}, function (v1, v2, from, to) {
						return trE(v2, from, to);
					});
					return result;
				}).apply(this, arguments);
			}
	
			/**
	   * Create a clone of this graph, but without any transitive edges.
	   * @param [trV] {function(*, string): *}
	   *     a custom transformation function for values stored in vertices;
	   *     defaults to the identity function; The first argument is the
	   *     value to clone. The second is the corresponding `key`.
	   * @param [trE] {function(*, string, string): *}
	   *     a custom transformation function for values stored in edges;
	   *     defaults to the function given for `trV`; The first argument
	   *     is the value to clone. The second and third are the `from`
	   *     and `to` keys respectively.
	   * @returns {Graph} a clone of this graph with all transitive edges removed
	   */
		}, {
			key: "transitiveReduction",
			value: function transitiveReduction(trV, trE) {
				// argument defaults are handled in `clone`
				var result = this.clone(trV, trE);
				var _iteratorNormalCompletion24 = true;
				var _didIteratorError24 = false;
				var _iteratorError24 = undefined;
	
				try {
					for (var _iterator24 = this.vertices()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
						var _step24$value = _slicedToArray(_step24.value, 1);
	
						var x = _step24$value[0];
						var _iteratorNormalCompletion25 = true;
						var _didIteratorError25 = false;
						var _iteratorError25 = undefined;
	
						try {
							for (var _iterator25 = this.vertices()[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
								var _step25$value = _slicedToArray(_step25.value, 1);
	
								var y = _step25$value[0];
	
								if (result.hasEdge(x, y)) {
									var _iteratorNormalCompletion26 = true;
									var _didIteratorError26 = false;
									var _iteratorError26 = undefined;
	
									try {
										for (var _iterator26 = this.vertices()[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
											var _step26$value = _slicedToArray(_step26.value, 1);
	
											var z = _step26$value[0];
	
											if (result.hasPath(y, z)) result.removeEdge(x, z);
										}
									} catch (err) {
										_didIteratorError26 = true;
										_iteratorError26 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion26 && _iterator26["return"]) {
												_iterator26["return"]();
											}
										} finally {
											if (_didIteratorError26) {
												throw _iteratorError26;
											}
										}
									}
								}
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
	
				return result;
			}
	
			/**
	   * This method replaces stretches of non-branching directed pathway into single edges.
	   * More specifically, it identifies all 'nexus' vertices in the graph and preserves them.
	   * It then removes all other vertices and all edges from the graph, then inserts edges
	   * between nexuses that summarize the connectivity that was there before.
	   *
	   * A nexus is any vertex that is *not* characterized by '1 edge in, 1 edge out'.
	   * A custom `isNexus` function may be provided to manually select additional vertices
	   * that should be preserved as nexus.
	   * @param [isNexus] {function(string, *): boolean}
	   *                  a predicate for identifying additional vertices that should be treated as nexus;
	   *                  It receives a `key` and `value` associated to a vertex and should return
	   *                  true if and only if that vertex should be a nexus.
	   * @throws {Graph.BranchlessCycleError} if the graph contains a cycle with no branches or nexuses
	   */
		}, {
			key: "contractPaths",
			value: function contractPaths() {
				var _this2 = this;
	
				var isNexus = arguments.length <= 0 || arguments[0] === undefined ? function () {
					return false;
				} : arguments[0];
	
				/* what makes a a vertex a nexus (start/end-point) */
				var nexuses = new Set([].concat(_toConsumableArray(this.vertices())).filter(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 2);
	
					var key = _ref2[0];
					var val = _ref2[1];
					return _this2.outDegree(key) !== 1 || _this2.inDegree(key) !== 1 || isNexus(key, val);
				}).map(function (_ref3) {
					var _ref32 = _slicedToArray(_ref3, 1);
	
					var key = _ref32[0];
					return key;
				}));
	
				/* error if there is a branch-less cycle */
				{
					var _iteratorNormalCompletion29;
	
					var _didIteratorError29;
	
					var _iteratorError29;
	
					var _iterator29, _step29;
	
					(function () {
						var unhandledVertices = new Set([].concat(_toConsumableArray(_this2.vertices())).map(function (_ref4) {
							var _ref42 = _slicedToArray(_ref4, 1);
	
							var key = _ref42[0];
							return key;
						}));
						var checkForBlCycle = function checkForBlCycle(key) {
							if (!unhandledVertices.has(key)) {
								return;
							}
							unhandledVertices["delete"](key);
							var _iteratorNormalCompletion27 = true;
							var _didIteratorError27 = false;
							var _iteratorError27 = undefined;
	
							try {
								for (var _iterator27 = _this2.verticesFrom(key)[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
									var _step27$value = _slicedToArray(_step27.value, 1);
	
									var next = _step27$value[0];
									checkForBlCycle(next);
								}
							} catch (err) {
								_didIteratorError27 = true;
								_iteratorError27 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion27 && _iterator27["return"]) {
										_iterator27["return"]();
									}
								} finally {
									if (_didIteratorError27) {
										throw _iteratorError27;
									}
								}
							}
	
							var _iteratorNormalCompletion28 = true;
							var _didIteratorError28 = false;
							var _iteratorError28 = undefined;
	
							try {
								for (var _iterator28 = _this2.verticesTo(key)[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
									var _step28$value = _slicedToArray(_step28.value, 1);
	
									var next = _step28$value[0];
									checkForBlCycle(next);
								}
							} catch (err) {
								_didIteratorError28 = true;
								_iteratorError28 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion28 && _iterator28["return"]) {
										_iterator28["return"]();
									}
								} finally {
									if (_didIteratorError28) {
										throw _iteratorError28;
									}
								}
							}
						};
						_iteratorNormalCompletion29 = true;
						_didIteratorError29 = false;
						_iteratorError29 = undefined;
	
						try {
							for (_iterator29 = nexuses[Symbol.iterator](); !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
								var key = _step29.value;
								checkForBlCycle(key);
							}
						} catch (err) {
							_didIteratorError29 = true;
							_iteratorError29 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion29 && _iterator29["return"]) {
									_iterator29["return"]();
								}
							} finally {
								if (_didIteratorError29) {
									throw _iteratorError29;
								}
							}
						}
	
						if (unhandledVertices.size > 0) {
							var startingKey = unhandledVertices.values().next().value,
							    cycle = [],
							    current = startingKey;
							do {
								cycle.push(current);
								current = _this2.verticesFrom(current).next().value[0];
							} while (current !== startingKey);
							throw new Graph.BranchlessCycleError(cycle);
						}
					})();
				}
	
				/* bookkeeping */
				var contractionsToAdd = new Map();
	
				/* register the path starting with the given edge */
				var startPath = function startPath(start, next, backwards) {
					/* functions to help branch on `backwards` */
					var fromTo = function fromTo() {
						var strt = arguments.length <= 0 || arguments[0] === undefined ? start : arguments[0];
						var nxt = arguments.length <= 1 || arguments[1] === undefined ? next : arguments[1];
						return backwards ? [nxt, strt] : [strt, nxt];
					};
					var verticesNext = function verticesNext(v) {
						return backwards ? _this2.verticesTo(v) : _this2.verticesFrom(v);
					};
	
					/* bookkeeping */
					var verticesToRemove = new Set();
					var edgesToRemove = new Set();
					var path = new Graph();
	
					/* process the start of the path */
					path.addVertex(start, _this2.vertexValue(start));
					path.addVertex(next, _this2.vertexValue(next));
					path.addNewEdge.apply(path, _toConsumableArray(fromTo()).concat([_this2.edgeValue.apply(_this2, _toConsumableArray(fromTo()))]));
					edgesToRemove.add(fromTo());
	
					/* process as [current, next] moves across the path */
					var current = undefined;
					while (!nexuses.has(next)) {
						var _ref5 = [next, verticesNext(next).next().value[0]];
						current = _ref5[0];
						next = _ref5[1];
	
						path.addVertex(next, _this2.vertexValue(next));
						path.addNewEdge.apply(path, _toConsumableArray(fromTo(current, next)).concat([_this2.edgeValue.apply(_this2, _toConsumableArray(fromTo(current, next)))]));
						verticesToRemove.add(current);
						edgesToRemove.add(fromTo(current, next));
					}
	
					/* register new path contraction */
					if (!contractionsToAdd.get(fromTo()[0])) {
						contractionsToAdd.set(fromTo()[0], new Map());
					}
					if (!contractionsToAdd.get(fromTo()[0]).get(fromTo()[1])) {
						contractionsToAdd.get(fromTo()[0]).set(fromTo()[1], new Graph());
					}
					contractionsToAdd.get(fromTo()[0]).get(fromTo()[1]).mergeIn(path);
	
					/* remove old edges and vertices */
					var _iteratorNormalCompletion30 = true;
					var _didIteratorError30 = false;
					var _iteratorError30 = undefined;
	
					try {
						for (var _iterator30 = edgesToRemove[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
							var key = _step30.value;
							_this2.removeExistingEdge.apply(_this2, _toConsumableArray(key));
						}
					} catch (err) {
						_didIteratorError30 = true;
						_iteratorError30 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion30 && _iterator30["return"]) {
								_iterator30["return"]();
							}
						} finally {
							if (_didIteratorError30) {
								throw _iteratorError30;
							}
						}
					}
	
					var _iteratorNormalCompletion31 = true;
					var _didIteratorError31 = false;
					var _iteratorError31 = undefined;
	
					try {
						for (var _iterator31 = verticesToRemove[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
							var key = _step31.value;
							_this2.destroyExistingVertex(key);
						}
					} catch (err) {
						_didIteratorError31 = true;
						_iteratorError31 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion31 && _iterator31["return"]) {
								_iterator31["return"]();
							}
						} finally {
							if (_didIteratorError31) {
								throw _iteratorError31;
							}
						}
					}
				};
	
				/* process paths starting at all nexus points */
				var _iteratorNormalCompletion32 = true;
				var _didIteratorError32 = false;
				var _iteratorError32 = undefined;
	
				try {
					for (var _iterator32 = nexuses[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
						var first = _step32.value;
						var _iteratorNormalCompletion34 = true;
						var _didIteratorError34 = false;
						var _iteratorError34 = undefined;
	
						try {
							for (var _iterator34 = this.verticesFrom(first)[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
								var _step34$value = _slicedToArray(_step34.value, 1);
	
								var next = _step34$value[0];
								startPath(first, next, false);
							}
						} catch (err) {
							_didIteratorError34 = true;
							_iteratorError34 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion34 && _iterator34["return"]) {
									_iterator34["return"]();
								}
							} finally {
								if (_didIteratorError34) {
									throw _iteratorError34;
								}
							}
						}
	
						var _iteratorNormalCompletion35 = true;
						var _didIteratorError35 = false;
						var _iteratorError35 = undefined;
	
						try {
							for (var _iterator35 = this.verticesTo(first)[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
								var _step35$value = _slicedToArray(_step35.value, 1);
	
								var next = _step35$value[0];
								startPath(first, next, true);
							}
						} catch (err) {
							_didIteratorError35 = true;
							_iteratorError35 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion35 && _iterator35["return"]) {
									_iterator35["return"]();
								}
							} finally {
								if (_didIteratorError35) {
									throw _iteratorError35;
								}
							}
						}
					}
	
					/* add the replacement edges */
				} catch (err) {
					_didIteratorError32 = true;
					_iteratorError32 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion32 && _iterator32["return"]) {
							_iterator32["return"]();
						}
					} finally {
						if (_didIteratorError32) {
							throw _iteratorError32;
						}
					}
				}
	
				var _iteratorNormalCompletion33 = true;
				var _didIteratorError33 = false;
				var _iteratorError33 = undefined;
	
				try {
					for (var _iterator33 = contractionsToAdd[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
						var _step33$value = _slicedToArray(_step33.value, 2);
	
						var from = _step33$value[0];
						var toVal = _step33$value[1];
						var _iteratorNormalCompletion36 = true;
						var _didIteratorError36 = false;
						var _iteratorError36 = undefined;
	
						try {
							for (var _iterator36 = toVal[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
								var _step36$value = _slicedToArray(_step36.value, 2);
	
								var to = _step36$value[0];
								var rememberedPath = _step36$value[1];
	
								this.addNewEdge(from, to, rememberedPath);
							}
						} catch (err) {
							_didIteratorError36 = true;
							_iteratorError36 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion36 && _iterator36["return"]) {
									_iterator36["return"]();
								}
							} finally {
								if (_didIteratorError36) {
									throw _iteratorError36;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError33 = true;
					_iteratorError33 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion33 && _iterator33["return"]) {
							_iterator33["return"]();
						}
					} finally {
						if (_didIteratorError33) {
							throw _iteratorError33;
						}
					}
				}
			}
	
			///////////////////////////////////
			////////// Serialization //////////
			///////////////////////////////////
	
			/**
	   * Serialize this graph into a JSON string.
	   * The resulting string can be deserialized with `Graph.fromJSON`
	   * @returns {string} a JSON string representation of the current state of this graph
	   * @see {@link Graph.fromJSON}
	   * @example
	   * let json   = graph1.toJSON();
	   * let graph2 = Graph.fromJSON(json);
	   * console.log(graph1.equals(graph2)); // true
	   */
		}, {
			key: "toJSON",
			value: function toJSON() {
				var result = [];
				var _iteratorNormalCompletion37 = true;
				var _didIteratorError37 = false;
				var _iteratorError37 = undefined;
	
				try {
					for (var _iterator37 = this.vertices()[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
						var _step37$value = _slicedToArray(_step37.value, 2);
	
						var key = _step37$value[0];
						var val = _step37$value[1];
	
						if (typeof val === 'undefined') {
							result.push([key]);
						} else {
							result.push([key, val]);
						}
					}
				} catch (err) {
					_didIteratorError37 = true;
					_iteratorError37 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion37 && _iterator37["return"]) {
							_iterator37["return"]();
						}
					} finally {
						if (_didIteratorError37) {
							throw _iteratorError37;
						}
					}
				}
	
				var _iteratorNormalCompletion38 = true;
				var _didIteratorError38 = false;
				var _iteratorError38 = undefined;
	
				try {
					for (var _iterator38 = this.edges()[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
						var _step38$value = _slicedToArray(_step38.value, 3);
	
						var from = _step38$value[0];
						var to = _step38$value[1];
						var val = _step38$value[2];
	
						if (typeof val === 'undefined') {
							result.push([[from, to]]);
						} else {
							result.push([[from, to], val]);
						}
					}
				} catch (err) {
					_didIteratorError38 = true;
					_iteratorError38 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion38 && _iterator38["return"]) {
							_iterator38["return"]();
						}
					} finally {
						if (_didIteratorError38) {
							throw _iteratorError38;
						}
					}
				}
	
				return JSON.stringify(result);
			}
	
			/**
	   * Deserialize a string returned from `.toJSON()`
	   * into a new `Graph` instance equal to the original.
	   * @param json {string} a string originally returned from `.toJSON()`
	   * @returns {Graph} a graph equal to the original
	   * @see {@link Graph#toJSON}
	   * @example
	   * let json   = graph1.toJSON();
	   * let graph2 = Graph.fromJSON(json);
	   * console.log(graph1.equals(graph2)); // true
	   */
		}, {
			key: _expectVertices,
	
			////////////////////////////////
			////////// Assertions //////////
			////////////////////////////////
	
			value: function value() {
				var _this3 = this;
	
				for (var _len2 = arguments.length, keys = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
					keys[_key3] = arguments[_key3];
				}
	
				var missingVertices = keys.filter(function (k) {
					return !_this3.hasVertex(k);
				});
				if (missingVertices.length) {
					throw new (_bind.apply(Graph.VertexNotExistsError, [null].concat(_toConsumableArray(missingVertices))))();
				}
			}
		}, {
			key: _expectVerticesAbsent,
			value: function value() {
				var _this4 = this;
	
				for (var _len3 = arguments.length, keys = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
					keys[_key4] = arguments[_key4];
				}
	
				var presentVertices = keys.filter(function (k) {
					return _this4.hasVertex(k);
				});
				if (presentVertices.length) {
					throw new (_bind.apply(Graph.VertexExistsError, [null].concat(_toConsumableArray(presentVertices.map(function (k) {
						return [k, _this4.vertexValue(k)];
					})))))();
				}
			}
		}, {
			key: _expectEdges,
			value: function value() {
				var _this5 = this;
	
				for (var _len4 = arguments.length, keys = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
					keys[_key5] = arguments[_key5];
				}
	
				var absentEdges = keys.filter(function (k) {
					return !_this5.hasEdge.apply(_this5, _toConsumableArray(k));
				});
				if (absentEdges.length) {
					throw new (_bind.apply(Graph.EdgeNotExistsError, [null].concat(_toConsumableArray(absentEdges))))();
				}
			}
		}, {
			key: _expectEdgesAbsent,
			value: function value() {
				var _this6 = this;
	
				for (var _len5 = arguments.length, keys = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
					keys[_key6] = arguments[_key6];
				}
	
				var presentEdges = keys.filter(function (k) {
					return _this6.hasEdge.apply(_this6, _toConsumableArray(k));
				});
				if (presentEdges.length) {
					throw new (_bind.apply(Graph.EdgeExistsError, [null].concat(_toConsumableArray(presentEdges.map(function (k) {
						return [k, _this6.edgeValue.apply(_this6, _toConsumableArray(k))];
					})))))();
				}
			}
		}, {
			key: _expectNoConnectedEdges,
			value: function value(key) {
				var edges = [];
				var _iteratorNormalCompletion39 = true;
				var _didIteratorError39 = false;
				var _iteratorError39 = undefined;
	
				try {
					for (var _iterator39 = this.verticesFrom(key)[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
						var _step39$value = _slicedToArray(_step39.value, 1);
	
						var to = _step39$value[0];
						edges.push([[key, to], this.edgeValue(key, to)]);
					}
				} catch (err) {
					_didIteratorError39 = true;
					_iteratorError39 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion39 && _iterator39["return"]) {
							_iterator39["return"]();
						}
					} finally {
						if (_didIteratorError39) {
							throw _iteratorError39;
						}
					}
				}
	
				var _iteratorNormalCompletion40 = true;
				var _didIteratorError40 = false;
				var _iteratorError40 = undefined;
	
				try {
					for (var _iterator40 = this.verticesTo(key)[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
						var _step40$value = _slicedToArray(_step40.value, 1);
	
						var from = _step40$value[0];
						edges.push([[from, key], this.edgeValue(from, key)]);
					}
				} catch (err) {
					_didIteratorError40 = true;
					_iteratorError40 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion40 && _iterator40["return"]) {
							_iterator40["return"]();
						}
					} finally {
						if (_didIteratorError40) {
							throw _iteratorError40;
						}
					}
				}
	
				if (edges.length) {
					throw new (_bind.apply(Graph.HasConnectedEdgesError, [null].concat([key], edges)))();
				}
			}
		}], [{
			key: "fromJSON",
			value: function fromJSON(json) {
				return new (_bind.apply(this, [null].concat(_toConsumableArray(JSON.parse(json)))))();
			}
		}]);
	
		return Graph;
	})();
	
	exports["default"] = Graph;
	Graph.VertexExistsError = (function (_Error) {
		_inherits(VertexExistsError, _Error);
	
		function VertexExistsError() {
			_classCallCheck(this, VertexExistsError);
	
			_get(Object.getPrototypeOf(VertexExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant vertices as `[key, value]` shaped arrays
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexExistsError
	   * @instance
	   * @type {Set.<Array>}
	   */
	
			for (var _len6 = arguments.length, vertices = Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
				vertices[_key7] = arguments[_key7];
			}
	
			this.vertices = new Set(vertices);
			this.message = "This graph has " + (this.vertices.size === 1 ? "a vertex" : "vertices") + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (_ref6) {
				var _ref62 = _slicedToArray(_ref6, 1);
	
				var key = _ref62[0];
				return key;
			}).join("', '") + "'";
		}
	
		return VertexExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.VertexNotExistsError = (function (_Error2) {
		_inherits(VertexNotExistsError, _Error2);
	
		function VertexNotExistsError() {
			_classCallCheck(this, VertexNotExistsError);
	
			_get(Object.getPrototypeOf(VertexNotExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant vertex keys
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexNotExistsError
	   * @instance
	   * @type {Set.<string>}
	   */
	
			for (var _len7 = arguments.length, keys = Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
				keys[_key8] = arguments[_key8];
			}
	
			this.vertices = new Set(keys);
			this.message = "This graph does not have " + (this.vertices.size === 1 ? "a vertex" : "vertices") + " '" + [].concat(_toConsumableArray(this.vertices)).join("', '") + "'";
		}
	
		return VertexNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.EdgeExistsError = (function (_Error3) {
		_inherits(EdgeExistsError, _Error3);
	
		function EdgeExistsError() {
			_classCallCheck(this, EdgeExistsError);
	
			_get(Object.getPrototypeOf(EdgeExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant edges as `[[from, to], value]` shaped arrays
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeExistsError
	   * @instance
	   * @type {Set.<Array>}
	   */
	
			for (var _len8 = arguments.length, edges = Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
				edges[_key9] = arguments[_key9];
			}
	
			this.edges = new Set(edges);
			this.message = "This graph has " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref7) {
				var _ref72 = _slicedToArray(_ref7, 1);
	
				var _ref72$0 = _slicedToArray(_ref72[0], 2);
	
				var from = _ref72$0[0];
				var to = _ref72$0[1];
				return "['" + from + "', '" + to + "']";
			}).join(", ");
		}
	
		return EdgeExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.EdgeNotExistsError = (function (_Error4) {
		_inherits(EdgeNotExistsError, _Error4);
	
		function EdgeNotExistsError() {
			_classCallCheck(this, EdgeNotExistsError);
	
			_get(Object.getPrototypeOf(EdgeNotExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant edge keys as `[from, to]` shaped arrays
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeNotExistsError
	   * @instance
	   * @type {Set.<Array.<string>>}
	   */
	
			for (var _len9 = arguments.length, edges = Array(_len9), _key10 = 0; _key10 < _len9; _key10++) {
				edges[_key10] = arguments[_key10];
			}
	
			this.edges = new Set(edges);
			this.message = "This graph does not have " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref8) {
				var _ref82 = _slicedToArray(_ref8, 2);
	
				var from = _ref82[0];
				var to = _ref82[1];
				return "['" + from + "', '" + to + "']";
			}).join(", ");
		}
	
		return EdgeNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a vertex is expected not to have any connected edges, but does.
	 * @extends Graph.EdgeExistsError
	 */
	Graph.HasConnectedEdgesError = (function (_Graph$EdgeExistsError) {
		_inherits(HasConnectedEdgesError, _Graph$EdgeExistsError);
	
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			for (var _len10 = arguments.length, edges = Array(_len10 > 1 ? _len10 - 1 : 0), _key11 = 1; _key11 < _len10; _key11++) {
				edges[_key11 - 1] = arguments[_key11];
			}
	
			_get(Object.getPrototypeOf(HasConnectedEdgesError.prototype), "constructor", this).apply(this, edges);
			/**
	   * the key of the vertex that has connected edges
	   * @public
	   * @constant vertex
	   * @memberof Graph.HasConnectedEdgesError
	   * @instance
	   * @type {string}
	   */
			this.vertex = key;
			this.message = "The '" + key + "' vertex has connected " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref9) {
				var _ref92 = _slicedToArray(_ref9, 1);
	
				var _ref92$0 = _slicedToArray(_ref92[0], 2);
	
				var from = _ref92$0[0];
				var to = _ref92$0[1];
				return "['" + from + "', '" + to + "']";
			}).join(", ");
		}
	
		return HasConnectedEdgesError;
	})(Graph.EdgeExistsError);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
	 * @extends Error
	 */
	Graph.CycleError = (function (_Error5) {
		_inherits(CycleError, _Error5);
	
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			_get(Object.getPrototypeOf(CycleError.prototype), "constructor", this).call(this);
			/**
	   * the vertices involved in the cycle, in order but with an unspecified starting point
	   * @public
	   * @constant cycle
	   * @memberof Graph.CycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			this.cycle = cycle;
			this.message = "This graph contains a cycle: " + cycle;
		}
	
		return CycleError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a branch-less directed cycle, but does.
	 * @extends Graph.CycleError
	 */
	Graph.BranchlessCycleError = (function (_Graph$CycleError) {
		_inherits(BranchlessCycleError, _Graph$CycleError);
	
		function BranchlessCycleError(cycle) {
			_classCallCheck(this, BranchlessCycleError);
	
			_get(Object.getPrototypeOf(BranchlessCycleError.prototype), "constructor", this).call(this, cycle);
			this.message = "This graph contains a branch-less cycle: " + cycle;
		}
	
		return BranchlessCycleError;
	})(Graph.CycleError);
	module.exports = exports["default"];
	// stack

	// This algorithm is based on the following article:
	// Enumeration of the elementary circuits of a directed graph
	// R. Tarjan, SIAM Journal on Computing, 2 (1973), pp. 211-216
	// http://dx.doi.org/10.1137/0202017
	// -----
	// TODO: implement the improved version as defined by Johnson:
	// Finding all the elementary circuits of a directed graph.
	// D. B. Johnson, SIAM Journal on Computing 4, no. 1, 77-84, 1975.
	// http://dx.doi.org/10.1137/0204007

	/* bookkeeping */

	/* the main recursive backtracking algorithm */
	// if a simple cycle continuing the partial path on the pointStack has been found

	/* start backtracking from each vertex in the graph */

/***/ }

/******/ })
});
;
//# sourceMappingURL=graph.js.map