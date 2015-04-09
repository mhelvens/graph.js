/**
 * The main and only module of the js-graph library.
 * @public
 * @file
 */
'use strict';


//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The main class of this library, to be used for representing a mathematical (di)graph.
 * @public
 * @class JsGraph
 */
export default class JsGraph {

	constructor() {
		this._vertices     = new Map(); // key -> value
		this._edges        = new Map(); // from -> to -> value
		this._reverseEdges = new Map(); // to -> Set<from> (_edges contains the values)
		this._vertexCount  = 0;
		this._edgeCount    = 0;
	}


	//////////////////////////////
	////////// Vertices //////////
	//////////////////////////////

	//// creating them ////

	/**
	 * Add a new vertex to this graph. If a vertex with this key already exists,
	 * a {@link JsGraph.VertexExistsError} is thrown.
	 * @public
	 * @method JsGraph#addNewVertex
	 * @see {@link JsGraph#addVertex|addVertex}
	 * @see {@link JsGraph#setVertex|setVertex}
	 * @see {@link JsGraph#ensureVertex|ensureVertex}
	 * @param key   {string} - the key with which to refer to this new vertex
	 * @param value {*}      - the value stored in this new vertex
	 */
	addNewVertex(key, value) {
		if (this.hasVertex(key)) {
			throw new JsGraph.VertexExistsError(key, this._vertices.get(key));
		}
		this._vertices.set(key, value);
		this._edges.set(key, new Map());
		this._reverseEdges.set(key, new Set());
		this._vertexCount += 1;
	}

	/**
	 * Set the value of an existing vertex in this graph. If a vertex with this key does not exist,
	 * a {@link JsGraph.VertexNotExistsError} is thrown.
	 * @public
	 * @method JsGraph#setVertex
	 * @see {@link JsGraph#addVertex|addVertex}
	 * @see {@link JsGraph#addNewVertex|addNewVertex}
	 * @see {@link JsGraph#ensureVertex|ensureVertex}
	 * @param key   {string} - the key belonging to the vertex
	 * @param value {*}      - the new value to be stored in this vertex
	 */
	setVertex(key, value) {
		if (!this.hasVertex(key)) {
			throw new JsGraph.VertexNotExistsError(key);
		}
		this._vertices.set(key, value);
	}


	/**
	 * Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
	 * If it does not yet exist, a new vertex is added with the given key and value.
	 * @public
	 * @method JsGraph#ensureVertex
	 * @see {@link JsGraph#addVertex|addVertex}
	 * @see {@link JsGraph#addNewVertex|addNewVertex}
	 * @see {@link JsGraph#setVertex|setVertex}
	 * @param key   {string} - the key for the vertex
	 * @param value {*}      - the new value to be stored in this vertex
	 */
	ensureVertex(key, value) {
		if (!this.hasVertex(key)) {
			this.addNewVertex(key, value);
		}
	}

