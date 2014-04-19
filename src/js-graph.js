'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
define([], function () { //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	function Callbacks() {

		var callbacks = [];

		this.add = function (fn) {
			if (callbacks.indexOf(fn) === -1) {
				callbacks.push(fn);
			}
			return function removeCallback() {
				var index = callbacks.indexOf(fn);
				if (index !== -1) {
					callbacks.splice(index, 1);
				}
			};
		};

		this.fire = function () {
			var args = arguments;
			callbacks.forEach(function (fn) {
				fn.apply(null, args);
			});
		};

	}


//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function Graph() { /////////////////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		var that = this;


//      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//      // Private Variables ///////////////////////////////////////////////////////////////////////////////////////////
//      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		var _vertices = {};

		var _edges = {};

		var _reverseEdges = {}; // contains no values (_edges does)

		var _vertexCount = 0;

		var _edgeCount = 0;


//      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//      // Privileged Methods //////////////////////////////////////////////////////////////////////////////////////////
//      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		//////////////////////////////
		////////// Vertices //////////
		//////////////////////////////


		var addVertexCallbacks = new Callbacks();
		var removeVertexCallbacks = new Callbacks();


		//// listening for them ////
		//
		that.onAddVertex = addVertexCallbacks.add;
		that.onRemoveVertex = removeVertexCallbacks.add;


		//// creating them ////
		//
		that.addNewVertex = function (key, value) {
			if (that.hasVertex(key)) {
				throw new Graph.VertexExistsError(key, _vertices[key]);
			}

			_vertices[key] = value;
			_edges[key] = {};
			_reverseEdges[key] = {};
			_vertexCount += 1;
			addVertexCallbacks.fire(key, value);
		};

		that.setVertex = function (key, value) {
			if (!that.hasVertex(key)) { throw new Graph.VertexNotExistsError(key); }

			_vertices[key] = value;
		};

		that.ensureVertex = function (key, value) {
			if (!that.hasVertex(key)) {
				that.addNewVertex(key, value);
			}
		};

		that.addVertex = function (key, value) {
			if (that.hasVertex(key)) {
				that.setVertex(key, value);
			} else {
				that.addNewVertex(key, value);
			}
		};


		//// removing them ////
		//
		that.removeExistingVertex = function (key) {
			if (!that.hasVertex(key)) { throw new Graph.VertexNotExistsError(key); }
			if (Object.keys(_edges[key]).length) { throw new Graph.HasConnectedEdgesError(key); }
			if (Object.keys(_reverseEdges[key]).length) { throw new Graph.HasConnectedEdgesError(key); }

			var valueOfRemovedVertex = _vertices[key];
			delete _vertices[key];
			_vertexCount -= 1;
			removeVertexCallbacks.fire(key, valueOfRemovedVertex);
		};

		that.destroyExistingVertex = function (key) {
			if (!that.hasVertex(key)) { throw new Graph.VertexNotExistsError(key); }
			that.eachVertexFrom(key, function (to) {
				that.removeEdge(key, to);
			});
			that.eachVertexTo(key, function (from) {
				that.removeEdge(from, key);
			});
			that.removeExistingVertex(key);
		};

		that.removeVertex = function (key) {
			if (that.hasVertex(key)) {
				that.removeExistingVertex(key);
			}
		};

		that.destroyVertex = function (key) {
			if (that.hasVertex(key)) {
				that.destroyExistingVertex(key);
			}
		};


		///////////////////////////
		////////// Edges //////////
		///////////////////////////


		var addEdgeCallbacks = new Callbacks();
		var removeEdgeCallbacks = new Callbacks();


		//// listening for them ////
		//
		that.onAddEdge = addEdgeCallbacks.add;
		that.onRemoveEdge = removeEdgeCallbacks.add;


		//// creating them ////
		//
		that.addNewEdge = function (from, to, value) {
			if (that.hasEdge(from, to)) {
				throw new Graph.EdgeExistsError(from, to, that.edgeValue(from, to));
			}
			if (!that.hasVertex(from)) {
				if (that.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(from);
				} else {
					throw new Graph.VertexNotExistsError(from).v(to);
				}
			} else if (!that.hasVertex(to)) {
				throw new Graph.VertexNotExistsError(to);
			}

			_edges[from][to] = value;
			_reverseEdges[to][from] = null;
			_edgeCount += 1;
			addEdgeCallbacks.fire(from, to, value);
		};

		that.createNewEdge = function (from, to, value) {
			if (that.hasEdge(from, to)) {
				throw new Graph.EdgeExistsError(from, to, that.edgeValue(from, to));
			}

			that.ensureVertex(from);
			that.ensureVertex(to);
			that.addNewEdge(from, to, value);
		};

		that.setEdge = function (from, to, value) {
			if (!that.hasEdge(from, to)) { throw new Graph.EdgeNotExistsError(from, to); }

			_edges[from][to] = value;
		};

		that.spanEdge = function (from, to, value) {
			if (!that.hasVertex(from)) {
				if (that.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(from);
				} else {
					throw new Graph.VertexNotExistsError(from).v(to);
				}
			} else if (!that.hasVertex(to)) {
				throw new Graph.VertexNotExistsError(to);
			}

			if (!that.hasEdge(from, to)) {
				that.addNewEdge(from, to, value);
			}
		};

		that.addEdge = function (from, to, value) {
			if (that.hasEdge(from, to)) {
				that.setEdge(from, to, value);
			} else {
				that.addNewEdge(from, to, value);
			}
		};

		that.ensureEdge = function (from, to, value) {
			if (!that.hasEdge(from, to)) {
				that.createNewEdge(from, to, value);
			}
		};

		that.createEdge = function (from, to, value) {
			if (that.hasEdge(from, to)) {
				that.setEdge(from, to, value);
			} else {
				that.createNewEdge(from, to, value);
			}
		};


		//// removing them ////
		//
		that.removeExistingEdge = function (from, to) {
			if (!that.hasEdge(from, to)) { throw new Graph.EdgeNotExistsError(from, to); }

			if (typeof _edges[from] !== 'undefined') {
				var valueOfRemovedEdge = _edges[from][to];
				delete _edges[from][to];
			}
			if (typeof _reverseEdges[to] !== 'undefined') {
				delete _reverseEdges[to][from];
			}
			_edgeCount -= 1;
			removeEdgeCallbacks.fire(from, to, valueOfRemovedEdge);
		};

		that.removeEdge = function (from, to) {
			if (that.hasEdge(from, to)) {
				that.removeExistingEdge(from, to);
			}
		};


		///////////////////////////////////////////////////////////////////////////////////////////


		that.vertexCount = function () {
			return _vertexCount;
		};


		that.hasVertex = function (key) {
			return key in _vertices;
		};


		that.vertexValue = function (key) {
			return _vertices[key];
		};


		///////////////////////////////////////////////////////////////////////////////////////////


		that.edgeCount = function () {
			return _edgeCount;
		};


		that.hasEdge = function (from, to) {
			return that.hasVertex(from) &&
			       that.hasVertex(to) &&
			       from in _edges &&
			       to in _edges[from];
		};


		that.edgeValue = function (from, to) {
			return that.hasEdge(from, to) ? _edges[from][to] : undefined;
		};


		///////////////////////////////////////////////////////////////////////////////////////////


		that.eachVertex = function (handler) {
			Object.keys(_vertices).forEach(function (key) {
				handler(key, _vertices[key]);
			});
		};


		that.eachVertexFrom = function (from, handler) {
			if (!that.hasVertex(from)) { throw new Graph.VertexNotExistsError(from); }

			Object.keys(_edges[from]).forEach(function (to) {
				handler(to, that.vertexValue(to), that.edgeValue(from, to));
			});
		};


		that.eachVertexTo = function (to, handler) {
			if (!that.hasVertex(to)) { throw new Graph.VertexNotExistsError(to); }

			Object.keys(_reverseEdges[to]).forEach(function (from) {
				handler(from, that.vertexValue(from), that.edgeValue(from, to));
			});
		};


		that.eachEdge = function (handler) {
			Object.keys(_edges).forEach(function (from) {
				Object.keys(_edges[from]).forEach(function (to) {
					handler(from, to, _edges[from][to]);
				});
			});
		};


		that.clearEdges = that.eachEdge.bind(undefined, that.removeEdge);
		that.clear = that.eachVertex.bind(undefined, that.destroyVertex);


		that.hasPath = function (from, to) {
			if (!that.hasVertex(from) || !that.hasVertex(to)) { return false; }

			var visited = {};

			//// Recursive auxiliary function: Is there a path from 'current' to 'to'?
			//
			function hasPathAux(current) {
				if (that.hasEdge(current, to)) { return true; }
				visited[current] = true;
				var found = false;
				that.eachVertexFrom(current, function (next) {
					if (!found && !visited[next] && hasPathAux(next)) {
						found = true;
					}
				});
				delete visited[current];
				return found;
			}

			return hasPathAux(from);
		};

		that.topologically = function (handler) {
			var visited = [];
			var handled = {};

			function visit(a) {
				visited.push(a);

				var i = visited.indexOf(a);
				if (i !== visited.length - 1) {
					var cycle = visited.slice(i+1).reverse();
					throw new Graph.CycleError(cycle);
				}

				if (!handled[a]) {
					that.eachVertexTo(a, visit);
					handled[a] = { returned: handler(a, that.vertexValue(a)) };
				}

				visited.pop();
			}

			that.eachVertex(function (a) {
				if (!handled[a]) {
					visit(a);
				}
			});
		};


//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	}///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  // Exceptions //////////////////////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	function newError(name, constructor) {
		//noinspection JSUnusedGlobalSymbols
		constructor.prototype.__proto__ = Error.prototype;
		constructor.prototype.constructor = constructor;
		constructor.prototype.name = name;
		return constructor;
	}


	Graph.VertexExistsError = newError("VertexExistsError", function (key, value) {
		var that = this;

		function refreshMessage() {
			that.message = "This graph has " +
			               (that.vertices === 1 ? "a vertex" : "vertices") +
			               " '" + Object.keys(that.vertices).join("', '") + "'";
		}

		that.v = function (key, value) {
			that.vertices[key] = value;
			refreshMessage();
			return that;
		};

		that.vertices = {};
		if (typeof key !== 'undefined') {
			that.v(key, value);
		}

		refreshMessage();
	});


	Graph.VertexNotExistsError = newError("VertexNotExistError", function (key) {
		var that = this;

		function refreshMessage() {
			that.message = "This graph does not have " +
			               (that.vertices === 1 ? "a vertex" : "vertices") +
			               " '" + Object.keys(that.vertices).join("', '") + "'";
		}

		that.v = function (key) {
			that.vertices[key] = undefined;
			refreshMessage();
			return that;
		};

		that.vertices = {};
		if (typeof key !== 'undefined') {
			that.v(key);
		}

		refreshMessage();
	});


	Graph.EdgeExistsError = newError("EdgeExistsError", function (from, to, value) {
		var that = this;

		function refreshMessage() {
			var edges = [];

			Object.keys(that.edges).forEach(function (from) {
				Object.keys(that.edges[from]).forEach(function (to) {
					edges.push("('" + from + "', '" + to + "')");
				});
			});

			that.message = "This graph has " +
			               (edges.length === 1 ? "an edge " : "edges ") +
			               edges.join(", ");
		}

		that.e = function (from, to, value) {
			if (typeof (that.edges[from]) === 'undefined') {
				that.edges[from] = {};
			}
			that.edges[from][to] = value;
			refreshMessage();
			return that;
		};

		that.edges = {};
		if (typeof from !== 'undefined' && typeof to !== 'undefined') {
			that.e(from, to, value);
		}

		refreshMessage();
	});


	Graph.EdgeNotExistsError = newError("EdgeNotExistError", function (from, to) {
		var that = this;

		function refreshMessage() {
			var edges = [];

			Object.keys(that.edges).forEach(function (from) {
				Object.keys(that.edges[from]).forEach(function (to) {
					edges.push("('" + from + "', '" + to + "')");
				});
			});

			that.message = "This graph does not have " +
			               (edges.length === 1 ? "an edge " : "edges ") +
			               edges.join(", ");
		}

		that.e = function (from, to) {
			if (typeof (that.edges[from]) === 'undefined') {
				that.edges[from] = {};
			}
			that.edges[from][to] = undefined;
			refreshMessage();
			return that;
		};

		that.edges = {};
		if (typeof from !== 'undefined' && typeof to !== 'undefined') {
			that.e(from, to);
		}

		refreshMessage();
	});


	Graph.HasConnectedEdgesError = newError("HasConnectedEdgesError", function (key) {
		this.message = "The '" + key + "' vertex has connected edges";
		this.key = key;
	});


	Graph.CycleError = newError("CycleError", function (cycle) {
		this.message = "This graph contains a cycle: " + this.cycle;
		this.cycle = cycle;
	});


//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return Graph;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
