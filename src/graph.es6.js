'use strict';

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
export default class Graph {

	constructor(...parts) {
		/* storage */
		this._vertices     = new Map(); // Map.< string, * >
		this._edges        = new Map(); // Map.< string, Map.<string, *> >

		/* bookkeeping */
		this._reverseEdges = new Map(); // Map.< string, Set.<*> >
		this._sources      = new Set(); // Set.< string >
		this._sinks        = new Set(); // Set.< string >
		this._vertexCount  = 0;
		this._edgeCount    = 0;

		/* add vertices and values from constructor arguments */
		for (let [key, value] of parts) {
			if (Array.isArray(key)) {/////////////// an edge
				let [from, to] = key;
				this.createEdge(from, to, value);
			} else if (typeof key === 'string') {/// a vertex
				this.addVertex(key, value);
			}
		}
	}


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
	addNewVertex(key, value) {
		if (this.hasVertex(key)) {
			throw new Graph.VertexExistsError(key, this._vertices.get(key));
		}
		this._vertices.set(key, value);
		this._edges.set(key, new Map());
		this._reverseEdges.set(key, new Set());
		this._vertexCount += 1;
		this._sources.add(key);
		this._sinks.add(key);
	}

	/**
	 * Set the value of an existing vertex in this graph.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param  key    {string} the key belonging to the vertex
	 * @param [value] {*}      the value to store in this vertex
	 */
	setVertex(key, value) {
		if (!this.hasVertex(key)) {
			throw new Graph.VertexNotExistsError(key);
		}
		this._vertices.set(key, value);
	}

