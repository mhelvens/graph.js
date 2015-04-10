'use strict';

//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @class JsGraph
 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
 */
export default class JsGraph {

	constructor() {
		this._vertices     = new Map(); // Map.< string, * >
		this._edges        = new Map(); // Map.< string, Map.<string, *> >
		this._reverseEdges = new Map(); // Map.< string, Set.<*> >
		this._vertexCount  = 0;
		this._edgeCount    = 0;
	}


	//////////////////////////////
	////////// Vertices //////////
	//////////////////////////////

	////////// creating them //////////

	/**
	 * Add a new vertex to this graph.
	 * @throws {JsGraph.VertexExistsError} if a vertex with this key already exists
	 * @param key   {string} the key with which to refer to this new vertex
	 * @param value {*}      the value to store in this new vertex
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
	 * Set the value of an existing vertex in this graph.
	 * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key   {string} the key belonging to the vertex
	 * @param value {*}      the value to store in this vertex
	 */
	setVertex(key, value) {
		if (!this.hasVertex(key)) {
			throw new JsGraph.VertexNotExistsError(key);
		}
		this._vertices.set(key, value);
	}

	/**
	 * Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
	 * If it does not yet exist, a new vertex is added with the given value.
	 * @param key   {string} the key for the vertex
	 * @param value {*}      the value to store if a new vertex is added
	 */
	ensureVertex(key, value) {
		if (!this.hasVertex(key)) {
			this.addNewVertex(key, value);
		}
	}

	/**
	 * Add a new vertex to this graph. If a vertex with this key already exists,
	 * the value of that vertex is overwritten.
	 * @param key   {string} the key with which to refer to this new vertex
	 * @param value {*}      the value to store in this new vertex
	 */
	addVertex(key, value) {
		if (this.hasVertex(key)) {
			this.setVertex(key, value);
		} else {
			this.addNewVertex(key, value);
		}
	}


	////////// removing them //////////

	/**
	 * Remove an existing vertex from this graph.
	 * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	 * @throws {JsGraph.HasConnectedEdgesError} if there are still edges connected to this vertex
	 * @param key {string} the key of the vertex to remove
	 */
	removeExistingVertex(key) {
		if (!this.hasVertex(key)) {
			throw new JsGraph.VertexNotExistsError(key);
		}
		if (this._edges.get(key).size > 0 || this._reverseEdges.get(key).size > 0) {
			throw new JsGraph.HasConnectedEdgesError(key);
		}
		this._vertices.delete(key);
		this._vertexCount -= 1;
	}

	/**
	 * Remove an existing vertex from this graph, as well as all edges connected to it.
	 * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to remove
	 */
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

	/**
	 * Remove an existing vertex from this graph.
	 * If a vertex with this key does not exist, nothing happens.
	 * @throws {JsGraph.HasConnectedEdgesError} if there are still edges connected to this vertex
	 * @param key {string} the key of the vertex to remove
	 */
	removeVertex(key) {
		if (this.hasVertex(key)) {
			this.removeExistingVertex(key);
		}
	}

	/**
	 * Remove a vertex from this graph, as well as all edges connected to it.
	 * If a vertex with this key does not exist, nothing happens.
	 * @param key {string} the key of the vertex to remove
	 */
	destroyVertex(key) {
		if (this.hasVertex(key)) {
			this.destroyExistingVertex(key);
		}
	}


	////////// querying them //////////

	/**
	 * @returns {number} the number of vertices in the whole graph
	 */
	vertexCount() { return this._vertexCount }

	/**
	 * Ask whether a vertex with a given key exists.
	 * @param key {string} the key to query
	 * @returns {boolean} whether there is a vertex with the given key
	 */
	hasVertex(key) { return this._vertices.has(key) }

	/**
	 * Get the value associated with the vertex of a given key.
	 * @param key {string} the key to query
	 * @returns {*} the value associated with the vertex of the given key.
	 * Note that a return value of `undefined` can mean
	 *
	 * 1. that there is no such vertex, or
	 * 2. that the stored value is actually `undefined`.
	 *
	 * Use {@link JsGraph#hasVertex} to distinguish these cases.
	 */
	vertexValue(key) { return this._vertices.get(key) }


	///////////////////////////
	////////// Edges //////////
	///////////////////////////

	////////// adding them //////////

	/**
	 * Add a new edge to this graph.
	 * @throws {JsGraph.EdgeExistsError} if an edge between `from` and `to` already exists
	 * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	 * @param from  {string} the key for the originating vertex
	 * @param to    {string} the key for the terminating vertex
	 * @param value {*}      the value to store in this new edge
	 */
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

