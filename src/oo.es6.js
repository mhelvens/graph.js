import {
	_extractTwoArgs, _extractThreeArgs,
	_expectVertices, _expectVerticesAbsent, _expectEdges, _expectEdgesAbsent,_expectNoConnectedEdges
} from './private.es6.js';

//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Graph.GraphOO ///////////////////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

export default function oo(Graph) {

	const _vertexObjects = Symbol("vertex objects");
	const _edgeObjects   = Symbol("edge objects");
	const _init          = Symbol("init");
	const _initialized   = Symbol("initialized");

	return Graph.GraphOO = class GraphOO extends Graph {

		[_init]() {
			if (!this[_initialized]) {
				this[_initialized] = true;
				this[_vertexObjects] = new Map();
				this[_edgeObjects]   = new Map();

				let thisGraph = this;
				this.Vertex = class Vertex extends Array {
					constructor(key, value) { super(2); this.push(key, value); }
					get graph()            { return thisGraph                                }
					get key()              { return this[0]                                  }
					get value()            { return this[1]                                  }
					set value(v)           { return this.set(v)                              }
					set(value)             { return thisGraph.setVertex    (this.key, value) }
					remove()               { return thisGraph.removeExistingVertex(this.key) }
					verticesFrom()         { return thisGraph.verticesFrom        (this.key) }
					verticesTo()           { return thisGraph.verticesTo          (this.key) }
					edgesFrom()            { return thisGraph.edgesFrom           (this.key) }
					edgesTo()              { return thisGraph.edgesTo             (this.key) }
					verticesWithPathFrom() { return thisGraph.verticesWithPathFrom(this.key) }
					verticesWithPathTo()   { return thisGraph.verticesWithPathTo  (this.key) }
					pathTo(to)             { return thisGraph.path   (this.key, to)          }
					pathFrom(from)         { return thisGraph.path   (from, this.key)        }
					pathsTo(to)            { return thisGraph.paths  (this.key, to)          }
					pathsFrom(from)        { return thisGraph.paths  (from, this.key)        }
					hasPathTo(to)          { return thisGraph.hasPath(this.key, to)          }
					hasPathFrom(from)      { return thisGraph.hasPath(from, this.key)        }
					outDegree() { return thisGraph.outDegree(this.key) }
					inDegree () { return thisGraph.inDegree (this.key) }
					degree   () { return thisGraph.degree   (this.key) }
				};
				this.Edge = class Edge extends Array {
					constructor(from, to, value) { super(2); this.push([from, to], value); }
					get graph()      { return thisGraph                              }
					get key()        { return this[0]                                }
					get from()       { return this[0][0]                             }
					get to()         { return this[0][1]                             }
					get value()      { return this[1]                                }
					set value(value) { return this.set(value)                        }
					get source()     { return thisGraph.vertex(this.from)            }
					get target()     { return thisGraph.vertex(this.to)              }
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
			this[_vertexObjects].set(key, new this.Vertex(key, value));
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
			this[_edgeObjects].get(from).set(to, new this.Edge(from, to, value));
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