	/**
	 * Make sure a vertex with a specific key exists in this graph. If it already exists,
	 * do nothing. If it does not yet exist, add a new vertex with the given value.
	 * @param  key    {string} the key for the vertex
	 * @param [value] {*}      the value to store if a new vertex is added
	 */
	ensureVertex(key, value) {
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
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	 * @param key {string} the key of the vertex to remove
	 */
	removeExistingVertex(key) {
		if (!this.hasVertex(key)) {
			throw new Graph.VertexNotExistsError(key);
		}
		if (this._edges.get(key).size > 0 || this._reverseEdges.get(key).size > 0) {
			throw new Graph.HasConnectedEdgesError(key);
		}
		this._vertices.delete(key);
		this._vertexCount -= 1;
		this._sources.delete(key);
		this._sinks.delete(key);
	}

	/**
	 * Remove an existing vertex from this graph, as well as all edges connected to it.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to remove
	 */
	destroyExistingVertex(key) {
		if (!this.hasVertex(key)) {
			throw new Graph.VertexNotExistsError(key);
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
	 * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
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
	 * Use {@link Graph#hasVertex} to distinguish these cases.
	 */
	vertexValue(key) { return this._vertices.get(key) }


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
	addNewEdge(from, to, value) {
		if (this.hasEdge(from, to)) {
			throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
		}
		if (!this.hasVertex(from)) {
			if (this.hasVertex(to)) {
				throw new Graph.VertexNotExistsError(from);
			} else {
				throw new Graph.VertexNotExistsError(from).v(to);
			}
		} else if (!this.hasVertex(to)) {
			throw new Graph.VertexNotExistsError(to);
		}
		this._edges.get(from).set(to, value);
		this._reverseEdges.get(to).add(from);
		this._edgeCount += 1;
		this._sources.delete(to);
		this._sinks.delete(from);
	}

	/**
	 * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	 * in the graph, they are implicitly added with an `undefined` value.
	 * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	 * @param  from   {string} the key for the originating vertex
	 * @param  to     {string} the key for the terminating vertex
	 * @param [value] {*}      the value to store in this new edge
	 */
	createNewEdge(from, to, value) {
		if (this.hasEdge(from, to)) {
			throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
		}
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
	setEdge(from, to, value) {
		if (!this.hasEdge(from, to)) {
			throw new Graph.EdgeNotExistsError(from, to);
		}
		this._edges.get(from).set(to, value);
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
	spanEdge(from, to, value) {
		if (!this.hasVertex(from)) {
			if (this.hasVertex(to)) {
				throw new Graph.VertexNotExistsError(from);
			} else {
				throw new Graph.VertexNotExistsError(from).v(to);
			}
		} else if (!this.hasVertex(to)) {
			throw new Graph.VertexNotExistsError(to);
		}
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
	 * @param  from   {string} the key for the originating vertex
	 * @param  to     {string} the key for the terminating vertex
	 * @param [value] {*}      the value to store if a new edge is added
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
	 * @param  from   {string} the key for the originating vertex
	 * @param  to     {string} the key for the terminating vertex
	 * @param [value] {*}      the value to store if a new edge is added
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
	 * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 */
	removeExistingEdge(from, to) {
		if (!this.hasEdge(from, to)) {
			throw new Graph.EdgeNotExistsError(from, to);
		}
		this._edges.get(from).delete(to);
		this._reverseEdges.get(to).delete(from);
		this._edgeCount -= 1;
		if (this. inDegree(to)   === 0) { this._sources.add(to) }
		if (this.outDegree(from) === 0) { this._sinks.add(from) }
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
	 * Use {@link Graph#hasEdge} to distinguish these cases.
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
	 * for (var it = graph.vertices(), keyVal = it.next(); !it.done;) {
	 *     var key   = keyVal[0],
	 *         value = keyVal[1];
	 *     // iterates over all vertices of the graph
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.vertices()) {
	 *     // iterates over all vertices of the graph
	 * }
	 * @see {@link Graph#@@iterator}
	 */
	*vertices() {
		let done = new Set();
		for (let [key, value] of this._vertices) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield [key, value];
			}
		}
	}

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
	[Symbol.iterator]() { return this.vertices() }

	/**
	 * Iterate over all edges of the graph, in no particular order.
	 * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.edges(), fromToVal = it.next(); !it.done;) {
	 *     var from  = fromToVal[0],
	 *         to    = fromToVal[1],
	 *         value = fromToVal[2];
	 *     // iterates over all edges of the graph
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [from, to, value] of graph.edges()) {
	 *     // iterates over all vertices of the graph
	 * }
	 */
	*edges() {
		let done = new Map();
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
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	 * @param from {string} the key of the vertex to take the outgoing edges from
	 * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.verticesFrom(from), toVertexEdge = it.next(); !it.done;) {
	 *     var to          = toVertexEdge[0],
	 *         vertexValue = toVertexEdge[1],
	 *         edgeValue   = toVertexEdge[2];
	 *     // iterates over all outgoing vertices of the `from` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
	 *     // iterates over all outgoing edges of the `from` vertex
	 * }
	 */
	verticesFrom(from) {
		if (!this.hasVertex(from)) { throw new Graph.VertexNotExistsError(from) }
		return this._verticesFrom(from);
	}
	*_verticesFrom(from) {
		let done = new Set();
		for (let to of this._edges.get(from).keys()) {
			if (this.hasEdge(from, to) && !done.has(to)) {
				done.add(to);
				yield [to, this._vertices.get(to), this._edges.get(from).get(to)];
			}
		}
	}


	/**
	 * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	 * @param to {string} the key of the vertex to take the incoming edges from
	 * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.verticesTo(to), fromVertexEdge = it.next(); !it.done;) {
	 *     var from        = fromVertexEdge[0],
	 *         vertexValue = fromVertexEdge[1],
	 *         edgeValue   = fromVertexEdge[2];
	 *     // iterates over all outgoing vertices of the `from` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
	 *     // iterates over all incoming edges of the `to` vertex
	 * }
	 */
	verticesTo(to) {
		if (!this.hasVertex(to)) { throw new Graph.VertexNotExistsError(to) }
		return this._verticesTo(to);
	}
	*_verticesTo(to) {
		let done = new Set();
		for (let from of this._reverseEdges.get(to)) {
			if (this.hasEdge(from, to) && !done.has(from)) {
				done.add(from);
				yield [from, this._vertices.get(from), this._edges.get(from).get(to)];
			}
		}
	}

	/**
	 * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	 * @param from {string} the key of the vertex to take the reachable vertices from
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.verticesWithPathFrom(from), keyValue = it.next(); !it.done;) {
	 *     var key   = keyValue[0],
	 *         value = keyValue[1];
	 *     // iterates over all vertices reachable from `from`
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.verticesWithPathFrom(from)) {
	 *     // iterates over all vertices reachable from `from`
	 * }
	 */
	verticesWithPathFrom(from) {
		if (!this.hasVertex(from)) { throw new Graph.VertexNotExistsError(from) }
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
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	 * @param to {string} the key of the vertex to take the reachable vertices from
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.verticesWithPathTo(to), keyValue = it.next(); !it.done;) {
	 *     var key   = keyValue[0],
	 *         value = keyValue[1];
	 *     // iterates over all vertices from which `to` can be reached
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.verticesWithPathTo(to)) {
	 *     // iterates over all vertices from which `to` can be reached
	 * }
	 */
	verticesWithPathTo(to) {
		if (!this.hasVertex(to)) { throw new Graph.VertexNotExistsError(to) }
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
	 * Iterate over all vertices that have no incoming edges, in no particular order.
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.sources(), keyValue = it.next(); !it.done;) {
	 *     var key   = keyValue[0],
	 *         value = keyValue[1];
	 *     // iterates over all vertices with no incoming edges
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.sources()) {
	 *     // iterates over all vertices with no incoming edges
	 * }
	 */
	*sources() {
		let done = new Set();
		for (let key of this._sources) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield [key, this.vertexValue(key)];
			}
		}
	}


	/**
	 * Iterate over all vertices that have no outgoing edges, in no particular order.
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.sinks(), keyValue = it.next(); !it.done;) {
	 *     var key   = keyValue[0],
	 *         value = keyValue[1];
	 *     // iterates over all vertices with no outgoing edges
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.sinks()) {
	 *     // iterates over all vertices with no outgoing edges
	 * }
	 */
	*sinks() {
		let done = new Set();
		for (let key of this._sinks) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield [key, this.vertexValue(key)];
			}
		}
	}


	/**
	 * Iterate over all vertices of the graph in topological order.
	 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	 * @example
	 * for (var it = graph.vertices_topologically(), keyVal = it.next(); !it.done;) {
	 *     var key   = keyVal[0],
	 *         value = keyVal[1];
	 *     // iterates over all vertices of the graph in topological order
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.vertices_topologically()) {
	 *     // iterates over all vertices of the graph in topological order
	 * }
	 */
	*vertices_topologically() {
		let visited = []; // stack
		let handled = new Set();

		let _this = this;
		function *visit(a) {
			visited.push(a);
			let i = visited.indexOf(a);
			if (i !== visited.length - 1) {
				let cycle = visited.slice(i + 1).reverse();
				throw new Graph.CycleError(cycle);
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
	equals(other, eqV, eqE) {
		if (!eqV) { eqV = (x,y) => (x===y) }
		if (!eqE) { eqE = eqV              }
		if (!(other instanceof Graph))                  { return false }
		if (this.vertexCount() !== other.vertexCount()) { return false }
		if (this.edgeCount()   !== other.edgeCount()  ) { return false }
		for (let [key, value] of this.vertices()) {
			if (!other.hasVertex(key))                    { return false }
			if (!eqV(value, other.vertexValue(key), key)) { return false }
		}
		for (let [from, to, value] of this.edges()) {
			if (!other.hasEdge(from, to))                         { return false }
			if (!eqE(value, other.edgeValue(from, to), from, to)) { return false }
		}
		return true;
	}


	/**
	 * Find any directed cycle in this graph.
	 * @returns {?Array} an array with the keys of a cycle in order;
	 *                   `null`, if there is no cycle
	 */
	cycle() {
		let visited = []; // stack
		let handled = new Set();

		const visit = (a) => {
			/* if a cycle is found, record it and return */
			let i = visited.indexOf(a);
			if (i >= 0) { return visited.slice(i) }

			/* if this vertex was already handled, no cycle can be found here */
			if (handled.has(a)) { return null }
			handled.add(a);

			/* recursively visit successors to check for cycles */
			visited.push(a);
			for (let [b] of this.verticesFrom(a)) {
				let result = visit(b);
				if (result) { return result }
			}
			visited.pop();
		};

		for (let [a] of this.vertices()) {
			let result = visit(a);
			if (result) { return result }
		}

		return null;
	}


	/**
	 * Test whether this graph contains a directed cycle.
	 * @returns {boolean} whether this graph contains a directed cycle
	 */
	hasCycle() { return !!this.cycle() }


	/**
	 * Find any path between a given pair of keys.
	 * @param from {string} the originating vertex
	 * @param to   {string} the terminating vertex
	 * @returns {?array} an array with the keys of the path found between the two vertices,
	 *                   including those two vertices themselves; `null` if no such path exists
	 */
	path(from, to) {
		if (!this.hasVertex(from) || !this.hasVertex(to)) { return null }

		let visited = [];

		/* recursive auxiliary function: find a path from 'current' to 'to' */
		const hasPathAux = (current) => {
			visited.push(current);
			if (this.hasEdge(current, to)) {
				return [...visited, to];
			}
			for (let [next] of this.verticesFrom(current)) {
				if (visited.indexOf(next) === -1) {
					let result = hasPathAux(next);
					if (result) { return result }
				}
			}
			visited.pop();
			return null;
		};

		return hasPathAux(from);
	}


	/**
	 * Test whether there is a directed path between a given pair of keys.
	 * @param from {string} the originating vertex
	 * @param to   {string} the terminating vertex
	 * @returns {boolean} whether such a path exists
	 */
	hasPath(from, to) { return !!this.path(from, to) }


	/**
	 * Get the number of edges going out of a given vertex.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to query
	 * @returns {number} the number of edges going out of the `key` vertex
	 */
	outDegree(key) {
		if (!this.hasVertex(key)) { throw new Graph.VertexNotExistsError(key) }
		return this._edges.get(key).size;
	}


	/**
	 * Get the number of edges coming into a given vertex.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to query
	 * @returns {number} the number of edges coming into the `key` vertex
	 */
	inDegree(key) {
		if (!this.hasVertex(key)) { throw new Graph.VertexNotExistsError(key) }
		return this._reverseEdges.get(key).size;
	}


	/**
	 * Get the number of edges connected to a given vertex.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to query
	 * @returns {number} the number of edges connected to the `key` vertex
	 */
	degree(key) { return this.outDegree(key) + this.inDegree(key) }


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
	mergeIn(other, mV, mE) {
		if (!mV) { mV = (v1,v2)=>(typeof v2 === 'undefined' ? v1 : v2) }
		if (!mE) { mE = mV }
		for (let [key] of other.vertices()) {
			this.addVertex(key, mV(this.vertexValue(key), other.vertexValue(key)));
		}
		for (let [from, to] of other.edges()) {
			this.addEdge(from, to, mE(this.edgeValue(from, to), other.edgeValue(from, to), from, to));
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
	clone(trV, trE) {
		if (!trV) { trV = v=>v }
		if (!trE) { trE = trV  }
		let result = new Graph();
		result.mergeIn(this, (v1, v2) => trV(v2), (v1, v2) => trE(v2));
		return result;
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
	transitiveReduction(trV, trE) {
		if (!trV) { trV = v=>v }
		if (!trE) { trE = trV  }
		let result = this.clone(trV, trE);
		for (let [x] of this.vertices())
			for (let [y] of this.vertices())
				if (result.hasEdge(x, y))
					for (let [z] of this.vertices())
						if (result.hasPath(y, z))
							result.removeEdge(x, z);
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
	contractPaths(isNexus = ()=>false) {

		/* what makes a a vertex a nexus (start/end-point) */
		let nexuses = new Set(
			[...this.vertices()]
				.filter(([key, val]) => this.outDegree(key) !== 1 || this.inDegree(key) !== 1 || isNexus(key, val))
				.map(([key]) => key)
		);

		/* error if there is a branch-less cycle */
		{
			let unhandledVertices = new Set([...this.vertices()].map(([key])=>key));
			const checkForBlCycle = (key) => {
				if (!unhandledVertices.has(key)) { return }
				unhandledVertices.delete(key);
				for (let [next] of this.verticesFrom(key)) { checkForBlCycle(next) }
				for (let [next] of this.verticesTo  (key)) { checkForBlCycle(next) }
			};
			for (let key of nexuses) { checkForBlCycle(key) }
			if (unhandledVertices.size > 0) {
				let startingKey = unhandledVertices.values().next().value,
				    cycle       = [],
				    current     = startingKey;
				do {
					cycle.push(current);
					current = this.verticesFrom(current).next().value[0];
				} while (current !== startingKey);
				throw new Graph.BranchlessCycleError(cycle);
			}
		}

		/* bookkeeping */
		let contractionsToAdd = new Map();

		/* register the path starting with the given edge */
		const startPath = (start, next, backwards = false) => {
			/* functions to help branch on `backwards` */
			const fromTo       = (strt = start, nxt = next) => backwards ? [nxt, strt] : [strt, nxt];
			const verticesNext = (v) => backwards ? this.verticesTo(v) : this.verticesFrom(v);

			/* bookkeeping */
			let verticesToRemove = new Set();
			let edgesToRemove    = new Set();
			let path = new Graph();

			/* process the start of the path */
			path.addVertex(start, this.vertexValue(start));
			path.addVertex(next,  this.vertexValue(next) );
			path.addNewEdge(...fromTo(), this.edgeValue(...fromTo()));
			edgesToRemove.add(fromTo());

			/* process as [current, next] moves across the path */
			let current;
			while (!nexuses.has(next)) {
				[current, next] = [next, verticesNext(next).next().value[0]];
				path.addVertex(next, this.vertexValue(next));
				path.addNewEdge(...fromTo(current, next), this.edgeValue(...fromTo(current, next)));
				verticesToRemove.add(current);
				edgesToRemove.add(fromTo(current, next));
			}

			/* register new path contraction */
			if (!contractionsToAdd.get(fromTo()[0]))                  { contractionsToAdd.set(fromTo()[0], new Map())                    }
			if (!contractionsToAdd.get(fromTo()[0]).get(fromTo()[1])) { contractionsToAdd.get(fromTo()[0]).set(fromTo()[1], new Graph()) }
			contractionsToAdd.get(fromTo()[0]).get(fromTo()[1]).mergeIn(path);

			/* remove old edges and vertices */
			for (let key of edgesToRemove)    { this.removeExistingEdge(...key) }
			for (let key of verticesToRemove) { this.destroyExistingVertex(key) }
		};

		/* process paths starting at all nexus points */
		for (let first of nexuses) {
			for (let [next] of this.verticesFrom(first)) { startPath(first, next, false) }
			for (let [next] of this.verticesTo  (first)) { startPath(first, next, true)  }
		}

		/* add the replacement edges */
		for (let [from, toVal] of contractionsToAdd)
			for (let [to, rememberedPath] of toVal)
				this.addNewEdge(from, to, rememberedPath);
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
Graph.VertexExistsError = class VertexExistsError extends Error {
	constructor(key, value) {
		super();
		/**
		 * the set of relevant vertices
		 * @public
		 * @constant vertices
		 * @memberof Graph.VertexExistsError
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
		let aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
		this.message = `This graph has ${aVertices} '${
			[...this.vertices].map((v) => v.key).join("', '")
		}'`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
 * @extends Error
 */
Graph.VertexNotExistsError = class VertexNotExistError extends Error {
	constructor(key) {
		super();
		/**
		 * the set of relevant vertices
		 * @public
		 * @constant vertices
		 * @memberof Graph.VertexNotExistsError
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
		let aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
		this.message = `This graph does not have ${aVertices} '${
			[...this.vertices].map((v) => v.key).join("', '")
		}'`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
 * @extends Error
 */
Graph.EdgeExistsError = class EdgeExistsError extends Error {
	constructor(from, to, value) {
		super();
		/**
		 * the set of relevant edges
		 * @public
		 * @constant edges
		 * @memberof Graph.EdgeExistsError
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
		let edges = [];
		for (let {from, to} of this.edges) {
			edges.push(`('${from}', '${to}')`);
		}
		let anEdges = edges.length === 1 ? "an edge" : "edges";
		this.message = `This graph has ${anEdges} ${edges.join(", ")}`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
 * @extends Error
 */
Graph.EdgeNotExistsError = class EdgeNotExistsError extends Error {
	constructor(from, to) {
		super();
		/**
		 * the set of relevant edges
		 * @public
		 * @constant edges
		 * @memberof Graph.EdgeNotExistsError
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
		let edges = [];
		for (let {from, to} of this.edges) {
			edges.push(`('${from}', '${to}')`);
		}
		let anEdges = edges.length === 1 ? "an edge" : "edges";
		this.message = `This graph does not have ${anEdges} ${edges.join(", ")}`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when a vertex is expected not to have connected edges, but does.
 * @extends Error
 */
Graph.HasConnectedEdgesError = class HasConnectedEdgesError extends Error {
	constructor(key) {
		super();
		/**
		 * the key of the relevant vertex
		 * @public
		 * @constant key
		 * @memberof Graph.HasConnectedEdgesError
		 * @instance
		 * @type {string}
		 */
		this.key = key;
		this.message = `The '${key}' vertex has connected edges`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
 * @extends Error
 */
Graph.CycleError = class CycleError extends Error {
	constructor(cycle) {
		super();
		/**
		 * the vertices involved in the cycle
		 * @public
		 * @constant cycle
		 * @memberof Graph.CycleError
		 * @instance
		 * @type {Array.<string>}
		 */
		this.cycle = cycle;
		this.message = `This graph contains a cycle: ${cycle}`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when a graph is expected not to have a branch-less directed cycle, but does.
 * @extends Error
 */
Graph.BranchlessCycleError = class BranchlessCycleError extends Error {
	constructor(cycle) {
		super();
		/**
		 * the vertices involved in the branch-less cycle
		 * @public
		 * @constant cycle
		 * @memberof Graph.BranchlessCycleError
		 * @instance
		 * @type {Array.<string>}
		 */
		this.cycle = cycle;
		this.message = `This graph contains a branch-less cycle: ${cycle}`;
	}
};
