import {any, set, describeClass} from './helpers.es6.js';
import Graph                     from '../src/graph.es6.js';
import oo                        from '../src/oo.es6.js';
import specs                     from './spec-template.es6.js';

let GraphOO = oo(Graph);

/* perform the 'Graph' tests also on GraphOO, since GraphOO is a behavioral subtype */
specs(GraphOO, () => {

	describeClass("graph.Vertex", 'vertex', () => graph.vertex('k3'), () => {

		it("is present", () => {
			expect(graph.Vertex).toEqual(any(Function));
		});

		it("never throws any exception", () => {
			expect(() => new graph.Vertex()).not.toThrow();
		});

		it("creates a new object of type graph.Vertex", () => {
			expect(new graph.Vertex()).toEqual(any(graph.Vertex));
		});

		it("is a different type for each graph", () => {
			let other = new GraphOO();
			expect(graph.Vertex).not.toEqual(other.Vertex);
		});


		describe("instance", () => {
			beforeEach(() => { graph.setVertex('k3', 'newK3Value') });

			it("knows its own key and value", () => {
				expect(vertex.key  ).toEqual('k3');
				expect(vertex.value).toEqual('newK3Value');
			});

			it("knows its graph", () => {
				expect(vertex.graph).toEqual(graph);
			});

			it("can (almost) stand in for the [key, value] vertex representation", () => {
				expect(vertex instanceof Array).toBeTruthy();
				expect(vertex[0]).toEqual('k3');
				expect(vertex[1]).toEqual('newK3Value');
				let [key, value] = vertex;
				expect(key).toEqual('k3');
				expect(value).toEqual('newK3Value');
				// expect(Array.isArray(vertex)).toBeTruthy(); // nope, sorry...
			});
		});


		describe("new instance", () => {
			it("gets registered in its graph", () => {
				let n1 = new graph.Vertex('n1', 'newValue');
				expect(graph.hasVertex  ('n1')).toBeTruthy();
				expect(graph.vertex     ('n1')).toBe(n1);
				expect(graph.vertexValue('n1')).toEqual('newValue');
			});
		});


		describe("existing instance from a graph", () => {
			it("can be used to set its own value", () => {
				k3.set(42);
				expect(k3.value).toEqual(42);
				expect(graph.vertexValue('k3')).toEqual(42);
				k3.value = 43;
				expect(k3.value).toEqual(43);
				expect(graph.vertexValue('k3')).toEqual(43);
			});
		});


		let k1, k2, k3, k4, k5;
		beforeEach(() => {
			k1 = graph.vertex('k1');
			k2 = graph.vertex('k2');
			k3 = graph.vertex('k3');
			k4 = graph.vertex('k4');
			k5 = graph.vertex('k5');
		});


		describeMethod('remove', () => {
			it("removes this vertex if there are no edges connected to it", () => {
				vertex = k1;
				callItWith();
				expect(graph.hasVertex('k1')).toBeFalsy();
			});
			it("throws an error if there are edges connected to this vertex", () => {
				expectItWhenBoundWith().toThrowSpecific(GraphOO.EdgeExistsError, {
					edges: set(
						[['k2', 'k3'], "oldValue23"],
						[['k5', 'k3'],  undefined  ],
						[['k3', 'k4'],  undefined  ]
					)
				});
			});
		});

		describeMethod('destroy', () => {
			it("removes this vertex and all edges connected to it", () => {
				callItWith();
				expect(graph.hasVertex('k3')).toBeFalsy();
				expect(graph.hasEdge('k2', 'k3')).toBeFalsy();
				expect(graph.hasEdge('k5', 'k3')).toBeFalsy();
				expect(graph.hasEdge('k3', 'k4')).toBeFalsy();
			});
		});

		describeMethod('verticesFrom', () => {
			beforeEach(() => { vertex = k2 });
			it("iterates over each outgoing edge, providing the connected vertex", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k3':  undefined,
					'k5': "oldValue5"
				});
			});
			it("iterates over each outgoing edge, providing the connected vertex (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var key   = kv.value[0],
						value = kv.value[1];
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k3':  undefined,
					'k5': "oldValue5"
				});
			});
		});

		describeMethod('verticesTo', () => {
			it("iterates over each incoming edge, providing the connected vertex", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k2':  undefined,
					'k5': 'oldValue5'
				});
			});

			it("iterates over each incoming edge, providing the connected vertex (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var key       = kv.value[0],
						value     = kv.value[1];
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k2':  undefined,
					'k5': 'oldValue5'
				});
			});
		});

		describeMethod('edgesFrom', () => {
			beforeEach(() => { vertex = k2 });
			it("iterates over each outgoing edge, providing the connected vertex key/value and edge value", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k2,k3': "oldValue23",
					'k2,k5':  undefined
				});
			});
			it("iterates over each outgoing edge, providing the connected vertex key/value and edge value (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var from  = kv.value[0][0],
						to    = kv.value[0][1],
						value = kv.value[1];
					expect(valuesFound[`${from},${to}`]).toBeUndefined();
					valuesFound[`${from},${to}`] = value;
				}
				expect(valuesFound).toEqual({
					'k2,k3': "oldValue23",
					'k2,k5':  undefined
				});
			});
		});

		describeMethod('edgesTo', () => {
			it("iterates over each incoming edge, providing the connected vertex key/value and edge value", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k2,k3': "oldValue23",
					'k5,k3':  undefined
				});
			});
			it("iterates over each incoming edge, providing the connected vertex key/value and edge value (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var from  = kv.value[0][0],
						to    = kv.value[0][1],
						value = kv.value[1];
					expect(valuesFound[`${from},${to}`]).toBeUndefined();
					valuesFound[`${from},${to}`] = value;
				}
				expect(valuesFound).toEqual({
					'k2,k3': "oldValue23",
					'k5,k3':  undefined
				});
			});
		});

		describeMethod('verticesWithPathFrom', () => {
			beforeEach(() => { vertex = k2 });
			it("iterates once over each vertex that is reachable from this vertex, in no particular order", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k3':  undefined,
					'k5': "oldValue5",
					'k4':  undefined
				});
			});
			it("iterates once over each vertex that is reachable from this vertex, in no particular order (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var key   = kv.value[0],
						value = kv.value[1];
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k3':  undefined,
					'k5': "oldValue5",
					'k4':  undefined
				});
			});
		});

		describeMethod('verticesWithPathTo', () => {
			beforeEach(() => { vertex = k4 });
			it("iterates once over each vertex that has a path to reach this vertex, in no particular order", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k2': undefined,
					'k3': undefined,
					'k5': "oldValue5"
				});
			});
			it("iterates once over each vertex that has a path to reach this vertex, in no particular order (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var key   = kv.value[0],
						value = kv.value[1];
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k2': undefined,
					'k3': undefined,
					'k5': "oldValue5"
				});
			});
		});

		describeMethod('pathTo', () => {
			it("returns null if the path doesn't exist (simple)", () => {
				expectItWhenCalledWith('k1').toBeNull();
			});
			it("returns null if the path doesn't exist (implicit self-loop)", () => {
				expectItWhenCalledWith('k3').toBeNull();
			});
			it("returns null if the path doesn't exist (edge backwards)", () => {
				expectItWhenCalledWith('k2').toBeNull();
				expectItWhenCalledWith('k5').toBeNull();
			});
			it("returns a descriptive array if the path exists (single edge)", () => {
				expectItWhenCalledWith('k4').toEqual(['k3', 'k4']);
			});
			it("returns a descriptive array if the path exists (transitive)", () => {
				vertex = k5;
				expectItWhenCalledWith('k4').toEqual(['k5', 'k3', 'k4']);
				vertex = k2;
				expectItWhenCalledWith('k4').toEqualOneOf( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] );
				graph.addNewEdge('k4', 'k1');
				expectItWhenCalledWith('k1').toEqualOneOf( ['k2', 'k3', 'k4', 'k1'], ['k2', 'k5', 'k3', 'k4', 'k1'] );
			});
			it("returns a descriptive array if the path exists (reflexive cycle)", () => {
				graph.addNewEdge('k3', 'k3');
				expectItWhenCalledWith('k3').toEqual(['k3', 'k3']);
			});
			it("returns a descriptive array if the path exists (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expectItWhenCalledWith('k3').toEqual(['k3', 'k4', 'k3']);
			});
			it("returns a descriptive array if the path exists (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expectItWhenCalledWith('k3').toEqualOneOf( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] );
			});
			it("returns a descriptive array if the path exists (including part of a cycle)", () => {
				graph = new GraphOO(
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

				vertex = graph.vertex('n1');
				expectItWhenCalledWith('n5').toEqual(['n1', 'n2', 'n3', 'n4', 'n5']);
			});
		});

		describeMethod('pathFrom', () => {
			it("returns null if the path doesn't exist (simple)", () => {
				expectItWhenCalledWith('k1').toBeNull();
			});
			it("returns null if the path doesn't exist (implicit self-loop)", () => {
				expectItWhenCalledWith('k3').toBeNull();
			});
			it("returns null if the path doesn't exist (edge backwards)", () => {
				expectItWhenCalledWith('k4').toBeNull();
			});
			it("returns a descriptive array if the path exists (single edge)", () => {
				expectItWhenCalledWith('k2').toEqualOneOf( ['k2', 'k3'], ['k2', 'k5', 'k3'] );
			});
			it("returns a descriptive array if the path exists (transitive)", () => {
				vertex = k4;
				expectItWhenCalledWith('k2').toEqualOneOf( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] );
				vertex = k1;
				graph.addNewEdge('k4', 'k1');
				expectItWhenCalledWith('k2').toEqualOneOf( ['k2', 'k3', 'k4', 'k1'], ['k2', 'k5', 'k3', 'k4', 'k1'] );
			});
			it("returns a descriptive array if the path exists (reflexive cycle)", () => {
				graph.addNewEdge('k3', 'k3');
				expectItWhenCalledWith('k3').toEqual(['k3', 'k3']);
			});
			it("returns a descriptive array if the path exists (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expectItWhenCalledWith('k3').toEqual(['k3', 'k4', 'k3']);
			});
			it("returns a descriptive array if the path exists (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expectItWhenCalledWith('k3').toEqualOneOf( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] );
			});
			it("returns a descriptive array if the path exists (including part of a cycle)", () => {
				graph = new GraphOO(
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

				vertex = graph.vertex('n5');
				expectItWhenCalledWith('n1').toEqual(['n1', 'n2', 'n3', 'n4', 'n5']);
			});
		});

		describeMethod('hasPathTo', () => {
			it("returns null if the path doesn't exist (simple)", () => {
				expectItWhenCalledWith('k1').toBeFalsy();
			});
			it("returns null if the path doesn't exist (implicit self-loop)", () => {
				expectItWhenCalledWith('k3').toBeFalsy();
			});
			it("returns null if the path doesn't exist (edge backwards)", () => {
				expectItWhenCalledWith('k2').toBeFalsy();
				expectItWhenCalledWith('k5').toBeFalsy();
			});
			it("returns a descriptive array if the path exists (single edge)", () => {
				expectItWhenCalledWith('k4').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (transitive)", () => {
				vertex = k5;
				expectItWhenCalledWith('k4').toBeTruthy();
				vertex = k2;
				expectItWhenCalledWith('k4').toBeTruthy();
				graph.addNewEdge('k4', 'k1');
				expectItWhenCalledWith('k1').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (reflexive cycle)", () => {
				graph.addNewEdge('k3', 'k3');
				expectItWhenCalledWith('k3').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expectItWhenCalledWith('k3').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expectItWhenCalledWith('k3').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (including part of a cycle)", () => {
				graph = new GraphOO(
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

				vertex = graph.vertex('n1');
				expectItWhenCalledWith('n5').toBeTruthy();
			});
		});

		describeMethod('hasPathFrom', () => {
			it("returns null if the path doesn't exist (simple)", () => {
				expectItWhenCalledWith('k1').toBeFalsy();
			});
			it("returns null if the path doesn't exist (implicit self-loop)", () => {
				expectItWhenCalledWith('k3').toBeFalsy();
			});
			it("returns null if the path doesn't exist (edge backwards)", () => {
				expectItWhenCalledWith('k4').toBeFalsy();
			});
			it("returns a descriptive array if the path exists (single edge)", () => {
				expectItWhenCalledWith('k2').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (transitive)", () => {
				vertex = k4;
				expectItWhenCalledWith('k2').toBeTruthy();
				vertex = k1;
				graph.addNewEdge('k4', 'k1');
				expectItWhenCalledWith('k2').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (reflexive cycle)", () => {
				graph.addNewEdge('k3', 'k3');
				expectItWhenCalledWith('k3').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expectItWhenCalledWith('k3').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expectItWhenCalledWith('k3').toBeTruthy();
			});
			it("returns a descriptive array if the path exists (including part of a cycle)", () => {
				graph = new GraphOO(
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

				vertex = graph.vertex('n5');
				expectItWhenCalledWith('n1').toBeTruthy();
			});
		});

		describeMethod('pathsTo', () => {
			it("returns null if the path doesn't exist (simple)", () => {
				expect(set( ...callItWith('k1'))).toEqual(set( ));
			});
			it("returns null if the path doesn't exist (implicit self-loop)", () => {
				expect(set( ...callItWith('k3'))).toEqual(set( ));
			});
			it("returns null if the path doesn't exist (edge backwards)", () => {
				expect(set( ...callItWith('k2'))).toEqual(set( ));
				expect(set( ...callItWith('k5'))).toEqual(set( ));
			});
			it("returns a descriptive array if the path exists (single edge)", () => {
				expect(set( ...callItWith('k4'))).toEqual(set( ['k3', 'k4'] ));
			});
			it("returns a descriptive array if the path exists (transitive)", () => {
				vertex = k5;
				expect(set( ...callItWith('k4'))).toEqual(set( ['k5', 'k3', 'k4'] ));
				vertex = k2;
				expect(set( ...callItWith('k4'))).toEqual(set( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] ));
				graph.addNewEdge('k4', 'k1');
				expect(set( ...callItWith('k1'))).toEqual(set( ['k2', 'k3', 'k4', 'k1'], ['k2', 'k5', 'k3', 'k4', 'k1'] ));
			});
			it("returns a descriptive array if the path exists (reflexive cycle)", () => {
				graph.addNewEdge('k3', 'k3');
				expect(set( ...callItWith('k3'))).toEqual(set( ['k3', 'k3'] ));
			});
			it("returns a descriptive array if the path exists (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expect(set( ...callItWith('k3'))).toEqual(set( ['k3', 'k4', 'k3'] ));
			});
			it("returns a descriptive array if the path exists (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expect(set( ...callItWith('k3'))).toEqual(set( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] ));
			});
			it("returns a descriptive array if the path exists (including part of a cycle)", () => {
				graph = new GraphOO(
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

				vertex = graph.vertex('n1');
				expect(set( ...callItWith('n5'))).toEqual(set( ['n1', 'n2', 'n3', 'n4', 'n5'] ));
			});
		});

		describeMethod('pathsFrom', () => {
			it("returns null if the path doesn't exist (simple)", () => {
				expect(set( ...callItWith('k1'))).toEqual(set( ));
			});
			it("returns null if the path doesn't exist (implicit self-loop)", () => {
				expect(set( ...callItWith('k3'))).toEqual(set( ));
			});
			it("returns null if the path doesn't exist (edge backwards)", () => {
				expect(set( ...callItWith('k4'))).toEqual(set( ));
			});
			it("returns a descriptive array if the path exists (single edge)", () => {
				expect(set( ...callItWith('k2'))).toEqual(set( ['k2', 'k3'], ['k2', 'k5', 'k3'] ));
			});
			it("returns a descriptive array if the path exists (transitive)", () => {
				vertex = k4;
				expect(set( ...callItWith('k2'))).toEqual(set( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] ));
				vertex = k1;
				graph.addNewEdge('k4', 'k1');
				expect(set( ...callItWith('k2'))).toEqual(set( ['k2', 'k3', 'k4', 'k1'], ['k2', 'k5', 'k3', 'k4', 'k1'] ));
			});
			it("returns a descriptive array if the path exists (reflexive cycle)", () => {
				graph.addNewEdge('k3', 'k3');
				expect(set( ...callItWith('k3'))).toEqual(set( ['k3', 'k3'] ));
			});
			it("returns a descriptive array if the path exists (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expect(set( ...callItWith('k3'))).toEqual(set( ['k3', 'k4', 'k3'] ));
			});
			it("returns a descriptive array if the path exists (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expect(set( ...callItWith('k3'))).toEqual(set( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] ));
			});
			it("returns a descriptive array if the path exists (including part of a cycle)", () => {
				graph = new GraphOO(
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

				vertex = graph.vertex('n5');
				expect(set( ...callItWith('n1'))).toEqual(set( ['n1', 'n2', 'n3', 'n4', 'n5'] ));
			});
		});

		describeMethod('outDegree', () => {
			it("returns the number of edges going out of this vertex", () => {
				vertex = k1;
				expect(callItWith()).toBe(0);
				vertex = k2;
				expect(callItWith()).toBe(2);
				vertex = k3;
				expect(callItWith()).toBe(1);
				vertex = k4;
				expect(callItWith()).toBe(0);
				vertex = k5;
				expect(callItWith()).toBe(1);
			});
		});

		describeMethod('inDegree', () => {
			it("returns the number of edges coming into this vertex", () => {
				vertex = k1;
				expect(callItWith()).toBe(0);
				vertex = k2;
				expect(callItWith()).toBe(0);
				vertex = k3;
				expect(callItWith()).toBe(2);
				vertex = k4;
				expect(callItWith()).toBe(1);
				vertex = k5;
				expect(callItWith()).toBe(1);
			});
		});

		describeMethod('degree', () => {
			it("returns the number of edges connected to this vertex", () => {
				vertex = k1;
				expect(callItWith()).toBe(0);
				vertex = k2;
				expect(callItWith()).toBe(2);
				vertex = k3;
				expect(callItWith()).toBe(3);
				vertex = k4;
				expect(callItWith()).toBe(1);
				vertex = k5;
				expect(callItWith()).toBe(2);
			});
		});

	});

	describe("graph.Edge", () => {
		it("is present", () => {
			expect(graph.Edge).toEqual(any(Function));
		});

		// TODO: more

	});

	// TODO: more

});
