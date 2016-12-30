graph.js
========
[![Build Status](http://img.shields.io/travis/mhelvens/graph.js.svg)](https://travis-ci.org/mhelvens/graph.js?branch=master)
[![Coverage Status](http://img.shields.io/coveralls/mhelvens/graph.js.svg)](https://coveralls.io/r/mhelvens/graph.js?branch=master)
[![npm](https://img.shields.io/npm/v/graph.js.svg)](https://www.npmjs.com/package/graph.js)
[![Bower](https://img.shields.io/bower/v/graph.js.svg)](http://bower.io/search/?q=graph.js)

*formerly known as js-graph*

`graph.js` is a javascript library for storing arbitrary data in mathematical (di)graphs,
as well as traversing and analyzing them in various ways. It was originally created to
track dependencies between options and modules. It is written in ECMAScript 6, but
auto-generated ECMAScript 5 versions are shipped with it.

Feedback of any kind (questions, issues, pull requests) is greatly appreciated.


Installing graph.js
-------------------

When running in an ECMAScript 5 environment, this library depends on the
[Babel ES6 polyfill](https://babeljs.io/docs/usage/polyfill).
For your convenience, a standalone version of graph.js is available,
which has the polyfill already baked in.

graph.js is available from [NPM](https://www.npmjs.org) and [Bower](http://bower.io):

```shell
npm install graph.js --save
```

```shell
bower install graph.js --save
```

The Babel polyfill is [not distributed through Bower](https://github.com/babel/babel/issues/315).
So Bower users have to either use the standalone version of graph.js, or get the polyfill from
someplace else, like NPM.


Loading graph.js
----------------

The graph.js library supports all popular module systems:
[ECMAScript 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import),
CommonJS ([Node.js](https://nodejs.org),
          [IO.js](https://iojs.org),
          [browserify](http://browserify.org),
          [webpack](http://webpack.github.io)),
AMD ([RequireJS](http://requirejs.org)),
and good old-fashioned [HTML script tags](https://developer.mozilla.org/en/docs/Web/HTML/Element/script).

```javascript
import Graph from 'graph.js'; // the ES6 version is default
// use Graph
```

```javascript
var Graph = require('graph.js/dist/graph.full.js');
// use Graph
```

```javascript
requirejs(['graph.js/dist/graph.full.js'], function (Graph) {
    // use Graph
});
```

```html
<script src="graph.js/dist/graph.full.js"></script>
<script>
    // use Graph
</script>
```

The `dist` directory offers different files for use in different circumstances.
Use the following table to determine which file to use in your situation.

| File                                    | Description                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| `graph.es6.js`                          | for use in an ECMAScript 6 context, e.g., a modern browser or transpiler                    |
| `graph.js`,<br>`graph.min.js`           | requires you to load the [Babel polyfill](https://babeljs.io/docs/usage/polyfill/) yourself |
| `graph.full.js`,<br>`graph.full.min.js` | already includes the Babel polyfill                                                         |

If you don't know which you need, you probably want `graph.full.js`, because it will work out-of-the-box.
But it is generally more elegant to load the polyfill yourself, especially if you use other libraries that
also depend on it.


API Documentation
-----------------


* [Graph](#Graph)
    * [new Graph()](#new_Graph_new)
    * <ins><b>instance</b></ins>
    * [.@@iterator()](#Graph+@@iterator) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * ["vertex-added"](#Graph+event_vertex-added)
    * ["vertex-removed"](#Graph+event_vertex-removed)
    * ["vertex-modified"](#Graph+event_vertex-modified)
    * ["edge-added"](#Graph+event_edge-added)
    * ["edge-removed"](#Graph+event_edge-removed)
    * ["edge-modified"](#Graph+event_edge-modified)
    * <ins><b>static</b></ins>
    * [.VertexExistsError](#Graph.VertexExistsError) ⇐ <code>Error</code>
        * [.vertices](#Graph.VertexExistsError+vertices) : <code>Set.&lt;Array&gt;</code>
    * [.VertexNotExistsError](#Graph.VertexNotExistsError) ⇐ <code>Error</code>
        * [.vertices](#Graph.VertexNotExistsError+vertices) : <code>Set.&lt;string&gt;</code>
    * [.EdgeExistsError](#Graph.EdgeExistsError) ⇐ <code>Error</code>
        * [.edges](#Graph.EdgeExistsError+edges) : <code>Set.&lt;Array&gt;</code>
    * [.EdgeNotExistsError](#Graph.EdgeNotExistsError) ⇐ <code>Error</code>
        * [.edges](#Graph.EdgeNotExistsError+edges) : <code>Set.&lt;Array.&lt;string&gt;&gt;</code>
    * [.HasConnectedEdgesError](#Graph.HasConnectedEdgesError) ⇐ <code>[EdgeExistsError](#Graph.EdgeExistsError)</code>
        * [.vertex](#Graph.HasConnectedEdgesError+vertex) : <code>string</code>
        * [.edges](#Graph.EdgeExistsError+edges) : <code>Set.&lt;Array&gt;</code>
    * [.CycleError](#Graph.CycleError) ⇐ <code>Error</code>
        * [.cycle](#Graph.CycleError+cycle) : <code>Array.&lt;string&gt;</code>
    * [.BranchlessCycleError](#Graph.BranchlessCycleError) ⇐ <code>[CycleError](#Graph.CycleError)</code>
        * [.cycle](#Graph.CycleError+cycle) : <code>Array.&lt;string&gt;</code>


-----

### Classes

<dl>
<dt><a href="#Graph">Graph</a></dt>
<dd><p>The main class of this library, to be used for representing a mathematical (di)graph.</p>
</dd>
</dl>

### Functions

<dl>
<dt><a href="#on">on(event, handler)</a></dt>
<dd><p>Register an event handler.</p>
</dd>
<dt><a href="#off">off(event, handler)</a></dt>
<dd><p>Deregister a previously registered event handler.</p>
</dd>
<dt><a href="#addNewVertex">addNewVertex(key, [value])</a></dt>
<dd><p>Add a new vertex to this graph.</p>
</dd>
<dt><a href="#setVertex">setVertex(key, [value])</a></dt>
<dd><p>Set the value of an existing vertex in this graph.</p>
</dd>
<dt><a href="#ensureVertex">ensureVertex(key, [value])</a></dt>
<dd><p>Make sure a vertex with a specific key exists in this graph. If it already exists,
do nothing. If it does not yet exist, add a new vertex with the given value.</p>
</dd>
<dt><a href="#addVertex">addVertex(key, [value])</a></dt>
<dd><p>Add a new vertex to this graph. If a vertex with this key already exists,
the value of that vertex is overwritten.</p>
</dd>
<dt><a href="#removeExistingVertex">removeExistingVertex(key)</a></dt>
<dd><p>Remove an existing vertex from this graph.</p>
</dd>
<dt><a href="#destroyExistingVertex">destroyExistingVertex(key)</a></dt>
<dd><p>Remove an existing vertex from this graph, as well as all edges connected to it.</p>
</dd>
<dt><a href="#removeVertex">removeVertex(key)</a></dt>
<dd><p>Remove an existing vertex from this graph.
If a vertex with this key does not exist, nothing happens.</p>
</dd>
<dt><a href="#destroyVertex">destroyVertex(key)</a></dt>
<dd><p>Remove a vertex from this graph, as well as all edges connected to it.
If a vertex with this key does not exist, nothing happens.</p>
</dd>
<dt><a href="#vertexCount">vertexCount()</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#hasVertex">hasVertex(key)</a> ⇒ <code>boolean</code></dt>
<dd><p>Ask whether a vertex with a given key exists.</p>
</dd>
<dt><a href="#vertexValue">vertexValue(key)</a> ⇒ <code>*</code></dt>
<dd><p>Get the value associated with the vertex of a given key.</p>
</dd>
<dt><a href="#addNewEdge">addNewEdge(from, to, [value])</a></dt>
<dd><p>Add a new edge to this graph.</p>
</dd>
<dt><a href="#createNewEdge">createNewEdge(from, to, [value])</a></dt>
<dd><p>Add a new edge to this graph. If the <code>from</code> and/or <code>to</code> vertices do not yet exist
in the graph, they are implicitly added with an <code>undefined</code> value.</p>
</dd>
<dt><a href="#setEdge">setEdge(from, to, [value])</a></dt>
<dd><p>Set the value of an existing edge in this graph.</p>
</dd>
<dt><a href="#spanEdge">spanEdge(from, to, [value])</a></dt>
<dd><p>Make sure an edge between the <code>from</code> and <code>to</code> vertices in this graph.
If one already exists, nothing is done.
If one does not yet exist, a new edge is added with the given value.</p>
</dd>
<dt><a href="#addEdge">addEdge(from, to, [value])</a></dt>
<dd><p>Add a new edge to this graph. If an edge between <code>from</code> and <code>to</code> already exists,
the value of that edge is overwritten.</p>
</dd>
<dt><a href="#ensureEdge">ensureEdge(from, to, [value])</a></dt>
<dd><p>Make sure an edge between the <code>from</code> and <code>to</code> vertices exists in this graph.
If it already exists, nothing is done.
If it does not yet exist, a new edge is added with the given value.
If the <code>from</code> and/or <code>to</code> vertices do not yet exist
in the graph, they are implicitly added with an <code>undefined</code> value.</p>
</dd>
<dt><a href="#createEdge">createEdge(from, to, [value])</a></dt>
<dd><p>Add a new edge to this graph. If an edge between the <code>from</code> and <code>to</code>
vertices already exists, the value of that edge is overwritten.
If the <code>from</code> and/or <code>to</code> vertices do not yet exist
in the graph, they are implicitly added with an <code>undefined</code> value.</p>
</dd>
<dt><a href="#removeExistingEdge">removeExistingEdge(from, to)</a></dt>
<dd><p>Remove an existing edge from this graph.</p>
</dd>
<dt><a href="#removeEdge">removeEdge(from, to)</a></dt>
<dd><p>Remove an edge from this graph.
If an edge between the <code>from</code> and <code>to</code> vertices doesn&#39;t exist, nothing happens.</p>
</dd>
<dt><a href="#edgeCount">edgeCount()</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#hasEdge">hasEdge(from, to)</a> ⇒ <code>boolean</code></dt>
<dd><p>Ask whether an edge between given <code>from</code> and <code>to</code> vertices exist.</p>
</dd>
<dt><a href="#edgeValue">edgeValue(from, to)</a> ⇒ <code>*</code></dt>
<dd><p>Get the value associated with the edge between given <code>from</code> and <code>to</code> vertices.</p>
</dd>
<dt><a href="#vertices">vertices()</a> ⇒ <code>Iterator.&lt;string, *&gt;</code></dt>
<dd><p>Iterate over all vertices of the graph, in no particular order.</p>
</dd>
<dt><a href="#edges">edges()</a> ⇒ <code>Iterator.&lt;string, string, *&gt;</code></dt>
<dd><p>Iterate over all edges of the graph, in no particular order.</p>
</dd>
<dt><a href="#verticesFrom">verticesFrom(from)</a> ⇒ <code>Iterator.&lt;string, *, *&gt;</code></dt>
<dd><p>Iterate over the outgoing edges of a given vertex in the graph, in no particular order.</p>
</dd>
<dt><a href="#verticesTo">verticesTo(to)</a> ⇒ <code>Iterator.&lt;string, *, *&gt;</code></dt>
<dd><p>Iterate over the incoming edges of a given vertex in the graph, in no particular order.</p>
</dd>
<dt><a href="#verticesWithPathFrom">verticesWithPathFrom(from)</a> ⇒ <code>Iterator.&lt;string, *&gt;</code></dt>
<dd><p>Iterate over all vertices reachable from a given vertex in the graph, in no particular order.</p>
</dd>
<dt><a href="#verticesWithPathTo">verticesWithPathTo(to)</a> ⇒ <code>Iterator.&lt;string, *&gt;</code></dt>
<dd><p>Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.</p>
</dd>
<dt><a href="#sources">sources()</a> ⇒ <code>Iterator.&lt;string, *&gt;</code></dt>
<dd><p>Iterate over all vertices that have no incoming edges, in no particular order.</p>
</dd>
<dt><a href="#sinks">sinks()</a> ⇒ <code>Iterator.&lt;string, *&gt;</code></dt>
<dd><p>Iterate over all vertices that have no outgoing edges, in no particular order.</p>
</dd>
<dt><a href="#vertices_topologically">vertices_topologically()</a> ⇒ <code>Iterator.&lt;string, *&gt;</code></dt>
<dd><p>Iterate over all vertices of the graph in topological order.</p>
</dd>
<dt><a href="#clearEdges">clearEdges()</a></dt>
<dd><p>Remove all edges from the graph, but leave the vertices intact.</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>Remove all edges and vertices from the graph, putting it back in its initial state.</p>
</dd>
<dt><a href="#equals">equals(other, [eqV], [eqE])</a> ⇒ <code>boolean</code></dt>
<dd><p>Ask whether <code>this</code> graph and a given <code>other</code> graph are equal.
Two graphs are equal if they have the same vertices and the same edges.</p>
</dd>
<dt><a href="#cycles">cycles()</a> ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Iterate over all simple directed cycles in this graph, in no particular order.
If you mutate the graph in between iterations, behavior of the iterator
becomes unspecified. (So, don&#39;t.)</p>
</dd>
<dt><a href="#cycle">cycle()</a> ⇒ <code>Array</code></dt>
<dd><p>Find any directed cycle in this graph.</p>
</dd>
<dt><a href="#hasCycle">hasCycle()</a> ⇒ <code>boolean</code></dt>
<dd><p>Test whether this graph contains a directed cycle.</p>
</dd>
<dt><a href="#paths">paths(from, to)</a> ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Iterate over all paths between two given keys in this graph, in no particular order.
If you mutate the graph in between iterations, behavior of the iterator
becomes unspecified. (So, don&#39;t.)</p>
</dd>
<dt><a href="#path">path(from, to)</a> ⇒ <code>Array</code></dt>
<dd><p>Find any path between a given pair of keys.</p>
</dd>
<dt><a href="#hasPath">hasPath(from, to)</a> ⇒ <code>boolean</code></dt>
<dd><p>Test whether there is a directed path between a given pair of keys.</p>
</dd>
<dt><a href="#outDegree">outDegree(key)</a> ⇒ <code>number</code></dt>
<dd><p>Get the number of edges going out of a given vertex.</p>
</dd>
<dt><a href="#inDegree">inDegree(key)</a> ⇒ <code>number</code></dt>
<dd><p>Get the number of edges coming into a given vertex.</p>
</dd>
<dt><a href="#degree">degree(key)</a> ⇒ <code>number</code></dt>
<dd><p>Get the number of edges connected to a given vertex.</p>
</dd>
<dt><a href="#mergeIn">mergeIn(other, [mV], [mE])</a></dt>
<dd><p>Merge another graph into this graph.</p>
</dd>
<dt><a href="#clone">clone([trV], [trE])</a> ⇒ <code><a href="#Graph">Graph</a></code></dt>
<dd><p>Create a clone of this graph.</p>
</dd>
<dt><a href="#transitiveReduction">transitiveReduction([trV], [trE])</a> ⇒ <code><a href="#Graph">Graph</a></code></dt>
<dd><p>Create a clone of this graph, but without any transitive edges.</p>
</dd>
<dt><a href="#contractPaths">contractPaths([isNexus])</a></dt>
<dd><p>This method replaces stretches of non-branching directed pathway into single edges.
More specifically, it identifies all &#39;nexus&#39; vertices in the graph and preserves them.
It then removes all other vertices and all edges from the graph, then inserts edges
between nexuses that summarize the connectivity that was there before.</p>
<p>A nexus is any vertex that is <em>not</em> characterized by &#39;1 edge in, 1 edge out&#39;.
A custom <code>isNexus</code> function may be provided to manually select additional vertices
that should be preserved as nexus.</p>
</dd>
<dt><a href="#toJSON">toJSON()</a> ⇒ <code>string</code></dt>
<dd><p>Serialize this graph into a JSON string.
The resulting string can be deserialized with <code>Graph.fromJSON</code></p>
</dd>
<dt><a href="#fromJSON">fromJSON(json)</a> ⇒ <code><a href="#Graph">Graph</a></code></dt>
<dd><p>Deserialize a string returned from <code>.toJSON()</code>
into a new <code>Graph</code> instance equal to the original.</p>
</dd>
</dl>

<a name="Graph"></a>
### Graph
The main class of this library, to be used for representing a mathematical (di)graph.


-----

<a name="new_Graph_new"></a>
#### new Graph()
Constructor arguments can be used to supply initial vertices and edges.


| Param | Type | Description |
| --- | --- | --- |
| ...parts | <code>Array.&lt;Array&gt;</code> | a short notation for vertices and edges to initially add to the graph;        A vertex should be an array of the form `[key, value]`.        An edge should be an array of the form `[[from, to], value]`.        Later values of vertices or edges in this list will overwrite earlier        values, but vertices need not precede their edges. Vertices that are        connected but store no value need not be listed at all. |

**Example**  
```JavaScript
var map = new Graph(
    ['Amsterdam',             { population: 825000 }], // vertex
    ['Leiden',                { population: 122000 }], // vertex
    [['Amsterdam', 'Leiden'], { distance:   "40km" }]  // edge
);
```

-----

<a name="Graph+@@iterator"></a>
#### *graph*.@@iterator() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
A [Graph](#Graph) object is itself [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol),
and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (let [key, value] of graph) {
    // iterates over all vertices of the graph
}
```
**See**: [Graph#vertices](Graph#vertices)

-----

<a name="Graph+event_vertex-added"></a>
#### "vertex-added"
An event that is triggered just after a vertex is added to this graph.
Handlers receive the new vertex `[key, value]` as an argument.

**See**: [Graph#on](Graph#on), [Graph#off](Graph#off)

-----

<a name="Graph+event_vertex-removed"></a>
#### "vertex-removed"
An event that is triggered just after a vertex is removed from this graph.
Handlers receive the vertex key as an argument.

**See**: [Graph#on](Graph#on), [Graph#off](Graph#off)

-----

<a name="Graph+event_vertex-modified"></a>
#### "vertex-modified"
An event that is triggered after a vertex in this graph is modified.
It is also triggered after any ["vertex-added"](#Graph#event_vertex-added) event.
Handlers receive the vertex `[key, value]` as an argument.

**See**: [Graph#on](Graph#on), [Graph#off](Graph#off)

-----

<a name="Graph+event_edge-added"></a>
#### "edge-added"
An event that is triggered just after an edge is added to this graph.
Handlers receive the new edge `[[from, to], value]` as an argument.

**See**: [Graph#on](Graph#on), [Graph#off](Graph#off)

-----

<a name="Graph+event_edge-removed"></a>
#### "edge-removed"
An event that is triggered just after an edge is removed from this graph.
Handlers receive the edge key `[from, to]` as an argument.

**See**: [Graph#on](Graph#on), [Graph#off](Graph#off)

-----

<a name="Graph+event_edge-modified"></a>
#### "edge-modified"
An event that is triggered after an edge in this graph is modified.
It is also triggered after any ["edge-added"](#Graph#event_edge-added) event.
Handlers receive the edge `[[from, to], value]` as an argument.

**See**: [Graph#on](Graph#on), [Graph#off](Graph#off)

-----

<a name="Graph.VertexExistsError"></a>
#### *Graph*.VertexExistsError ⇐ <code>Error</code>
This type of error is thrown when specific vertices are expected not to exist, but do.

**Extends:** <code>Error</code>  

-----

<a name="Graph.VertexExistsError+vertices"></a>
##### *vertexExistsError*.vertices : <code>Set.&lt;Array&gt;</code>
the set of relevant vertices as `[key, value]` shaped arrays


-----

<a name="Graph.VertexNotExistsError"></a>
#### *Graph*.VertexNotExistsError ⇐ <code>Error</code>
This type of error is thrown when specific vertices are expected to exist, but don't.

**Extends:** <code>Error</code>  

-----

<a name="Graph.VertexNotExistsError+vertices"></a>
##### *vertexNotExistsError*.vertices : <code>Set.&lt;string&gt;</code>
the set of relevant vertex keys


-----

<a name="Graph.EdgeExistsError"></a>
#### *Graph*.EdgeExistsError ⇐ <code>Error</code>
This type of error is thrown when specific edges are expected not to exist, but do.

**Extends:** <code>Error</code>  

-----

<a name="Graph.EdgeExistsError+edges"></a>
##### *edgeExistsError*.edges : <code>Set.&lt;Array&gt;</code>
the set of relevant edges as `[[from, to], value]` shaped arrays


-----

<a name="Graph.EdgeNotExistsError"></a>
#### *Graph*.EdgeNotExistsError ⇐ <code>Error</code>
This type of error is thrown when specific edges are expected to exist, but don't.

**Extends:** <code>Error</code>  

-----

<a name="Graph.EdgeNotExistsError+edges"></a>
##### *edgeNotExistsError*.edges : <code>Set.&lt;Array.&lt;string&gt;&gt;</code>
the set of relevant edge keys as `[from, to]` shaped arrays


-----

<a name="Graph.HasConnectedEdgesError"></a>
#### *Graph*.HasConnectedEdgesError ⇐ <code>[EdgeExistsError](#Graph.EdgeExistsError)</code>
This type of error is thrown when a vertex is expected not to have any connected edges, but does.

**Extends:** <code>[EdgeExistsError](#Graph.EdgeExistsError)</code>  

-----

<a name="Graph.HasConnectedEdgesError+vertex"></a>
##### *hasConnectedEdgesError*.vertex : <code>string</code>
the key of the vertex that has connected edges


-----

<a name="Graph.EdgeExistsError+edges"></a>
##### *hasConnectedEdgesError*.edges : <code>Set.&lt;Array&gt;</code>
the set of relevant edges as `[[from, to], value]` shaped arrays


-----

<a name="Graph.CycleError"></a>
#### *Graph*.CycleError ⇐ <code>Error</code>
This type of error is thrown when a graph is expected not to have a directed cycle, but does.

**Extends:** <code>Error</code>  

-----

<a name="Graph.CycleError+cycle"></a>
##### *cycleError*.cycle : <code>Array.&lt;string&gt;</code>
the vertices involved in the cycle, in order but with an unspecified starting point


-----

<a name="Graph.BranchlessCycleError"></a>
#### *Graph*.BranchlessCycleError ⇐ <code>[CycleError](#Graph.CycleError)</code>
This type of error is thrown when a graph is expected not to have a branch-less directed cycle, but does.

**Extends:** <code>[CycleError](#Graph.CycleError)</code>  

-----

<a name="Graph.CycleError+cycle"></a>
##### *branchlessCycleError*.cycle : <code>Array.&lt;string&gt;</code>
the vertices involved in the cycle, in order but with an unspecified starting point


-----

<a name="on"></a>
### on(event, handler)
Register an event handler.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | the event to listen for |
| handler | <code>function</code> | the function to call for each such event fired, receiving its corresponding value |


-----

<a name="off"></a>
### off(event, handler)
Deregister a previously registered event handler.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | the event used to originally register a handler |
| handler | <code>function</code> | the handler originally registered |


-----

<a name="addNewVertex"></a>
### addNewVertex(key, [value])
Add a new vertex to this graph.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| [value] | <code>\*</code> | the value to store in this new vertex |

**Throws**:

- <code>[VertexExistsError](#Graph.VertexExistsError)</code> if a vertex with this key already exists


-----

<a name="setVertex"></a>
### setVertex(key, [value])
Set the value of an existing vertex in this graph.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key belonging to the vertex |
| [value] | <code>\*</code> | the value to store in this vertex |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist


-----

<a name="ensureVertex"></a>
### ensureVertex(key, [value])
Make sure a vertex with a specific key exists in this graph. If it already exists,
do nothing. If it does not yet exist, add a new vertex with the given value.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key for the vertex |
| [value] | <code>\*</code> | the value to store if a new vertex is added |


-----

<a name="addVertex"></a>
### addVertex(key, [value])
Add a new vertex to this graph. If a vertex with this key already exists,
the value of that vertex is overwritten.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| [value] | <code>\*</code> | the value to store in this new vertex |


-----

<a name="removeExistingVertex"></a>
### removeExistingVertex(key)
Remove an existing vertex from this graph.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist
- <code>[HasConnectedEdgesError](#Graph.HasConnectedEdgesError)</code> if there are still edges connected to this vertex


-----

<a name="destroyExistingVertex"></a>
### destroyExistingVertex(key)
Remove an existing vertex from this graph, as well as all edges connected to it.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist


-----

<a name="removeVertex"></a>
### removeVertex(key)
Remove an existing vertex from this graph.
If a vertex with this key does not exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |

**Throws**:

- <code>[HasConnectedEdgesError](#Graph.HasConnectedEdgesError)</code> if there are still edges connected to this vertex


-----

<a name="destroyVertex"></a>
### destroyVertex(key)
Remove a vertex from this graph, as well as all edges connected to it.
If a vertex with this key does not exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |


-----

<a name="vertexCount"></a>
### vertexCount() ⇒ <code>number</code>
**Returns**: <code>number</code> - the number of vertices in the whole graph  

-----

<a name="hasVertex"></a>
### hasVertex(key) ⇒ <code>boolean</code>
Ask whether a vertex with a given key exists.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key to query |

**Returns**: <code>boolean</code> - whether there is a vertex with the given key  

-----

<a name="vertexValue"></a>
### vertexValue(key) ⇒ <code>\*</code>
Get the value associated with the vertex of a given key.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key to query |

**Returns**: <code>\*</code> - the value associated with the vertex of the given key.
Note that a return value of `undefined` can mean

1. that there is no such vertex, or
2. that the stored value is actually `undefined`.

Use [Graph#hasVertex](Graph#hasVertex) to distinguish these cases.  

-----

<a name="addNewEdge"></a>
### addNewEdge(from, to, [value])
Add a new edge to this graph.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store in this new edge |

**Throws**:

- <code>[EdgeExistsError](#Graph.EdgeExistsError)</code> if an edge between `from` and `to` already exists
- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph


-----

<a name="createNewEdge"></a>
### createNewEdge(from, to, [value])
Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
in the graph, they are implicitly added with an `undefined` value.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store in this new edge |

**Throws**:

- <code>[EdgeExistsError](#Graph.EdgeExistsError)</code> if an edge between `from` and `to` already exists


-----

<a name="setEdge"></a>
### setEdge(from, to, [value])
Set the value of an existing edge in this graph.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store in this edge |

**Throws**:

- <code>[EdgeNotExistsError](#Graph.EdgeNotExistsError)</code> if an edge between `from` and `to` does not yet exist


-----

<a name="spanEdge"></a>
### spanEdge(from, to, [value])
Make sure an edge between the `from` and `to` vertices in this graph.
If one already exists, nothing is done.
If one does not yet exist, a new edge is added with the given value.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store if a new edge is added |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph


-----

<a name="addEdge"></a>
### addEdge(from, to, [value])
Add a new edge to this graph. If an edge between `from` and `to` already exists,
the value of that edge is overwritten.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store in this new edge |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph


-----

<a name="ensureEdge"></a>
### ensureEdge(from, to, [value])
Make sure an edge between the `from` and `to` vertices exists in this graph.
If it already exists, nothing is done.
If it does not yet exist, a new edge is added with the given value.
If the `from` and/or `to` vertices do not yet exist
in the graph, they are implicitly added with an `undefined` value.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store if a new edge is added |


-----

<a name="createEdge"></a>
### createEdge(from, to, [value])
Add a new edge to this graph. If an edge between the `from` and `to`
vertices already exists, the value of that edge is overwritten.
If the `from` and/or `to` vertices do not yet exist
in the graph, they are implicitly added with an `undefined` value.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store if a new edge is added |


-----

<a name="removeExistingEdge"></a>
### removeExistingEdge(from, to)
Remove an existing edge from this graph.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Throws**:

- <code>[EdgeNotExistsError](#Graph.EdgeNotExistsError)</code> if an edge between the `from` and `to` vertices doesn't exist


-----

<a name="removeEdge"></a>
### removeEdge(from, to)
Remove an edge from this graph.
If an edge between the `from` and `to` vertices doesn't exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |


-----

<a name="edgeCount"></a>
### edgeCount() ⇒ <code>number</code>
**Returns**: <code>number</code> - the number of edges in the whole graph  

-----

<a name="hasEdge"></a>
### hasEdge(from, to) ⇒ <code>boolean</code>
Ask whether an edge between given `from` and `to` vertices exist.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Returns**: <code>boolean</code> - whether there is an edge between the given `from` and `to` vertices  

-----

<a name="edgeValue"></a>
### edgeValue(from, to) ⇒ <code>\*</code>
Get the value associated with the edge between given `from` and `to` vertices.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Returns**: <code>\*</code> - the value associated with the edge between the given `from` and `to` vertices
Note that a return value of `undefined` can mean

1. that there is no such edge, or
2. that the stored value is actually `undefined`.

Use [Graph#hasEdge](Graph#hasEdge) to distinguish these cases.  

-----

<a name="vertices"></a>
### vertices() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices of the graph, in no particular order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.vertices(), kv; !(kv = it.next()).done;) {
    var key   = kv.value[0],
        value = kv.value[1];
    // iterates over all vertices of the graph
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of graph.vertices()) {
    // iterates over all vertices of the graph
}
```
**See**: [@@iterator](#Graph+@@iterator)

-----

<a name="edges"></a>
### edges() ⇒ <code>Iterator.&lt;string, string, \*&gt;</code>
Iterate over all edges of the graph, in no particular order.

**Returns**: <code>Iterator.&lt;string, string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.edges(), kv; !(kv = it.next()).done;) {
    var from  = kv.value[0],
        to    = kv.value[1],
        value = kv.value[2];
    // iterates over all edges of the graph
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [from, to, value] of graph.edges()) {
    // iterates over all vertices of the graph
}
```

-----

<a name="verticesFrom"></a>
### verticesFrom(from) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
Iterate over the outgoing edges of a given vertex in the graph, in no particular order.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key of the vertex to take the outgoing edges from |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with the given `from` key does not exist

**Returns**: <code>Iterator.&lt;string, \*, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.verticesFrom(from), kv; !(kv = it.next()).done;) {
    var to          = kv.value[0],
        vertexValue = kv.value[1],
        edgeValue   = kv.value[2];
    // iterates over all outgoing vertices of the `from` vertex
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
    // iterates over all outgoing edges of the `from` vertex
}
```

-----

<a name="verticesTo"></a>
### verticesTo(to) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
Iterate over the incoming edges of a given vertex in the graph, in no particular order.


| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | the key of the vertex to take the incoming edges from |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with the given `to` key does not exist

**Returns**: <code>Iterator.&lt;string, \*, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.verticesTo(to), kv; !(kv = it.next()).done;) {
    var from        = kv.value[0],
        vertexValue = kv.value[1],
        edgeValue   = kv.value[2];
    // iterates over all outgoing vertices of the `from` vertex
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
    // iterates over all incoming edges of the `to` vertex
}
```

-----

<a name="verticesWithPathFrom"></a>
### verticesWithPathFrom(from) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices reachable from a given vertex in the graph, in no particular order.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key of the vertex to take the reachable vertices from |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with the given `from` key does not exist

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.verticesWithPathFrom(from), kv; !(kv = it.next()).done;) {
    var key   = kv.value[0],
        value = kv.value[1];
    // iterates over all vertices reachable from `from`
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of graph.verticesWithPathFrom(from)) {
    // iterates over all vertices reachable from `from`
}
```

-----

<a name="verticesWithPathTo"></a>
### verticesWithPathTo(to) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.


| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | the key of the vertex to take the reachable vertices from |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with the given `to` key does not exist

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.verticesWithPathTo(to), kv; !(kv = it.next()).done;) {
    var key   = kv.value[0],
        value = kv.value[1];
    // iterates over all vertices from which `to` can be reached
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of graph.verticesWithPathTo(to)) {
    // iterates over all vertices from which `to` can be reached
}
```

-----

<a name="sources"></a>
### sources() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices that have no incoming edges, in no particular order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.sources(), kv; !(kv = it.next()).done;) {
    var key   = kv.value[0],
        value = kv.value[1];
    // iterates over all vertices with no incoming edges
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of graph.sources()) {
    // iterates over all vertices with no incoming edges
}
```

-----

<a name="sinks"></a>
### sinks() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices that have no outgoing edges, in no particular order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.sinks(), kv; !(kv = it.next()).done;) {
    var key   = kv.value[0],
        value = kv.value[1];
    // iterates over all vertices with no outgoing edges
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of graph.sinks()) {
    // iterates over all vertices with no outgoing edges
}
```

-----

<a name="vertices_topologically"></a>
### vertices_topologically() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices of the graph in topological order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = graph.vertices_topologically(), kv; !(kv = it.next()).done;) {
    var key   = kv.value[0],
        value = kv.value[1];
    // iterates over all vertices of the graph in topological order
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of graph.vertices_topologically()) {
    // iterates over all vertices of the graph in topological order
}
```

-----

<a name="clearEdges"></a>
### clearEdges()
Remove all edges from the graph, but leave the vertices intact.


-----

<a name="clear"></a>
### clear()
Remove all edges and vertices from the graph, putting it back in its initial state.


-----

<a name="equals"></a>
### equals(other, [eqV], [eqE]) ⇒ <code>boolean</code>
Ask whether `this` graph and a given `other` graph are equal.
Two graphs are equal if they have the same vertices and the same edges.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Graph](#Graph)</code> | the other graph to compare to `this` one |
| [eqV] | <code>function</code> | a custom equality function for values stored in vertices;     defaults to `===` comparison; The first two arguments are the     values to compare. The third is the corresponding `key`. |
| [eqE] | <code>function</code> | a custom equality function for values stored in edges;     defaults to the function given for `trV`; The first two arguments     are the values to compare. The third and fourth are the `from`     and `to` keys respectively. |

**Returns**: <code>boolean</code> - `true` if the two graphs are equal; `false` otherwise  

-----

<a name="cycles"></a>
### cycles() ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code>
Iterate over all simple directed cycles in this graph, in no particular order.
If you mutate the graph in between iterations, behavior of the iterator
becomes unspecified. (So, don't.)

**Returns**: <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol).
         Each iterated value is an array containing the vertex keys describing the cycle.
         These arrays will contain each vertex key only once — even the first/last one.  
**Example**  
```JavaScript
for (var it = graph.cycles(), kv; !(kv = it.next()).done;) {
    var cycle = kv.value;
    // iterates over all cycles of the graph
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let cycle of graph.cycles()) {
    // iterates over all cycles of the graph
}
```

-----

<a name="cycle"></a>
### cycle() ⇒ <code>Array</code>
Find any directed cycle in this graph.

**Returns**: <code>Array</code> - an array containing the vertex keys describing the cycle; `null`, if there is no cycle;
                  The array will contain each vertex key only once — even the first/last one.  

-----

<a name="hasCycle"></a>
### hasCycle() ⇒ <code>boolean</code>
Test whether this graph contains a directed cycle.

**Returns**: <code>boolean</code> - whether this graph contains any directed cycle  

-----

<a name="paths"></a>
### paths(from, to) ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code>
Iterate over all paths between two given keys in this graph, in no particular order.
If you mutate the graph in between iterations, behavior of the iterator
becomes unspecified. (So, don't.)


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph

**Returns**: <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol).
         Each iterated value is an array containing the vertex-keys describing the path.  
**Example**  
```JavaScript
for (var it = graph.paths(), kv; !(kv = it.next()).done;) {
    var path = kv.value;
    // iterates over all paths between `from` and `to` in the graph
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let path of graph.paths()) {
    // iterates over all paths between `from` and `to` in the graph
}
```

-----

<a name="path"></a>
### path(from, to) ⇒ <code>Array</code>
Find any path between a given pair of keys.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the originating vertex |
| to | <code>string</code> | the terminating vertex |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph

**Returns**: <code>Array</code> - an array with the keys of the path found between the two vertices,
                  including those two vertices themselves; `null` if no such path exists  

-----

<a name="hasPath"></a>
### hasPath(from, to) ⇒ <code>boolean</code>
Test whether there is a directed path between a given pair of keys.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the originating vertex |
| to | <code>string</code> | the terminating vertex |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph

**Returns**: <code>boolean</code> - whether such a path exists  

-----

<a name="outDegree"></a>
### outDegree(key) ⇒ <code>number</code>
Get the number of edges going out of a given vertex.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to query |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist

**Returns**: <code>number</code> - the number of edges going out of the `key` vertex  

-----

<a name="inDegree"></a>
### inDegree(key) ⇒ <code>number</code>
Get the number of edges coming into a given vertex.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to query |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist

**Returns**: <code>number</code> - the number of edges coming into the `key` vertex  

-----

<a name="degree"></a>
### degree(key) ⇒ <code>number</code>
Get the number of edges connected to a given vertex.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to query |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist

**Returns**: <code>number</code> - the number of edges connected to the `key` vertex  

-----

<a name="mergeIn"></a>
### mergeIn(other, [mV], [mE])
Merge another graph into this graph.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Graph](#Graph)</code> | the other graph to merge into this one |
| [mV] | <code>function</code> | a custom merge function for values stored in vertices;     defaults to whichever of the two values is not `undefined`,     giving preference to that of the other graph; The first and     second arguments are the vertex values of `this` graph and the     `other` graph respectively. The third is the corresponding `key`. |
| [mE] | <code>function</code> | a custom merge function for values stored in edges;     defaults to whichever of the two values is not `undefined`,     giving preference to that of the other graph; The first and     second arguments are the edge values of `this` graph and the     `other` graph respectively. The third and fourth are the     corresponding `from` and `to` keys. |


-----

<a name="clone"></a>
### clone([trV], [trE]) ⇒ <code>[Graph](#Graph)</code>
Create a clone of this graph.


| Param | Type | Description |
| --- | --- | --- |
| [trV] | <code>function</code> | a custom transformation function for values stored in vertices;     defaults to the identity function; The first argument is the     value to clone. The second is the corresponding `key`. |
| [trE] | <code>function</code> | a custom transformation function for values stored in edges;     defaults to the function given for `trV`; The first argument     is the value to clone. The second and third are the `from`     and `to` keys respectively. |

**Returns**: <code>[Graph](#Graph)</code> - a clone of this graph  

-----

<a name="transitiveReduction"></a>
### transitiveReduction([trV], [trE]) ⇒ <code>[Graph](#Graph)</code>
Create a clone of this graph, but without any transitive edges.


| Param | Type | Description |
| --- | --- | --- |
| [trV] | <code>function</code> | a custom transformation function for values stored in vertices;     defaults to the identity function; The first argument is the     value to clone. The second is the corresponding `key`. |
| [trE] | <code>function</code> | a custom transformation function for values stored in edges;     defaults to the function given for `trV`; The first argument     is the value to clone. The second and third are the `from`     and `to` keys respectively. |

**Returns**: <code>[Graph](#Graph)</code> - a clone of this graph with all transitive edges removed  

-----

<a name="contractPaths"></a>
### contractPaths([isNexus])
This method replaces stretches of non-branching directed pathway into single edges.
More specifically, it identifies all 'nexus' vertices in the graph and preserves them.
It then removes all other vertices and all edges from the graph, then inserts edges
between nexuses that summarize the connectivity that was there before.

A nexus is any vertex that is *not* characterized by '1 edge in, 1 edge out'.
A custom `isNexus` function may be provided to manually select additional vertices
that should be preserved as nexus.


| Param | Type | Description |
| --- | --- | --- |
| [isNexus] | <code>function</code> | a predicate for identifying additional vertices that should be treated as nexus;                  It receives a `key` and `value` associated to a vertex and should return                  true if and only if that vertex should be a nexus. |

**Throws**:

- <code>[BranchlessCycleError](#Graph.BranchlessCycleError)</code> if the graph contains a cycle with no branches or nexuses


-----

<a name="toJSON"></a>
### toJSON() ⇒ <code>string</code>
Serialize this graph into a JSON string.
The resulting string can be deserialized with `Graph.fromJSON`

**Returns**: <code>string</code> - a JSON string representation of the current state of this graph  
**Example**  
```JavaScript
let json   = graph1.toJSON();
let graph2 = Graph.fromJSON(json);
console.log(graph1.equals(graph2)); // true
```
**See**: [Graph.fromJSON](Graph.fromJSON)

-----

<a name="fromJSON"></a>
### fromJSON(json) ⇒ <code>[Graph](#Graph)</code>
Deserialize a string returned from `.toJSON()`
into a new `Graph` instance equal to the original.


| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | a string originally returned from `.toJSON()` |

**Returns**: <code>[Graph](#Graph)</code> - a graph equal to the original  
**Example**  
```JavaScript
let json   = graph1.toJSON();
let graph2 = Graph.fromJSON(json);
console.log(graph1.equals(graph2)); // true
```
**See**: [Graph#toJSON](Graph#toJSON)

-----