	/**
	 * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	 * in the graph, they are implicitly added with an `undefined` value.
	 * @throws {JsGraph.EdgeExistsError} if an edge between `from` and `to` already exists
	 * @param from  {string} the key for the originating vertex
	 * @param to    {string} the key for the terminating vertex
	 * @param value {*}      the value to store in this new edge
	 */
	createNewEdge(from, to, value) {
		if (this.hasEdge(from, to)) {
			throw new JsGraph.EdgeExistsError(from, to, this.edgeValue(from, to));
		}
		this.ensureVertex(from);
		this.ensureVertex(to);
		this.addNewEdge(from, to, value);
	}

	/**
	 * Set the value of an existing edge in this graph.
	 * @throws {JsGraph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	 * @param from  {string} the key for the originating vertex
	 * @param to    {string} the key for the terminating vertex
	 * @param value {*}      the value to store in this edge
	 */
	setEdge(from, to, value) {
		if (!this.hasEdge(from, to)) {
			throw new JsGraph.EdgeNotExistsError(from, to);
		}
		this._edges.get(from).set(to, value);
	}

	/**
	 * Make sure an edge between the `from` and `to` vertices in this graph.
	 * If one already exists, nothing is done.
	 * If one does not yet exist, a new edge is added with the given value.
	 * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	 * @param from  {string} the key for the originating vertex
	 * @param to    {string} the key for the terminating vertex
	 * @param value {*}      the value to store if a new edge is added
	 */
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

