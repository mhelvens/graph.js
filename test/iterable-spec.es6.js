//import {any} from './helpers.es6.js';
//import JsGraph from '../src/js-graph.es6.js';
//
//
//var graph;
//beforeEach(() => {
//	graph = new JsGraph();
//});
//
//
//describe("Iterable interfaces", () => {/////////////////////////////////////////////////////////////////////////////////
//
//
//	var originalVertices, originalEdges, originalVertexCount, originalEdgeCount;
//
//
//	beforeEach(() => {
//		//// the original graph:
//		//
//		graph.addNewVertex('k1', 'oldValue1');
//		graph.addNewVertex('k2');
//		graph.addNewVertex('k3');
//		graph.addNewVertex('k4');
//		graph.addNewVertex('k5', 'oldValue5');
//		graph.addNewEdge('k2', 'k3', 'oldValue23');
//		graph.addNewEdge('k3', 'k4');
//		graph.addNewEdge('k2', 'k5');
//		graph.addNewEdge('k5', 'k3');
//
//		// k1     k2 ──▶ k3 ──▶ k4
//		//        ╷      ▲
//		//        │      │
//		//        ▼      │
//		//        k5 ────╯
//
//		//// some preliminary work to more easily 'expect' things about the original graph:
//		//
//		originalVertices = {
//			'k1': 'oldValue1',
//			'k2': undefined,
//			'k3': undefined,
//			'k4': undefined,
//			'k5': 'oldValue5'
//		};
//		originalEdges = {
//			'k2, k3': 'oldValue23',
//			'k3, k4': undefined,
//			'k2, k5': undefined,
//			'k5, k3': undefined
//		};
//		originalVertexCount = Object.keys(originalVertices).length;
//		originalEdgeCount = Object.keys(originalEdges).length;
//	});
//
//
//	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//
//	describe("for vertices", () => {
//
//		it("have a nice syntax for vertex count", () => {
//			expect(graph.vertices.length).toBe(originalVertexCount);
//		});
//
//		it("can iterate over all vertices with ES6 syntax", () => {
//			var verticesFound = {};
//			for (let [key, value] of graph.vertices) {
//				expect(verticesFound[key]).toBeUndefined();
//				verticesFound[key] = value;
//			}
//			expect(verticesFound).toEqual(originalVertices);
//		});
//
//	});
//
//	describe("for edges", () => {
//
//		it("have a nice syntax for edge count", () => {
//			expect(graph.edges.length).toBe(originalEdgeCount);
//		});
//
//		it("can iterate over all edges with ES6 syntax", () => {
//			var edgesFound = {};
//			for (let [from, to, value] of graph.edges) {
//				var key = from + ", " + to;
//				expect(edgesFound[key]).toBeUndefined();
//				edgesFound[key] = value;
//			}
//			expect(edgesFound).toEqual(originalEdges);
//		});
//
//	});
//
//	//describe("for vertex successors", () => {
//	//
//	//	it("have a nice syntax for successor count", () => {
//	//
//	//	});
//	//
//	//});
//
//	//describe("for vertex predecessors", () => {
//	//
//	//	it("have a nice syntax for predecessor count", () => {
//	//
//	//	});
//	//
//	//});
//
//	//describeMethod('topologically', () => {
//	//
//	//	it("throws an error if the graph contains a cycle (1)", () => {
//	//		graph.clear();
//	//
//	//		graph.createEdge('n1', 'n2');
//	//		graph.createEdge('n2', 'n3');
//	//		graph.createEdge('n3', 'n4');
//	//		graph.createEdge('n4', 'n5');
//	//		graph.createEdge('n3', 'n23');
//	//		graph.createEdge('n23', 'n2');
//	//
//	//		// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
//	//		//        ▲      ╷
//	//		//        │      │
//	//		//        ╵      │
//	//		//       n23 ◀───╯
//	//
//	//		expectItWhenBoundWith(() => {}).toThrow();
//	//		expectItWhenBoundWith(() => {}).toThrowSpecific(JsGraph.CycleError, {});
//	//
//	//		try {
//	//			callItWith(() => {});
//	//		} catch (err) {
//	//			expect(err.cycle).toEqualOneOf(
//	//				['n23', 'n2', 'n3'],
//	//				['n3', 'n23', 'n2'],
//	//				['n2', 'n3', 'n23']
//	//			);
//	//			var cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
//	//			expect(cycleInMessage).toEqualOneOf(
//	//				'n23,n2,n3',
//	//				'n3,n23,n2',
//	//				'n2,n3,n23'
//	//			);
//	//		}
//	//	});
//	//
//	//	it("throws an error if the graph contains a cycle (2)", () => {
//	//		graph.clear();
//	//
//	//		graph.createEdge('n1', 'n1');
//	//
//	//		expectItWhenBoundWith(() => {}).toThrow();
//	//		expectItWhenBoundWith(() => {}).toThrowSpecific(JsGraph.CycleError, {});
//	//
//	//		try {
//	//			callItWith(() => {});
//	//		} catch (err) {
//	//			expect(err.cycle).toEqual(['n1']);
//	//			var cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
//	//			expect(cycleInMessage).toEqual('n1');
//	//		}
//	//	});
//	//
//	//	it("throws nothing if the graph has no cycle and the passed function throws nothing", () => {
//	//		expectItWhenBoundWith(() => {/*not throwing stuff*/}).not.toThrow();
//	//	});
//	//
//	//	it("calls the specified handler exactly once for each vertex in the graph", () => {
//	//		var verticesFound = {};
//	//		callItWith((key, value) => {
//	//			expect(verticesFound[key]).toBeUndefined();
//	//			verticesFound[key] = value;
//	//		});
//	//		expect(verticesFound).toEqual(originalVertices);
//	//	});
//	//
//	//	it("visits vertices only when their predecessors have already been visited", () => {
//	//		graph.clear();
//	//
//	//		graph.createEdge('n3', 'n23');
//	//		graph.createEdge('n2', 'n23');
//	//		graph.createEdge('n1', 'n2');
//	//		graph.createEdge('n2', 'n3');
//	//		graph.createEdge('n3', 'n4');
//	//		graph.createEdge('n4', 'n5');
//	//
//	//		// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
//	//		//        ▲      ╷
//	//		//        │      │
//	//		//        ╵      │
//	//		//       n23 ◀───╯
//	//
//	//		var visited = {};
//	//
//	//		callItWith((key) => {
//	//			if (key === 'n2') { expect(visited['n1']).toBeDefined(); }
//	//			if (key === 'n3') { expect(visited['n2']).toBeDefined(); }
//	//			if (key === 'n4') { expect(visited['n3']).toBeDefined(); }
//	//			if (key === 'n5') { expect(visited['n4']).toBeDefined(); }
//	//			if (key === 'n23') {
//	//				expect(visited['n2']).toBeDefined();
//	//				expect(visited['n3']).toBeDefined();
//	//			}
//	//			visited[key] = true;
//	//		});
//	//
//	//	});
//	//
//	//});
//
//
//});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
