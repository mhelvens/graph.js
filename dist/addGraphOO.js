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

	module.exports = __webpack_require__(90);


/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Symbols for private members /////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	window.__graphjs__private__ = window.__graphjs__private__ || {};
	
	var _options = window.__graphjs__private__._options || Symbol("options");
	exports._options = _options;
	var _vertices = window.__graphjs__private__._vertices || Symbol("vertices");
	exports._vertices = _vertices;
	var _edges = window.__graphjs__private__._edges || Symbol("edges");
	exports._edges = _edges;
	var _reverseEdges = window.__graphjs__private__._reverseEdges || Symbol("reverse edges");
	exports._reverseEdges = _reverseEdges;
	var _sources = window.__graphjs__private__._sources || Symbol("sources");
	exports._sources = _sources;
	var _sinks = window.__graphjs__private__._sinks || Symbol("sinks");
	exports._sinks = _sinks;
	var _edgeCount = window.__graphjs__private__._edgeCount || Symbol("edge count");
	exports._edgeCount = _edgeCount;
	var _extractTwoArgs = window.__graphjs__private__._extractTwoArgs || Symbol("extract ([a, b]) or (a, b) arguments");
	exports._extractTwoArgs = _extractTwoArgs;
	var _extractThreeArgs = window.__graphjs__private__._extractThreeArgs || Symbol("extract ([[a, b], c]), ([a, b], c) or (a, b, c) arguments");
	exports._extractThreeArgs = _extractThreeArgs;
	var _listeners = window.__graphjs__private__._listeners || Symbol("listeners");
	exports._listeners = _listeners;
	var _trigger = window.__graphjs__private__._trigger || Symbol("trigger");
	exports._trigger = _trigger;
	var _verticesFrom = window.__graphjs__private__._verticesFrom || Symbol("vertices from");
	exports._verticesFrom = _verticesFrom;
	var _verticesTo = window.__graphjs__private__._verticesTo || Symbol("vertices to");
	exports._verticesTo = _verticesTo;
	var _edgesFrom = window.__graphjs__private__._edgesFrom || Symbol("edges from");
	exports._edgesFrom = _edgesFrom;
	var _edgesTo = window.__graphjs__private__._edgesTo || Symbol("edges to");
	exports._edgesTo = _edgesTo;
	var _verticesWithPathTo = window.__graphjs__private__._verticesWithPathTo || Symbol("vertices with path to");
	exports._verticesWithPathTo = _verticesWithPathTo;
	var _verticesWithPathFrom = window.__graphjs__private__._verticesWithPathFrom || Symbol("vertices with path from");
	exports._verticesWithPathFrom = _verticesWithPathFrom;
	var _paths = window.__graphjs__private__._paths || Symbol("paths");
	exports._paths = _paths;
	var _expectVertices = window.__graphjs__private__._expectVertices || Symbol("expect vertices");
	exports._expectVertices = _expectVertices;
	var _expectVerticesAbsent = window.__graphjs__private__._expectVerticesAbsent || Symbol("expect vertex absent");
	exports._expectVerticesAbsent = _expectVerticesAbsent;
	var _expectEdges = window.__graphjs__private__._expectEdges || Symbol("expect edge");
	exports._expectEdges = _expectEdges;
	var _expectEdgesAbsent = window.__graphjs__private__._expectEdgesAbsent || Symbol("expect edge absent");
	exports._expectEdgesAbsent = _expectEdgesAbsent;
	var _expectNoConnectedEdges = window.__graphjs__private__._expectNoConnectedEdges || Symbol("expect no connected edges");
	
	exports._expectNoConnectedEdges = _expectNoConnectedEdges;
	Object.assign(window.__graphjs__private__, {
		_options: _options,
		_vertices: _vertices,
		_edges: _edges,
		_reverseEdges: _reverseEdges,
		_sources: _sources,
		_sinks: _sinks,
		_edgeCount: _edgeCount,
		_extractTwoArgs: _extractTwoArgs,
		_extractThreeArgs: _extractThreeArgs,
		_listeners: _listeners,
		_trigger: _trigger,
		_verticesFrom: _verticesFrom,
		_verticesTo: _verticesTo,
		_edgesFrom: _edgesFrom,
		_edgesTo: _edgesTo,
		_verticesWithPathTo: _verticesWithPathTo,
		_verticesWithPathFrom: _verticesWithPathFrom,
		_paths: _paths,
		_expectVertices: _expectVertices,
		_expectVerticesAbsent: _expectVerticesAbsent,
		_expectEdges: _expectEdges,
		_expectEdgesAbsent: _expectEdgesAbsent,
		_expectNoConnectedEdges: _expectNoConnectedEdges
	});

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
	    property = _x2,
	    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Graph.GraphOO ///////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	exports["default"] = addGraphOO;
	
	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges = __webpack_require__(11);
	
	function addGraphOO(Graph) {
	
		var _vertexObjects = Symbol("vertex objects");
		var _edgeObjects = Symbol("edge objects");
		var _init = Symbol("init");
	
		/**
	  * @class Graph.GraphOO
	  * @extends Graph
	  * @classdesc A subclass of Graph, in which vertices and edges are represented by smart objects.
	  *            `GraphOO` instances are fully backwards-compatible, and can stand in for `Graph`
	  *            instances in any context.
	  * @see {@link Graph}
	  */
		return Graph.GraphOO = (function (_Graph) {
			function GraphOO() {
				_classCallCheck(this, GraphOO);
	
				if (_Graph != null) {
					_Graph.apply(this, arguments);
				}
			}
	
			_inherits(GraphOO, _Graph);
	
			_createClass(GraphOO, [{
				key: _init,
				value: function () {
					var _this2 = this;
	
					if (!this[_vertexObjects]) {
						(function () {
							_this2[_vertexObjects] = new Map();
							_this2[_edgeObjects] = new Map();
	
							var thisGraph = _this2;
	
							/**
	       * @class Graph.GraphOO#Vertex
	       * @classdesc A class for representing vertices in a `GraphOO` instance.
	       */
							var VertexSuperclass = _this2[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._options].VertexSuperclass || Object;
							_this2.Vertex = (function (_VertexSuperclass) {
								function Vertex(key, value) {
									_classCallCheck(this, Vertex);
	
									_get(Object.getPrototypeOf(Vertex.prototype), "constructor", this).call(this);
									this[0] = key;
									this[1] = value;
									if (!thisGraph[_vertexObjects].has(key)) {
										thisGraph[_vertexObjects].set(key, this);
										thisGraph.addNewVertex(key, value);
									}
								}
	
								_inherits(Vertex, _VertexSuperclass);
	
								_createClass(Vertex, [{
									key: "length",
									get: function () {
										return 2;
									}
								}, {
									key: Symbol.iterator,
									value: function () {
										var marked6$0 = [iterator].map(regeneratorRuntime.mark);
	
										// overly verbose because jsdoc doesn't parse *[Symbol.iterator]() notation
										function iterator() {
											return regeneratorRuntime.wrap(function iterator$(context$7$0) {
												while (1) switch (context$7$0.prev = context$7$0.next) {
													case 0:
														context$7$0.next = 2;
														return this[0];
	
													case 2:
														context$7$0.next = 4;
														return this[1];
	
													case 4:
													case "end":
														return context$7$0.stop();
												}
											}, marked6$0[0], this);
										}
										return iterator.apply(this);
									}
								}, {
									key: "graph",
									get: function () {
										return thisGraph;
									}
								}, {
									key: "key",
									get: function () {
										return this[0];
									}
								}, {
									key: "value",
									get: function () {
										return this[1];
									},
									set: function (value) {
										return this.set(value);
									}
								}, {
									key: "set",
									value: function set(value) {
										return thisGraph.setVertex(this.key, value);
									}
								}, {
									key: "remove",
									value: function remove() {
										return thisGraph.removeExistingVertex(this.key);
									}
								}, {
									key: "destroy",
									value: function destroy() {
										return thisGraph.destroyExistingVertex(this.key);
									}
								}, {
									key: "verticesFrom",
									value: function verticesFrom() {
										return thisGraph.verticesFrom(this.key);
									}
								}, {
									key: "verticesTo",
									value: function verticesTo() {
										return thisGraph.verticesTo(this.key);
									}
								}, {
									key: "edgesFrom",
									value: function edgesFrom() {
										return thisGraph.edgesFrom(this.key);
									}
								}, {
									key: "edgesTo",
									value: function edgesTo() {
										return thisGraph.edgesTo(this.key);
									}
								}, {
									key: "verticesWithPathFrom",
									value: function verticesWithPathFrom() {
										return thisGraph.verticesWithPathFrom(this.key);
									}
								}, {
									key: "verticesWithPathTo",
									value: function verticesWithPathTo() {
										return thisGraph.verticesWithPathTo(this.key);
									}
								}, {
									key: "pathTo",
									value: function pathTo(to) {
										return thisGraph.path(this.key, to);
									}
								}, {
									key: "pathFrom",
									value: function pathFrom(from) {
										return thisGraph.path(from, this.key);
									}
								}, {
									key: "pathsTo",
									value: function pathsTo(to) {
										return thisGraph.paths(this.key, to);
									}
								}, {
									key: "pathsFrom",
									value: function pathsFrom(from) {
										return thisGraph.paths(from, this.key);
									}
								}, {
									key: "hasPathTo",
									value: function hasPathTo(to) {
										return thisGraph.hasPath(this.key, to);
									}
								}, {
									key: "hasPathFrom",
									value: function hasPathFrom(from) {
										return thisGraph.hasPath(from, this.key);
									}
								}, {
									key: "outDegree",
									value: function outDegree() {
										return thisGraph.outDegree(this.key);
									}
								}, {
									key: "inDegree",
									value: function inDegree() {
										return thisGraph.inDegree(this.key);
									}
								}, {
									key: "degree",
									value: function degree() {
										return thisGraph.degree(this.key);
									}
								}]);
	
								return Vertex;
							})(VertexSuperclass);
	
							/**
	       * @class Graph.GraphOO#Edge
	       * @classdesc A class for representing edges in a `GraphOO` instance.
	       */
							var EdgeSuperclass = _this2[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._options].EdgeSuperclass || Object;
							_this2.Edge = (function (_EdgeSuperclass) {
								function Edge(from, to, value) {
									_classCallCheck(this, Edge);
	
									_get(Object.getPrototypeOf(Edge.prototype), "constructor", this).call(this);
									this[0] = [from, to];
									this[1] = value;
									if (!thisGraph[_edgeObjects].has(from)) {
										thisGraph[_edgeObjects].set(from, new Map());
									}
									if (!thisGraph[_edgeObjects].get(from).has(to)) {
										thisGraph[_edgeObjects].get(from).set(to, this);
										thisGraph.addNewEdge(from, to, value);
									}
								}
	
								_inherits(Edge, _EdgeSuperclass);
	
								_createClass(Edge, [{
									key: "length",
									get: function () {
										return 2;
									}
								}, {
									key: Symbol.iterator,
									value: function () {
										var marked6$0 = [iterator].map(regeneratorRuntime.mark);
	
										// overly verbose because jsdoc doesn't parse *[Symbol.iterator]() notation
										function iterator() {
											return regeneratorRuntime.wrap(function iterator$(context$7$0) {
												while (1) switch (context$7$0.prev = context$7$0.next) {
													case 0:
														context$7$0.next = 2;
														return this[0];
	
													case 2:
														context$7$0.next = 4;
														return this[1];
	
													case 4:
													case "end":
														return context$7$0.stop();
												}
											}, marked6$0[0], this);
										}
										return iterator.apply(this);
									}
								}, {
									key: "graph",
									get: function () {
										return thisGraph;
									}
								}, {
									key: "key",
									get: function () {
										return this[0];
									}
								}, {
									key: "from",
									get: function () {
										return this[0][0];
									}
								}, {
									key: "to",
									get: function () {
										return this[0][1];
									}
								}, {
									key: "value",
									get: function () {
										return this[1];
									},
									set: function (value) {
										return this.set(value);
									}
								}, {
									key: "source",
									get: function () {
										return thisGraph.vertex(this.from);
									}
								}, {
									key: "target",
									get: function () {
										return thisGraph.vertex(this.to);
									}
								}, {
									key: "set",
									value: function set(value) {
										return thisGraph.setEdge(this.key, value);
									}
								}, {
									key: "remove",
									value: function remove() {
										return thisGraph.removeExistingEdge(this.key);
									}
								}]);
	
								return Edge;
							})(EdgeSuperclass);
						})();
					}
				}
			}, {
				key: "addNewVertex",
	
				////////////////////////////////////////
				////////// Overriding Methods //////////
				////////////////////////////////////////
	
				value: function addNewVertex(key, value) {
					this[_init]();
	
					var _Graph$_extractTwoArgs = Graph[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._extractTwoArgs](key, value);
	
					var _Graph$_extractTwoArgs2 = _slicedToArray(_Graph$_extractTwoArgs, 2);
	
					key = _Graph$_extractTwoArgs2[0];
					value = _Graph$_extractTwoArgs2[1];
	
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectVerticesAbsent](key);
					if (!this[_vertexObjects].has(key)) {
						this[_vertexObjects].set(key, null);
						this[_vertexObjects].set(key, new this.Vertex(key, value));
					}
					this[_edgeObjects].set(key, new Map());
					return _get(Object.getPrototypeOf(GraphOO.prototype), "addNewVertex", this).call(this, key, value);
				}
			}, {
				key: "setVertex",
				value: function setVertex(key, value) {
					this[_init]();
	
					var _Graph$_extractTwoArgs3 = Graph[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._extractTwoArgs](key, value);
	
					var _Graph$_extractTwoArgs32 = _slicedToArray(_Graph$_extractTwoArgs3, 2);
	
					key = _Graph$_extractTwoArgs32[0];
					value = _Graph$_extractTwoArgs32[1];
	
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectVertices](key);
					this[_vertexObjects].get(key)[1] = value;
					return _get(Object.getPrototypeOf(GraphOO.prototype), "setVertex", this).call(this, key, value);
				}
			}, {
				key: "removeExistingVertex",
				value: function removeExistingVertex(key) {
					this[_init]();
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectVertices](key);
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectNoConnectedEdges](key);
					this[_vertexObjects]["delete"](key);
					return _get(Object.getPrototypeOf(GraphOO.prototype), "removeExistingVertex", this).call(this, key);
				}
			}, {
				key: "vertex",
				value: function vertex(key) {
					this[_init]();
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectVertices](key);
					return this[_vertexObjects].get(key);
				}
			}, {
				key: "addNewEdge",
				value: function addNewEdge(from, to, value) {
					this[_init]();
	
					var _Graph$_extractThreeArgs = Graph[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._extractThreeArgs](from, to, value);
	
					var _Graph$_extractThreeArgs2 = _slicedToArray(_Graph$_extractThreeArgs, 3);
	
					from = _Graph$_extractThreeArgs2[0];
					to = _Graph$_extractThreeArgs2[1];
					value = _Graph$_extractThreeArgs2[2];
	
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectEdgesAbsent]([from, to]);
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectVertices](from, to);
					if (!this[_edgeObjects].get(from).has(to)) {
						this[_edgeObjects].get(from).set(to, null);
						this[_edgeObjects].get(from).set(to, new this.Edge(from, to, value));
					}
					return _get(Object.getPrototypeOf(GraphOO.prototype), "addNewEdge", this).call(this, from, to, value);
				}
			}, {
				key: "setEdge",
				value: function setEdge(from, to, value) {
					this[_init]();
	
					var _Graph$_extractThreeArgs3 = Graph[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._extractThreeArgs](from, to, value);
	
					var _Graph$_extractThreeArgs32 = _slicedToArray(_Graph$_extractThreeArgs3, 3);
	
					from = _Graph$_extractThreeArgs32[0];
					to = _Graph$_extractThreeArgs32[1];
					value = _Graph$_extractThreeArgs32[2];
	
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectEdges]([from, to]);
					this[_edgeObjects].get(from).get(to)[1] = value;
					return _get(Object.getPrototypeOf(GraphOO.prototype), "setEdge", this).call(this, from, to, value);
				}
			}, {
				key: "removeExistingEdge",
				value: function removeExistingEdge(from, to) {
					this[_init]();
	
					var _Graph$_extractTwoArgs4 = Graph[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._extractTwoArgs](from, to);
	
					var _Graph$_extractTwoArgs42 = _slicedToArray(_Graph$_extractTwoArgs4, 2);
	
					from = _Graph$_extractTwoArgs42[0];
					to = _Graph$_extractTwoArgs42[1];
	
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectEdges]([from, to]);
					this[_edgeObjects].get(from)["delete"](to);
					return _get(Object.getPrototypeOf(GraphOO.prototype), "removeExistingEdge", this).call(this, from, to);
				}
			}, {
				key: "edge",
				value: function edge(from, to) {
					this[_init]();
	
					var _Graph$_extractTwoArgs5 = Graph[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._extractTwoArgs](from, to);
	
					var _Graph$_extractTwoArgs52 = _slicedToArray(_Graph$_extractTwoArgs5, 2);
	
					from = _Graph$_extractTwoArgs52[0];
					to = _Graph$_extractTwoArgs52[1];
	
					this[_options$_extractTwoArgs$_extractThreeArgs$_expectVertices$_expectVerticesAbsent$_expectEdges$_expectEdgesAbsent$_expectNoConnectedEdges._expectEdges]([from, to]);
					return this[_edgeObjects].get(from).get(to);
				}
			}]);
	
			return GraphOO;
		})(Graph);
	}
	
	module.exports = exports["default"];

/***/ }

/******/ })
});
;
//# sourceMappingURL=addGraphOO.js.map