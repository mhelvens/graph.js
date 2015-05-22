import {
	_extractTwoArgs, _extractThreeArgs,
	_expectVertices, _expectVerticesAbsent, _expectEdges, _expectEdgesAbsent,_expectNoConnectedEdges
} from './private.es6.js';


//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Graph.vertices_topologically ////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

export default function addTopologicalIteration(Graph) {

	Object.assign(Graph.prototype, /** @lends Graph */ {

		/**
		 * Iterate over all vertices of the graph in topological order.
		 * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
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
		vertices_topologically: function *vertices_topologically() {
			let visited = []; // stack
			let handled = new Set();

			let _this = this;
			function *visit(key) {
				visited.push(key);
				let i = visited.indexOf(key);
				if (i !== visited.length - 1) {
					let cycle = visited.slice(i + 1).reverse();
					throw new Graph.CycleError(cycle);
				}
				if (!handled.has(key)) {
					for (let [nextKey] of _this.verticesTo(key)) {
						yield* visit(nextKey);
					}
					if (_this.hasVertex(key)) {
						yield _this.vertex(key);
					}
					handled.add(key);
				}
				visited.pop();
			}
			for (let [key] of this.vertices()) {
				if (!handled.has(key)) {
					yield* visit(key);
				}
			}
		}

	});

};
