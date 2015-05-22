import {any, set, describeClass, cycleArrays} from './helpers.es6.js';
import {describeGraphClass}                   from './graph-helpers.es6.js';
import Graph                                  from '../src/graph.es6.js';
import addTopologicalIteration                from '../src/addTopologicalIteration.es6.js';

addTopologicalIteration(Graph);

describeGraphClass(Graph, () => {
	describeMethod('vertices_topologically', () => {

		it("throws an error if the graph contains a cycle (1)", () => {
			graph = new Graph(
				[['n1', 'n2']],
				[['n2', 'n3']],
				[['n3', 'n4']],
				[['n4', 'n5']],
				[['n3', 'n6']],
				[['n6', 'n2']]
			);

			//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//         ▲      ╷
			//         │      │
			//         ╵      │
			//         n6 ◀───╯

			expect(() => [...callItWith()]).toThrowSpecific(Graph.CycleError);

			try {
				//noinspection JSUnusedLocalSymbols
				let x = [...callItWith()];
			} catch (err) {
				let expectedCycle = cycleArrays('n2', 'n3', 'n6');
				expect(err.cycle).toEqualOneOf(...expectedCycle);
				let cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
				expect(cycleInMessage).toEqualOneOf(...expectedCycle.map(a=>a.toString()));
			}
		});

		it("throws an error if the graph contains a cycle (2)", () => {
			graph = new Graph([['n1', 'n1']]);

			expect(() => [...callItWith()]).toThrowSpecific(Graph.CycleError);

			try {
				//noinspection JSUnusedLocalSymbols
				let x = [...callItWith()];
			} catch (err) {
				expect(err.cycle).toEqual(['n1']);
				let cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
				expect(cycleInMessage).toEqual('n1');
			}
		});

		it("throws nothing if the graph has no cycle and the passed function throws nothing", () => {
			expect(() => [...callItWith()]).not.toThrow();
		});

		it("iterates over each vertex in the graph exactly once", () => {
			let verticesFound = {};
			for (let [key, value] of callItWith()) {
				expect(verticesFound[key]).toBeUndefined();
				verticesFound[key] = value;
			}
			expect(verticesFound).toEqual(originalVertices);
		});

		it("iterates over each vertex in the graph exactly once (ES5 style)", () => {
			let verticesFound = {};
			for (var it = callItWith(), kv; !(kv = it.next()).done;) {
				var key   = kv.value[0],
					value = kv.value[1];
				expect(verticesFound[key]).toBeUndefined();
				verticesFound[key] = value;
			}
			expect(verticesFound).toEqual(originalVertices);
		});

		it("visits vertices only when their predecessors have already been visited", () => {
			graph = new Graph(
				[['n3', 'n6']],
				[['n2', 'n6']],
				[['n1', 'n2']],
				[['n2', 'n3']],
				[['n3', 'n4']],
				[['n4', 'n5']]
			);

			//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//         ╷      ╷
			//         │      │
			//         ▼      │
			//         n6 ◀───╯

			let visited = {};

			for (let [key] of callItWith()) {
				if (key === 'n2') { expect(visited['n1']).toBeDefined(); }
				if (key === 'n3') { expect(visited['n2']).toBeDefined(); }
				if (key === 'n4') { expect(visited['n3']).toBeDefined(); }
				if (key === 'n5') { expect(visited['n4']).toBeDefined(); }
				if (key === 'n6') {
					expect(visited['n2']).toBeDefined();
					expect(visited['n3']).toBeDefined();
				}
				visited[key] = true;
			}
		});

	});
});