	/**
	 * Add a new edge to this graph. If an edge between `from` and `to` already exists,
	 * the value of that edge is overwritten.
	 * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	 * @param from  {string} the key for the originating vertex
	 * @param to    {string} the key for the terminating vertex
	 * @param value {*}      the value to store in this new edge
	 */
	addEdge(from, to, value) {
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
	 * @param from  {string} the key for the originating vertex
	 * @param to    {string} the key for the terminating vertex
	 * @param value {*}      the value to store if a new edge is added
	 */
	ensureEdge(from, to, value) {
		if (!this.hasEdge(from, to)) {
			this.createNewEdge(from, to, value);
		}
	}

	/**
	 * Add a new edge to this graph. If an edge between the `from` and `to`
	 * vertices already exists, the value of that edge is overwritten.
	 * If the `from` and/or `to` vertices do not yet exist
	 * in the graph, they are implicitly added with an `undefined` value.
	 * @param from  {string} the key for the originating vertex
	 * @param to    {string} the key for the terminating vertex
	 * @param value {*}      the value to store if a new edge is added
	 */
	createEdge(from, to, value) {
		if (this.hasEdge(from, to)) {
			this.setEdge(from, to, value);
		} else {
			this.createNewEdge(from, to, value);
		}
	}


	////////// removing them //////////

	/**
	 * Remove an existing edge from this graph.
	 * @throws {JsGraph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 */
	removeExistingEdge(from, to) {
		if (!this.hasEdge(from, to)) {
			throw new JsGraph.EdgeNotExistsError(from, to);
		}
		this._edges.get(from).delete(to);
		this._reverseEdges.get(to).delete(from);
		this._edgeCount -= 1;
	}

	/**
	 * Remove an edge from this graph.
	 * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 */
	removeEdge(from, to) {
		if (this.hasEdge(from, to)) {
			this.removeExistingEdge(from, to);
		}
	}


	////////// querying them //////////

	/**
	 * @returns {number} the number of edges in the whole graph
	 */
	edgeCount() { return this._edgeCount }

	/**
	 * Ask whether an edge between given `from` and `to` vertices exist.
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
	 */
	hasEdge(from, to) {
		return this.hasVertex(from) &&
			this.hasVertex(to) &&
			this._edges.has(from) &&
			this._edges.get(from).has(to);
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
	 * Use {@link JsGraph#hasEdge} to distinguish these cases.
	 */
	edgeValue(from, to) {
		return this.hasEdge(from, to) ? this._edges.get(from).get(to) : undefined;
	}


	///////////////////////////////////////////////
	//////////// ES6 Iterable interfaces //////////
	///////////////////////////////////////////////

	/**
	 * Iterate over all vertices of the graph, in no particular order.
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = jsGraph.vertices(), keyVal = it.next(); !it.done;) {
	 *     var key   = keyVal[0],
	 *         value = keyVal[1];
	 *     // iterates over all vertices of the graph
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of jsGraph.vertices()) {
	 *     // iterates over all vertices of the graph
	 * }
	 * @see {@link JsGraph#@@iterator}
	 */
	*vertices() {
		var done = new Set();
		for (let [key, value] of this._vertices) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield [key, value];
			}
		}
	}

	/**
	 * A {@link JsGraph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
	 * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
	 * @method JsGraph#@@iterator
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (let [key, value] of jsGraph) {
	 *     // iterates over all vertices of the graph
	 * }
	 * @see {@link JsGraph#vertices}
	 */
	[Symbol.iterator]() { return this.vertices() }

	/**
	 * Iterate over all edges of the graph, in no particular order.
	 * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = jsGraph.edges(), fromToVal = it.next(); !it.done;) {
	 *     var from  = fromToVal[0],
	 *         to    = fromToVal[1],
	 *         value = fromToVal[2];
	 *     // iterates over all edges of the graph
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [from, to, value] of jsGraph.edges()) {
	 *     // iterates over all vertices of the graph
	 * }
	 */
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

	/**
	 * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
	 * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	 * @param from {string} the key of the vertex to take the outgoing edges from
	 * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = jsGraph.verticesFrom(from), toVertexEdge = it.next(); !it.done;) {
	 *     var to          = toVertexEdge[0],
	 *         vertexValue = toVertexEdge[1],
	 *         edgeValue   = toVertexEdge[2];
	 *     // iterates over all outgoing vertices of the `from` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [to, vertexValue, edgeValue] of jsGraph.verticesFrom(from)) {
	 *     // iterates over all outgoing edges of the `from` vertex
	 * }
	 */
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


	/**
	 * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	 * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	 * @param to {string} the key of the vertex to take the incoming edges from
	 * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = jsGraph.verticesTo(to), fromVertexEdge = it.next(); !it.done;) {
	 *     var from        = fromVertexEdge[0],
	 *         vertexValue = fromVertexEdge[1],
	 *         edgeValue   = fromVertexEdge[2];
	 *     // iterates over all outgoing vertices of the `from` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [from, vertexValue, edgeValue] of jsGraph.verticesTo(to)) {
	 *     // iterates over all incoming edges of the `to` vertex
	 * }
	 */
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

	/**
	 * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	 * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	 * @param from {string} the key of the vertex to take the reachable vertices from
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = jsGraph.verticesWithPathFrom(from), keyValue = it.next(); !it.done;) {
	 *     var key   = keyValue[0],
	 *         value = keyValue[1];
	 *     // iterates over all vertices reachable from `from`
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of jsGraph.verticesWithPathFrom(from)) {
	 *     // iterates over all vertices reachable from `from`
	 * }
	 */
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

	/**
	 * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
	 * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	 * @param to {string} the key of the vertex to take the reachable vertices from
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = jsGraph.verticesWithPathTo(to), keyValue = it.next(); !it.done;) {
	 *     var key   = keyValue[0],
	 *         value = keyValue[1];
	 *     // iterates over all vertices from which `to` can be reached
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of jsGraph.verticesWithPathTo(to)) {
	 *     // iterates over all vertices from which `to` can be reached
	 * }
	 */
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

	/**
	 * Iterate over all vertices of the graph in topological order.
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = jsGraph.vertices_topologically(), keyVal = it.next(); !it.done;) {
	 *     var key   = keyVal[0],
	 *         value = keyVal[1];
	 *     // iterates over all vertices of the graph in topological order
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of jsGraph.vertices_topologically()) {
	 *     // iterates over all vertices of the graph in topological order
	 * }
	 */
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

	/**
	 * Remove all edges from the graph, but leave the vertices intact.
	 */
	clearEdges() {
		for (let [from, to] of this.edges()) { this.removeEdge(from, to) }
	}

	/**
	 * Remove all edges and vertices from the graph, putting it back in its initial state.
	 */
	clear() {
		for (let [v] of this.vertices()) { this.destroyVertex(v) }
	}


	////////////////////////////////////////
	////////// (Advanced) Queries //////////
	////////////////////////////////////////

	/**
	 * Ask whether this graph and another graph are equal.
	 * Two graphs are equal if they have the same vertices and the same edges.
	 * @param other {JsGraph} the other graph to compare this one to
	 * @param [eq] {function(*, *, string, ?string): boolean}
	 *     a custom equality function for stored values; defaults to `===`
	 *     comparison; The first two arguments are the two values to compare.
	 *     If they are vertex values, the third argument is the vertex key.
	 *     If they are edge values, the third and fourth argument are the
	 *     `from` and `to` keys respectively. (So you can test the fourth
	 *     argument to distinguish the two cases.)
	 * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
	 */
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

	/**
	 * Test whether the graph contains a directed cycle.
	 * @returns {boolean} `false`, if there is no cycle; a truthy value if there *is* a cycle
	 *                    (not necessarily `true`; future versions of the library might return
	 *                     a description of the cycle)
	 */
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

	/**
	 * Test whether there is a directed path between a given pair of keys.
	 * @param from {string} the originating vertex
	 * @param to   {string} the terminating vertex
	 * @returns {boolean} `false`, if there is no such path; a truthy value if there *is* such a path
	 *                    (not necessarily `true`; future versions of the library might return
	 *                     a description of the path)
	 */
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

	/**
	 * Create a clone of this graph.
	 * @param [transform] {function(*, string, ?string): *}
	 *     a custom transformation function for stored values; defaults to
	 *     the identity function; The first argument is the value to clone.
	 *     If it is a vertex value, the third argument is the vertex key.
	 *     If it is an edge value, the third and fourth argument are the
	 *     `from` and `to` keys respectively. (So you can test the fourth
	 *     argument to distinguish the two cases.)
	 * @returns {JsGraph} a clone of this graph
	 */
	clone(transform=v=>v) {
		var result = new JsGraph();
		for (let [key, val] of this.vertices()) {
			result.addVertex(key, transform(val, key));
		}
		for (let [from, to, val] of this.edges()) {
			result.addEdge(from, to, transform(val, from, to));
		}
		return result;
	}

	/**
	 * Create a clone of this graph, but without any transitive edges.
	 * @param [transform] {function(*, string, ?string): *}
	 *     a custom transformation function for stored values; defaults to
	 *     the identity function; The first argument is the value to clone.
	 *     If it is a vertex value, the third argument is the vertex key.
	 *     If it is an edge value, the third and fourth argument are the
	 *     `from` and `to` keys respectively. (So you can test the fourth
	 *     argument to distinguish the two cases.)
	 * @returns {JsGraph} a clone of this graph
	 */
	transitiveReduction(transform=v=>v) {
		var result = this.clone(transform);
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
 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
 * @extends Error
 */
JsGraph.VertexExistsError = class VertexExistsError extends Error {
	constructor(key, value) {
		/**
		 * the set of relevant vertices
		 * @public
		 * @constant vertices
		 * @memberof JsGraph.VertexExistsError
		 * @instance
		 * @type {Set.<{ key: string, value }>}
		 */
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

/**
 * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
 * @extends Error
 */
JsGraph.VertexNotExistsError = class VertexNotExistError extends Error {
	constructor(key) {
		/**
		 * the set of relevant vertices
		 * @public
		 * @constant vertices
		 * @memberof JsGraph.VertexNotExistsError
		 * @instance
		 * @type {Set.<{ key: string }>}
		 */
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

/**
 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
 * @extends Error
 */
JsGraph.EdgeExistsError = class EdgeExistsError extends Error {
	constructor(from, to, value) {
		/**
		 * the set of relevant edges
		 * @public
		 * @constant edges
		 * @memberof JsGraph.EdgeExistsError
		 * @instance
		 * @type {Set.<{ from: string, to: string, value }>}
		 */
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

/**
 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
 * @extends Error
 */
JsGraph.EdgeNotExistsError = class EdgeNotExistsError extends Error {
	constructor(from, to) {
		/**
		 * the set of relevant edges
		 * @public
		 * @constant edges
		 * @memberof JsGraph.EdgeNotExistsError
		 * @instance
		 * @type {Set.<{ from: string, to: string }>}
		 */
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

/**
 * @classdesc This type of error is thrown when a vertex is expected not to have connected edges, but does.
 * @extends Error
 */
JsGraph.HasConnectedEdgesError = class HasConnectedEdgesError extends Error {
	constructor(key) {
		/**
		 * the key of the relevant vertex
		 * @public
		 * @constant key
		 * @memberof JsGraph.HasConnectedEdgesError
		 * @instance
		 * @type {string}
		 */
		this.key = key;
		this.message = `The '${key}' vertex has connected edges`;
	}
};

/**
 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
 * @extends Error
 */
JsGraph.CycleError = class CycleError extends Error {
	constructor(cycle) {
		/**
		 * the vertices involved in the cycle
		 * @public
		 * @constant cycle
		 * @memberof JsGraph.CycleError
		 * @instance
		 * @type {Array.<string>}
		 */
		this.cycle = cycle;
		this.message = `This graph contains a cycle: ${cycle}`;
	}
};
