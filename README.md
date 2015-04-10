js-graph
========
[![Build Status](http://img.shields.io/travis/mhelvens/js-graph.svg)](https://travis-ci.org/mhelvens/js-graph)
[![Coverage Status](http://img.shields.io/coveralls/mhelvens/js-graph.svg)](https://coveralls.io/r/mhelvens/js-graph?branch=master)

`js-graph` is a javascript library for storing arbitrary data in mathematical (di)graphs,
as well as traversing and analyzing them in various ways. It was originally created to
track dependencies between options and modules. It is written in ECMAScript 6, but
auto-generated ECMAScript 5 versions are shipped with it.

If you want to run this library in an ECMAScript 5 context, it depends on the [Babel ES6 polyfill](https://babeljs.io/docs/usage/polyfill/).
For your convenience, a version is provided with this polyfill already baked in, but you also
have the option of providing it yourself.

Feedback of any kind (questions, issues, pull requests) is greatly appreciated.


Files
-----

The `dist` directory offers different files for use in different circumstances.
Use the following table to determine which file to use in your situation.

| File                                          | Description                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `js‑graph.es6.js`                             | for use in an ECMAScript 6 context, e.g., a modern browser or transpiler                    |
| `js‑graph.js`,<br>`js‑graph.min.js`           | requires you to load the [Babel polyfill](https://babeljs.io/docs/usage/polyfill/) yourself |
| `js‑graph.full.js`,<br>`js‑graph.full.min.js` | already includes the Babel polyfill                                                         |

If you don't know which you need, you probably want `js-graph.full.min.js`, because it will work out-of-the-box.
But it is generally more elegant to load the polyfill yourself, especially if you use other libraries that also
depend on it.

API Documentation
-----------------


* [JsGraph](#JsGraph)
    * ___instance___
    * [.addNewVertex(key, value)](#JsGraph#addNewVertex)
    * [.setVertex(key, value)](#JsGraph#setVertex)
    * [.ensureVertex(key, value)](#JsGraph#ensureVertex)
    * [.addVertex(key, value)](#JsGraph#addVertex)
    * [.removeExistingVertex(key)](#JsGraph#removeExistingVertex)
    * [.destroyExistingVertex(key)](#JsGraph#destroyExistingVertex)
    * [.removeVertex(key)](#JsGraph#removeVertex)
    * [.destroyVertex(key)](#JsGraph#destroyVertex)
    * [.vertexCount()](#JsGraph#vertexCount) ⇒ <code>number</code>
    * [.hasVertex(key)](#JsGraph#hasVertex) ⇒ <code>boolean</code>
    * [.vertexValue(key)](#JsGraph#vertexValue) ⇒ <code>\*</code>
    * [.addNewEdge(from, to, value)](#JsGraph#addNewEdge)
    * [.createNewEdge(from, to, value)](#JsGraph#createNewEdge)
    * [.setEdge(from, to, value)](#JsGraph#setEdge)
    * [.spanEdge(from, to, value)](#JsGraph#spanEdge)
    * [.addEdge(from, to, value)](#JsGraph#addEdge)
    * [.ensureEdge(from, to, value)](#JsGraph#ensureEdge)
    * [.createEdge(from, to, value)](#JsGraph#createEdge)
    * [.removeExistingEdge(from, to)](#JsGraph#removeExistingEdge)
    * [.removeEdge(from, to)](#JsGraph#removeEdge)
    * [.edgeCount()](#JsGraph#edgeCount) ⇒ <code>number</code>
    * [.hasEdge(from, to)](#JsGraph#hasEdge) ⇒ <code>boolean</code>
    * [.edgeValue(from, to)](#JsGraph#edgeValue) ⇒ <code>\*</code>
    * [.vertices()](#JsGraph#vertices) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.@@iterator()](#JsGraph#@@iterator) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.edges()](#JsGraph#edges) ⇒ <code>Iterator.&lt;string, string, \*&gt;</code>
    * [.verticesFrom(from)](#JsGraph#verticesFrom) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
    * [.verticesTo(to)](#JsGraph#verticesTo) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
    * [.verticesWithPathFrom(from)](#JsGraph#verticesWithPathFrom) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.verticesWithPathTo(to)](#JsGraph#verticesWithPathTo) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.vertices_topologically()](#JsGraph#vertices_topologically) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
    * [.clearEdges()](#JsGraph#clearEdges)
    * [.clear()](#JsGraph#clear)
    * [.equals(other, [eq])](#JsGraph#equals) ⇒ <code>boolean</code>
    * [.hasCycle()](#JsGraph#hasCycle) ⇒ <code>boolean</code>
    * [.hasPath(from, to)](#JsGraph#hasPath) ⇒ <code>boolean</code>
    * [.clone([tr])](#JsGraph#clone) ⇒ <code>[JsGraph](#JsGraph)</code>
    * [.transitiveReduction([tr])](#JsGraph#transitiveReduction) ⇒ <code>[JsGraph](#JsGraph)</code>
    * ___static___
    * [.VertexExistsError](#JsGraph.VertexExistsError) ⇐ <code>Error</code>
        * [.vertices](#JsGraph.VertexExistsError#vertices) : <code>Set.&lt;{key: string, value}&gt;</code>
    * [.VertexNotExistsError](#JsGraph.VertexNotExistsError) ⇐ <code>Error</code>
        * [.vertices](#JsGraph.VertexNotExistsError#vertices) : <code>Set.&lt;{key: string}&gt;</code>
    * [.EdgeExistsError](#JsGraph.EdgeExistsError) ⇐ <code>Error</code>
        * [.edges](#JsGraph.EdgeExistsError#edges) : <code>Set.&lt;{from: string, to: string, value}&gt;</code>
    * [.EdgeNotExistsError](#JsGraph.EdgeNotExistsError) ⇐ <code>Error</code>
        * [.edges](#JsGraph.EdgeNotExistsError#edges) : <code>Set.&lt;{from: string, to: string}&gt;</code>
    * [.HasConnectedEdgesError](#JsGraph.HasConnectedEdgesError) ⇐ <code>Error</code>
        * [.key](#JsGraph.HasConnectedEdgesError#key) : <code>string</code>
    * [.CycleError](#JsGraph.CycleError) ⇐ <code>Error</code>
        * [.cycle](#JsGraph.CycleError#cycle) : <code>Array.&lt;string&gt;</code>


-----

<a name="JsGraph"></a>
### JsGraph
The main class of this library, to be used for representing a mathematical (di)graph.


-----

<a name="JsGraph#addNewVertex"></a>
#### *jsGraph*.addNewVertex(key, value)
Add a new vertex to this graph.

**Throws**:

- <code>[VertexExistsError](#JsGraph.VertexExistsError)</code> if a vertex with this key already exists


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| value | <code>\*</code> | the value to store in this new vertex |


-----

<a name="JsGraph#setVertex"></a>
#### *jsGraph*.setVertex(key, value)
Set the value of an existing vertex in this graph.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if a vertex with this key does not exist


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key belonging to the vertex |
| value | <code>\*</code> | the value to store in this vertex |


-----

<a name="JsGraph#ensureVertex"></a>
#### *jsGraph*.ensureVertex(key, value)
Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
If it does not yet exist, a new vertex is added with the given value.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key for the vertex |
| value | <code>\*</code> | the value to store if a new vertex is added |


-----

<a name="JsGraph#addVertex"></a>
#### *jsGraph*.addVertex(key, value)
Add a new vertex to this graph. If a vertex with this key already exists,
the value of that vertex is overwritten.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| value | <code>\*</code> | the value to store in this new vertex |


-----

<a name="JsGraph#removeExistingVertex"></a>
#### *jsGraph*.removeExistingVertex(key)
Remove an existing vertex from this graph.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if a vertex with this key does not exist
- <code>[HasConnectedEdgesError](#JsGraph.HasConnectedEdgesError)</code> if there are still edges connected to this vertex


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |


-----

<a name="JsGraph#destroyExistingVertex"></a>
#### *jsGraph*.destroyExistingVertex(key)
Remove an existing vertex from this graph, as well as all edges connected to it.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if a vertex with this key does not exist


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |


-----

<a name="JsGraph#removeVertex"></a>
#### *jsGraph*.removeVertex(key)
Remove an existing vertex from this graph.
If a vertex with this key does not exist, nothing happens.

**Throws**:

- <code>[HasConnectedEdgesError](#JsGraph.HasConnectedEdgesError)</code> if there are still edges connected to this vertex


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |


-----

<a name="JsGraph#destroyVertex"></a>
#### *jsGraph*.destroyVertex(key)
Remove a vertex from this graph, as well as all edges connected to it.
If a vertex with this key does not exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the vertex to remove |


-----

<a name="JsGraph#vertexCount"></a>
#### *jsGraph*.vertexCount() ⇒ <code>number</code>
**Returns**: <code>number</code> - the number of vertices in the whole graph  

-----

<a name="JsGraph#hasVertex"></a>
#### *jsGraph*.hasVertex(key) ⇒ <code>boolean</code>
Ask whether a vertex with a given key exists.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key to query |

**Returns**: <code>boolean</code> - whether there is a vertex with the given key  

-----

<a name="JsGraph#vertexValue"></a>
#### *jsGraph*.vertexValue(key) ⇒ <code>\*</code>
Get the value associated with the vertex of a given key.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key to query |

**Returns**: <code>\*</code> - the value associated with the vertex of the given key.
Note that a return value of `undefined` can mean

1. that there is no such vertex, or
2. that the stored value is actually `undefined`.

Use [hasVertex](#JsGraph#hasVertex) to distinguish these cases.  

-----

<a name="JsGraph#addNewEdge"></a>
#### *jsGraph*.addNewEdge(from, to, value)
Add a new edge to this graph.

**Throws**:

- <code>[EdgeExistsError](#JsGraph.EdgeExistsError)</code> if an edge between `from` and `to` already exists
- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| value | <code>\*</code> | the value to store in this new edge |


-----

<a name="JsGraph#createNewEdge"></a>
#### *jsGraph*.createNewEdge(from, to, value)
Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
in the graph, they are implicitly added with an `undefined` value.

**Throws**:

- <code>[EdgeExistsError](#JsGraph.EdgeExistsError)</code> if an edge between `from` and `to` already exists


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| value | <code>\*</code> | the value to store in this new edge |


-----

<a name="JsGraph#setEdge"></a>
#### *jsGraph*.setEdge(from, to, value)
Set the value of an existing edge in this graph.

**Throws**:

- <code>[EdgeNotExistsError](#JsGraph.EdgeNotExistsError)</code> if an edge between `from` and `to` does not yet exist


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| value | <code>\*</code> | the value to store in this edge |


-----

<a name="JsGraph#spanEdge"></a>
#### *jsGraph*.spanEdge(from, to, value)
Make sure an edge between the `from` and `to` vertices in this graph.
If one already exists, nothing is done.
If one does not yet exist, a new edge is added with the given value.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| value | <code>\*</code> | the value to store if a new edge is added |


-----

<a name="JsGraph#addEdge"></a>
#### *jsGraph*.addEdge(from, to, value)
Add a new edge to this graph. If an edge between `from` and `to` already exists,
the value of that edge is overwritten.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if the `from` and/or `to` vertices do not yet exist in the graph


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| value | <code>\*</code> | the value to store in this new edge |


-----

<a name="JsGraph#ensureEdge"></a>
#### *jsGraph*.ensureEdge(from, to, value)
Make sure an edge between the `from` and `to` vertices exists in this graph.
If it already exists, nothing is done.
If it does not yet exist, a new edge is added with the given value.
If the `from` and/or `to` vertices do not yet exist
in the graph, they are implicitly added with an `undefined` value.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| value | <code>\*</code> | the value to store if a new edge is added |


-----

<a name="JsGraph#createEdge"></a>
#### *jsGraph*.createEdge(from, to, value)
Add a new edge to this graph. If an edge between the `from` and `to`
vertices already exists, the value of that edge is overwritten.
If the `from` and/or `to` vertices do not yet exist
in the graph, they are implicitly added with an `undefined` value.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |
| value | <code>\*</code> | the value to store if a new edge is added |


-----

<a name="JsGraph#removeExistingEdge"></a>
#### *jsGraph*.removeExistingEdge(from, to)
Remove an existing edge from this graph.

**Throws**:

- <code>[EdgeNotExistsError](#JsGraph.EdgeNotExistsError)</code> if an edge between the `from` and `to` vertices doesn't exist


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |


-----

<a name="JsGraph#removeEdge"></a>
#### *jsGraph*.removeEdge(from, to)
Remove an edge from this graph.
If an edge between the `from` and `to` vertices doesn't exist, nothing happens.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |


-----

<a name="JsGraph#edgeCount"></a>
#### *jsGraph*.edgeCount() ⇒ <code>number</code>
**Returns**: <code>number</code> - the number of edges in the whole graph  

-----

<a name="JsGraph#hasEdge"></a>
#### *jsGraph*.hasEdge(from, to) ⇒ <code>boolean</code>
Ask whether an edge between given `from` and `to` vertices exist.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Returns**: <code>boolean</code> - whether there is an edge between the given `from` and `to` vertices  

-----

<a name="JsGraph#edgeValue"></a>
#### *jsGraph*.edgeValue(from, to) ⇒ <code>\*</code>
Get the value associated with the edge between given `from` and `to` vertices.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key for the originating vertex |
| to | <code>string</code> | the key for the terminating vertex |

**Returns**: <code>\*</code> - the value associated with the edge between the given `from` and `to` vertices
Note that a return value of `undefined` can mean

1. that there is no such edge, or
2. that the stored value is actually `undefined`.

Use [hasEdge](#JsGraph#hasEdge) to distinguish these cases.  

-----

<a name="JsGraph#vertices"></a>
#### *jsGraph*.vertices() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices of the graph, in no particular order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = jsGraph.vertices(), keyVal = it.next(); !it.done;) {
    var key   = keyVal[0],
        value = keyVal[1];
    // iterates over all vertices of the graph
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of jsGraph.vertices()) {
    // iterates over all vertices of the graph
}
```
**See**: [@@iterator](#JsGraph#@@iterator)

-----

<a name="JsGraph#@@iterator"></a>
#### *jsGraph*.@@iterator() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
A [JsGraph](#JsGraph) object is itself [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol),
and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (let [key, value] of jsGraph) {
    // iterates over all vertices of the graph
}
```
**See**: [vertices](#JsGraph#vertices)

-----

<a name="JsGraph#edges"></a>
#### *jsGraph*.edges() ⇒ <code>Iterator.&lt;string, string, \*&gt;</code>
Iterate over all edges of the graph, in no particular order.

**Returns**: <code>Iterator.&lt;string, string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = jsGraph.edges(), fromToVal = it.next(); !it.done;) {
    var from  = fromToVal[0],
        to    = fromToVal[1],
        value = fromToVal[2];
    // iterates over all edges of the graph
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [from, to, value] of jsGraph.edges()) {
    // iterates over all vertices of the graph
}
```

-----

<a name="JsGraph#verticesFrom"></a>
#### *jsGraph*.verticesFrom(from) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
Iterate over the outgoing edges of a given vertex in the graph, in no particular order.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if a vertex with the given `from` key does not exist


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key of the vertex to take the outgoing edges from |

**Returns**: <code>Iterator.&lt;string, \*, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = jsGraph.verticesFrom(from), toVertexEdge = it.next(); !it.done;) {
    var to          = toVertexEdge[0],
        vertexValue = toVertexEdge[1],
        edgeValue   = toVertexEdge[2];
    // iterates over all outgoing vertices of the `from` vertex
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [to, vertexValue, edgeValue] of jsGraph.verticesFrom(from)) {
    // iterates over all outgoing edges of the `from` vertex
}
```

-----

<a name="JsGraph#verticesTo"></a>
#### *jsGraph*.verticesTo(to) ⇒ <code>Iterator.&lt;string, \*, \*&gt;</code>
Iterate over the incoming edges of a given vertex in the graph, in no particular order.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if a vertex with the given `to` key does not exist


| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | the key of the vertex to take the incoming edges from |

**Returns**: <code>Iterator.&lt;string, \*, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = jsGraph.verticesTo(to), fromVertexEdge = it.next(); !it.done;) {
    var from        = fromVertexEdge[0],
        vertexValue = fromVertexEdge[1],
        edgeValue   = fromVertexEdge[2];
    // iterates over all outgoing vertices of the `from` vertex
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [from, vertexValue, edgeValue] of jsGraph.verticesTo(to)) {
    // iterates over all incoming edges of the `to` vertex
}
```

-----

<a name="JsGraph#verticesWithPathFrom"></a>
#### *jsGraph*.verticesWithPathFrom(from) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices reachable from a given vertex in the graph, in no particular order.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if a vertex with the given `from` key does not exist


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the key of the vertex to take the reachable vertices from |

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = jsGraph.verticesWithPathFrom(from), keyValue = it.next(); !it.done;) {
    var key   = keyValue[0],
        value = keyValue[1];
    // iterates over all vertices reachable from `from`
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of jsGraph.verticesWithPathFrom(from)) {
    // iterates over all vertices reachable from `from`
}
```

-----

<a name="JsGraph#verticesWithPathTo"></a>
#### *jsGraph*.verticesWithPathTo(to) ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.

**Throws**:

- <code>[VertexNotExistsError](#JsGraph.VertexNotExistsError)</code> if a vertex with the given `to` key does not exist


| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | the key of the vertex to take the reachable vertices from |

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = jsGraph.verticesWithPathTo(to), keyValue = it.next(); !it.done;) {
    var key   = keyValue[0],
        value = keyValue[1];
    // iterates over all vertices from which `to` can be reached
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of jsGraph.verticesWithPathTo(to)) {
    // iterates over all vertices from which `to` can be reached
}
```

-----

<a name="JsGraph#vertices_topologically"></a>
#### *jsGraph*.vertices_topologically() ⇒ <code>Iterator.&lt;string, \*&gt;</code>
Iterate over all vertices of the graph in topological order.

**Returns**: <code>Iterator.&lt;string, \*&gt;</code> - an object conforming to the [ES6 iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)  
**Example**  
```JavaScript
for (var it = jsGraph.vertices_topologically(), keyVal = it.next(); !it.done;) {
    var key   = keyVal[0],
        value = keyVal[1];
    // iterates over all vertices of the graph in topological order
}
```
**Example**  
```JavaScript
// in ECMAScript 6, you can use a for..of loop
for (let [key, value] of jsGraph.vertices_topologically()) {
    // iterates over all vertices of the graph in topological order
}
```

-----

<a name="JsGraph#clearEdges"></a>
#### *jsGraph*.clearEdges()
Remove all edges from the graph, but leave the vertices intact.


-----

<a name="JsGraph#clear"></a>
#### *jsGraph*.clear()
Remove all edges and vertices from the graph, putting it back in its initial state.


-----

<a name="JsGraph#equals"></a>
#### *jsGraph*.equals(other, [eq]) ⇒ <code>boolean</code>
Ask whether this graph and another graph are equal.
Two graphs are equal if they have the same vertices and the same edges.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[JsGraph](#JsGraph)</code> | the other graph to compare this one to |
| [eq] | <code>function</code> | a custom equality function for stored values; defaults to `===`     comparison; The first two arguments are the two values to compare.     If they are vertex values, the third argument is the vertex key.     If they are edge values, the third and fourth argument are the     `from` and `to` keys respectively. (So you can test the fourth     argument to distinguish the two cases.) |

**Returns**: <code>boolean</code> - `true` if the two graphs are equal; `false` otherwise  

-----

<a name="JsGraph#hasCycle"></a>
#### *jsGraph*.hasCycle() ⇒ <code>boolean</code>
Test whether the graph contains a directed cycle.

**Returns**: <code>boolean</code> - `false`, if there is no cycle; a truthy value if there *is* a cycle
                   (not necessarily `true`; future versions of the library might return
                    a description of the cycle)  

-----

<a name="JsGraph#hasPath"></a>
#### *jsGraph*.hasPath(from, to) ⇒ <code>boolean</code>
Test whether there is a directed path between a given pair of keys.


| Param | Type | Description |
| --- | --- | --- |
| from | <code>string</code> | the originating vertex |
| to | <code>string</code> | the terminating vertex |

**Returns**: <code>boolean</code> - `false`, if there is no such path; a truthy value if there *is* such a path
                   (not necessarily `true`; future versions of the library might return
                    a description of the path)  

-----

<a name="JsGraph#clone"></a>
#### *jsGraph*.clone([tr]) ⇒ <code>[JsGraph](#JsGraph)</code>
Create a clone of this graph.


| Param | Type | Description |
| --- | --- | --- |
| [tr] | <code>function</code> | a custom transformation function for stored values; defaults to     the identity function; The first argument is the value to clone.     If it is a vertex value, the third argument is the vertex key.     If it is an edge value, the third and fourth argument are the     `from` and `to` keys respectively. (So you can test the fourth     argument to distinguish the two cases.) |

**Returns**: <code>[JsGraph](#JsGraph)</code> - a clone of this graph  

-----

<a name="JsGraph#transitiveReduction"></a>
#### *jsGraph*.transitiveReduction([tr]) ⇒ <code>[JsGraph](#JsGraph)</code>
Create a clone of this graph, but without any transitive edges.


| Param | Type | Description |
| --- | --- | --- |
| [tr] | <code>function</code> | a custom transformation function for stored values; defaults to     the identity function; The first argument is the value to clone.     If it is a vertex value, the third argument is the vertex key.     If it is an edge value, the third and fourth argument are the     `from` and `to` keys respectively. (So you can test the fourth     argument to distinguish the two cases.) |

**Returns**: <code>[JsGraph](#JsGraph)</code> - a clone of this graph  

-----

<a name="JsGraph.VertexExistsError"></a>
#### *JsGraph*.VertexExistsError ⇐ <code>Error</code>
This type of error is thrown when specific vertices are expected to exist, but don't.

**Extends:** <code>Error</code>  

-----

<a name="JsGraph.VertexExistsError#vertices"></a>
##### *vertexExistsError*.vertices : <code>Set.&lt;{key: string, value}&gt;</code>
the set of relevant vertices


-----

<a name="JsGraph.VertexNotExistsError"></a>
#### *JsGraph*.VertexNotExistsError ⇐ <code>Error</code>
This type of error is thrown when specific vertices are expected not to exist, but do.

**Extends:** <code>Error</code>  

-----

<a name="JsGraph.VertexNotExistsError#vertices"></a>
##### *vertexNotExistsError*.vertices : <code>Set.&lt;{key: string}&gt;</code>
the set of relevant vertices


-----

<a name="JsGraph.EdgeExistsError"></a>
#### *JsGraph*.EdgeExistsError ⇐ <code>Error</code>
This type of error is thrown when specific edges are expected not to exist, but do.

**Extends:** <code>Error</code>  

-----

<a name="JsGraph.EdgeExistsError#edges"></a>
##### *edgeExistsError*.edges : <code>Set.&lt;{from: string, to: string, value}&gt;</code>
the set of relevant edges


-----

<a name="JsGraph.EdgeNotExistsError"></a>
#### *JsGraph*.EdgeNotExistsError ⇐ <code>Error</code>
This type of error is thrown when specific edges are expected to exist, but don't.

**Extends:** <code>Error</code>  

-----

<a name="JsGraph.EdgeNotExistsError#edges"></a>
##### *edgeNotExistsError*.edges : <code>Set.&lt;{from: string, to: string}&gt;</code>
the set of relevant edges


-----

<a name="JsGraph.HasConnectedEdgesError"></a>
#### *JsGraph*.HasConnectedEdgesError ⇐ <code>Error</code>
This type of error is thrown when a vertex is expected not to have connected edges, but does.

**Extends:** <code>Error</code>  

-----

<a name="JsGraph.HasConnectedEdgesError#key"></a>
##### *hasConnectedEdgesError*.key : <code>string</code>
the key of the relevant vertex


-----

<a name="JsGraph.CycleError"></a>
#### *JsGraph*.CycleError ⇐ <code>Error</code>
This type of error is thrown when a graph is expected not to have a directed cycle, but does.

**Extends:** <code>Error</code>  

-----

<a name="JsGraph.CycleError#cycle"></a>
##### *cycleError*.cycle : <code>Array.&lt;string&gt;</code>
the vertices involved in the cycle


-----

