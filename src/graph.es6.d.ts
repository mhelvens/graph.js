// Type definitions for GRAPH.JS 
// Definitions by: TreeAtOr

declare module graph {
    type GraphEventType = "vertex-added" | "vertex-removed" | "vertex-modified" | "edge-added" | "adge-removed" | "edge-modified"
    /**
     * @class Graph
     * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
     *
     * @description Constructor arguments can be used to supply initial vertices and edges. 
     * @param ...parts
     *        a short notation for vertices and edges to initially add to the graph;
     *        A vertex should be an array of the form `[key, value]`.
     *        An edge should be an array of the form `[[from, to], value]`.
     *        Later values of vertices or edges in this list will overwrite earlier
     *        values, but vertices need not precede their edges. Vertices that are
     *        connected but store no value need not be listed at all.
     * @example
     * var map = new Graph<CityData,RoadData,string>(
     *     ['Amsterdam',             { population: 825000 }], // vertex
     *     ['Leiden',                { population: 122000 }], // vertex
     *     [['Amsterdam', 'Leiden'], { distance:   "40km" }]  // edge
     * );
     */
    class Graph <VerticesData=any,EdgesData=any,Key=string>{
        constructor(...parts : Array<Array< Key | VerticesData> | Array<Array<Key> | EdgesData>>);
        /**
         * Register an event handler.
         * @param event   {Key}   the event to listen for
         * @param handler {Function} the function to call for each such event fired, receiving its corresponding value
         */
        on(event: GraphEventType ,handler:Function):void;
        /**
         * Deregister a previously registered event handler.
         * @param event   {Key}   the event used to originally register a handler
         * @param handler {Function} the handler originally registered
         */
        off(event:GraphEventType,handler:Function):void;
        /**
         * Add a new vertex to this graph.
         * @throws {Graph.VertexExistsError} if a vertex with this key already exists
         * @param  key    {Key} the key with which to refer to this new vertex
         * @param value   {VerticesData} the value to store in this new vertex
         */
        addNewVertex(key:Key,value:VerticesData):void;
        /**
         * Set the value of an existing vertex in this graph.
         * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
         * @param  key    {Key} the key belonging to the vertex
         * @param value   {VerticesData}   the value to store in this vertex
         */
        setVertex(key:Key,value:VerticesData):void;
        /**
         * Make sure a vertex with a specific key exists in this graph. If it already exists,
         * do nothing. If it does not yet exist, add a new vertex with the given value.
         * @param  key    {Key} the key for the vertex
         * @param value   {VerticesData} the value to store if a new vertex is added
         */
        ensureVertex(key:Key,value:VerticesData):void;
        /**
         * Add a new vertex to this graph. If a vertex with this key already exists,
         * the value of that vertex is overwritten.
         * @param  key    {Key} the key with which to refer to this new vertex
         * @param value   {VerticesData} the value to store in this new vertex
         */
        addVertex(key:Key,value:VerticesData):void;
        /**
         * Remove an existing vertex from this graph.
         * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
         * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
         * @param key {Key} the key of the vertex to remove
         */
        removeExistingVertex(key:Key):void;
        /**
         * Remove an existing vertex from this graph, as well as all edges connected to it.
         * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
         * @param key {Key} the key of the vertex to remove
         */
        destroyExistingVertex(key:Key):void;
        /**
         * Remove an existing vertex from this graph.
         * If a vertex with this key does not exist, nothing happens.
         * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
         * @param key {Key} the key of the vertex to remove
         */
        removeVertex(key:Key):void;
        /**
         * Remove a vertex from this graph, as well as all edges connected to it.
         * If a vertex with this key does not exist, nothing happens.
         * @param key {Key} the key of the vertex to remove
         */
        destroyVertex(key:Key):void;
        /**
         * @returns {number} the number of vertices in the whole graph
         */
        vertexCount():number;
        /**
         * Ask whether a vertex with a given key exists.
         * @param key {Key} the key to query
         * @returns {boolean} whether there is a vertex with the given key
         */
        hasVertex(key:Key):boolean;
        /**
        * Get the value associated with the vertex of a given key.
        * @param key {Key} the key to query
        * @returns {VerticesData} the value associated with the vertex of the given key.
        * Note that a return value of `undefined` can mean
        *
        * 1. that there is no such vertex, or
        * 2. that the stored value is actually `undefined`.
        *
        * Use {@link Graph#hasVertex} to distinguish these cases.
        */
        vertexValue(key:Key):VerticesData;
        /**
         * Add a new edge to this graph.
         * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
         * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
         * @param  from   {Key} the key for the originating vertex
         * @param  to     {Key} the key for the terminating vertex
         * @param  value  {EdgesData}      the value to store in this new edge
         */
        addNewEdge(from:Key,to:Key,value:EdgesData):void;
        /**
         * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
         * in the graph, they are implicitly added with an `undefined` value.
         * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
         * @param  from   {Key} the key for the originating vertex
         * @param  to     {Key} the key for the terminating vertex
         * @param  value  {EdgesData}      the value to store in this new edge
         */
        createNewEdge(from:Key,to:Key,value:EdgesData):void;
        /**
         * Set the value of an existing edge in this graph.
         * @throws {Graph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
         * @param  from   {Key} the key for the originating vertex
         * @param  to     {Key} the key for the terminating vertex
         * @param  value  {EdgesData}      the value to store in this edge
         */
        setEdge(from:Key,to:Key,value:EdgesData):void;
        /**
         * Make sure an edge between the `from` and `to` vertices in this graph.
         * If one already exists, nothing is done.
         * If one does not yet exist, a new edge is added with the given value.
         * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
         * @param  from   {Key} the key for the originating vertex
         * @param  to     {Key} the key for the terminating vertex
         * @param  value  {EdgesData} the value to store if a new edge is added
         */
        spanEdge(from:Key,to:Key,value:EdgesData):void;
        /**
         * Add a new edge to this graph. If an edge between `from` and `to` already exists,
         * the value of that edge is overwritten.
         * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
         * @param  from   {Key} the key for the originating vertex
         * @param  to     {Key} the key for the terminating vertex
         * @param  value  {EdgesData} the value to store in this new edge
         */
        addEdge(from:Key,to:Key,value:EdgesData):void;
        /**
         * Make sure an edge between the `from` and `to` vertices exists in this graph.
         * If it already exists, nothing is done.
         * If it does not yet exist, a new edge is added with the given value.
         * If the `from` and/or `to` vertices do not yet exist
         * in the graph, they are implicitly added with an `undefined` value.
         * @param  from   {Key} the key for the originating vertex
         * @param  to     {Key} the key for the terminating vertex
         * @param  value  {EdgesData} the value to store if a new edge is added
         */
        ensureEdge(from:Key,to:Key,value:EdgesData):void;
        /**
         * Add a new edge to this graph. If an edge between the `from` and `to`
         * vertices already exists, the value of that edge is overwritten.
         * If the `from` and/or `to` vertices do not yet exist
         * in the graph, they are implicitly added with an `undefined` value.
         * @param  from   {Key} the key for the originating vertex
         * @param  to     {Key} the key for the terminating vertex
         * @param  value  {EdgesData} the value to store if a new edge is added
         */
        createEdge(from:Key,to:Key,value:EdgesData):void;
        /**
         * Remove an existing edge from this graph.
         * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
         * @param from {Key} the key for the originating vertex
         * @param to   {Key} the key for the terminating vertex
         */
        removeExistingEdge(from:Key,to:Key):void;
        /**
         * Remove an edge from this graph.
         * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
         * @param from {Key} the key for the originating vertex
         * @param to   {Key} the key for the terminating vertex
         */
        removeEdge(from:Key,to:Key):void;
        /**
         * @returns {number} the number of edges in the whole graph
         */
        edgeCount():number;
        /**
         * Ask whether an edge between given `from` and `to` vertices exist.
         * @param from {Key} the key for the originating vertex
         * @param to   {Key} the key for the terminating vertex
         * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
         */
        hasEdge(from:Key,to:Key):void;
        /**
         * Get the value associated with the edge between given `from` and `to` vertices.
         * @param from {Key} the key for the originating vertex
         * @param to   {Key} the key for the terminating vertex
         * @returns {EdgesData} the value associated with the edge between the given `from` and `to` vertices
         * Note that a return value of `undefined` can mean
         *
         * 1. that there is no such edge, or
         * 2. that the stored value is actually `undefined`.
         *
         * Use {@link Graph#hasEdge} to distinguish these cases.
         */
        edgeValue(from:Key,to:Key):EdgesData;
        /**
         * Iterate over all vertices of the graph, in no particular order.
         * @returns { Iterator.<Key, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
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
        vertices():Generator<Key,VerticesData>;
        /**
         * Iterate over all edges of the graph, in no particular order.
         * @returns { Iterator.<Key, Key, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
         * @example
         * for (var it = graph.edges(), kv; !(kv = it.next()).done;) {
         *     var from  = kv.value[0],
         *         to    = kv.value[1],
         *         value = kv.value[2];
         *     // iterates over all edges of the graph
         * }
         * @example
         * // in ECMAScript 6, you can use a for..of loop
         * for (let [from, to, value] of graph.edges()) {
         *     // iterates over all vertices of the graph
         * }
         */
        edges():Generator<Key,Key,EdgesData>;
        /**
         * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
         * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
         * @param from {Key} the key of the vertex to take the outgoing edges from
         * @returns { Iterator.<Key, VerticesData ,VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
         * @example
         * for (var it = graph.verticesFrom(from), kv; !(kv = it.next()).done;) {
         *     var to          = kv.value[0],
         *         vertexValue = kv.value[1],
         *         edgeValue   = kv.value[2];
         *     // iterates over all outgoing vertices of the `from` vertex
         * }
         * @example
         * // in ECMAScript 6, you can use a for..of loop
         * for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
         *     // iterates over all outgoing edges of the `from` vertex
         * }
         */
        vericlesFrom(from:Key):Iterator <Key,VerticesData,VerticesData>;
        /**
         * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
         * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
         * @param to {Key} the key of the vertex to take the incoming edges from
         * @returns { Iterator.<Key, VerticesData, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
         * @example
         * for (var it = graph.verticesTo(to), kv; !(kv = it.next()).done;) {
         *     var from        = kv.value[0],
         *         vertexValue = kv.value[1],
         *         edgeValue   = kv.value[2];
         *     // iterates over all outgoing vertices of the `from` vertex
         * }
         * @example
         * // in ECMAScript 6, you can use a for..of loop
         * for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
         *     // iterates over all incoming edges of the `to` vertex
         * }
         */
        vericlesTo(to:Key):Iterator <Key,VerticesData,VerticesData>;
        /**
         * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
         * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
         * @param from {Key} the key of the vertex to take the reachable vertices from
         * @returns { Iterator.<Key, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
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
        verticesWithPathFrom(from:Key):Iterator<Key,VerticesData>;
        /**
         * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
         * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
         * @param to {Key} the key of the vertex to take the reachable vertices from
         * @returns { Iterator.<Key, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
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
        verticesWithPathTo(to:Key):Iterator<Key,VerticesData>;
        /**
         * Iterate over all vertices that have no incoming edges, in no particular order.
         * @returns { Iterator.<Key, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
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
        sources():Generator<Key,VerticesData>;
        /**
         * Iterate over all vertices that have no outgoing edges, in no particular order.
         * @returns { Iterator.<Key, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
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
        sinks():Generator<Key,VerticesData>;
        /**
         * Iterate over all vertices of the graph in topological order.
         * @returns { Iterator.<Key, VerticesData> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
         * @example
         * for (var it = graph.vertices_topologically(), kv; !(kv = it.next()).done;) {
         *     var key   = kv.value[0],
         *         value = kv.value[1];
         *     // iterates over all vertices of the graph in topological order
         * }
         * @example
         * // in ECMAScript 6, you can use a for..of loop
         * for (let [key, value] of graph.vertices_topologically()) {
         *     // iterates over all vertices of the graph in topological order
         * }
         */
        vertices_topologicaly():Generator<Key,VerticesData>;
        /**
         * Remove all edges from the graph, but leave the vertices intact.
         */
        clearEdges():void;
        /**
         * Remove all edges and vertices from the graph, putting it back in its initial state.
         */
        clear():void;
        /**
         * Ask whether `this` graph and a given `other` graph are equal.
         * Two graphs are equal if they have the same vertices and the same edges.
         * @param other {Graph} the other graph to compare to `this` one
         * @param [eqV] {function(VerticesData, VerticesData, Key): boolean}
         *     a custom equality function for values stored in vertices;
         *     defaults to `===` comparison; The first two arguments are the
         *     values to compare. The third is the corresponding `key`.
         * @param [eqE] {function(EdgesData, EdgesData, Key, Key): boolean}
         *     a custom equality function for values stored in edges;
         *     defaults to the function given for `trV`; The first two arguments
         *     are the values to compare. The third and fourth are the `from`
         *     and `to` keys respectively.
         * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
         */
        equals(other:Graph,eqV:(v1:VerticesData,v2:VerticesData,key:Key)=>boolean,eqE:(v1:EdgesData,v2:EdgesData,from:Key,to:Key)=>boolean):boolean;
        /**
         * Iterate over all simple directed cycles in this graph, in no particular order.
         * If you mutate the graph in between iterations, behavior of the iterator
         * becomes unspecified. (So, don't.)
         * @returns { Iterator.< Array.<Key> > }
         *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
         *          Each iterated value is an array containing the vertex keys describing the cycle.
         *          These arrays will contain each vertex key only once — even the first/last one.
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
        cycles():Generator<Array<Key>>
        /**
         * Find any directed cycle in this graph.
         * @returns {?Array} an array containing the vertex keys describing the cycle; `null`, if there is no cycle;
         *                   The array will contain each vertex key only once — even the first/last one.
         */
        cycle():Array<Key> | null
        /**
         * Test whether this graph contains a directed cycle.
         * @returns {boolean} whether this graph contains any directed cycle
         */
        hasCycle():boolean
        /**
         * Iterate over all paths between two given keys in this graph, in no particular order.
         * If you mutate the graph in between iterations, behavior of the iterator
         * becomes unspecified. (So, don't.)
         * @param from {Key} the key for the originating vertex
         * @param to   {Key} the key for the terminating vertex
         * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
         * @returns { Iterator.< Array.<Key> > }
         *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
         *          Each iterated value is an array containing the vertex-keys describing the path.
         * @example
         * for (var it = graph.paths(), kv; !(kv = it.next()).done;) {
         *     var path = kv.value;
         *     // iterates over all paths between `from` and `to` in the graph
         * }
         * @example
         * // in ECMAScript 6, you can use a for..of loop
         * for (let path of graph.paths()) {
         *     // iterates over all paths between `from` and `to` in the graph
         * }
         */
        paths(ftom:Key,to:Key):Iterator<Array<Key>>
        /**
         * Find any path between a given pair of keys.
         * @param from {Key} the originating vertex
         * @param to   {Key} the terminating vertex
         * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
         * @returns {?Array} an array with the keys of the path found between the two vertices,
         *                   including those two vertices themselves; `null` if no such path exists
         */
        path(from:Key,to:Key):Array<Key>
        /**
         * Test whether there is a directed path between a given pair of keys.
         * @param from {Key} the originating vertex
         * @param to   {Key} the terminating vertex
         * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
         * @returns {boolean} whether such a path exists
         */
        hasPath(from:Key, to:Key):number;
        /**
         * Get the number of edges going out of a given vertex.
         * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
         * @param key {Key} the key of the vertex to query
         * @returns {number} the number of edges going out of the `key` vertex
         */
        outDegree(key:Key):number
        /**
         * Get the number of edges coming into a given vertex.
         * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
         * @param key {Key} the key of the vertex to query
         * @returns {number} the number of edges coming into the `key` vertex
         */
        inDegree(key:Key):number; 
        /**
         * Get the number of edges connected to a given vertex.
         * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
         * @param key {Key} the key of the vertex to query
         * @returns {number} the number of edges connected to the `key` vertex
         */
        degree(key:Key):number;
        /**
         * Merge another graph into this graph.
         * @param other {Graph} the other graph to merge into this one
         * @param [mV] {function(VerticesData, VerticesData, Key): VerticesData}
         *     a custom merge function for values stored in vertices;
         *     defaults to whichever of the two values is not `undefined`,
         *     giving preference to that of the other graph; The first and
         *     second arguments are the vertex values of `this` graph and the
         *     `other` graph respectively. The third is the corresponding `key`.
         * @param [mE] {function(EdgesData, EdgesData, Key, Key): EdgesData}
         *     a custom merge function for values stored in edges;
         *     defaults to whichever of the two values is not `undefined`,
         *     giving preference to that of the other graph; The first and
         *     second arguments are the edge values of `this` graph and the
         *     `other` graph respectively. The third and fourth are the
         *     corresponding `from` and `to` keys.
         */
        mergeIn(other:Graph, mV:(v:VerticesData,key:Key)=>VerticesData, mE:(v:EdgesData,from:Key,to:Key)=>EdgesData):void ;
        /**
         * Create a clone of this graph.
         * @param [trV] {function(VerticesData, Key): VerticesData}
         *     a custom transformation function for values stored in vertices;
         *     defaults to the identity function; The first argument is the
         *     value to clone. The second is the corresponding `key`.
         * @param [trE] {function(EdgesData, Key, Key): EdgesData}
         *     a custom transformation function for values stored in edges;
         *     defaults to the function given for `trV`; The first argument
         *     is the value to clone. The second and third are the `from`
         *     and `to` keys respectively.
         * @returns {Graph} a clone of this graph
         */
        clone(trV:(v:VerticesData,key:Key)=>VerticesData, trE:(v:EdgesData,from:Key,to:Key)=>EdgesData):Graph;
        /**
         * Create a clone of this graph, but without any transitive edges.
         * @param [trV] {function(VerticesData, Key): VerticesData}
         *     a custom transformation function for values stored in vertices;
         *     defaults to the identity function; The first argument is the
         *     value to clone. The second is the corresponding `key`.
         * @param [trE] {function(EdgesData, Key, Key): EdgesData}
         *     a custom transformation function for values stored in edges;
         *     defaults to the function given for `trV`; The first argument
         *     is the value to clone. The second and third are the `from`
         *     and `to` keys respectively.
         * @returns {Graph} a clone of this graph with all transitive edges removed
         */
        transitiveReduction(trV:(v:VerticesData,key:Key)=>VerticesData, trE:(v:EdgesData,from:Key,to:Key)=>EdgesData):Graph;
        /**
         * This method replaces stretches of non-branching directed pathway into single edges.
         * More specifically, it identifies all 'nexus' vertices in the graph and preserves them.
         * It then removes all other vertices and all edges from the graph, then inserts edges
         * between nexuses that summarize the connectivity that was there before.
         *
         * A nexus is any vertex that is *not* characterized by '1 edge in, 1 edge out'.
         * A custom `isNexus` function may be provided to manually select additional vertices
         * that should be preserved as nexus.
         * @param [isNexus] {function(Key, VerticesData): boolean}
         *                  a predicate for identifying additional vertices that should be treated as nexus;
         *                  It receives a `key` and `value` associated to a vertex and should return
         *                  true if and only if that vertex should be a nexus.
         * @throws {Graph.BranchlessCycleError} if the graph contains a cycle with no branches or nexuses
         */
        contractPaths(isNexus:((key:Key,v:VerticesData)=>boolean)):void;
        /**
         * Serialize this graph into a JSON string.
         * The resulting string can be deserialized with `Graph.fromJSON`
         * @returns {string} a JSON string representation of the current state of this graph
         * @see {@link Graph.fromJSON}
         * @example
         * let json   = graph1.toJSON();
         * let graph2 = Graph.fromJSON(json);
         * console.log(graph1.equals(graph2)); // true
         */
        toJSON():string;
        /**
         * Deserialize a string returned from `.toJSON()`
         * into a new `Graph` instance equal to the original.
         * @param json {string} a string originally returned from `.toJSON()`
         * @returns {Graph} a graph equal to the original
         * @see {@link Graph#toJSON}
         * @example
         * let json   = graph1.toJSON();
         * let graph2 = Graph.fromJSON(json);
         * console.log(graph1.equals(graph2)); // true
         */
        static fromJSON(json:string):Graph;
    }   
}

export = graph.Graph;