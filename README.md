js-graph
========
[![Build Status](http://img.shields.io/travis/mhelvens/js-graph.svg)](https://travis-ci.org/mhelvens/js-graph)
[![Coverage Status](http://img.shields.io/coveralls/mhelvens/js-graph.svg)](https://coveralls.io/r/mhelvens/js-graph?branch=master)

`js-graph` is a javascript library for storing arbitrary data in mathematical (di)graphs,
as well as traversing and analyzing them in various ways. It was originally created to
track dependencies between options and modules. It is written in ECMAScript 6, but
ECMAScript 5 versions are shipped with it.

If you want to run this library in an ECMAScript 5 context, it depends on the [Babel ES6 polyfill](https://babeljs.io/docs/usage/polyfill/).
For your convenience, a version is provided with this polyfill already baked in, but you also
have the option of providing it yourself.

The library is fully functional and has 100% test-coverage, but the API is not yet
properly documented. You could, of course, read the tests in the `test` directory, but
user-friendly API documentation is forthcoming.

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

<a name="JsGraph"></a>
### JsGraph

* [JsGraph](#JsGraph)
    * [new JsGraph()](#new_JsGraph_new)
    ___instance___
    * [.addNewVertex(key, value)](#JsGraph#addNewVertex)
    * [.setVertex(key, value)](#JsGraph#setVertex)
    * [.ensureVertex(key, value)](#JsGraph#ensureVertex)
    * [.addVertex(key, value)](#JsGraph#addVertex)
    ___static___
    * [.VertexExistsError](#JsGraph.VertexExistsError) ⇐ <code>Error</code>
    * [.vertices](#JsGraph.VertexExistsError#vertices) : <code>Set.&lt;{key, value}&gt;</code>


-----

<a name="new_JsGraph_new"></a>
#### new JsGraph()
The main class of this library, to be used for representing a mathematical (di)graph.


-----

<a name="JsGraph#addNewVertex"></a>
#### *jsGraph*.addNewVertex(key, value)
Add a new vertex to this graph. If a vertex with this key already exists,
a [VertexExistsError](#JsGraph.VertexExistsError) is thrown.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| value | <code>\*</code> | the value stored in this new vertex |

**See**: [addVertex](#JsGraph#addVertex), [setVertex](#JsGraph#setVertex), [ensureVertex](#JsGraph#ensureVertex)

-----

<a name="JsGraph#setVertex"></a>
#### *jsGraph*.setVertex(key, value)
Set the value of an existing vertex in this graph. If a vertex with this key does not exist,
a [JsGraph.VertexNotExistsError](JsGraph.VertexNotExistsError) is thrown.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key belonging to the vertex |
| value | <code>\*</code> | the new value to be stored in this vertex |

**See**: [addVertex](#JsGraph#addVertex), [addNewVertex](#JsGraph#addNewVertex), [ensureVertex](#JsGraph#ensureVertex)

-----

<a name="JsGraph#ensureVertex"></a>
#### *jsGraph*.ensureVertex(key, value)
Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
If it does not yet exist, a new vertex is added with the given key and value.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key for the vertex |
| value | <code>\*</code> | the new value to be stored in this vertex |

**See**: [addVertex](#JsGraph#addVertex), [addNewVertex](#JsGraph#addNewVertex), [setVertex](#JsGraph#setVertex)

-----

<a name="JsGraph#addVertex"></a>
#### *jsGraph*.addVertex(key, value)
Add a new vertex to this graph. If a vertex with this key already exists,
the value of that vertex is overwritten.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key with which to refer to this new vertex |
| value | <code>\*</code> | the value stored in this new vertex |

**See**: [addNewVertex](#JsGraph#addNewVertex), [setVertex](#JsGraph#setVertex), [ensureVertex](#JsGraph#ensureVertex)

-----

<a name="JsGraph.VertexExistsError"></a>
#### *JsGraph*.VertexExistsError ⇐ <code>Error</code>
**Extends:** <code>Error</code>  
**See**: [addNewVertex](#JsGraph#addVertex)

-----

<a name="JsGraph.VertexExistsError#vertices"></a>
##### *vertexExistsError*.vertices : <code>Set.&lt;{key, value}&gt;</code>
the set of relevant vertices


-----

