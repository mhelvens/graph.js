import {any}                   from './helpers.es6.js';
import {describeGraphClass}    from './graph-helpers.es6.js';
import Graph                   from '../src/graph.es6.js';
import addGraphOO              from '../src/addGraphOO.es6.js';
import addTopologicalIteration from '../src/addTopologicalIteration.es6.js';

let GraphOO = addGraphOO(Graph);
addTopologicalIteration(Graph);

describeGraphClass(GraphOO, () => {
	describeMethod('vertices_topologically', () => {

		// at this point, we can pretty much trust that this method works on GraphOO
		// just as on Graph, so we're just making sure it yields graph.Vertex instances

		it("yields graph.Vertex instances", () => {
			for (let vertex of callItWith()) {
				expect(vertex).toEqual(any(graph.Vertex));
			}
		});

	});
});
