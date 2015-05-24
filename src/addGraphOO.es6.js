import {
	_options,
	_extractTwoArgs, _extractThreeArgs,
	_expectVertices, _expectVerticesAbsent, _expectEdges, _expectEdgesAbsent,_expectNoConnectedEdges
} from './private.es6.js';

//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Graph.GraphOO ///////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

export default function addGraphOO(Graph) {

	const _vertexObjects = Symbol("vertex objects");
	const _edgeObjects   = Symbol("edge objects");
	const _init          = Symbol("init");

	/**
	 * @class Graph.GraphOO
	 * @extends Graph
	 * @classdesc A subclass of Graph, in which vertices and edges are represented by smart objects.
	 *            `GraphOO` instances are fully backwards-compatible, and can stand in for `Graph`
	 *            instances in any context.
	 * @see {@link Graph}
	 */
	return Graph.GraphOO = class GraphOO extends Graph {

		[_init]() {
			if (!this[_vertexObjects]) {
				this[_vertexObjects] = new Map();
				this[_edgeObjects]   = new Map();

				let thisGraph = this;

				/**
				 * @class Graph.GraphOO#Vertex
				 * @classdesc A class for representing vertices in a `GraphOO` instance.
				 */
				let VertexSuperclass = this[_options].VertexSuperclass || Object;
				let vertexSuperArguments = this[_options].vertexSuperArguments || ((...args)=>args);
				this.Vertex = class Vertex extends VertexSuperclass {
					constructor(key, value) {
						super(...vertexSuperArguments(key, value));
						this[0] = key;
						this[1] = value;
						if (!thisGraph[_vertexObjects].has(key)) {
							thisGraph[_vertexObjects].set(key, this);
							thisGraph.addNewVertex(key, value);
						}
					}
					get length() { return 2 }
					[Symbol.iterator]() {
						// overly verbose because jsdoc doesn't parse *[Symbol.iterator]() notation
						function *iterator() { yield this[0]; yield this[1] }
						return iterator.apply(this);
					}
					get graph()            { return thisGraph                                        }
					get key()              { return this[0]                                          }
					get value()            { return this[1]                                          }
					set value(value)       { return this.set(value)                                  }
					set(value)             { return thisGraph.setVertex            (this.key, value) }
					remove()               { return thisGraph.removeExistingVertex (this.key)        }
					destroy()              { return thisGraph.destroyExistingVertex(this.key)        }
					verticesFrom()         { return thisGraph.verticesFrom         (this.key)        }
					verticesTo()           { return thisGraph.verticesTo           (this.key)        }
					edgesFrom()            { return thisGraph.edgesFrom            (this.key)        }
					edgesTo()              { return thisGraph.edgesTo              (this.key)        }
					verticesWithPathFrom() { return thisGraph.verticesWithPathFrom (this.key)        }
					verticesWithPathTo()   { return thisGraph.verticesWithPathTo   (this.key)        }
					pathTo(to)             { return thisGraph.path                 (this.key, to)    }
					pathFrom(from)         { return thisGraph.path           (from, this.key)        }
					pathsTo(to)            { return thisGraph.paths                (this.key, to)    }
					pathsFrom(from)        { return thisGraph.paths          (from, this.key)        }
					hasPathTo(to)          { return thisGraph.hasPath              (this.key, to)    }
					hasPathFrom(from)      { return thisGraph.hasPath        (from, this.key)        }
					outDegree()            { return thisGraph.outDegree            (this.key)        }
					inDegree ()            { return thisGraph.inDegree             (this.key)        }
					degree   ()            { return thisGraph.degree               (this.key)        }
				};

				/**
				 * @class Graph.GraphOO#Edge
				 * @classdesc A class for representing edges in a `GraphOO` instance.
				 */
				let EdgeSuperclass = this[_options].EdgeSuperclass || Object;
				let edgeSuperArguments = this[_options].edgeSuperArguments || ((...args)=>args);
				this.Edge = class Edge extends EdgeSuperclass {
					constructor(from, to, value) {
						super(...edgeSuperArguments(from, to, value));
						this[0] = [from, to];
						this[1] =  value;
						if (!thisGraph[_edgeObjects].has(from)) { thisGraph[_edgeObjects].set(from, new Map()) }
						if (!thisGraph[_edgeObjects].get(from).has(to)) {
							thisGraph[_edgeObjects].get(from).set(to, this);
							thisGraph.addNewEdge(from, to, value);
						}
						this._source = thisGraph.vertex(from);
						this._target = thisGraph.vertex(to);
					}
					get length() { return 2 }
					[Symbol.iterator]() {
						// overly verbose because jsdoc doesn't parse *[Symbol.iterator]() notation
						function *iterator() { yield this[0]; yield this[1] }
						return iterator.apply(this);
					}
					get graph()      { return thisGraph                              }
					get key()        { return this[0]                                }
					get from()       { return this[0][0]                             }
					get to()         { return this[0][1]                             }
					get value()      { return this[1]                                }
					set value(value) { return this.set(value)                        }
					get source()     { return this._source                           }
					get target()     { return this._target                           }
					set(value)       { return thisGraph.setEdge(this.key, value)     }
					remove()         { return thisGraph.removeExistingEdge(this.key) }
				};
			}
		}


		////////////////////////////////////////
		////////// Overriding Methods //////////
		////////////////////////////////////////

		addNewVertex(key, value) {
			this[_init]();
			[key, value] = Graph[_extractTwoArgs](key, value);
			this[_expectVerticesAbsent](key);
			if (!this[_vertexObjects].has(key)) {
				this[_vertexObjects].set(key, null);
				this[_vertexObjects].set(key, new this.Vertex(key, value));
			}
			this[_edgeObjects].set(key, new Map());
			return super.addNewVertex(key, value);
		}

		setVertex(key, value) {
			this[_init]();
			[key, value] = Graph[_extractTwoArgs](key, value);
			this[_expectVertices](key);
			this[_vertexObjects].get(key)[1] = value;
			return super.setVertex(key, value);
		}

		removeExistingVertex(key) {
			this[_init]();
			this[_expectVertices](key);
			this[_expectNoConnectedEdges](key);
			this[_vertexObjects].delete(key);
			return super.removeExistingVertex(key);
		}

		vertex(key) {
			this[_init]();
			this[_expectVertices](key);
			return this[_vertexObjects].get(key);
		}

		addNewEdge(from, to, value) {
			this[_init]();
			[from, to, value] = Graph[_extractThreeArgs](from, to, value);
			this[_expectEdgesAbsent]([from, to]);
			this[_expectVertices](from, to);
			if (!this[_edgeObjects].get(from).has(to)) {
				this[_edgeObjects].get(from).set(to, null);
				this[_edgeObjects].get(from).set(to, new this.Edge(from, to, value));
			}
			return super.addNewEdge(from, to, value);
		}

		setEdge(from, to, value) {
			this[_init]();
			[from, to, value] = Graph[_extractThreeArgs](from, to, value);
			this[_expectEdges]([from, to]);
			this[_edgeObjects].get(from).get(to)[1] = value;
			return super.setEdge(from, to, value);
		}

		removeExistingEdge(from, to) {
			this[_init]();
			[from, to] = Graph[_extractTwoArgs](from, to);
			this[_expectEdges]([from, to]);
			this[_edgeObjects].get(from).delete(to);
			return super.removeExistingEdge(from, to);
		}

		edge(from, to) {
			this[_init]();
			[from, to] = Graph[_extractTwoArgs](from, to);
			this[_expectEdges]([from, to]);
			return this[_edgeObjects].get(from).get(to);
		}

	};

}
