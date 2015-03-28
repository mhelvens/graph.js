'use strict';

//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  // Utility /////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Callbacks {
	
	constructor() {
		this._callbacks = [];
	}
	
	add(fn) {
		if (this._callbacks.indexOf(fn) === -1) {
			this._callbacks.push(fn);
		}
		return () => {
			var index = this._callbacks.indexOf(fn);
			if (index !== -1) {
				this._callbacks.splice(index, 1);
			}
		};
	}
	
	fire(...args) {
		this._callbacks.forEach((fn) => {
			fn(...args);
		});
	}
	
}


//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class JsGraph {

	constructor() {
		this._vertices     = {}; // key -> value
		this._edges        = {}; // from -> to -> value
		this._reverseEdges = {}; // to -> from -> null (_edges contains the values)
		this._vertexCount  = 0;
		this._edgeCount    = 0;
		this._addVertexCallbacks    = new Callbacks();
		this._removeVertexCallbacks = new Callbacks();
		this._addEdgeCallbacks      = new Callbacks();
		this._removeEdgeCallbacks   = new Callbacks();
	}


	//////////////////////////////
	////////// Vertices //////////
	//////////////////////////////

	onAddVertex   (fn) { return this._addVertexCallbacks   .add(fn) }
	onRemoveVertex(fn) { return this._removeVertexCallbacks.add(fn) }

	//// creating them ////

	addNewVertex(key, value) {
		if (this.hasVertex(key)) {
			throw new JsGraph.VertexExistsError(key, this._vertices[key]);
		}
		this._vertices[key] = value;
		this._edges[key] = {};
		this._reverseEdges[key] = {};
		this._vertexCount += 1;
		this._addVertexCallbacks.fire(key, value);
	}

	setVertex(key, value) {
		if (!this.hasVertex(key)) {
			throw new JsGraph.VertexNotExistsError(key);
		}
		this._vertices[key] = value;
	}

	ensureVertex(key, value) {
		if (!this.hasVertex(key)) {
			this.addNewVertex(key, value);
		}
	}

	addVertex(key, value) {
		if (this.hasVertex(key)) {
			this.setVertex(key, value);
		} else {
			this.addNewVertex(key, value);
		}
	}

	//// removing them ////

	removeExistingVertex(key) {
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

	destroyExistingVertex(key) {
		if (!this.hasVertex(key)) {
			throw new JsGraph.VertexNotExistsError(key);
		}
		this.eachVertexFrom(key, (to) => {
			this.removeEdge(key, to);
		});
		this.eachVertexTo(key, (from) => {
			this.removeEdge(from, key);
		});
		this.removeExistingVertex(key);
	}

	removeVertex(key) {
		if (this.hasVertex(key)) {
			this.removeExistingVertex(key);
		}
	}

	destroyVertex(key) {
		if (this.hasVertex(key)) {
			this.destroyExistingVertex(key);
		}
	}

	//// querying them ////

	vertexCount()    { return this._vertexCount     }
	hasVertex(key)   { return key in this._vertices }
	vertexValue(key) { return this._vertices[key]   }


	///////////////////////////
	////////// Edges //////////
	///////////////////////////

	onAddEdge   (fn) { return this._addEdgeCallbacks   .add(fn) }
	onRemoveEdge(fn) { return this._removeEdgeCallbacks.add(fn) }

	addNewEdge(from, to, value) {
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

	createNewEdge(from, to, value) {
		if (this.hasEdge(from, to)) {
			throw new JsGraph.EdgeExistsError(from, to, this.edgeValue(from, to));
		}
		this.ensureVertex(from);
		this.ensureVertex(to);
		this.addNewEdge(from, to, value);
	}

	setEdge(from, to, value) {
		if (!this.hasEdge(from, to)) {
			throw new JsGraph.EdgeNotExistsError(from, to);
		}
		this._edges[from][to] = value;
	}

	spanEdge(from, to, value) {
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

	addEdge(from, to, value) {
		if (this.hasEdge(from, to)) {
			this.setEdge(from, to, value);
		} else {
			this.addNewEdge(from, to, value);
		}
	}

	ensureEdge(from, to, value) {
		if (!this.hasEdge(from, to)) {
			this.createNewEdge(from, to, value);
		}
	}

	createEdge(from, to, value) {
		if (this.hasEdge(from, to)) {
			this.setEdge(from, to, value);
		} else {
			this.createNewEdge(from, to, value);
		}
	}

	//// removing them ////

	removeExistingEdge(from, to) {
		if (!this.hasEdge(from, to)) {
			throw new JsGraph.EdgeNotExistsError(from, to);
		}
		var valueOfRemovedEdge = this._edges[from][to];
		delete this._edges[from][to];
		delete this._reverseEdges[to][from];
		this._edgeCount -= 1;
		this._removeEdgeCallbacks.fire(from, to, valueOfRemovedEdge);
	}

	removeEdge(from, to) {
		if (this.hasEdge(from, to)) {
			this.removeExistingEdge(from, to);
		}
	}

	//// querying them ////

	edgeCount() { return this._edgeCount }

	hasEdge(from, to) {
		return this.hasVertex(from) &&
			this.hasVertex(to) &&
			from in this._edges &&
			to in this._edges[from];
	}

	edgeValue(from, to) {
		return this.hasEdge(from, to) ? this._edges[from][to] : undefined;
	}


	//////////////////////////
	////////// More //////////
	//////////////////////////


	successors(from) {
		if (!this.hasVertex(from)) {
			throw new JsGraph.VertexNotExistsError(from);
		}
		return Object.keys(this._edges[from]);
	}

	predecessors(to) {
		if (!this.hasVertex(to)) {
			throw new JsGraph.VertexNotExistsError(to);
		}
		return Object.keys(this._reverseEdges[to]);
	}


	///////////////////////////////
	////////// Iteration //////////
	///////////////////////////////

	eachVertex(handler) {
		Object.keys(this._vertices).every((key) => {
			var r = handler(key, this._vertices[key]);
			return (r !== false);
		});
	}

	eachVertexFrom(from, handler) {
		if (!this.hasVertex(from)) {
			throw new JsGraph.VertexNotExistsError(from);
		}
		Object.keys(this._edges[from]).every((to) => {
			var r = handler(to, this.vertexValue(to), this.edgeValue(from, to));
			return (r !== false);
		});
	}

	eachVertexTo(to, handler) {
		if (!this.hasVertex(to)) {
			throw new JsGraph.VertexNotExistsError(to);
		}
		Object.keys(this._reverseEdges[to]).every((from) => {
			var r = handler(from, this.vertexValue(from), this.edgeValue(from, to));
			return (r !== false);
		});
	}

	eachEdge(handler) {
		Object.keys(this._edges).every((from) => {
			return Object.keys(this._edges[from]).every((to) => {
				var r = handler(from, to, this._edges[from][to]);
				return (r !== false);
			});
		});
	}

	topologically(handler) {
		var visited = [];
		var handled = {};

		var visit = (a) => {
			visited.push(a);
			var i = visited.indexOf(a);
			if (i !== visited.length - 1) {
				var cycle = visited.slice(i + 1).reverse();
				throw new JsGraph.CycleError(cycle);
			}
			if (!handled[a]) {
				this.eachVertexTo(a, visit);
				handled[a] = { returned: handler(a, this.vertexValue(a)) };
			}
			visited.pop();
		};

		this.eachVertex((a) => {
			if (!handled[a]) {
				visit(a);
			}
		});
	};


	/////////////////////////////////////////////
	////////// ES6 Iterable interfaces //////////
	/////////////////////////////////////////////

	get vertices() {
		return {
			_graph: this,
			get length() { return this._graph._vertexCount },
			[Symbol.iterator]: function*() {
				var keys = Object.keys(this._graph._vertices);
				for (let i = 0; i < keys.length; ++i) {
					yield [keys[i], this._graph._vertices[keys[i]]];
				}
			}
		};
	}

	get edges() {
		return {
			_graph: this,
			get length() { return this._graph._edgeCount },
			[Symbol.iterator]: function*() {
				var fromKeys = Object.keys(this._graph._edges);
				for (let i = 0; i < fromKeys.length; ++i) {
					var toKeys = Object.keys(this._graph._edges[fromKeys[i]]);
					for (let j = 0; j < toKeys.length; ++j) {
						yield [fromKeys[i], toKeys[j], this._graph._edges[fromKeys[i]][toKeys[j]]];
					}
				}
			}
		};
	}


	//////////////////////////////
	////////// Clearing //////////
	//////////////////////////////

	clearEdges() {
		this.eachEdge((from, to) => { this.removeEdge(from, to) });
	}

	clear() {
		this.eachVertex((v) => { this.destroyVertex(v) });
	}


	//////////////////////////////////////
	////////// Advanced Queries //////////
	//////////////////////////////////////

	hasCycle() {
		var visited = {};
		var handled = {};

		var cycleFound = false;

		var visit = (a) => {
			/* if a cycle is found, record it and return */
			if (visited[a]) {
				cycleFound = true;
				return;
			}

			/* if this vertex was already handled, no cycle can be found here */
			if (handled[a]) { return }
			handled[a] = true;

			/* recursively visit successors to check for cycles */
			visited[a] = true;
			this.eachVertexFrom(a, (b) => {
				visit(b);
				if (cycleFound) { return false }
			});
			visited[a] = false;
		};

		this.eachVertex((a) => {
			visit(a);
			if (cycleFound) { return false }
		});

		return cycleFound;
	}

	hasPath(from, to) {
		if (!this.hasVertex(from) || !this.hasVertex(to)) {
			return false;
		}

		var visited = {};

		/* Recursive auxiliary function: Is there a path from 'current' to 'to'? */
		var hasPathAux = (current) => {
			if (this.hasEdge(current, to)) {
				return true;
			}
			visited[current] = true;
			var found = false;
			this.eachVertexFrom(current, (next) => {
				if (!found && !visited[next] && hasPathAux(next)) {
					found = true;
				}
			});
			delete visited[current];
			return found;
		};

		return hasPathAux(from);
	}


	/////////////////////////////
	////////// Cloning //////////
	/////////////////////////////

	clone() {
		var result = new JsGraph();
		this.eachVertex((key, val) => {
			result.addVertex(key, val);
		});
		this.eachEdge((from, to, val) => {
			result.addEdge(from, to, val);
		});
		return result;
	}

	transitiveReduction() {
		var result = this.clone();
		result.eachVertex((x) => {
			result.eachVertex((y) => {
				if (result.hasEdge(x, y)) {
					result.eachVertex((z) => {
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


//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  // Errors //////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

JsGraph.VertexExistsError = class VertexExistsError extends Error {
	constructor(key, value) {
		this.vertices = {};
		this.v(key, value);
	}
	v(key, value) {
		this.vertices[key] = value;
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var aVertices = this.vertices === 1 ? "a vertex" : "vertices";
		this.message = `This graph has ${aVertices} '${Object.keys(this.vertices).join("', '")}'`;
	}

};

JsGraph.VertexNotExistsError = class VertexNotExistError extends Error {
	constructor(key) {
		this.vertices = {};
		this.v(key);
	}
	v(key) {
		this.vertices[key] = undefined;
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var aVertices = this.vertices === 1 ? "a vertex" : "vertices";
		this.message = `This graph does not have ${aVertices} '${Object.keys(this.vertices).join("', '")}'`;
	}

};

JsGraph.EdgeExistsError = class EdgeExistsError extends Error {
	constructor(from, to, value) {
		this.edges = {};
		this.e(from, to, value);
	}
	e(from, to, value) {
		this.edges[from] = { [to]: value };
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var edges = [];
		Object.keys(this.edges).forEach((from) => {
			Object.keys(this.edges[from]).forEach((to) => {
				edges.push("('" + from + "', '" + to + "')");
			});
		});
		var anEdges = edges.length === 1 ? "an edge" : "edges";
		this.message = `This graph has ${anEdges} ${edges.join(", ")}`;
	}
};

JsGraph.EdgeNotExistsError = class EdgeNotExistError extends Error {
	constructor(from, to) {
		this.edges = {};
		this.e(from, to);
	}
	e(from, to) {
		this.edges[from] = { [to]: undefined };
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var edges = [];
		Object.keys(this.edges).forEach((from) => {
			Object.keys(this.edges[from]).forEach((to) => {
				edges.push("('" + from + "', '" + to + "')");
			});
		});
		var anEdges = edges.length === 1 ? "an edge" : "edges";
		this.message = `This graph does not have ${anEdges} ${edges.join(", ")}`;
	}
};

JsGraph.HasConnectedEdgesError = class HasConnectedEdgesError extends Error {
	constructor(key) {
		this.message = `The '${key}' vertex has connected edges`;
		this.key = key;
	}
};

JsGraph.CycleError = class CycleError extends Error {
	constructor(cycle) {
		this.message = `This graph contains a cycle: ${cycle}`;
		this.cycle = cycle;
	}
};
