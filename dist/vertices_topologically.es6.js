/**
 * Iterate over all vertices of a graph in topological order.
 * @param graph {Graph} the graph to iterate over;
 *                      if this is called as a method added through
 *                      {@link Graph.plugin}, this argument is skipped
 * @returns {Iterator} an ES6 iterator yielding vertices
 * @example
 * for (var it = vertices_topologically(graph), kv; !(kv = it.next()).done;) {
 *     var key   = kv.value[0],
 *         value = kv.value[1];
 *     // iterates over all vertices of the graph in topological order
 * }
 * @example
 * // in ECMAScript 6, you can use a for..of loop
 * for (let [key, value] of vertices_topologically(graph)) {
 *     // iterates over all vertices of the graph in topological order
 * }
 */
export default function *vertices_topologically(graph) {
	let visited = []; // stack
	let handled = new Set();

	function *visit(key) {
		visited.push(key);
		let i = visited.indexOf(key);
		if (i !== visited.length - 1) {
			let cycle = visited.slice(i + 1).reverse();
			throw new graph.constructor.CycleError(cycle);
		}
		if (!handled.has(key)) {
			for (let [nextKey] of graph.verticesTo(key)) {
				yield* visit(nextKey);
			}
			if (graph.hasVertex(key)) {
				yield graph.vertex(key);
			}
			handled.add(key);
		}
		visited.pop();
	}
	for (let [key] of graph.vertices()) {
		if (!handled.has(key)) {
			yield* visit(key);
		}
	}
};
