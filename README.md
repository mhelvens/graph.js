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
    * [new Graph(...parts)](#new_Graph_new)
    * <ins><b>instance</b></ins>
    * [.on(event, handler)](#Graph+on)
    * [.off(event, handler)](#Graph+off)
    * [.addNewVertex(key, [value])](#Graph+addNewVertex)
    * [.setVertex(key, [value])](#Graph+setVertex)
    * [.ensureVertex(key, [value])](#Graph+ensureVertex)
    * [.addVertex(key, [value])](#Graph+addVertex)
    * [.removeExistingVertex(key)](#Graph+removeExistingVertex)
    * [.destroyExistingVertex(key)](#Graph+destroyExistingVertex)
    * [.removeVertex(key)](#Graph+removeVertex)
    * [.destroyVertex(key)](#Graph+destroyVertex)
    * [.vertexCount()](#Graph+vertexCount) ⇒ <code>number</code>
    * [.hasVertex(key)](#Graph+hasVertex) ⇒ <code>boolean</code>
    * [.vertexValue(key)](#Graph+vertexValue) ⇒ <code>\*</code>
    * [.addNewEdge(from, to, [value])](#Graph+addNewEdge)
    * [.createNewEdge(from, to, [value])](#Graph+createNewEdge)
    * [.setEdge(from, to, [value])](#Graph+setEdge)
    * [.spanEdge(from, to, [value])](#Graph+spanEdge)
    * [.addEdge(from, to, [value])](#Graph+addEdge)
    * [.ensureEdge(from, to, [value])](#Graph+ensureEdge)
    * [.createEdge(from, to, [value])](#Graph+createEdge)
    * [.removeExistingEdge(from, to)](#Graph+removeExistingEdge)
    * [.removeEdge(from, to)](#Graph+removeEdge)
    * [.edgeCount()](#Graph+edgeCount) ⇒ <code>number</code>
    * [.hasEdge(from, to)](#Graph+hasEdge) ⇒ <code>boolean</code>
    * [.edgeValue(from, to)](#Graph+edgeValue) ⇒ <code>\*</code>
    * [.vertices()](#Graph+vertices) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.@@iterator()](#Graph+@@iterator) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.edges()](#Graph+edges) ⇒ <code>Iterator.&lt;string, string, \*&gt;</code>
    * [.verticesFrom(from)](#Graph+verticesFrom) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
    * [.verticesTo(to)](#Graph+verticesTo) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
    * [.verticesWithPathFrom(from)](#Graph+verticesWithPathFrom) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.verticesWithPathTo(to)](#Graph+verticesWithPathTo) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.sources()](#Graph+sources) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.sinks()](#Graph+sinks) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.vertices_topologically()](#Graph+vertices_topologically) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.clearEdges()](#Graph+clearEdges)
    * [.clear()](#Graph+clear)
    * [.equals(other, [eqV], [eqE])](#Graph+equals) ⇒ <code>boolean</code>
    * [.cycles()](#Graph+cycles) ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code>
    * [.cycle()](#Graph+cycle) ⇒ <code>Array</code>
    * [.hasCycle()](#Graph+hasCycle) ⇒ <code>boolean</code>
    * [.paths(from, to)](#Graph+paths) ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code>
    * [.path(from, to)](#Graph+path) ⇒ <code>Array</code>
    * [.hasPath(from, to)](#Graph+hasPath) ⇒ <code>boolean</code>
    * [.outDegree(key)](#Graph+outDegree) ⇒ <code>number</code>
    * [.inDegree(key)](#Graph+inDegree) ⇒ <code>number</code>
    * [.degree(key)](#Graph+degree) ⇒ <code>number</code>
    * [.mergeIn(other, [mV], [mE])](#Graph+mergeIn)
    * [.clone([trV], [trE])](#Graph+clone) ⇒ <code>[Graph](#Graph)</code>
    * [.transitiveReduction([trV], [trE])](#Graph+transitiveReduction) ⇒ <code>[Graph](#Graph)</code>
    * [.contractPaths([isNexus])](#Graph+contractPaths)
    * [.toJSON()](#Graph+toJSON)
    * ["vertex-added"](#Graph+event_vertex-added)
    * ["vertex-removed"](#Graph+event_vertex-removed)
    * ["vertex-modified"](#Graph+event_vertex-modified)
    * ["edge-added"](#Graph+event_edge-added)
    * ["edge-removed"](#Graph+event_edge-removed)
    * ["edge-modified"](#Graph+event_edge-modified)
    * <ins><b>static</b></ins>
    * [.fromJSON()](#Graph.fromJSON)
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

<a name="Graph"></a>
### Graph
The main class of this library, to be used for representing a mathematical (di)graph.


-----

<a name="new_Graph_new"></a>
#### new Graph(...parts)
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

<a name="Graph+on"></a>
#### *graph*.on(event, handler)
Register an event handler.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | the event to listen for |
| handler | <code>function</code> | the function to call for each such event fired, receiving its corresponding value |


-----

<a name="Graph+off"></a>
#### *graph*.off(event, handler)
Deregister a previously registered event handler.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | the event used to originally register a handler |
| handler | <code>function</code> | the handler originally registered |


-----

<a name="Graph+addNewVertex"></a>
#### *graph*.addNewVertex(key, [value])
Add a new vertex to this graph.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| [value] | <code>\*</code> | the value to store in this new vertex |

**Throws**:

- <code>[VertexExistsError](#Graph.VertexExistsError)</code> if a vertex with this key already exists


-----

<a name="Graph+setVertex"></a>
#### *graph*.setVertex(key, [value])
Set the value of an existing vertex in this graph.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key belonging to the vertex |
| [value] | <code>\*</code> | the value to store in this vertex |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist


-----

<a name="Graph+ensureVertex"></a>
#### *graph*.ensureVertex(key, [value])
Make sure a vertex with a specific key exists in this graph. If it already exists,
do nothing. If it does not yet exist, add a new vertex with the given value.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key for the vertex |
| [value] | <code>\*</code> | the value to store if a new vertex is added |


-----

<a name="Graph+addVertex"></a>
#### *graph*.addVertex(key, [value])
Add a new vertex to this graph. If a vertex with this key already exists,
the value of that vertex is overwritten.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| [value] | <code>\*</code> | the value to store in this new vertex |


-----

<a name="Graph+removeExistingVertex"></a>
#### *graph*.removeExistingVertex(key)
Remove an existing vertex from this graph.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist
- <code>[HasConnectedEdgesError](#Graph.HasConnectedEdgesError)</code> if there are still edges connected to this vertex


-----

<a name="Graph+destroyExistingVertex"></a>
#### *graph*.destroyExistingVertex(key)
Remove an existing vertex from this graph, as well as all edges connected to it.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist


-----

<a name="Graph+removeVertex"></a>
#### *graph*.removeVertex(key)
Remove an existing vertex from this graph.
If a vertex with this key does not exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |

**Throws**:

- <code>[HasConnectedEdgesError](#Graph.HasConnectedEdgesError)</code> if there are still edges connected to this vertex


-----

<a name="Graph+destroyVertex"></a>
#### *graph*.destroyVertex(key)
Remove a vertex from this graph, as well as all edges connected to it.
If a vertex with this key does not exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |


-----

<a name="Graph+vertexCount"></a>
#### *graph*.vertexCount() ⇒ <code>number</code>
**Returns**: <code>number</code> - the number of vertices in the whole graph  

-----

<a name="Graph+hasVertex"></a>
#### *graph*.hasVertex(key) ⇒ <code>boolean</code>
Ask whether a vertex with a given key exists.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key to query |

**Returns**: <code>boolean</code> - whether there is a vertex with the given key  

-----

<a name="Graph+vertexValue"></a>
#### *graph*.vertexValue(key) ⇒ <code>\*</code>
Get the value associated with the vertex of a given key.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key to query |

**Returns**: <code>\*</code> - the value associated with the vertex of the given key.
Note that a return value of `undefined` can mean

1. that there is no such vertex, or
2. that the stored value is actually `undefined`.

Use [hasVertex](#Graph+hasVertex) to distinguish these cases.  

-----

<a name="Graph+addNewEdge"></a>
#### *graph*.addNewEdge(from, to, [value])
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

<a name="Graph+createNewEdge"></a>
#### *graph*.createNewEdge(from, to, [value])
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

<a name="Graph+setEdge"></a>
#### *graph*.setEdge(from, to, [value])
Set the value of an existing edge in this graph.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| [value] | <code>\*</code> | the value to store in this edge |

**Throws**:

- <code>[EdgeNotExistsError](#Graph.EdgeNotExistsError)</code> if an edge between `from` and `to` does not yet exist


-----

<a name="Graph+spanEdge"></a>
#### *graph*.spanEdge(from, to, [value])
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

<a name="Graph+addEdge"></a>
#### *graph*.addEdge(from, to, [value])
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

<a name="Graph+ensureEdge"></a>
#### *graph*.ensureEdge(from, to, [value])
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

<a name="Graph+createEdge"></a>
#### *graph*.createEdge(from, to, [value])
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

<a name="Graph+removeExistingEdge"></a>
#### *graph*.removeExistingEdge(from, to)
Remove an existing edge from this graph.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Throws**:

- <code>[EdgeNotExistsError](#Graph.EdgeNotExistsError)</code> if an edge between the `from` and `to` vertices doesn't exist


-----

<a name="Graph+removeEdge"></a>
#### *graph*.removeEdge(from, to)
Remove an edge from this graph.
If an edge between the `from` and `to` vertices doesn't exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |


-----

<a name="Graph+edgeCount"></a>
#### *graph*.edgeCount() ⇒ <code>number</code>
**Returns**: <code>number</code> - the number of edges in the whole graph  

-----

<a name="Graph+hasEdge"></a>
#### *graph*.hasEdge(from, to) ⇒ <code>boolean</code>
Ask whether an edge between given `from` and `to` vertices exist.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Returns**: <code>boolean</code> - whether there is an edge between the given `from` and `to` vertices  

-----

<a name="Graph+edgeValue"></a>
#### *graph*.edgeValue(from, to) ⇒ <code>\*</code>
Get the value associated with the edge between given `from` and `to` vertices.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Returns**: <code>\*</code> - the value associated with the edge between the given `from` and `to` vertices
Note that a return value of `undefined` can mean

1. that there is no such edge, or
2. that the stored value is actually `undefined`.

Use [hasEdge](#Graph+hasEdge) to distinguish these cases.  

-----

<a name="Graph+vertices"></a>
#### *graph*.vertices() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
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
**See**: [vertices](#Graph+vertices)

-----

<a name="Graph+edges"></a>
#### *graph*.edges() ⇒ <code>Iterator.&lt;string, string, \*&gt;</code>
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

<a name="Graph+verticesFrom"></a>
#### *graph*.verticesFrom(from) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
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

<a name="Graph+verticesTo"></a>
#### *graph*.verticesTo(to) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
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

<a name="Graph+verticesWithPathFrom"></a>
#### *graph*.verticesWithPathFrom(from) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
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

<a name="Graph+verticesWithPathTo"></a>
#### *graph*.verticesWithPathTo(to) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
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

<a name="Graph+sources"></a>
#### *graph*.sources() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
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

<a name="Graph+sinks"></a>
#### *graph*.sinks() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
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

<a name="Graph+vertices_topologically"></a>
#### *graph*.vertices_topologically() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
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

<a name="Graph+clearEdges"></a>
#### *graph*.clearEdges()
Remove all edges from the graph, but leave the vertices intact.


-----

<a name="Graph+clear"></a>
#### *graph*.clear()
Remove all edges and vertices from the graph, putting it back in its initial state.


-----

<a name="Graph+equals"></a>
#### *graph*.equals(other, [eqV], [eqE]) ⇒ <code>boolean</code>
Ask whether `this` graph and a given `other` graph are equal.
Two graphs are equal if they have the same vertices and the same edges.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Graph](#Graph)</code> | the other graph to compare to `this` one |
| [eqV] | <code>function</code> | a custom equality function for values stored in vertices;     defaults to `===` comparison; The first two arguments are the     values to compare. The third is the corresponding `key`. |
| [eqE] | <code>function</code> | a custom equality function for values stored in edges;     defaults to the function given for `trV`; The first two arguments     are the values to compare. The third and fourth are the `from`     and `to` keys respectively. |

**Returns**: <code>boolean</code> - `true` if the two graphs are equal; `false` otherwise  

-----

<a name="Graph+cycles"></a>
#### *graph*.cycles() ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code>
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

<a name="Graph+cycle"></a>
#### *graph*.cycle() ⇒ <code>Array</code>
Find any directed cycle in this graph.

**Returns**: <code>Array</code> - an array containing the vertex keys describing the cycle; `null`, if there is no cycle;
                  The array will contain each vertex key only once — even the first/last one.  

-----

<a name="Graph+hasCycle"></a>
#### *graph*.hasCycle() ⇒ <code>boolean</code>
Test whether this graph contains a directed cycle.

**Returns**: <code>boolean</code> - whether this graph contains any directed cycle  

-----

<a name="Graph+paths"></a>
#### *graph*.paths(from, to) ⇒ <code>Iterator.&lt;Array.&lt;string&gt;&gt;</code>
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

<a name="Graph+path"></a>
#### *graph*.path(from, to) ⇒ <code>Array</code>
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

<a name="Graph+hasPath"></a>
#### *graph*.hasPath(from, to) ⇒ <code>boolean</code>
Test whether there is a directed path between a given pair of keys.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the originating vertex |
| to | <code>string</code> | the terminating vertex |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph

**Returns**: <code>boolean</code> - whether such a path exists  

-----

<a name="Graph+outDegree"></a>
#### *graph*.outDegree(key) ⇒ <code>number</code>
Get the number of edges going out of a given vertex.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to query |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist

**Returns**: <code>number</code> - the number of edges going out of the `key` vertex  

-----

<a name="Graph+inDegree"></a>
#### *graph*.inDegree(key) ⇒ <code>number</code>
Get the number of edges coming into a given vertex.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to query |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist

**Returns**: <code>number</code> - the number of edges coming into the `key` vertex  

-----

<a name="Graph+degree"></a>
#### *graph*.degree(key) ⇒ <code>number</code>
Get the number of edges connected to a given vertex.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to query |

**Throws**:

- <code>[VertexNotExistsError](#Graph.VertexNotExistsError)</code> if a vertex with this key does not exist

**Returns**: <code>number</code> - the number of edges connected to the `key` vertex  

-----

<a name="Graph+mergeIn"></a>
#### *graph*.mergeIn(other, [mV], [mE])
Merge another graph into this graph.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Graph](#Graph)</code> | the other graph to merge into this one |
| [mV] | <code>function</code> | a custom merge function for values stored in vertices;     defaults to whichever of the two values is not `undefined`,     giving preference to that of the other graph; The first and     second arguments are the vertex values of `this` graph and the     `other` graph respectively. The third is the corresponding `key`. |
| [mE] | <code>function</code> | a custom merge function for values stored in edges;     defaults to whichever of the two values is not `undefined`,     giving preference to that of the other graph; The first and     second arguments are the edge values of `this` graph and the     `other` graph respectively. The third and fourth are the     corresponding `from` and `to` keys. |


-----

<a name="Graph+clone"></a>
#### *graph*.clone([trV], [trE]) ⇒ <code>[Graph](#Graph)</code>
Create a clone of this graph.


| Param | Type | Description |
| --- | --- | --- |
| [trV] | <code>function</code> | a custom transformation function for values stored in vertices;     defaults to the identity function; The first argument is the     value to clone. The second is the corresponding `key`. |
| [trE] | <code>function</code> | a custom transformation function for values stored in edges;     defaults to the function given for `trV`; The first argument     is the value to clone. The second and third are the `from`     and `to` keys respectively. |

**Returns**: <code>[Graph](#Graph)</code> - a clone of this graph  

-----

<a name="Graph+transitiveReduction"></a>
#### *graph*.transitiveReduction([trV], [trE]) ⇒ <code>[Graph](#Graph)</code>
Create a clone of this graph, but without any transitive edges.


| Param | Type | Description |
| --- | --- | --- |
| [trV] | <code>function</code> | a custom transformation function for values stored in vertices;     defaults to the identity function; The first argument is the     value to clone. The second is the corresponding `key`. |
| [trE] | <code>function</code> | a custom transformation function for values stored in edges;     defaults to the function given for `trV`; The first argument     is the value to clone. The second and third are the `from`     and `to` keys respectively. |

**Returns**: <code>[Graph](#Graph)</code> - a clone of this graph with all transitive edges removed  

-----

<a name="Graph+contractPaths"></a>
#### *graph*.contractPaths([isNexus])
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

<a name="Graph+toJSON"></a>
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

<a name="Graph.fromJSON"></a>
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

<a name="Graph+event_vertex-added"></a>
#### "vertex-added"
An event that is triggered just after a vertex is added to this graph.
Handlers receive the new vertex `[key, value]` as an argument.

**See**: [on](#Graph+on), [off](#Graph+off)

-----

<a name="Graph+event_vertex-removed"></a>
#### "vertex-removed"
An event that is triggered just after a vertex is removed from this graph.
Handlers receive the vertex key as an argument.

**See**: [on](#Graph+on), [off](#Graph+off)

-----

<a name="Graph+event_vertex-modified"></a>
#### "vertex-modified"
An event that is triggered after a vertex in this graph is modified.
It is also triggered after any ["vertex-added"](#Graph#event_vertex-added) event.
Handlers receive the vertex `[key, value]` as an argument.

**See**: [on](#Graph+on), [off](#Graph+off)

-----

<a name="Graph+event_edge-added"></a>
#### "edge-added"
An event that is triggered just after an edge is added to this graph.
Handlers receive the new edge `[[from, to], value]` as an argument.

**See**: [on](#Graph+on), [off](#Graph+off)

-----

<a name="Graph+event_edge-removed"></a>
#### "edge-removed"
An event that is triggered just after an edge is removed from this graph.
Handlers receive the edge key `[from, to]` as an argument.

**See**: [on](#Graph+on), [off](#Graph+off)

-----

<a name="Graph+event_edge-modified"></a>
#### "edge-modified"
An event that is triggered after an edge in this graph is modified.
It is also triggered after any ["edge-added"](#Graph#event_edge-added) event.
Handlers receive the edge `[[from, to], value]` as an argument.

**See**: [on](#Graph+on), [off](#Graph+off)

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
