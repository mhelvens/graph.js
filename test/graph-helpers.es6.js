import {set, describeClass} from './helpers.es6.js';
import Graph                from '../src/graph.es6.js'


/* add equality tester for graphs; its validity is justified by the tests for the 'equals' method */
beforeEach(() => {
	jasmine.addCustomEqualityTester(function setEquals(a, b) {
		if (a instanceof Graph && b instanceof Graph) {
			return a.equals(b,
				(aa, bb) => jasmine.matchersUtil.equals(aa, bb, this),
				(aa, bb) => jasmine.matchersUtil.equals(aa, bb, this)
			);
		}
	});
});


/* describe Graph (sub)class */
export function describeGraphClass(GraphClass, tests) {
	describeClass(GraphClass.name, 'graph', () => new GraphClass(), () => {

		/* set up a basic graph that can be used for most tests */
		beforeEach(() => {
			/* the original graph */
			graph.addNewVertex('k1', "oldValue1");
			graph.addNewVertex('k2');
			graph.addNewVertex('k3');
			graph.addNewVertex('k4');
			graph.addNewVertex('k5', "oldValue5");
			graph.addNewEdge('k2', 'k3', "oldValue23");
			graph.addNewEdge('k3', 'k4');
			graph.addNewEdge('k2', 'k5');
			graph.addNewEdge('k5', 'k3');

			//  k1     k2 ──▶ k3 ──▶ k4
			//         ╷      ▲
			//         │      │
			//         ▼      │
			//         k5 ────╯

			/* some preliminary work to more easily 'expect' things about the original graph */
			Object.assign(window, {
				originalVertices: {
					'k1': "oldValue1",
					'k2':  undefined,
					'k3':  undefined,
					'k4':  undefined,
					'k5': "oldValue5"
				},
				originalEdges: {
					'k2,k3': "oldValue23",
					'k3,k4':  undefined,
					'k2,k5':  undefined,
					'k5,k3':  undefined
				},
				originalVertexCount: 5,
				originalEdgeCount:   4,
				expectTheGraphNotToHaveChanged() {
					let vertices = {};
					for (let [key, value] of graph.vertices()) {
						vertices[key] = value;
					}
					expect(vertices).toEqual(originalVertices);

					let edges = {};
					for (let [key, value] of graph.edges()) {
						edges[key] = value;
					}
					expect(edges).toEqual(originalEdges);
				}
			});


			/* and we now 'expect' that those variables are set correctly */
			expectTheGraphNotToHaveChanged();
		});

		/* convenience graph-test shortcuts */
		let itFunctions = {
			it_throwsNothing() {
				it("throws no exceptions when called", () => {
					expectItWhenBoundWith().not.toThrow();
				});
			},
			it_throwsNothingIfVertexDoesNotExist() {
				it("throws no exceptions if a vertex with that key does not exist", () => {
					expectItWhenBoundWith('newKey').not.toThrow();
				});
			},
			it_throwsNothingIfVertexExists() {
				it("throws no exceptions if a vertex with that key exists", () => {
					expectItWhenBoundWith('k1').not.toThrow();
					expectItWhenBoundWith('k2').not.toThrow();
					expectItWhenBoundWith('k3').not.toThrow();
					expectItWhenBoundWith('k4').not.toThrow();
					expectItWhenBoundWith('k5').not.toThrow();
				});
			},
			it_throwsNothingIfUnconnectedVertexExists() {
				it("throws no exceptions if a vertex with that key exists, not connected to any edges", () => {
					expectItWhenBoundWith('k1').not.toThrow();
				});
			},
			it_throwsNothingWhenPassedAKey() {
				it("throws no exceptions when it is passed a single key argument", () => {
					expectItWhenBoundWith('k1').not.toThrow();
					expectItWhenBoundWith('k2').not.toThrow();
					expectItWhenBoundWith('newKey').not.toThrow();
				});
			},
			it_throwsNothingWhenPassedAKeyAndValue() {
				it("throws no exceptions when it is passed a key and a value argument (1)", () => {
					expectItWhenBoundWith('k1', 'newValue').not.toThrow();
					expectItWhenBoundWith('newKey', 'newValue').not.toThrow();
				});
				it("throws no exceptions when it is passed a key and a value argument (2)", () => {
					expectItWhenBoundWith(['k1', 'newValue']).not.toThrow();
					expectItWhenBoundWith(['newKey', 'newValue']).not.toThrow();
				});
			},
			it_throwsNothingWhenPassedAnotherGraph() {
				it("throws no exceptions when it is passed another graph as an argument", () => {
					expectItWhenBoundWith(new GraphClass()).not.toThrow();
				});
			},
			it_throwsNothingIfEdgeDoesNotExist() {
				it("throws nothing if the edge does not exist (1)", () => {
					expectItWhenBoundWith('k1', 'k2').not.toThrow();
					expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
				});
				it("throws nothing if the edge does not exist (2)", () => {
					expectItWhenBoundWith(['k1', 'k2']).not.toThrow();
					expectItWhenBoundWith(['newKey1', 'newKey2']).not.toThrow();
				});
			},
			it_throwsNothingIfEdgeExists() {
				it("throws nothing if the edge exists (1)", () => {
					expectItWhenBoundWith('k2', 'k3').not.toThrow();
					expectItWhenBoundWith('k3', 'k4').not.toThrow();
				});
				it("throws nothing if the edge exists (2)", () => {
					expectItWhenBoundWith(['k2', 'k3']).not.toThrow();
					expectItWhenBoundWith(['k3', 'k4']).not.toThrow();
				});
			},
			it_throwsNothingIfVerticesExistAndEdgeDoesNot() {
				it("throws nothing if the required vertices exist but the edge does not (1)", () => {
					expectItWhenBoundWith('k1', 'k2').not.toThrow();
				});
				it("throws nothing if the required vertices exist but the edge does not (2)", () => {
					expectItWhenBoundWith(['k1', 'k2']).not.toThrow();
				});
			},
			it_throwsNothingIfVerticesExist() {
				it("throws nothing if the required vertices exist", () => {
					expectItWhenBoundWith('k1', 'k2').not.toThrow();
					expectItWhenBoundWith('k2', 'k3').not.toThrow();
					expectItWhenBoundWith('k3', 'k4').not.toThrow();
				});
			},
			it_throwsNothingWhenPassedTwoKeys() {
				it("throws no exceptions when it is passed two key arguments (1)", () => {
					expectItWhenBoundWith('k1', 'k2').not.toThrow();
					expectItWhenBoundWith('k2', 'k3').not.toThrow();
					expectItWhenBoundWith('k3', 'k4').not.toThrow();
					expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
				});
				it("throws no exceptions when it is passed two key arguments (2)", () => {
					expectItWhenBoundWith(['k1', 'k2']).not.toThrow();
					expectItWhenBoundWith(['k2', 'k3']).not.toThrow();
					expectItWhenBoundWith(['k3', 'k4']).not.toThrow();
					expectItWhenBoundWith(['newKey1', 'newKey2']).not.toThrow();
				});
			},
			it_throwsNothingWhenPassedTwoKeysAndValue() {
				it("throws no exceptions when it is passed two keys and a value argument (1)", () => {
					expectItWhenBoundWith('k1', 'k2', 'newValue').not.toThrow();
					expectItWhenBoundWith('k2', 'k3', 'newValue').not.toThrow();
					expectItWhenBoundWith('k3', 'k4', 'newValue').not.toThrow();
					expectItWhenBoundWith('newKey1', 'newKey2', 'newValue').not.toThrow();
				});
				it("throws no exceptions when it is passed two keys and a value argument (2)", () => {
					expectItWhenBoundWith(['k1', 'k2'], 'newValue').not.toThrow();
					expectItWhenBoundWith(['k2', 'k3'], 'newValue').not.toThrow();
					expectItWhenBoundWith(['k3', 'k4'], 'newValue').not.toThrow();
					expectItWhenBoundWith(['newKey1', 'newKey2'], 'newValue').not.toThrow();
				});
				it("throws no exceptions when it is passed two keys and a value argument (3)", () => {
					expectItWhenBoundWith([['k1', 'k2'], 'newValue']).not.toThrow();
					expectItWhenBoundWith([['k2', 'k3'], 'newValue']).not.toThrow();
					expectItWhenBoundWith([['k3', 'k4'], 'newValue']).not.toThrow();
					expectItWhenBoundWith([['newKey1', 'newKey2'], 'newValue']).not.toThrow();
				});
			},
			it_throwsErrorIfVertexExists() {
				it("throws an error if a vertex with the given key already exists", () => {
					expectItWhenBoundWith('k1').toThrowSpecific(GraphClass.VertexExistsError, { vertices: set( ['k1', 'oldValue1'] ) });
					expectItWhenBoundWith('k2').toThrowSpecific(GraphClass.VertexExistsError, { vertices: set( ['k2',  undefined ] ) });
				});
			},
			it_throwsErrorIfVertexDoesNotExist() {
				it("throws an error if a vertex with the given key does not exist", () => {
					expectItWhenBoundWith('newKey').toThrow();
					expectItWhenBoundWith('newKey').toThrowSpecific(GraphClass.VertexNotExistsError, { vertices: set( 'newKey' ) });
				});
			},
			it_throwsErrorIfEdgesAreConnected() {
				it("throws an error if there are edges connected to that vertex", () => {
					expectItWhenBoundWith('k2').toThrow();
					expectItWhenBoundWith('k3').toThrow();
					expectItWhenBoundWith('k4').toThrow();
					expectItWhenBoundWith('k2').toThrowSpecific(GraphClass.EdgeExistsError, {
						edges: set(
							[['k2', 'k3'], 'oldValue23'],
							[['k2', 'k5'],  undefined  ]
						)
					});
					expectItWhenBoundWith('k3').toThrowSpecific(GraphClass.EdgeExistsError, {
						edges: set(
							[['k2', 'k3'], 'oldValue23'],
							[['k5', 'k3'],  undefined  ],
							[['k3', 'k4'],  undefined  ]
						)
					});
					expectItWhenBoundWith('k4').toThrowSpecific(GraphClass.EdgeExistsError, {
						edges: set(
							[['k3', 'k4'],  undefined  ]
						)
					});
				});
			},
			it_throwsErrorIfEdgeExists() {
				it("throws an error if an edge with the given keys already exists (1)", () => {
					expectItWhenBoundWith('k2', 'k3').toThrowSpecific(GraphClass.EdgeExistsError, {
						edges: set(
							[['k2', 'k3'], 'oldValue23']
						)
					});
					expectItWhenBoundWith('k3', 'k4').toThrowSpecific(GraphClass.EdgeExistsError, {
						edges: set(
							[['k3', 'k4'],  undefined  ]
						)
					});
				});
				it("throws an error if an edge with the given keys already exists (2)", () => {
					expectItWhenBoundWith(['k2', 'k3']).toThrowSpecific(GraphClass.EdgeExistsError, {
						edges: set(
							[['k2', 'k3'], 'oldValue23']
						)
					});
					expectItWhenBoundWith(['k3', 'k4']).toThrowSpecific(GraphClass.EdgeExistsError, {
						edges: set(
							[['k3', 'k4'],  undefined  ]
						)
					});
				});
			},
			it_throwsErrorIfEdgeDoesNotExist() {
				it("throws an error if an edge with the given keys does not exist (1)", () => {
					expectItWhenBoundWith('k1', 'k2').toThrow();
					expectItWhenBoundWith('k1', 'k2').toThrowSpecific(GraphClass.EdgeNotExistsError, { edges: set( ['k1', 'k2'] ) });
				});
				it("throws an error if an edge with the given keys does not exist (2)", () => {
					expectItWhenBoundWith(['k1', 'k2']).toThrow();
					expectItWhenBoundWith(['k1', 'k2']).toThrowSpecific(GraphClass.EdgeNotExistsError, { edges: set( ['k1', 'k2'] ) });
				});
			},
			it_throwsErrorIfVerticesDoNotExist() {
				it("throws an error if the required vertices do not exist (1)", () => {
					expectItWhenBoundWith('newKey1', 'newKey2').toThrowSpecific(GraphClass.VertexNotExistsError, { vertices: set( 'newKey1', 'newKey2' ) });
					expectItWhenBoundWith('k1',      'newKey3').toThrowSpecific(GraphClass.VertexNotExistsError, { vertices: set( 'newKey3'            ) });
					expectItWhenBoundWith('newKey4', 'k2'     ).toThrowSpecific(GraphClass.VertexNotExistsError, { vertices: set( 'newKey4'            ) });
				});
				it("throws an error if the required vertices do not exist (2)", () => {
					expectItWhenBoundWith(['newKey1', 'newKey2']).toThrowSpecific(GraphClass.VertexNotExistsError, { vertices: set( 'newKey1', 'newKey2' ) });
					expectItWhenBoundWith(['k1',      'newKey3']).toThrowSpecific(GraphClass.VertexNotExistsError, { vertices: set( 'newKey3'            ) });
					expectItWhenBoundWith(['newKey4', 'k2']     ).toThrowSpecific(GraphClass.VertexNotExistsError, { vertices: set( 'newKey4'            ) });
				});
			},
			it_leavesNewVertexWithNewValue() {
				it("leaves a new vertex in the graph with a new value (1)", () => {
					callItWith('newKey', 'newValue');
					expect(graph.hasVertex('newKey')).toBeTruthy();
					expect(graph.vertexValue('newKey')).toBe('newValue');
					expect(graph.vertexCount()).toBe(originalVertexCount + 1);
				});
				it("leaves a new vertex in the graph with a new value (2)", () => {
					callItWith(['newKey', 'newValue']);
					expect(graph.hasVertex('newKey')).toBeTruthy();
					expect(graph.vertexValue('newKey')).toBe('newValue');
					expect(graph.vertexCount()).toBe(originalVertexCount + 1);
				});
			},
			it_leavesNewVertexWithNewUndefinedValue() {
				it("leaves a new vertex in the graph with a new 'undefined' value (1)", () => {
					callItWith('newKey');
					expect(graph.hasVertex('newKey')).toBeTruthy();
					expect(graph.vertexValue('newKey')).toBeUndefined();
					expect(graph.vertexCount()).toBe(originalVertexCount + 1);
				});
				it("leaves a new vertex in the graph with a new 'undefined' value (2)", () => {
					callItWith(['newKey']);
					expect(graph.hasVertex('newKey')).toBeTruthy();
					expect(graph.vertexValue('newKey')).toBeUndefined();
					expect(graph.vertexCount()).toBe(originalVertexCount + 1);
				});
			},
			it_leavesExistingVertexWithNewValue() {
				it("leaves an existing vertex in the graph with a new value (1)", () => {
					callItWith('k1', 'newValue');
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBe('newValue');
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
				it("leaves an existing vertex in the graph with a new value (2)", () => {
					callItWith(['k1', 'newValue']);
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBe('newValue');
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
			},
			it_leavesExistingVertexWithNewUndefinedValue() {
				it("leaves an existing vertex in the graph with a new 'undefined' value (1)", () => {
					callItWith('k1');
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBeUndefined();
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
				it("leaves an existing vertex in the graph with a new 'undefined' value (2)", () => {
					callItWith(['k1']);
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBeUndefined();
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
			},
			it_leavesExistingVertexWithOldValue() {
				it("leaves an existing vertex in the graph with its old value (1)", () => {
					callItWith('k1', 'newValue');
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBe('oldValue1');
					expect(graph.vertexCount()).toBe(originalVertexCount);
					callItWith('k1', undefined);
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBe('oldValue1');
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
				it("leaves an existing vertex in the graph with its old value (2)", () => {
					callItWith(['k1', 'newValue']);
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBe('oldValue1');
					expect(graph.vertexCount()).toBe(originalVertexCount);
					callItWith(['k1', undefined]);
					expect(graph.hasVertex('k1')).toBeTruthy();
					expect(graph.vertexValue('k1')).toBe('oldValue1');
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
			},
			it_leavesExistingVertexWithOldUndefinedValue() {
				it("leaves an existing vertex in the graph with its old 'undefined' value (1)", () => {
					callItWith('k2', 'newValue');
					expect(graph.hasVertex('k2')).toBeTruthy();
					expect(graph.vertexValue('k2')).toBeUndefined();
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
				it("leaves an existing vertex in the graph with its old 'undefined' value (2)", () => {
					callItWith(['k2', 'newValue']);
					expect(graph.hasVertex('k2')).toBeTruthy();
					expect(graph.vertexValue('k2')).toBeUndefined();
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
			},
			it_leavesExistingVertexAbsent() {
				it("leaves an existing vertex absent from the graph", () => {
					callItWith('k1');
					expect(graph.hasVertex('k1')).toBeFalsy();
					expect(graph.vertexCount()).toBe(originalVertexCount - 1);
				});
			},
			it_leavesConnectedEdgesAbsent() {
				it("leaves existing connected edges absent from the graph", () => {
					callItWith('k3');
					expect(graph.hasEdge('k2', 'k3')).toBeFalsy();
					expect(graph.hasEdge('k3', 'k4')).toBeFalsy();
					expect(graph.hasEdge('k4', 'k3')).toBeFalsy();
					expect(graph.edgeCount()).toBe(originalEdgeCount - 3);
				});
			},
			it_leavesAbsentVertexAbsent() {
				it("leaves an absent vertex absent from the graph", () => {
					callItWith('newKey');
					expect(graph.hasVertex('newKey')).toBeFalsy();
					expect(graph.vertexCount()).toBe(originalVertexCount);
				});
			},
			it_leavesNewEdgeWithNewValue() {
				it("leaves a new edge in the graph with a new value (1)", () => {
					callItWith('k1', 'k2', 'newValue');
					expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
					expect(graph.edgeValue('k1', 'k2')).toBe('newValue');
					expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
				});
				it("leaves a new edge in the graph with a new value (2)", () => {
					callItWith(['k1', 'k2'], 'newValue');
					expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
					expect(graph.edgeValue('k1', 'k2')).toBe('newValue');
					expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
				});
				it("leaves a new edge in the graph with a new value (3)", () => {
					callItWith([['k1', 'k2'], 'newValue']);
					expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
					expect(graph.edgeValue('k1', 'k2')).toBe('newValue');
					expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
				});
			},
			it_leavesNewEdgeWithNewUndefinedValue() {
				it("leaves a new edge in the graph with a new 'undefined' value (1)", () => {
					callItWith('k1', 'k2');
					expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
					expect(graph.edgeValue('k1', 'k2')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
				});
				it("leaves a new edge in the graph with a new 'undefined' value (2)", () => {
					callItWith(['k1', 'k2']);
					expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
					expect(graph.edgeValue('k1', 'k2')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
				});
				it("leaves a new edge in the graph with a new 'undefined' value (3)", () => {
					callItWith([['k1', 'k2']]);
					expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
					expect(graph.edgeValue('k1', 'k2')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
				});
			},
			it_leavesExistingEdgeWithNewValue() {
				it("leaves an existing edge in the graph with a new value (1)", () => {
					callItWith('k2', 'k3', 'newValue');
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('newValue');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with a new value (2)", () => {
					callItWith(['k2', 'k3'], 'newValue');
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('newValue');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with a new value (3)", () => {
					callItWith([['k2', 'k3'], 'newValue']);
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('newValue');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
			},
			it_leavesExistingEdgeWithNewUndefinedValue() {
				it("leaves an existing edge in the graph with a new 'undefined' value (1)", () => {
					callItWith('k2', 'k3');
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with a new 'undefined' value (2)", () => {
					callItWith(['k2', 'k3']);
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with a new 'undefined' value (3)", () => {
					callItWith([['k2', 'k3']]);
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
			},
			it_leavesExistingEdgeWithOldValue() {
				it("leaves an existing edge in the graph with its old value (1)", () => {
					callItWith('k2', 'k3', 'newValue');
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
					callItWith('k2', 'k3', undefined);
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with its old value (2)", () => {
					callItWith(['k2', 'k3'], 'newValue');
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
					callItWith(['k2', 'k3'], undefined);
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with its old value (3)", () => {
					callItWith([['k2', 'k3'], 'newValue']);
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
					callItWith([['k2', 'k3'], undefined]);
					expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
					expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
			},
			it_leavesExistingEdgeWithOldUndefinedValue() {
				it("leaves an existing edge in the graph with its old 'undefined' value (1)", () => {
					callItWith('k3', 'k4', 'newValue');
					expect(graph.hasEdge('k3', 'k4')).toBeTruthy();
					expect(graph.edgeValue('k3', 'k4')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with its old 'undefined' value (2)", () => {
					callItWith(['k3', 'k4'], 'newValue');
					expect(graph.hasEdge('k3', 'k4')).toBeTruthy();
					expect(graph.edgeValue('k3', 'k4')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an existing edge in the graph with its old 'undefined' value (3)", () => {
					callItWith([['k3', 'k4'], 'newValue']);
					expect(graph.hasEdge('k3', 'k4')).toBeTruthy();
					expect(graph.edgeValue('k3', 'k4')).toBeUndefined();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
			},
			it_leavesExistingEdgeAbsent() {
				it("leaves an existing edge absent from the graph (1)", () => {
					callItWith('k2', 'k3');
					expect(graph.hasEdge('k2', 'k3')).toBeFalsy();
					expect(graph.edgeCount()).toBe(originalEdgeCount - 1);
					callItWith('k3', 'k4');
					expect(graph.hasEdge('k3', 'k4')).toBeFalsy();
					expect(graph.edgeCount()).toBe(originalEdgeCount - 2);
				});
				it("leaves an existing edge absent from the graph (2)", () => {
					callItWith(['k2', 'k3']);
					expect(graph.hasEdge('k2', 'k3')).toBeFalsy();
					expect(graph.edgeCount()).toBe(originalEdgeCount - 1);
					callItWith(['k3', 'k4']);
					expect(graph.hasEdge('k3', 'k4')).toBeFalsy();
					expect(graph.edgeCount()).toBe(originalEdgeCount - 2);
				});
			},
			it_leavesAbsentEdgeAbsent() {
				it("leaves an absent edge absent from the graph (1)", () => {
					callItWith('k1', 'k2');
					expect(graph.hasEdge('k1', 'k2')).toBeFalsy();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
				it("leaves an absent edge absent from the graph (2)", () => {
					callItWith(['k1', 'k2']);
					expect(graph.hasEdge('k1', 'k2')).toBeFalsy();
					expect(graph.edgeCount()).toBe(originalEdgeCount);
				});
			},
			it_leavesAbsentVerticesPresent() {
				it("leaves absent vertices present in the graph (1)", () => {
					callItWith('newKey1', 'k1');
					expect(graph.hasVertex('newKey1')).toBeTruthy();
					expect(graph.vertexCount()).toBe(originalVertexCount + 1);
					callItWith('k1', 'newKey2');
					expect(graph.hasVertex('newKey2')).toBeTruthy();
					expect(graph.vertexCount()).toBe(originalVertexCount + 2);
					callItWith('newKey3', 'newKey4');
					expect(graph.hasVertex('newKey3')).toBeTruthy();
					expect(graph.hasVertex('newKey4')).toBeTruthy();
					expect(graph.vertexCount()).toBe(originalVertexCount + 4);
				});
				it("leaves absent vertices present in the graph (2)", () => {
					callItWith(['newKey1', 'k1']);
					expect(graph.hasVertex('newKey1')).toBeTruthy();
					expect(graph.vertexCount()).toBe(originalVertexCount + 1);
					callItWith(['k1', 'newKey2']);
					expect(graph.hasVertex('newKey2')).toBeTruthy();
					expect(graph.vertexCount()).toBe(originalVertexCount + 2);
					callItWith(['newKey3', 'newKey4']);
					expect(graph.hasVertex('newKey3')).toBeTruthy();
					expect(graph.hasVertex('newKey4')).toBeTruthy();
					expect(graph.vertexCount()).toBe(originalVertexCount + 4);
				});
			}
		};

		/* run the specified tests */
		Object.assign(window, itFunctions);
		tests();
		for (let m of Object.keys(itFunctions)) { window[m] = null }

	});
}
