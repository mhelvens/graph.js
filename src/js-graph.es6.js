'use strict';

//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Utility /////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

class Callbacks {
	
	constructor() {
		this._callbacks = new Set();
	}
	
	add(fn) {
		if (!this._callbacks.has(fn)) {
			this._callbacks.add(fn);
		}
		return () => {
			this._callbacks.delete(fn);
		};
	}
	
	fire(...args) {
		for (let fn of this._callbacks) {
			fn(...args);
		}
	}
	
}


//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

export default class JsGraph {

	constructor() {
		this._vertices     = new Map(); // key -> value
		this._edges        = new Map(); // from -> to -> value
		this._reverseEdges = new Map(); // to -> Set<from> (_edges contains the values)
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
			throw new JsGraph.VertexExistsError(key, this._vertices.get(key));
		}
		this._vertices.set(key, value);
		this._edges.set(key, new Map());
		this._reverseEdges.set(key, new Set());
		this._vertexCount += 1;
		this._addVertexCallbacks.fire(key, value);
	}

	setVertex(key, value) {
		if (!this.hasVertex(key)) {
			throw new JsGraph.VertexNotExistsError(key);
		}
		this._vertices.set(key, value);
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
		if (this._edges.get(key).size > 0) {
			throw new JsGraph.HasConnectedEdgesError(key);
		}
		if (this._reverseEdges.get(key).size > 0) {
			throw new JsGraph.HasConnectedEdgesError(key);
		}
		var valueOfRemovedVertex = this._vertices.get(key);
		this._vertices.delete(key);
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

	vertexCount()    { return this._vertexCount       }
	hasVertex(key)   { return this._vertices.has(key) }
	vertexValue(key) { return this._vertices.get(key) }


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
		this._edges.get(from).set(to, value);
		this._reverseEdges.get(to).add(from);
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
		this._edges.get(from).set(to, value);
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
		var valueOfRemovedEdge = this._edges.get(from).get(to);
		this._edges.get(from).delete(to);
		this._reverseEdges.get(to).delete(from);
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
			this._edges.has(from) &&
			this._edges.get(from).has(to);
	}

	edgeValue(from, to) {
		return this.hasEdge(from, to) ? this._edges.get(from).get(to) : undefined;
	}


	///////////////////////////////////////////////
	//////////// ES6 Iterable interfaces //////////
	///////////////////////////////////////////////

	[Symbol.iterator]() { return this.vertices() }

	*vertices() {
		var done = new Set();
		for (let [key, value] of this._vertices) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield [key, value];
			}
		}
	}

	*edges() {
		var done = new Map();
		for (let from of this._edges.keys()) {
			if (!done.has(from)) { done.set(from, new Set()) }
			for (let to of this._edges.get(from).keys()) {
				if (this.hasEdge(from, to) && !done.get(from).has(to)) {
					done.get(from).add(to);
					yield [from, to, this._edges.get(from).get(to)];
				}
			}
		}
	}

	verticesFrom(from) {
		if (!this.hasVertex(from)) { throw new JsGraph.VertexNotExistsError(from) }
		return this._verticesFrom(from);
	}
	*_verticesFrom(from) {
		var done = new Set();
		for (let to of this._edges.get(from).keys()) {
			if (this.hasEdge(from, to) && !done.has(to)) {
				done.add(to);
				yield [to, this._vertices.get(to), this._edges.get(from).get(to)];
			}
		}
	}

	verticesTo(to) {
		if (!this.hasVertex(to)) { throw new JsGraph.VertexNotExistsError(to) }
		return this._verticesTo(to);
	}
	*_verticesTo(to) {
		var done = new Set();
		for (let from of this._reverseEdges.get(to)) {
			if (this.hasEdge(from, to) && !done.has(from)) {
				done.add(from);
				yield [from, this._vertices.get(from), this._edges.get(from).get(to)];
			}
		}
	}

	verticesWithPathFrom(from) {
		if (!this.hasVertex(from)) { throw new JsGraph.VertexNotExistsError(from) }
		return this._verticesWithPathFrom(from, new Set());
	}
	*_verticesWithPathFrom(from, done) {
		for (let to of this._edges.get(from).keys()) {
			if (this.hasEdge(from, to) && !done.has(to)) {
				done.add(to);
				yield [to, this._vertices.get(to)];
				yield* this._verticesWithPathFrom(to, done);
			}
		}
	}

	verticesWithPathTo(to) {
		if (!this.hasVertex(to)) { throw new JsGraph.VertexNotExistsError(to) }
		return this._verticesWithPathTo(to, new Set());
	}
	*_verticesWithPathTo(to, done) {
		for (let from of this._reverseEdges.get(to)) {
			if (this.hasEdge(from, to) && !done.has(from)) {
				done.add(from);
				yield [from, this._vertices.get(from)];
				yield* this._verticesWithPathTo(from, done);
			}
		}
	}

	*vertices_topologically() {
		var visited = []; // stack
		var handled = new Set();

		var _this = this;
		function *visit(a) {
			visited.push(a);
			var i = visited.indexOf(a);
			if (i !== visited.length - 1) {
				var cycle = visited.slice(i + 1).reverse();
				throw new JsGraph.CycleError(cycle);
			}
			if (!handled.has(a)) {
				for (let [b] of _this.verticesTo(a)) {
					yield* visit(b);
				}
				if (_this.hasVertex(a)) {
					yield [a, _this._vertices.get(a)];
				}
				handled.add(a);
			}
			visited.pop();
		}
		for (let [a] of this.vertices()) {
			if (!handled.has(a)) {
				yield* visit(a);
			}
		}
	}


	/////////////////////////////////////////
	////////// Old Style Iteration //////////
	/////////////////////////////////////////

	eachVertex(handler) {
		for (let args of this.vertices()) {
			if (handler(...args) === false) { break }
		}
	}

	eachEdge(handler) {
		for (let args of this.edges()) {
			if (handler(...args) === false) { break }
		}
	}

	eachVertexFrom(from, handler) {
		for (let args of this.verticesFrom(from)) {
			if (handler(...args) === false) { break }
		}
	}

	eachVertexTo(to, handler) {
		for (let args of this.verticesTo(to)) {
			if (handler(...args) === false) { break }
		}
	}

	eachVertexWithPathFrom(from, handler) {
		for (let args of this.verticesWithPathFrom(from)) {
			if (handler(...args) === false) { break }
		}
	}

	eachVertexWithPathTo(to, handler) {
		for (let args of this.verticesWithPathTo(to)) {
			if (handler(...args) === false) { break }
		}
	}

	eachVertexTopologically(handler) {
		for (let args of this.vertices_topologically()) {
			if (handler(...args) === false) { break }
		}
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


	////////////////////////////////////////
	////////// (Advanced) Queries //////////
	////////////////////////////////////////

	equals(other, eq=(x,y,from,to)=>x===y) {
		if (!(other instanceof JsGraph))                { return false }
		if (this.vertexCount() !== other.vertexCount()) { return false }
		if (this.edgeCount()   !== other.edgeCount()  ) { return false }
		for (let [key, value] of this.vertices()) {
			if (!other.hasVertex(key))                   { return false }
			if (!eq(value, other.vertexValue(key), key)) { return false }
		}
		for (let [from, to, value] of this.edges()) {
			if (!other.hasEdge(from, to))                        { return false }
			if (!eq(value, other.edgeValue(from, to), from, to)) { return false }
		}
		return true;
	}

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
		for (let [key, val] of this.vertices()) {
			result.addVertex(key, val);
		}
		for (let [from, to, val] of this.edges()) {
			result.addEdge(from, to, val);
		}
		return result;
	}

	transitiveReduction() {
		var result = this.clone();
		for (let [x] of this.vertices()) {
			for (let [y] of this.vertices()) {
				if (result.hasEdge(x, y)) {
					for (let [z] of this.vertices()) {
						if (result.hasPath(y, z)) {
							result.removeEdge(x, z);
						}
					}
				}
			}
		}
		return result;
	}

}


//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Errors //////////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

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