	/**
	 * Add a new vertex to this graph. If a vertex with this key already exists,
	 * the value of that vertex is overwritten.
	 * @public
	 * @method JsGraph#addVertex
	 * @see {@link JsGraph#addNewVertex|addNewVertex}
	 * @see {@link JsGraph#setVertex|setVertex}
	 * @see {@link JsGraph#ensureVertex|ensureVertex}
	 * @param key   {string} - the key with which to refer to this new vertex
	 * @param value {*}      - the value stored in this new vertex
	 */
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
		this._vertices.delete(key);
		this._vertexCount -= 1;
	}

	destroyExistingVertex(key) {
		if (!this.hasVertex(key)) {
			throw new JsGraph.VertexNotExistsError(key);
		}
		for (let [to] of this.verticesFrom(key)) {
			this.removeEdge(key, to);
		}
		for (let [from] of this.verticesTo(key)) {
			this.removeEdge(from, key);
		}
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
		this._edges.get(from).delete(to);
		this._reverseEdges.get(to).delete(from);
		this._edgeCount -= 1;
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
		for (let [from, to] of this.edges()) { this.removeEdge(from, to) }
	}

	clear() {
		for (let [v] of this.vertices()) { this.destroyVertex(v) }
	}


	////////////////////////////////////////
	////////// (Advanced) Queries //////////
	////////////////////////////////////////

	equals(other=undefined, eq=(x,y,from,to)=>x===y) {
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
		let visited = new Set();
		let handled = new Set();

		const visit = (a) => {
			/* if a cycle is found, record it and return */
			if (visited.has(a)) {
				return true;
			}

			/* if this vertex was already handled, no cycle can be found here */
			if (handled.has(a)) { return false }
			handled.add(a);

			/* recursively visit successors to check for cycles */
			visited.add(a);
			for (let [b] of this.verticesFrom(a)) {
				if (visit(b)) { return true }
			}
			visited.delete(a);
		};

		for (let [a] of this.vertices()) {
			if (visit(a)) { return true }
		}

		return false;
	}

	hasPath(from, to) {
		if (!this.hasVertex(from) || !this.hasVertex(to)) {
			return false;
		}

		var visited = new Set();

		/* Recursive auxiliary function: Is there a path from 'current' to 'to'? */
		const hasPathAux = (current) => {
			if (this.hasEdge(current, to)) {
				return true;
			}
			visited.add(current);
			for (let [next] of this.verticesFrom(current)) {
				if (!visited.has(next) && hasPathAux(next)) {
					return true;
				}
			}
			visited.delete(current);
			return false;
		};

		return hasPathAux(from);
	}


	/////////////////////////////
	////////// Cloning //////////
	/////////////////////////////

	clone(transform=v=>v) {
		var result = new JsGraph();
		for (let [key, val] of this.vertices()) {
			result.addVertex(key, transform(val));
		}
		for (let [from, to, val] of this.edges()) {
			result.addEdge(from, to, transform(val));
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

/**
 * @public
 * @class JsGraph.VertexExistsError
 * @extends Error
 * @see {@link JsGraph#addVertex|addNewVertex}
 */
/**
 * the set of relevant vertices
 * @public
 * @constant vertices
 * @memberof JsGraph.VertexExistsError
 * @instance
 * @type {Set.<{ key, value }>}
 */
JsGraph.VertexExistsError = class VertexExistsError extends Error {
	constructor(key, value) {
		this.vertices = new Set();
		this.v(key, value);
	}
	v(key, value) {
		this.vertices.add({ key, value });
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
		this.message = `This graph has ${aVertices} '${
			[...this.vertices].map((v) => v.key).join("', '")
		}'`;
	}
};

JsGraph.VertexNotExistsError = class VertexNotExistError extends Error {
	constructor(key) {
		this.vertices = new Set();
		this.v(key);
	}
	v(key) {
		this.vertices.add({ key });
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
		this.message = `This graph does not have ${aVertices} '${
			[...this.vertices].map((v) => v.key).join("', '")
		}'`;
	}
};

JsGraph.EdgeExistsError = class EdgeExistsError extends Error {
	constructor(from, to, value) {
		this.edges = new Set();
		this.e(from, to, value);
	}
	e(from, to, value) {
		this.edges.add({ from, to, value });
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var edges = [];
		for (let {from, to} of this.edges) {
			edges.push("('" + from + "', '" + to + "')");
		}
		var anEdges = edges.length === 1 ? "an edge" : "edges";
		this.message = `This graph has ${anEdges} ${edges.join(", ")}`;
	}
};

JsGraph.EdgeNotExistsError = class EdgeNotExistError extends Error {
	constructor(from, to) {
		this.edges = new Set();
		this.e(from, to);
	}
	e(from, to) {
		this.edges.add({ from, to });
		this._refreshMessage();
		return this;
	}
	_refreshMessage() {
		var edges = [];
		for (let {from, to} of this.edges) {
			edges.push("('" + from + "', '" + to + "')");
		}
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
