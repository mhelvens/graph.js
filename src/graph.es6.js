import {
	_options,
	_vertices, _edges, _reverseEdges, _sources, _sinks, _edgeCount, _listeners,
	_extractTwoArgs, _extractThreeArgs, _trigger,
	_verticesFrom, _verticesTo, _edgesFrom, _edgesTo,
	_verticesWithPathTo, _verticesWithPathFrom, _paths,
	_expectVertices, _expectVerticesAbsent, _expectEdges, _expectEdgesAbsent,_expectNoConnectedEdges
} from './private.es6.js';

//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // JSDoc stuff /////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol};
 * Note that ES6 offers nice syntax for dealing with iterators.
 * @typedef {Object} Iterator
 * @property {function(): { done: boolean, value: * }} next - a zero arguments function that returns an object `{ done, value }`
 *                                                            <ul><li>If `done === false`, then `value` is the next value in the iterated sequence.</li>
 *                                                                <li>If `done === true`, the iterator is past the end of the iterated sequence.   </li></ul>
 */

//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Graph class /////////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @class Graph
 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
 *
 * @description Constructor arguments can be used to supply initial vertices and edges.
 * @param parts {...Array}
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
		this[_vertices]     = new Map(); // Map.< string, * >
		this[_edges]        = new Map(); // Map.< string, Map.<string, *> >

		/* bookkeeping */
		this[_reverseEdges] = new Map(); // Map.< string, Set.<*> >
		this[_sources]      = new Set(); // Set.< string >
		this[_sinks]        = new Set(); // Set.< string >
		this[_edgeCount]    = 0;

		/* listeners */
		this[_listeners] = new Map();

		/* graph options */
		this[_options] = {};
		for (let part of parts) {
			if (!(part instanceof Array) && part instanceof Object) {
				Object.assign(this[_options], part);
			}
		}

		/* add vertices and values from constructor arguments */
		for (let part of parts) {
			if (part instanceof Array) {
				let [key, value] = part;
				if (Array.isArray(key)) {/////////////// an edge
					this.createEdge(key, value);
				} else {//////////////////////////////// a vertex
					this.addVertex(key, value);
				}
			}
		}
	}

	////////////////////////////////////////////////////////
	////////// Static private convenience methods //////////
	////////////////////////////////////////////////////////

	static [_extractTwoArgs](a, b) {
		return Array.isArray(a) ? a : [a, b];
	}

	static [_extractThreeArgs](a, b, c) {
		if (Array.isArray(a)) { [a, b, c] = [...a, b] }
		if (Array.isArray(a)) { [a, b, c] = [...a, b] }
		return [a, b, c];
	}

	////////////////////////////
	////////// Mixins //////////
	////////////////////////////

	/**
	 * Install a new instance method for the `Graph` class.
	 * @static
	 * @param [name]    {string  } the name of the new instance method; defaults to `method.name`
	 * @param method    {function} a function taking a graph as its first argument
	 * @param [context] {object  } an optional object to refer to when using `this` inside the given `method`
	 */
	static plugin(name, method, context) {
		if (typeof name === 'function' && typeof name.name === 'string') {
			[name, method, context] = [name.name, name, method];
		}
		if (typeof name === 'string') {
			if (typeof method === 'function') {
				Object.assign(this.prototype, {
					[name](...args) {
						return method.apply(context, [this, ...args]);
					}
				});
			} else {
				this.prototype[name] = method; // document ability to add non-function values
			}
		} else {
			let [obj, context] = [name, method];
			for (let name of Object.keys(obj)) {
				this.plugin(name, obj[name], context || obj);
			}
		}
	}

	/////////////////////////////////////
	////////// Event Handling //////////
	/////////////////////////////////////

	/**
	 * Register an event handler.
	 * @param event   {string}   the event to listen for
	 * @param handler {Function} the function to call for each such event fired, receiving its corresponding value
	 */
	on(event, handler) {
		if (!this[_listeners].has(event)) {
			this[_listeners].set(event, new Set());
		}
		this[_listeners].get(event).add(handler);
	}

	/**
	 * Deregister a previously registered event handler.
	 * @param event   {string}   the event used to originally register a handler
	 * @param handler {Function} the handler originally registered
	 */
	off(event, handler) {
		if (this[_listeners].has(event)) {
			this[_listeners].get(event).delete(handler);
		}
	}

	[_trigger](event, value) {
		for (let handler of this[_listeners].get(event) || []) {
			handler(value);
		}
	}

	/**
	 * An event that is triggered just after a vertex is added to this graph.
	 * Handlers receive the new vertex `[key, value]` as an argument.
	 * @event vertex-added
	 * @memberof Graph
	 * @instance
	 * @see {@link Graph#on}
	 * @see {@link Graph#off}
	 */
	/**
	 * An event that is triggered just after a vertex is removed from this graph.
	 * Handlers receive the vertex key as an argument.
	 * @event vertex-removed
	 * @memberof Graph
	 * @instance
	 * @see {@link Graph#on}
	 * @see {@link Graph#off}
	 */
	/**
	 * An event that is triggered after a vertex in this graph is modified.
	 * It is also triggered after any {@link #Graph#event_vertex-added|"vertex-added"} event.
	 * Handlers receive the vertex `[key, value]` as an argument.
	 * @event vertex-modified
	 * @memberof Graph
	 * @instance
	 * @see {@link Graph#on}
	 * @see {@link Graph#off}
	 */
	/**
	 * An event that is triggered just after an edge is added to this graph.
	 * Handlers receive the new edge `[[from, to], value]` as an argument.
	 * @event edge-added
	 * @memberof Graph
	 * @instance
	 * @see {@link Graph#on}
	 * @see {@link Graph#off}
	 */
	/**
	 * An event that is triggered just after an edge is removed from this graph.
	 * Handlers receive the edge key `[from, to]` as an argument.
	 * @event edge-removed
	 * @memberof Graph
	 * @instance
	 * @see {@link Graph#on}
	 * @see {@link Graph#off}
	 */
	/**
	 * An event that is triggered after an edge in this graph is modified.
	 * It is also triggered after any {@link #Graph#event_edge-added|"edge-added"} event.
	 * Handlers receive the edge `[[from, to], value]` as an argument.
	 * @event edge-modified
	 * @memberof Graph
	 * @instance
	 * @see {@link Graph#on}
	 * @see {@link Graph#off}
	 */


	//////////////////////////////
	////////// Vertices //////////
	//////////////////////////////

	////////// creating them //////////

	/**
	 * Add a new vertex to this graph.
	 * @throws {Graph.VertexExistsError} if a vertex with this key already exists
	 * @param  key    {string} the key with which to refer to this new vertex
	 * @param [value] {*}      the value to store in this new vertex
	 */ // TODO: allow [key, value] array to be given as argument in docs
	addNewVertex(key, value) {
		[key, value] = Graph[_extractTwoArgs](key, value);
		this[_expectVerticesAbsent](key);
		this[_vertices].set(key, value);
		this[_edges].set(key, new Map());
		this[_reverseEdges].set(key, new Set());
		this[_sources].add(key);
		this[_sinks].add(key);
		this[_trigger]('vertex-added',    [key, value]);
		this[_trigger]('vertex-modified', [key, value]);
	}

	/**
	 * Set the value of an existing vertex in this graph.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param  key    {string} the key belonging to the vertex
	 * @param [value] {*}      the value to store in this vertex
	 */ // TODO: allow [key, value] array to be given as argument in docs
	setVertex(key, value) {
		[key, value] = Graph[_extractTwoArgs](key, value);
		this[_expectVertices](key);
		this[_vertices].set(key, value);
		this[_trigger]('vertex-modified', [key, value]);
	}

	/**
	 * Make sure a vertex with a specific key exists in this graph. If it already exists,
	 * do nothing. If it does not yet exist, add a new vertex with the given value.
	 * @param  key    {string} the key for the vertex
	 * @param [value] {*}      the value to store if a new vertex is added
	 */ // TODO: allow [key, value] array to be given as argument in docs
	ensureVertex(key, value) {
		[key, value] = Graph[_extractTwoArgs](key, value);
		if (!this.hasVertex(key)) {
			this.addNewVertex(key, value);
		}
	}

	/**
	 * Add a new vertex to this graph. If a vertex with this key already exists,
	 * the value of that vertex is overwritten.
	 * @param  key    {string} the key with which to refer to this new vertex
	 * @param [value] {*}      the value to store in this new vertex
	 */ // TODO: allow [key, value] array to be given as argument in docs
	addVertex(key, value) {
		[key, value] = Graph[_extractTwoArgs](key, value);
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
		this[_expectVertices](key);
		this[_expectNoConnectedEdges](key);
		this[_vertices].delete(key);
		this[_sources].delete(key);
		this[_sinks].delete(key);
		this[_trigger]('vertex-removed', key);
	}

	/**
	 * Remove an existing vertex from this graph, as well as all edges connected to it.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to remove
	 */
	destroyExistingVertex(key) {
		this[_expectVertices](key);
		for (let [to] of this.verticesFrom(key)) { this.removeEdge(key,  to ) }
		for (let [from] of this.verticesTo(key)) { this.removeEdge(from, key) }
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
	vertexCount() { return this[_vertices].size }

	/**
	 * Ask whether a vertex with a given key exists.
	 * @param key {string} the key to query
	 * @returns {boolean} whether there is a vertex with the given key
	 */
	hasVertex(key) { return this[_vertices].has(key) }

	/**
	 * Get the key/value pair representing the vertex with the given `key`.
	 * @param key {string} the key to query
	 * @throws {Graph.VertexNotExistsError} if the `key` vertex does not exist in the graph
	 * @returns {Array} a `[key, value]` shaped array representing the vertex
	 */
	vertex(key) {
		this[_expectVertices](key);
		return [key, this.vertexValue(key)];
	}

	/**
	 * Get the value associated with the vertex of a given `key`.
	 * @param key {string} the key to query
	 * @returns {*} the value associated with the vertex of the given key.
	 * Note that a return value of `undefined` can mean
	 *
	 * 1. that there is no such vertex, or
	 * 2. that the stored value is actually `undefined`.
	 *
	 * Use {@link Graph#hasVertex} to distinguish these cases.
	 */
	vertexValue(key) { return this[_vertices].get(key) }


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
	 */ // TODO: allow [from, to], value array to be given as argument in docss; or [[from, to], value] as single argument
	addNewEdge(from, to, value) {
		[from, to, value] = Graph[_extractThreeArgs](from, to, value);
		this[_expectEdgesAbsent]([from, to]);
		this[_expectVertices](from, to);
		this[_edges].get(from).set(to, value);
		this[_reverseEdges].get(to).add(from);
		this[_edgeCount] += 1;
		this[_sources].delete(to);
		this[_sinks].delete(from);
		this[_trigger]('edge-added',    [[from, to], value]);
		this[_trigger]('edge-modified', [[from, to], value]);
	}

	/**
	 * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	 * in the graph, they are implicitly added with an `undefined` value.
	 * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	 * @param  from   {string} the key for the originating vertex
	 * @param  to     {string} the key for the terminating vertex
	 * @param [value] {*}      the value to store in this new edge
	 */ // TODO: allow [from, to], value array to be given as argument in docss; or [[from, to], value] as single argument
	createNewEdge(from, to, value) {
		[from, to, value] = Graph[_extractThreeArgs](from, to, value);
		this[_expectEdgesAbsent]([from, to]);
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
	 */ // TODO: allow [from, to], value array to be given as argument in docss; or [[from, to], value] as single argument
	setEdge(from, to, value) {
		[from, to, value] = Graph[_extractThreeArgs](from, to, value);
		this[_expectEdges]([from, to]);
		this[_edges].get(from).set(to, value);
		this[_trigger]('edge-modified', [[from, to], value]);
	}

	/**
	 * Make sure an edge between the `from` and `to` vertices in this graph.
	 * If one already exists, nothing is done.
	 * If one does not yet exist, a new edge is added with the given value.
	 * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	 * @param  from   {string} the key for the originating vertex
	 * @param  to     {string} the key for the terminating vertex
	 * @param [value] {*}      the value to store if a new edge is added
	 */ // TODO: allow [from, to], value array to be given as argument in docss; or [[from, to], value] as single argument
	spanEdge(from, to, value) {
		[from, to, value] = Graph[_extractThreeArgs](from, to, value);
		this[_expectVertices](from, to);
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
	 */ // TODO: allow [from, to], value array to be given as argument in docss; or [[from, to], value] as single argument
	addEdge(from, to, value) {
		[from, to, value] = Graph[_extractThreeArgs](from, to, value);
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
	 */ // TODO: allow [from, to], value array to be given as argument in docss; or [[from, to], value] as single argument
	ensureEdge(from, to, value) {
		[from, to, value] = Graph[_extractThreeArgs](from, to, value);
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
	 */ // TODO: allow [from, to], value array to be given as argument in docss; or [[from, to], value] as single argument
	createEdge(from, to, value) {
		[from, to, value] = Graph[_extractThreeArgs](from, to, value);
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
	 */ // TODO: allow [from, to] array to be given as argument in docs
	removeExistingEdge(from, to) {
		[from, to] = Graph[_extractTwoArgs](from, to);
		this[_expectEdges]([from, to]);
		this[_edges].get(from).delete(to);
		this[_reverseEdges].get(to).delete(from);
		this[_edgeCount] -= 1;
		if (this. inDegree(to)   === 0) { this[_sources].add(to) }
		if (this.outDegree(from) === 0) { this[_sinks].add(from) }
		this[_trigger]('edge-removed', [from, to]);
	}

	/**
	 * Remove an edge from this graph.
	 * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 */ // TODO: allow [from, to] array to be given as argument in docs
	removeEdge(from, to) {
		[from, to] = Graph[_extractTwoArgs](from, to);
		if (this.hasEdge(from, to)) {
			this.removeExistingEdge(from, to);
		}
	}


	////////// querying them //////////

	/**
	 * @returns {number} the number of edges in the whole graph
	 */
	edgeCount() { return this[_edgeCount] }

	/**
	 * Ask whether an edge between given `from` and `to` vertices exist.
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
	 */ // TODO: allow [from, to] array to be given as argument in docs
	hasEdge(from, to) {
		[from, to] = Graph[_extractTwoArgs](from, to);
		return this.hasVertex(from) &&
			this.hasVertex(to) &&
			this[_edges].has(from) &&
			this[_edges].get(from).has(to);
	}

	/**
	 * Get the key/value pair representing the edge between the given `from` and `to`.
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 * @returns {Array} a `[[from, to], value]` shaped array representing the edge
	 */ // TODO: allow [from, to] array to be given as argument in docs
	edge(from, to) {
		[from, to] = Graph[_extractTwoArgs](from, to);
		this[_expectEdges]([from, to]);
		return [[from, to], this.edgeValue(from, to)];
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
	 */ // TODO: allow [from, to] array to be given as argument in docs
	edgeValue(from, to) {
		[from, to] = Graph[_extractTwoArgs](from, to);
		return this.hasEdge(from, to) ? this[_edges].get(from).get(to) : undefined;
	}


	///////////////////////////////////////////////
	//////////// ES6 Iterable interfaces //////////
	///////////////////////////////////////////////

	/**
	 * Iterate over all vertices of the graph, in no particular order.
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = graph.vertices(), kv; !(kv = it.next()).done;) {
	 *     var key   = kv.value[0],
	 *         value = kv.value[1];
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
		for (let [key] of this[_vertices]) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield this.vertex(key);
			}
		}
	}

	/**
	 * A {@link Graph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
	 * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
	 * @method Graph#@@iterator
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (let [key, value] of graph) {
	 *     // iterates over all vertices of the graph
	 * }
	 * @see {@link Graph#vertices}
	 */
	[Symbol.iterator]() { return this.vertices() }

	/**
	 * Iterate over all edges of the graph, in no particular order.
	 * @returns {Iterator} an ES6 iterator yielding edges
	 * @example
	 * for (var it = graph.edges(), kv; !(kv = it.next()).done;) {
	 *     var from  = kv.value[0][0],
	 *         to    = kv.value[0][1],
	 *         value = kv.value[1];
	 *     // iterates over all edges of the graph
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [[from, to], value] of graph.edges()) {
	 *     // iterates over all vertices of the graph
	 * }
	 */
	*edges() {
		let done = new Map();
		for (let from of this[_edges].keys()) {
			done.set(from, new Set());
			for (let to of this[_edges].get(from).keys()) {
				if (!done.get(from).has(to) && this.hasEdge(from, to)) {
					done.get(from).add(to);
					yield this.edge(from, to);
				}
			}
		}
	}

	/**
	 * Iterate over the vertices directly reachable from a given vertex in the graph, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	 * @param key {string} the key of the vertex to take the outgoing edges from
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = graph.verticesFrom(from), kv; !(kv = it.next()).done;) {
	 *     var to    = kv.value[0],
	 *         value = kv.value[1];
	 *     // iterates over all outgoing vertices of the `from` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [to, value] of graph.verticesFrom(from)) {
	 *     // iterates over all outgoing vertices of the `from` vertex
	 * }
	 */
	verticesFrom(key) {
		this[_expectVertices](key);
		return this[_verticesFrom](key);
	}
	*[_verticesFrom](from) {
		let done = new Set();
		for (let to of this[_edges].get(from).keys()) {
			if (!done.has(to) && this.hasEdge(from, to)) {
				done.add(to);
				yield this.vertex(to);
			}
		}
	}

	/**
	 * Iterate over the vertices from which a given vertex in the graph is directly reachable, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	 * @param key {string} the key of the vertex to take the incoming edges from
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = graph.verticesTo(to), kv; !(kv = it.next()).done;) {
	 *     var from  = kv.value[0],
	 *         value = kv.value[1];
	 *     // iterates over all outgoing vertices of the `to` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [from, value] of graph.verticesTo(to)) {
	 *     // iterates over all incoming vertices of the `to` vertex
	 * }
	 */
	verticesTo(key) {
		this[_expectVertices](key);
		return this[_verticesTo](key);
	}
	*[_verticesTo](to) {
		let done = new Set();
		for (let from of this[_reverseEdges].get(to)) {
			if (!done.has(from) && this.hasEdge(from, to)) {
				done.add(from);
				yield this.vertex(from);
			}
		}
	}

	/**
	 * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	 * @param key {string} the key of the vertex to take the outgoing edges from
	 * @returns {Iterator} an ES6 iterator yielding edges
	 * @example
	 * for (var it = graph.edgesFrom(from), kv; !(kv = it.next()).done;) {
	 *     var from  = kv.value[0][0],
	 *         to    = kv.value[0][1],
	 *         value = kv.value[1];
	 *     // iterates over all outgoing edges of the `from` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [[from, to], value] of graph.edgesFrom(from)) {
	 *     // iterates over all outgoing edges of the `from` vertex
	 * }
	 */
	edgesFrom(key) {
		this[_expectVertices](key);
		return this[_edgesFrom](key);
	}
	*[_edgesFrom](from) {
		let done = new Set();
		for (let to of this[_edges].get(from).keys()) {
			if (!done.has(to) && this.hasEdge(from, to)) {
				done.add(to);
				yield this.edge(from, to);
			}
		}
	}

	/**
	 * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	 * @param key {string} the key of the vertex to take the incoming edges from
	 * @returns {Iterator} an ES6 iterator yielding edges
	 * @example
	 * for (var it = graph.edgesTo(to), kv; !(kv = it.next()).done;) {
	 *     var from  = kv.value[0][0],
	 *         to    = kv.value[0][1],
	 *         value = kv.value[1];
	 *     // iterates over all incoming edges of the `to` vertex
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [[from, to], value] of graph.edgesTo(to)) {
	 *     // iterates over all incoming edges of the `to` vertex
	 * }
	 */
	edgesTo(key) {
		this[_expectVertices](key);
		return this[_edgesTo](key);
	}
	*[_edgesTo](to) {
		let done = new Set();
		for (let from of this[_reverseEdges].get(to)) {
			if (!done.has(from) && this.hasEdge(from, to)) {
				done.add(from);
				yield this.edge(from, to);
			}
		}
	}

	/**
	 * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	 * @param from {string} the key of the vertex to take the reachable vertices from
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = graph.verticesWithPathFrom(from), kv; !(kv = it.next()).done;) {
	 *     var key   = kv.value[0],
	 *         value = kv.value[1];
	 *     // iterates over all vertices reachable from `from`
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.verticesWithPathFrom(from)) {
	 *     // iterates over all vertices reachable from `from`
	 * }
	 */
	verticesWithPathFrom(from) {
		this[_expectVertices](from);
		return this[_verticesWithPathFrom](from, new Set());
	}
	*[_verticesWithPathFrom](from, done) {
		for (let [to] of this.verticesFrom(from)) {
			if (!done.has(to) && this.hasEdge(from, to)) {
				done.add(to);
				yield this.vertex(to);
				yield* this[_verticesWithPathFrom](to, done);
			}
		}
	}

	/**
	 * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
	 * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	 * @param to {string} the key of the vertex to take the reachable vertices from
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = graph.verticesWithPathTo(to), kv; !(kv = it.next()).done;) {
	 *     var key   = kv.value[0],
	 *         value = kv.value[1];
	 *     // iterates over all vertices from which `to` can be reached
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let [key, value] of graph.verticesWithPathTo(to)) {
	 *     // iterates over all vertices from which `to` can be reached
	 * }
	 */
	verticesWithPathTo(to) {
		this[_expectVertices](to);
		return this[_verticesWithPathTo](to, new Set());
	}
	*[_verticesWithPathTo](to, done) {
		for (let [from] of this.verticesTo(to)) {
			if (!done.has(from) && this.hasEdge(from, to)) {
				done.add(from);
				yield this.vertex(from);
				yield* this[_verticesWithPathTo](from, done);
			}
		}
	}


	/**
	 * Iterate over all vertices that have no incoming edges, in no particular order.
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = graph.sources(), kv; !(kv = it.next()).done;) {
	 *     var key   = kv.value[0],
	 *         value = kv.value[1];
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
		for (let key of this[_sources]) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield this.vertex(key);
			}
		}
	}


	/**
	 * Iterate over all vertices that have no outgoing edges, in no particular order.
	 * @returns {Iterator} an ES6 iterator yielding vertices
	 * @example
	 * for (var it = graph.sinks(), kv; !(kv = it.next()).done;) {
	 *     var key   = kv.value[0],
	 *         value = kv.value[1];
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
		for (let key of this[_sinks]) {
			if (this.hasVertex(key) && !done.has(key)) {
				done.add(key);
				yield this.vertex(key);
			}
		}
	}


	////////////////////////////////////////
	////////// Setting & Clearing //////////
	////////////////////////////////////////


	/**
	 * Set this graph to become equal to another graph, so that it has
	 * all the same vertices and edges. It emits only those signals
	 * that are strictly necessary.
	 * @param other {Graph} the graph copy to this graph
	 */
	set(other) {
		for (let [key, value] of this.edges()) {
			if (!other.hasEdge(key)) {
				this.removeExistingEdge(key);
			} else if (value !== other.edgeValue(key)) {
				this.setEdge(key, other.edgeValue(key));
			}
		}
		for (let [key, value] of this.vertices()) {
			if (!other.hasVertex(key)) {
				this.removeExistingVertex(key);
			} else if (value !== other.vertexValue(key)) {
				this.setVertex(key, other.vertexValue(key));
			}
		}
		for (let [key, value] of other.vertices()) {
			if (!this.hasVertex(key)) {
				this.addNewVertex(key, value);
			}
		}
		for (let [key, value] of other.edges()) {
			if (!this.hasEdge(key)) {
				this.addNewEdge(key, value);
			}
		}
	}


	/**
	 * Remove all edges from the graph, but leave the vertices intact.
	 */
	clearEdges() {
		for (let [key] of this.edges()) { this.removeEdge(key) }
	}

	/**
	 * Remove all edges and vertices from the graph, putting it back in its initial state.
	 */
	clear() {
		for (let [key] of this.vertices()) { this.destroyVertex(key) }
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
	 * @param [eqE] {function(*, *, Array): boolean}
	 *     a custom equality function for values stored in edges;
	 *     defaults to the function given for `eqV`; The first two arguments
	 *     are the values to compare. The third is the corresponding
	 *     `[from, to]` key.
	 * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
	 */
	equals(other, eqV=(x,y)=>(x===y), eqE=eqV) {
		if (!(other instanceof Graph))                  { return false }
		if (this.vertexCount() !== other.vertexCount()) { return false }
		if (this.edgeCount()   !== other.edgeCount()  ) { return false }
		for (let [key, value] of this.vertices()) {
			if (!other.hasVertex(key))                    { return false }
			if (!eqV(value, other.vertexValue(key), key)) { return false }
		}
		for (let [key, value] of this.edges()) {
			if (!other.hasEdge(key))                      { return false }
			if (!eqE(value, other.edgeValue(key), key))   { return false }
		}
		return true;
	}


	/**
	 * Iterate over all simple directed cycles in this graph, in no particular order.
	 * If you mutate the graph in between iterations, behavior of the iterator
	 * becomes unspecified. (So, don't.)
	 * @returns {Iterator} an ES6 iterator yielding arrays containing the vertex keys describing a cycle;
	 *                     These arrays will contain each vertex key only once — even the first/last one.
	 * @example
	 * for (var it = graph.cycles(), kv; !(kv = it.next()).done;) {
	 *     var cycle = kv.value;
	 *     // iterates over all cycles of the graph
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let cycle of graph.cycles()) {
	 *     // iterates over all cycles of the graph
	 * }
	 */
	*cycles() {
		// This algorithm is based on the following article:
		// Enumeration of the elementary circuits of a directed graph
		// R. Tarjan, SIAM Journal on Computing, 2 (1973), pp. 211-216
		// http://dx.doi.org/10.1137/0202017
		// -----
		// TODO: implement the improved version as defined by Johnson:
		// Finding all the elementary circuits of a directed graph.
		// D. B. Johnson, SIAM Journal on Computing 4, no. 1, 77-84, 1975.
		// http://dx.doi.org/10.1137/0204007

		/* bookkeeping */
		let pointStack = [];
		let markedStack, mark;

		/* the main recursive backtracking algorithm */
		let _this = this;
		function* backtrack(v, out = {}) {
			pointStack.push(v);
			mark.add(v);
			markedStack.push(v);
			for (let [w] of [..._this.verticesFrom(v)]) {
				if (w < pointStack[0]) { continue }
				if (w === pointStack[0]) {
					yield [...pointStack];
					out.found = true;
				} else if (!mark.has(w)) {
					let o = {};
					yield* backtrack(w, o);
					out.found = out.found || o.found;
				}
			}
			if (out.found) { // if a simple cycle continuing the partial path on the pointStack has been found
				let u;
				do {
					u = markedStack.pop();
					mark.delete(u);
				} while (u !== v);
			}
			pointStack.pop();
		}

		/* start backtracking from each vertex in the graph */
		for (let [a] of this.vertices()) {
			markedStack = [];
			mark = new Set();
			yield* backtrack(a);
		}
	}


	/**
	 * Find any directed cycle in this graph.
	 * @returns {?Array} an array containing the vertex keys describing the cycle; `null`, if there is no cycle;
	 *                   The array will contain each vertex key only once — even the first/last one.
	 */
	cycle() {
		let result = this.cycles().next();
		return result.done ? null : result.value;
	}


	/**
	 * Test whether this graph contains a directed cycle.
	 * @returns {boolean} whether this graph contains any directed cycle
	 */
	hasCycle() { return !this.cycles().next().done }


	/**
	 * Iterate over all paths between two given keys in this graph, in no particular order.
	 * If you mutate the graph in between iterations, behavior of the iterator
	 * becomes unspecified. (So, don't.)
	 * @param from {string} the key for the originating vertex
	 * @param to   {string} the key for the terminating vertex
	 * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	 * @returns {Iterator} an ES6 iterator yielding arrays containing the vertex-keys describing the path
	 * @example
	 * for (var it = graph.paths(from, to), kv; !(kv = it.next()).done;) {
	 *     var path = kv.value;
	 *     // iterates over all paths between `from` and `to` in the graph
	 * }
	 * @example
	 * // in ECMAScript 6, you can use a for..of loop
	 * for (let path of graph.paths(from, to)) {
	 *     // iterates over all paths between `from` and `to` in the graph
	 * }
	 */ // TODO: allow [from, to] array to be given as argument in docs
	paths(from, to) {
		[from, to] = Graph[_extractTwoArgs](from, to);
		this[_expectVertices](from, to);
		return this[_paths](from, to);
	}
	*[_paths](from, to) {
		let stack = [];

		let _this = this;
		function *pathsFromPrefix(current) {
			stack.push(current);
			for (let [next] of _this.verticesFrom(current)) {
				if (next === to) {
					yield [...stack, to];
				} else if (stack.indexOf(next) === -1) {
					yield* pathsFromPrefix(next);
				}
			}
			stack.pop();
		}

		yield* pathsFromPrefix(from);
	}


	/**
	 * Find any path between a given pair of keys.
	 * @param from {string} the originating vertex
	 * @param to   {string} the terminating vertex
	 * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	 * @returns {?Array} an array with the keys of the path found between the two vertices,
	 *                   including those two vertices themselves; `null` if no such path exists
	 */ // TODO: allow [from, to] array to be given as argument in docs
	path(from, to) {
		let result = this.paths(from, to).next();
		return result.done ? null : result.value;
	}


	/**
	 * Test whether there is a directed path between a given pair of keys.
	 * @param from {string} the originating vertex
	 * @param to   {string} the terminating vertex
	 * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	 * @returns {boolean} whether such a path exists
	 */ // TODO: allow [from, to] array to be given as argument in docs
	hasPath(from, to) { return !this.paths(from, to).next().done }


	/**
	 * Get the number of edges going out of a given vertex.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to query
	 * @returns {number} the number of edges going out of the `key` vertex
	 */
	outDegree(key) {
		this[_expectVertices](key);
		return this[_edges].get(key).size;
	}


	/**
	 * Get the number of edges coming into a given vertex.
	 * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	 * @param key {string} the key of the vertex to query
	 * @returns {number} the number of edges coming into the `key` vertex
	 */
	inDegree(key) {
		this[_expectVertices](key);
		return this[_reverseEdges].get(key).size;
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
	 *     defaults to choosing the second value over the first; The first and
	 *     second arguments are the vertex values of `this` graph and the
	 *     `other` graph respectively. The third is the corresponding `key`.
	 * @param [mE] {function(*, *, Array): *}
	 *     a custom merge function for values stored in edges;
	 *     defaults to whichever of the two values is not `undefined`,
	 *     giving preference to that of the other graph; The first and
	 *     second arguments are the edge values of `this` graph and the
	 *     `other` graph respectively. The third is the
	 *     corresponding `[from, to]` key.
	 */
	mergeIn(other, mV=((v1,v2)=>v2), mE=mV) {
		for (let [key, value] of other.vertices()) {
			this.addVertex(key, mV(this.vertexValue(key), value, key));
		}
		for (let [key, value] of other.edges()) {
			this.addEdge(key, mE(this.edgeValue(key), value, key));
		}
	}


	/**
	 * Create a clone of this graph.
	 * @param [trV] {function(*, string): *}
	 *     a custom transformation function for values stored in vertices;
	 *     defaults to the identity function; The first argument is the
	 *     value to clone. The second is the corresponding `key`.
	 * @param [trE] {function(*, Array): *}
	 *     a custom transformation function for values stored in edges;
	 *     defaults to the function given for `trV`; The first argument
	 *     is the value to clone. The second is the corresponding
	 *     `[from, to]` key.
	 * @returns {Graph} a clone of this graph
	 */
	clone(trV=(v=>v), trE=trV) {
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
	 * @param [trE] {function(*, Array): *}
	 *     a custom transformation function for values stored in edges;
	 *     defaults to the function given for `trV`; The first argument
	 *     is the value to clone. The second is the corresponding
	 *     `[from, to]` key.
	 * @returns {Graph} a clone of this graph with all transitive edges removed
	 */
	transitiveReduction(trV, trE) {
		// argument defaults are handled in `clone`
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
	contractPaths(isNexus=(()=>false)) {

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
		const startPath = (start, next, backwards) => {
			/* functions to help branch on `backwards` */
			const fromTo       = (strt = start, nxt = next) => backwards ? [nxt, strt] : [strt, nxt];
			const verticesNext = (v) => backwards ? this.verticesTo(v) : this.verticesFrom(v);

			/* bookkeeping */
			let verticesToRemove = new Set();
			let edgesToRemove    = new Set();
			let path = new (this.constructor)();

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
			if (!contractionsToAdd.get(fromTo()[0]))                  { contractionsToAdd.set(fromTo()[0], new Map())                                 }
			if (!contractionsToAdd.get(fromTo()[0]).get(fromTo()[1])) { contractionsToAdd.get(fromTo()[0]).set(fromTo()[1], new (this.constructor)()) }
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


	////////////////////////////////
	////////// Assertions //////////
	////////////////////////////////

	[_expectVertices](...keys) {
		let missingVertices = keys.filter(k => !this.hasVertex(k));
		if (missingVertices.length) { throw new Graph.VertexNotExistsError(...missingVertices) }
	}

	[_expectVerticesAbsent](...keys) {
		let presentVertices = keys.filter(k => this.hasVertex(k));
		if (presentVertices.length) {
			throw new Graph.VertexExistsError(...presentVertices.map(k => [k, this.vertexValue(k)]));
		}
	}

	[_expectEdges](...keys) {
		let absentEdges = keys.filter(k => !this.hasEdge(...k));
		if (absentEdges.length) {
			throw new Graph.EdgeNotExistsError(...absentEdges);
		}
	}

	[_expectEdgesAbsent](...keys) {
		let presentEdges = keys.filter(k => this.hasEdge(...k));
		if (presentEdges.length) {
			throw new Graph.EdgeExistsError(...presentEdges.map(k => [k, this.edgeValue(...k)]));
		}
	}

	[_expectNoConnectedEdges](key) {
		let edges = [];
		for (let [to]   of this.verticesFrom(key)) { edges.push([[key,  to ], this.edgeValue(key,  to )]) }
		for (let [from] of this.verticesTo  (key)) { edges.push([[from, key], this.edgeValue(from, key)]) }
		if (edges.length) { throw new Graph.HasConnectedEdgesError(key, ...edges) }
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
	constructor(...vertices) {
		super();
		/**
		 * the set of relevant vertices as `[key, value]` shaped arrays
		 * @public
		 * @constant vertices
		 * @memberof Graph.VertexExistsError
		 * @instance
		 * @type {Set.<Array>}
		 */
		this.vertices = new Set(vertices);
		this.message = `This graph has ${
			this.vertices.size === 1 ? "a vertex" : "vertices"
		} '${
			[...this.vertices].map(([key]) => key).join(`', '`)
		}'`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
 * @extends Error
 */
Graph.VertexNotExistsError = class VertexNotExistsError extends Error {
	constructor(...keys) {
		super();
		/**
		 * the set of relevant vertex keys
		 * @public
		 * @constant vertices
		 * @memberof Graph.VertexNotExistsError
		 * @instance
		 * @type {Set.<string>}
		 */
		this.vertices = new Set(keys);
		this.message = `This graph does not have ${
			this.vertices.size === 1 ? "a vertex" : "vertices"
		} '${
			[...this.vertices].join(`', '`)
		}'`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
 * @extends Error
 */
Graph.EdgeExistsError = class EdgeExistsError extends Error {
	constructor(...edges) {
		super();
		/**
		 * the set of relevant edges as `[[from, to], value]` shaped arrays
		 * @public
		 * @constant edges
		 * @memberof Graph.EdgeExistsError
		 * @instance
		 * @type {Set.<Array>}
		 */
		this.edges = new Set(edges);
		this.message = `This graph has ${
			this.edges.size === 1 ? "an edge" : "edges"
		} ${
			[...this.edges].map(([key]) => `[${key}]`).join(`, `)
		}`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
 * @extends Error
 */
Graph.EdgeNotExistsError = class EdgeNotExistsError extends Error {
	constructor(...edges) {
		super();
		/**
		 * the set of relevant edge keys as `[from, to]` shaped arrays
		 * @public
		 * @constant edges
		 * @memberof Graph.EdgeNotExistsError
		 * @instance
		 * @type {Set.<Array.<string>>}
		 */
		this.edges = new Set(edges);
		this.message = `This graph does not have ${
			this.edges.size === 1 ? "an edge" : "edges"
		} ${
			[...this.edges].map(([key]) => `[${key}]`).join(`, `)
		}`;
	}
};

/**
 * @class
 * @classdesc This type of error is thrown when a vertex is expected not to have any connected edges, but does.
 * @extends Graph.EdgeExistsError
 */
Graph.HasConnectedEdgesError = class HasConnectedEdgesError extends Graph.EdgeExistsError {
	constructor(key, ...edges) {
		super(...edges);
		/**
		 * the key of the vertex that has connected edges
		 * @public
		 * @constant vertex
		 * @memberof Graph.HasConnectedEdgesError
		 * @instance
		 * @type {string}
		 */
		this.vertex = key;
		this.message = `The '${key}' vertex has connected ${
			this.edges.size === 1 ? "an edge" : "edges"
		} ${
			[...this.edges].map(([key]) => `[${key}]`).join(`, `)
		}`;
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
		 * the vertices involved in the cycle, in order but with an unspecified starting point
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
 * @extends Graph.CycleError
 */
Graph.BranchlessCycleError = class BranchlessCycleError extends Graph.CycleError {
	constructor(cycle) {
		super(cycle);
		this.message = `This graph contains a branch-less cycle: ${cycle}`;
	}
};
