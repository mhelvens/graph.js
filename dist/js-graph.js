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
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _createComputedClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var prop = props[i]; prop.configurable = true; if (prop.value) prop.writable = true; Object.defineProperty(target, prop.key, prop); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Utility /////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
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
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
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
	
		_createComputedClass(JsGraph, [{
			key: "onAddVertex",
	
			//////////////////////////////
			////////// Vertices //////////
			//////////////////////////////
	
			value: function onAddVertex(fn) {
				return this._addVertexCallbacks.add(fn);
			}
		}, {
			key: "onRemoveVertex",
			value: function onRemoveVertex(fn) {
				return this._removeVertexCallbacks.add(fn);
			}
		}, {
			key: "addNewVertex",
	
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
		}, {
			key: "setVertex",
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				this._vertices[key] = value;
			}
		}, {
			key: "ensureVertex",
			value: function ensureVertex(key, value) {
				if (!this.hasVertex(key)) {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "addVertex",
			value: function addVertex(key, value) {
				if (this.hasVertex(key)) {
					this.setVertex(key, value);
				} else {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "removeExistingVertex",
	
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
		}, {
			key: "destroyExistingVertex",
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
		}, {
			key: "removeVertex",
			value: function removeVertex(key) {
				if (this.hasVertex(key)) {
					this.removeExistingVertex(key);
				}
			}
		}, {
			key: "destroyVertex",
			value: function destroyVertex(key) {
				if (this.hasVertex(key)) {
					this.destroyExistingVertex(key);
				}
			}
		}, {
			key: "vertexCount",
	
			//// querying them ////
	
			value: function vertexCount() {
				return this._vertexCount;
			}
		}, {
			key: "hasVertex",
			value: function hasVertex(key) {
				return key in this._vertices;
			}
		}, {
			key: "vertexValue",
			value: function vertexValue(key) {
				return this._vertices[key];
			}
		}, {
			key: "onAddEdge",
	
			///////////////////////////
			////////// Edges //////////
			///////////////////////////
	
			value: function onAddEdge(fn) {
				return this._addEdgeCallbacks.add(fn);
			}
		}, {
			key: "onRemoveEdge",
			value: function onRemoveEdge(fn) {
				return this._removeEdgeCallbacks.add(fn);
			}
		}, {
			key: "addNewEdge",
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
		}, {
			key: "createNewEdge",
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
			value: function setEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					throw new JsGraph.EdgeNotExistsError(from, to);
				}
				this._edges[from][to] = value;
			}
		}, {
			key: "spanEdge",
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
			value: function addEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: "ensureEdge",
			value: function ensureEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "createEdge",
			value: function createEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "removeExistingEdge",
	
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
		}, {
			key: "removeEdge",
			value: function removeEdge(from, to) {
				if (this.hasEdge(from, to)) {
					this.removeExistingEdge(from, to);
				}
			}
		}, {
			key: "edgeCount",
	
			//// querying them ////
	
			value: function edgeCount() {
				return this._edgeCount;
			}
		}, {
			key: "hasEdge",
			value: function hasEdge(from, to) {
				return this.hasVertex(from) && this.hasVertex(to) && from in this._edges && to in this._edges[from];
			}
		}, {
			key: "edgeValue",
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this._edges[from][to] : undefined;
			}
		}, {
			key: "successors",
	
			//////////////////////////
			////////// More //////////
			//////////////////////////
	
			value: function successors(from) {
				if (!this.hasVertex(from)) {
					throw new JsGraph.VertexNotExistsError(from);
				}
				return Object.keys(this._edges[from]);
			}
		}, {
			key: "predecessors",
			value: function predecessors(to) {
				if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				return Object.keys(this._reverseEdges[to]);
			}
		}, {
			key: "eachVertex",
	
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
		}, {
			key: "eachVertexFrom",
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
		}, {
			key: "eachVertexTo",
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
		}, {
			key: "eachEdge",
			value: function eachEdge(handler) {
				var _this = this;
	
				Object.keys(this._edges).every(function (from) {
					return Object.keys(_this._edges[from]).every(function (to) {
						var r = handler(from, to, _this._edges[from][to]);
						return r !== false;
					});
				});
			}
		}, {
			key: "topologically",
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
		}, {
			key: Symbol.iterator,
	
			///////////////////////////////////////////////
			//////////// ES6 Iterable interfaces //////////
			///////////////////////////////////////////////
	
			value: function () {
				return this.vertices();
			}
		}, {
			key: "vertices",
			value: regeneratorRuntime.mark(function vertices() {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._vertices)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 13;
								break;
							}
	
							key = _step.value;
	
							if (!_this.hasVertex(key)) {
								context$2$0.next = 10;
								break;
							}
	
							context$2$0.next = 10;
							return [key, _this._vertices[key]];
	
						case 10:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 13:
							context$2$0.next = 19;
							break;
	
						case 15:
							context$2$0.prev = 15;
							context$2$0.t0 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t0;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.prev = 20;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 22:
							context$2$0.prev = 22;
	
							if (!_didIteratorError) {
								context$2$0.next = 25;
								break;
							}
	
							throw _iteratorError;
	
						case 25:
							return context$2$0.finish(22);
	
						case 26:
							return context$2$0.finish(19);
	
						case 27:
						case "end":
							return context$2$0.stop();
					}
				}, vertices, this, [[3, 15, 19, 27], [20,, 22, 26]]);
			})
		}, {
			key: "edges",
			value: regeneratorRuntime.mark(function edges() {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._edges)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 37;
								break;
							}
	
							from = _step.value;
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							context$2$0.prev = 10;
							_iterator2 = Object.keys(_this._edges[from])[Symbol.iterator]();
	
						case 12:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								context$2$0.next = 20;
								break;
							}
	
							to = _step2.value;
	
							if (!_this.hasEdge(from, to)) {
								context$2$0.next = 17;
								break;
							}
	
							context$2$0.next = 17;
							return [from, to, _this._edges[from][to]];
	
						case 17:
							_iteratorNormalCompletion2 = true;
							context$2$0.next = 12;
							break;
	
						case 20:
							context$2$0.next = 26;
							break;
	
						case 22:
							context$2$0.prev = 22;
							context$2$0.t1 = context$2$0["catch"](10);
							_didIteratorError2 = true;
							_iteratorError2 = context$2$0.t1;
	
						case 26:
							context$2$0.prev = 26;
							context$2$0.prev = 27;
	
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
	
						case 29:
							context$2$0.prev = 29;
	
							if (!_didIteratorError2) {
								context$2$0.next = 32;
								break;
							}
	
							throw _iteratorError2;
	
						case 32:
							return context$2$0.finish(29);
	
						case 33:
							return context$2$0.finish(26);
	
						case 34:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 37:
							context$2$0.next = 43;
							break;
	
						case 39:
							context$2$0.prev = 39;
							context$2$0.t2 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t2;
	
						case 43:
							context$2$0.prev = 43;
							context$2$0.prev = 44;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 46:
							context$2$0.prev = 46;
	
							if (!_didIteratorError) {
								context$2$0.next = 49;
								break;
							}
	
							throw _iteratorError;
	
						case 49:
							return context$2$0.finish(46);
	
						case 50:
							return context$2$0.finish(43);
	
						case 51:
						case "end":
							return context$2$0.stop();
					}
				}, edges, this, [[3, 39, 43, 51], [10, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
			})
		}, {
			key: "verticesFrom",
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
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, to;
	
				return regeneratorRuntime.wrap(function _verticesFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._edges[from])[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 13;
								break;
							}
	
							to = _step.value;
	
							if (!_this.hasEdge(from, to)) {
								context$2$0.next = 10;
								break;
							}
	
							context$2$0.next = 10;
							return [to, _this._vertices[to], _this._edges[from][to]];
	
						case 10:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 13:
							context$2$0.next = 19;
							break;
	
						case 15:
							context$2$0.prev = 15;
							context$2$0.t3 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t3;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.prev = 20;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 22:
							context$2$0.prev = 22;
	
							if (!_didIteratorError) {
								context$2$0.next = 25;
								break;
							}
	
							throw _iteratorError;
	
						case 25:
							return context$2$0.finish(22);
	
						case 26:
							return context$2$0.finish(19);
	
						case 27:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesFrom, this, [[3, 15, 19, 27], [20,, 22, 26]]);
			})
		}, {
			key: "verticesTo",
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
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from;
	
				return regeneratorRuntime.wrap(function _verticesTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._reverseEdges[to])[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 13;
								break;
							}
	
							from = _step.value;
	
							if (!_this.hasEdge(from, to)) {
								context$2$0.next = 10;
								break;
							}
	
							context$2$0.next = 10;
							return [from, _this._vertices[from], _this._edges[from][to]];
	
						case 10:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 13:
							context$2$0.next = 19;
							break;
	
						case 15:
							context$2$0.prev = 15;
							context$2$0.t4 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t4;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.prev = 20;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 22:
							context$2$0.prev = 22;
	
							if (!_didIteratorError) {
								context$2$0.next = 25;
								break;
							}
	
							throw _iteratorError;
	
						case 25:
							return context$2$0.finish(22);
	
						case 26:
							return context$2$0.finish(19);
	
						case 27:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesTo, this, [[3, 15, 19, 27], [20,, 22, 26]]);
			})
		}, {
			key: "vertices_topologically",
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
								if (handled[a]) {
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
								return context$3$0.delegateYield(visit(b), "t5", 15);
	
							case 15:
								_iteratorNormalCompletion = true;
								context$3$0.next = 11;
								break;
	
							case 18:
								context$3$0.next = 24;
								break;
	
							case 20:
								context$3$0.prev = 20;
								context$3$0.t6 = context$3$0["catch"](9);
								_didIteratorError = true;
								_iteratorError = context$3$0.t6;
	
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
								return [a, _this._vertices[a]];
	
							case 35:
								handled[a] = true;
	
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
							handled = {};
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
	
							if (handled[a]) {
								context$2$0.next = 13;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t7", 13);
	
						case 13:
							_iteratorNormalCompletion = true;
							context$2$0.next = 8;
							break;
	
						case 16:
							context$2$0.next = 22;
							break;
	
						case 18:
							context$2$0.prev = 18;
							context$2$0.t8 = context$2$0["catch"](6);
							_didIteratorError = true;
							_iteratorError = context$2$0.t8;
	
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
	
			value: function clearEdges() {
				var _this = this;
	
				this.eachEdge(function (from, to) {
					_this.removeEdge(from, to);
				});
			}
		}, {
			key: "clear",
			value: function clear() {
				var _this = this;
	
				this.eachVertex(function (v) {
					_this.destroyVertex(v);
				});
			}
		}, {
			key: "hasCycle",
	
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
		}, {
			key: "hasPath",
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
		}, {
			key: "clone",
	
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
		}, {
			key: "transitiveReduction",
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
		}]);
	
		return JsGraph;
	})();
	
	module.exports = JsGraph;
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
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
//# sourceMappingURL=js-graph.js.map