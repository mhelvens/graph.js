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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Utility /////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var Callbacks = (function () {
		function Callbacks() {
			_classCallCheck(this, Callbacks);

			this._callbacks = [];
		}

		_createClass(Callbacks, {
			add: {
				value: function add(fn) {
					var _this = this;

					if (this._callbacks.indexOf(fn) === -1) {
						this._callbacks.push(fn);
					}
					return function () {
						var index = _this._callbacks.indexOf(fn);
						if (index !== -1) {
							_this._callbacks.splice(index, 1);
						}
					};
				}
			},
			fire: {
				value: function fire() {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					this._callbacks.forEach(function (fn) {
						fn.apply(undefined, args);
					});
				}
			}
		});

		return Callbacks;
	})();

	//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var JsGraph = (function () {
		function JsGraph() {
			_classCallCheck(this, JsGraph);

			this._vertices = {}; // key -> value
			this._edges = {}; // from -> to -> value
			this._reverseEdges = {}; // to -> from -> null (_edges contains the values)
			this._vertexCount = 0;
			this._edgeCount = 0;
			this._addVertexCallbacks = new Callbacks();
			this._removeVertexCallbacks = new Callbacks();
			this._addEdgeCallbacks = new Callbacks();
			this._removeEdgeCallbacks = new Callbacks();
		}

		_createClass(JsGraph, {
			onAddVertex: {

				//////////////////////////////
				////////// Vertices //////////
				//////////////////////////////

				value: function onAddVertex(fn) {
					return this._addVertexCallbacks.add(fn);
				}
			},
			onRemoveVertex: {
				value: function onRemoveVertex(fn) {
					return this._removeVertexCallbacks.add(fn);
				}
			},
			addNewVertex: {

				//// creating them ////

				value: function addNewVertex(key, value) {
					if (this.hasVertex(key)) {
						throw new JsGraph.VertexExistsError(key, this._vertices[key]);
					}
					this._vertices[key] = value;
					this._edges[key] = {};
					this._reverseEdges[key] = {};
					this._vertexCount += 1;
					this._addVertexCallbacks.fire(key, value);
				}
			},
			setVertex: {
				value: function setVertex(key, value) {
					if (!this.hasVertex(key)) {
						throw new JsGraph.VertexNotExistsError(key);
					}
					this._vertices[key] = value;
				}
			},
			ensureVertex: {
				value: function ensureVertex(key, value) {
					if (!this.hasVertex(key)) {
						this.addNewVertex(key, value);
					}
				}
			},
			addVertex: {
				value: function addVertex(key, value) {
					if (this.hasVertex(key)) {
						this.setVertex(key, value);
					} else {
						this.addNewVertex(key, value);
					}
				}
			},
			removeExistingVertex: {

				//// removing them ////

				value: function removeExistingVertex(key) {
					if (!this.hasVertex(key)) {
						throw new JsGraph.VertexNotExistsError(key);
					}
					if (Object.keys(this._edges[key]).length) {
						throw new JsGraph.HasConnectedEdgesError(key);
					}
					if (Object.keys(this._reverseEdges[key]).length) {
						throw new JsGraph.HasConnectedEdgesError(key);
					}
					var valueOfRemovedVertex = this._vertices[key];
					delete this._vertices[key];
					this._vertexCount -= 1;
					this._removeVertexCallbacks.fire(key, valueOfRemovedVertex);
				}
			},
			destroyExistingVertex: {
				value: function destroyExistingVertex(key) {
					var _this = this;

					if (!this.hasVertex(key)) {
						throw new JsGraph.VertexNotExistsError(key);
					}
					this.eachVertexFrom(key, function (to) {
						_this.removeEdge(key, to);
					});
					this.eachVertexTo(key, function (from) {
						_this.removeEdge(from, key);
					});
					this.removeExistingVertex(key);
				}
			},
			removeVertex: {
				value: function removeVertex(key) {
					if (this.hasVertex(key)) {
						this.removeExistingVertex(key);
					}
				}
			},
			destroyVertex: {
				value: function destroyVertex(key) {
					if (this.hasVertex(key)) {
						this.destroyExistingVertex(key);
					}
				}
			},
			vertexCount: {

				//// querying them ////

				value: function vertexCount() {
					return this._vertexCount;
				}
			},
			hasVertex: {
				value: function hasVertex(key) {
					return key in this._vertices;
				}
			},
			vertexValue: {
				value: function vertexValue(key) {
					return this._vertices[key];
				}
			},
			onAddEdge: {

				///////////////////////////
				////////// Edges //////////
				///////////////////////////

				value: function onAddEdge(fn) {
					return this._addEdgeCallbacks.add(fn);
				}
			},
			onRemoveEdge: {
				value: function onRemoveEdge(fn) {
					return this._removeEdgeCallbacks.add(fn);
				}
			},
			addNewEdge: {
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
					this._edges[from][to] = value;
					this._reverseEdges[to][from] = null;
					this._edgeCount += 1;
					this._addEdgeCallbacks.fire(from, to, value);
				}
			},
			createNewEdge: {
				value: function createNewEdge(from, to, value) {
					if (this.hasEdge(from, to)) {
						throw new JsGraph.EdgeExistsError(from, to, this.edgeValue(from, to));
					}
					this.ensureVertex(from);
					this.ensureVertex(to);
					this.addNewEdge(from, to, value);
				}
			},
			setEdge: {
				value: function setEdge(from, to, value) {
					if (!this.hasEdge(from, to)) {
						throw new JsGraph.EdgeNotExistsError(from, to);
					}
					this._edges[from][to] = value;
				}
			},
			spanEdge: {
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
			},
			addEdge: {
				value: function addEdge(from, to, value) {
					if (this.hasEdge(from, to)) {
						this.setEdge(from, to, value);
					} else {
						this.addNewEdge(from, to, value);
					}
				}
			},
			ensureEdge: {
				value: function ensureEdge(from, to, value) {
					if (!this.hasEdge(from, to)) {
						this.createNewEdge(from, to, value);
					}
				}
			},
			createEdge: {
				value: function createEdge(from, to, value) {
					if (this.hasEdge(from, to)) {
						this.setEdge(from, to, value);
					} else {
						this.createNewEdge(from, to, value);
					}
				}
			},
			removeExistingEdge: {

				//// removing them ////

				value: function removeExistingEdge(from, to) {
					if (!this.hasEdge(from, to)) {
						throw new JsGraph.EdgeNotExistsError(from, to);
					}
					var valueOfRemovedEdge = this._edges[from][to];
					delete this._edges[from][to];
					delete this._reverseEdges[to][from];
					this._edgeCount -= 1;
					this._removeEdgeCallbacks.fire(from, to, valueOfRemovedEdge);
				}
			},
			removeEdge: {
				value: function removeEdge(from, to) {
					if (this.hasEdge(from, to)) {
						this.removeExistingEdge(from, to);
					}
				}
			},
			edgeCount: {

				//// querying them ////

				value: function edgeCount() {
					return this._edgeCount;
				}
			},
			hasEdge: {
				value: function hasEdge(from, to) {
					return this.hasVertex(from) && this.hasVertex(to) && from in this._edges && to in this._edges[from];
				}
			},
			edgeValue: {
				value: function edgeValue(from, to) {
					return this.hasEdge(from, to) ? this._edges[from][to] : undefined;
				}
			},
			successors: {

				//////////////////////////
				////////// More //////////
				//////////////////////////

				value: function successors(from) {
					if (!this.hasVertex(from)) {
						throw new JsGraph.VertexNotExistsError(from);
					}
					return Object.keys(this._edges[from]);
				}
			},
			predecessors: {
				value: function predecessors(to) {
					if (!this.hasVertex(to)) {
						throw new JsGraph.VertexNotExistsError(to);
					}
					return Object.keys(this._reverseEdges[to]);
				}
			},
			eachVertex: {

				///////////////////////////////
				////////// Iteration //////////
				///////////////////////////////

				value: function eachVertex(handler) {
					var _this = this;

					Object.keys(this._vertices).every(function (key) {
						var r = handler(key, _this._vertices[key]);
						return r !== false;
					});
				}
			},
			eachVertexFrom: {
				value: function eachVertexFrom(from, handler) {
					var _this = this;

					if (!this.hasVertex(from)) {
						throw new JsGraph.VertexNotExistsError(from);
					}
					Object.keys(this._edges[from]).every(function (to) {
						var r = handler(to, _this.vertexValue(to), _this.edgeValue(from, to));
						return r !== false;
					});
				}
			},
			eachVertexTo: {
				value: function eachVertexTo(to, handler) {
					var _this = this;

					if (!this.hasVertex(to)) {
						throw new JsGraph.VertexNotExistsError(to);
					}
					Object.keys(this._reverseEdges[to]).every(function (from) {
						var r = handler(from, _this.vertexValue(from), _this.edgeValue(from, to));
						return r !== false;
					});
				}
			},
			eachEdge: {
				value: function eachEdge(handler) {
					var _this = this;

					Object.keys(this._edges).every(function (from) {
						return Object.keys(_this._edges[from]).every(function (to) {
							var r = handler(from, to, _this._edges[from][to]);
							return r !== false;
						});
					});
				}
			},
			topologically: {
				value: function topologically(handler) {
					var _this = this;

					var visited = [];
					var handled = {};

					var visit = function (a) {
						visited.push(a);
						var i = visited.indexOf(a);
						if (i !== visited.length - 1) {
							var cycle = visited.slice(i + 1).reverse();
							throw new JsGraph.CycleError(cycle);
						}
						if (!handled[a]) {
							_this.eachVertexTo(a, visit);
							handled[a] = { returned: handler(a, _this.vertexValue(a)) };
						}
						visited.pop();
					};

					this.eachVertex(function (a) {
						if (!handled[a]) {
							visit(a);
						}
					});
				}
			},
			clearEdges: {

				///////////////////////////////////////////////
				//////////// ES6 Iterable interfaces //////////
				///////////////////////////////////////////////
				//
				//get vertices() {
				//	return {
				//		_graph: this,
				//		get length() { return this._graph._vertexCount },
				//		[Symbol.iterator]: function*() {
				//			var keys = Object.keys(this._graph._vertices);
				//			for (let i = 0; i < keys.length; ++i) {
				//				yield [keys[i], this._graph._vertices[keys[i]]];
				//			}
				//		}
				//	};
				//}
				//
				//get edges() {
				//	return {
				//		_graph: this,
				//		get length() { return this._graph._edgeCount },
				//		[Symbol.iterator]: function*() {
				//			var fromKeys = Object.keys(this._graph._edges);
				//			for (let i = 0; i < fromKeys.length; ++i) {
				//				var toKeys = Object.keys(this._graph._edges[fromKeys[i]]);
				//				for (let j = 0; j < toKeys.length; ++j) {
				//					yield [fromKeys[i], toKeys[j], this._graph._edges[fromKeys[i]][toKeys[j]]];
				//				}
				//			}
				//		}
				//	};
				//}

				//////////////////////////////
				////////// Clearing //////////
				//////////////////////////////

				value: function clearEdges() {
					var _this = this;

					this.eachEdge(function (from, to) {
						_this.removeEdge(from, to);
					});
				}
			},
			clear: {
				value: function clear() {
					var _this = this;

					this.eachVertex(function (v) {
						_this.destroyVertex(v);
					});
				}
			},
			hasCycle: {

				//////////////////////////////////////
				////////// Advanced Queries //////////
				//////////////////////////////////////

				value: function hasCycle() {
					var _this = this;

					var visited = {};
					var handled = {};

					var cycleFound = false;

					var visit = function (a) {
						/* if a cycle is found, record it and return */
						if (visited[a]) {
							cycleFound = true;
							return;
						}

						/* if this vertex was already handled, no cycle can be found here */
						if (handled[a]) {
							return;
						}
						handled[a] = true;

						/* recursively visit successors to check for cycles */
						visited[a] = true;
						_this.eachVertexFrom(a, function (b) {
							visit(b);
							if (cycleFound) {
								return false;
							}
						});
						visited[a] = false;
					};

					this.eachVertex(function (a) {
						visit(a);
						if (cycleFound) {
							return false;
						}
					});

					return cycleFound;
				}
			},
			hasPath: {
				value: function hasPath(from, to) {
					var _this = this;

					if (!this.hasVertex(from) || !this.hasVertex(to)) {
						return false;
					}

					var visited = {};

					/* Recursive auxiliary function: Is there a path from 'current' to 'to'? */
					var hasPathAux = function (current) {
						if (_this.hasEdge(current, to)) {
							return true;
						}
						visited[current] = true;
						var found = false;
						_this.eachVertexFrom(current, function (next) {
							if (!found && !visited[next] && hasPathAux(next)) {
								found = true;
							}
						});
						delete visited[current];
						return found;
					};

					return hasPathAux(from);
				}
			},
			clone: {

				/////////////////////////////
				////////// Cloning //////////
				/////////////////////////////

				value: function clone() {
					var result = new JsGraph();
					this.eachVertex(function (key, val) {
						result.addVertex(key, val);
					});
					this.eachEdge(function (from, to, val) {
						result.addEdge(from, to, val);
					});
					return result;
				}
			},
			transitiveReduction: {
				value: function transitiveReduction() {
					var result = this.clone();
					result.eachVertex(function (x) {
						result.eachVertex(function (y) {
							if (result.hasEdge(x, y)) {
								result.eachVertex(function (z) {
									if (result.hasPath(y, z)) {
										result.removeEdge(x, z);
									}
								});
							}
						});
					});
					return result;
				}
			}
		});

		return JsGraph;
	})();

	module.exports = JsGraph;

	//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	JsGraph.VertexExistsError = (function (_Error) {
		function VertexExistsError(key, value) {
			_classCallCheck(this, VertexExistsError);

			this.vertices = {};
			this.v(key, value);
		}

		_inherits(VertexExistsError, _Error);

		_createClass(VertexExistsError, {
			v: {
				value: function v(key, value) {
					this.vertices[key] = value;
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices === 1 ? "a vertex" : "vertices";
					this.message = "This graph has " + aVertices + " '" + Object.keys(this.vertices).join("', '") + "'";
				}
			}
		});

		return VertexExistsError;
	})(Error);

	JsGraph.VertexNotExistsError = (function (_Error2) {
		function VertexNotExistError(key) {
			_classCallCheck(this, VertexNotExistError);

			this.vertices = {};
			this.v(key);
		}

		_inherits(VertexNotExistError, _Error2);

		_createClass(VertexNotExistError, {
			v: {
				value: function v(key) {
					this.vertices[key] = undefined;
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices === 1 ? "a vertex" : "vertices";
					this.message = "This graph does not have " + aVertices + " '" + Object.keys(this.vertices).join("', '") + "'";
				}
			}
		});

		return VertexNotExistError;
	})(Error);

	JsGraph.EdgeExistsError = (function (_Error3) {
		function EdgeExistsError(from, to, value) {
			_classCallCheck(this, EdgeExistsError);

			this.edges = {};
			this.e(from, to, value);
		}

		_inherits(EdgeExistsError, _Error3);

		_createClass(EdgeExistsError, {
			e: {
				value: function e(from, to, value) {
					this.edges[from] = _defineProperty({}, to, value);
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var _this = this;

					var edges = [];
					Object.keys(this.edges).forEach(function (from) {
						Object.keys(_this.edges[from]).forEach(function (to) {
							edges.push("('" + from + "', '" + to + "')");
						});
					});
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph has " + anEdges + " " + edges.join(", ");
				}
			}
		});

		return EdgeExistsError;
	})(Error);

	JsGraph.EdgeNotExistsError = (function (_Error4) {
		function EdgeNotExistError(from, to) {
			_classCallCheck(this, EdgeNotExistError);

			this.edges = {};
			this.e(from, to);
		}

		_inherits(EdgeNotExistError, _Error4);

		_createClass(EdgeNotExistError, {
			e: {
				value: function e(from, to) {
					this.edges[from] = _defineProperty({}, to, undefined);
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var _this = this;

					var edges = [];
					Object.keys(this.edges).forEach(function (from) {
						Object.keys(_this.edges[from]).forEach(function (to) {
							edges.push("('" + from + "', '" + to + "')");
						});
					});
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph does not have " + anEdges + " " + edges.join(", ");
				}
			}
		});

		return EdgeNotExistError;
	})(Error);

	JsGraph.HasConnectedEdgesError = (function (_Error5) {
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);

			this.message = "The '" + key + "' vertex has connected edges";
			this.key = key;
		}

		_inherits(HasConnectedEdgesError, _Error5);

		return HasConnectedEdgesError;
	})(Error);

	JsGraph.CycleError = (function (_Error6) {
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);

			this.message = "This graph contains a cycle: " + cycle;
			this.cycle = cycle;
		}

		_inherits(CycleError, _Error6);

		return CycleError;
	})(Error);

/***/ }
/******/ ])
});
;