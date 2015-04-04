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
	
			this._callbacks = new Set();
		}
	
		_createClass(Callbacks, {
			add: {
				value: function add(fn) {
					var _this = this;
	
					if (!this._callbacks.has(fn)) {
						this._callbacks.add(fn);
					}
					return function () {
						_this._callbacks["delete"](fn);
					};
				}
			},
			fire: {
				value: function fire() {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this._callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var fn = _step.value;
	
							fn.apply(undefined, args);
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
	
			this._vertices = new Map(); // key -> value
			this._edges = new Map(); // from -> to -> value
			this._reverseEdges = new Map(); // to -> Set<from> (_edges contains the values)
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
					throw new JsGraph.VertexExistsError(key, this._vertices.get(key));
				}
				this._vertices.set(key, value);
				this._edges.set(key, new Map());
				this._reverseEdges.set(key, new Set());
				this._vertexCount += 1;
				this._addVertexCallbacks.fire(key, value);
			}
		}, {
			key: "setVertex",
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				this._vertices.set(key, value);
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
				if (this._edges.get(key).size > 0) {
					throw new JsGraph.HasConnectedEdgesError(key);
				}
				if (this._reverseEdges.get(key).size > 0) {
					throw new JsGraph.HasConnectedEdgesError(key);
				}
				var valueOfRemovedVertex = this._vertices.get(key);
				this._vertices["delete"](key);
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
				return this._vertices.has(key);
			}
		}, {
			key: "vertexValue",
			value: function vertexValue(key) {
				return this._vertices.get(key);
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
				this._edges.get(from).set(to, value);
				this._reverseEdges.get(to).add(from);
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
				this._edges.get(from).set(to, value);
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
				var valueOfRemovedEdge = this._edges.get(from).get(to);
				this._edges.get(from)["delete"](to);
				this._reverseEdges.get(to)["delete"](from);
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
				return this.hasVertex(from) && this.hasVertex(to) && this._edges.has(from) && this._edges.get(from).has(to);
			}
		}, {
			key: "edgeValue",
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this._edges.get(from).get(to) : undefined;
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
			key: "edges",
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
			key: "eachVertex",
	
			/////////////////////////////////////////
			////////// Old Style Iteration //////////
			/////////////////////////////////////////
	
			value: function eachVertex(handler) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var args = _step.value;
	
						if (handler.apply(undefined, _toConsumableArray(args)) === false) {
							break;
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
		}, {
			key: "eachVertexFrom",
			value: function eachVertexFrom(from, handler) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.verticesFrom(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var args = _step.value;
	
						if (handler.apply(undefined, _toConsumableArray(args)) === false) {
							break;
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
		}, {
			key: "eachVertexTo",
			value: function eachVertexTo(to, handler) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.verticesTo(to)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var args = _step.value;
	
						if (handler.apply(undefined, _toConsumableArray(args)) === false) {
							break;
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
		}, {
			key: "eachEdge",
			value: function eachEdge(handler) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.edges()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var args = _step.value;
	
						if (handler.apply(undefined, _toConsumableArray(args)) === false) {
							break;
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
		}, {
			key: "eachVertexTopologically",
			value: function eachVertexTopologically(handler) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices_topologically()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var args = _step.value;
	
						if (handler.apply(undefined, _toConsumableArray(args)) === false) {
							break;
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
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var key = _step$value[0];
						var val = _step$value[1];
	
						result.addVertex(key, val);
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
	
						result.addEdge(from, to, val);
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
			value: function transitiveReduction() {
				var result = this.clone();
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
	// stack

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-graph.js.map