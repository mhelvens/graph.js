import {any, cycleArrays, set} from './helpers.es6.js';
import {describeGraphClass}    from './graph-helpers.es6.js';
import Graph                   from '../src/graph.es6.js'

export default function specs(GraphClass, additionalTests=(()=>{})) {
	describeGraphClass(GraphClass, () => {


		describe("constructor", () => {

			it("is present", () => {
				expect(GraphClass).toEqual(any(Function));
			});

			it("never throws any exception", () => {
				expect(() => new GraphClass()).not.toThrow();
			});

			it("returns an object of type Graph", () => {
				expect(new GraphClass()).toEqual(any(GraphClass));
			});

			it("can be used to add vertices and edges to the new graph right away", () => {
				expect(new GraphClass(
					['k1', "oldValue1"],
					['k2'             ],
					['k3'             ],
					['k4',  undefined ], // specifying 'undefined' as value is optional
					['k5', "oldValue5"],
					[['k2', 'k3'], "oldValue23"],
					[['k3', 'k4']              ],
					[['k2', 'k5']              ],
					[['k5', 'k3'],  undefined  ] // specifying 'undefined' as value is optional
				)).toEqual(graph);
			});

		});


		describe("new instance", () => {

			beforeEach(() => { graph = new GraphClass() });

			it("has no vertices", () => {
				expect(graph.vertexCount()).toBe(0);
				for (let vertex of graph.vertices()) { expect().not.toBeReachable() }
				expect().toBeReachable();
			});

			it("has no edges", () => {
				expect(graph.edgeCount()).toBe(0);
				for (let vertex of graph.edges()) { expect().not.toBeReachable() }
				expect().toBeReachable();
			});

		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		describeMethod('vertexCount', () => {

			it_throwsNothing();

			it("returns the number of vertices in the graph", () => {
				expectItWhenCalledWith().toBe(originalVertexCount);
			});

		});


		describeMethod('edgeCount', () => {

			it_throwsNothing();

			it("returns the number of edges in the graph", () => {
				expectItWhenCalledWith().toBe(originalEdgeCount);
			});

		});


		describeMethod('hasVertex', () => {

			it_throwsNothingWhenPassedAKey();

			it("returns a truthy value for an existing vertex", () => {
				expectItWhenCalledWith('k1').toBeTruthy();
				expectItWhenCalledWith('k2').toBeTruthy();
			});

			it("returns a falsy value for an absent vertex", () => {
				expectItWhenCalledWith('newKey').toBeFalsy();
			});

		});


		describeMethod('hasEdge', () => {

			it_throwsNothingWhenPassedTwoKeys();

			it("returns a truthy value for an existing edge (1)", () => {
				expectItWhenCalledWith('k2', 'k3').toBeTruthy();
				expectItWhenCalledWith('k3', 'k4').toBeTruthy();
			});

			it("returns a truthy value for an existing edge (2)", () => {
				expectItWhenCalledWith(['k2', 'k3']).toBeTruthy();
				expectItWhenCalledWith(['k3', 'k4']).toBeTruthy();
			});

			it("returns a falsy value for an absent edge (1)", () => {
				expectItWhenCalledWith('k1', 'k2').toBeFalsy();
				expectItWhenCalledWith('k3', 'k2').toBeFalsy();
				expectItWhenCalledWith('newKey', 'k2').toBeFalsy();
				expectItWhenCalledWith('newKey1', 'newKey2').toBeFalsy();
			});

			it("returns a falsy value for an absent edge (2)", () => {
				expectItWhenCalledWith(['k1', 'k2']).toBeFalsy();
				expectItWhenCalledWith(['k3', 'k2']).toBeFalsy();
				expectItWhenCalledWith(['newKey', 'k2']).toBeFalsy();
				expectItWhenCalledWith(['newKey1', 'newKey2']).toBeFalsy();
			});

		});


		describeMethod('vertex', () => {

			it_throwsNothingIfVertexExists();

			it_throwsErrorIfVertexDoesNotExist();

			it("returns the proper key/value pair belonging to a vertex", () => {
				expectItWhenCalledWith('k1').toEqual(['k1', 'oldValue1']);
			});

			it("returns a key/value pair with an 'undefined' value for vertices with no value", () => {
				expectItWhenCalledWith('k2').toEqual(['k2',  undefined ]);
			});

		});


		describeMethod('vertexValue', () => {

			it_throwsNothingWhenPassedAKey();

			it("returns the proper value belonging to a vertex", () => {
				expectItWhenCalledWith('k1').toBe('oldValue1');
			});

			it("returns the 'undefined' value for vertices with no value", () => {
				expectItWhenCalledWith('k2').toBeUndefined();
			});

			it("returns the 'undefined' value for absent vertices", () => {
				expectItWhenCalledWith('newKey').toBeUndefined();
			});

		});


		describeMethod('edge', () => {

			it_throwsNothingIfEdgeExists();

			it_throwsErrorIfEdgeDoesNotExist();

			it("returns the proper key/value pair belonging to an edge", () => {
				expectItWhenCalledWith('k2', 'k3').toEqual([['k2', 'k3'], 'oldValue23']);
			});

			it("returns a key/value pair with an 'undefined' value for edges with no value", () => {
				expectItWhenCalledWith('k3', 'k4').toEqual([['k3', 'k4'],  undefined  ]);
			});

		});


		describeMethod('edgeValue', () => {

			it_throwsNothingWhenPassedTwoKeys();

			it("returns the proper value belonging to an edge", () => {
				expectItWhenCalledWith('k2', 'k3').toBe('oldValue23');
			});

			it("returns the 'undefined' value for edges with no value", () => {
				expectItWhenCalledWith('k3', 'k4').toBeUndefined();
			});

			it("returns the 'undefined' value for absent edges", () => {
				expectItWhenCalledWith('k1', 'k2').toBeUndefined();
				expectItWhenCalledWith('k3', 'k2').toBeUndefined();
				expectItWhenCalledWith('newKey', 'k2').toBeUndefined();
				expectItWhenCalledWith('newKey1', 'newKey2').toBeUndefined();
			});

		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		describeMethod('on', () => {

			describe("— 'vertex-added' —", () => {

				it("throws no exceptions when passed a function", () => {
					expectItWhenBoundWith('vertex-added', () => {
						throw new Error("should not be thrown");
					}).not.toThrow();
				});

				it("does not modify the graph", () => {
					callItWith('vertex-added', () => {
						graph = null;
					});
					expectTheGraphNotToHaveChanged();
				});

				it("causes the handler to be called after a new vertex is added", () => {
					let registeredAddedVertices = {};
					callItWith('vertex-added', ([key, value]) => {
						expect(graph.hasVertex(key)).toBeTruthy();
						registeredAddedVertices[key] = value;
					});
					graph.addNewVertex('newKey', "newValue");
					expect(registeredAddedVertices).toEqual({ 'newKey': "newValue" });
				});

				it("does not cause the handler to be called when an existing vertex is modified", () => {
					callItWith('vertex-added', () => {
						expect().not.toBeReachable();
					});
					graph.setVertex('k1', 'newValue');
					graph.setVertex('k2', 'newValue');
				});

				it("does not cause the handler to be called when an existing vertex is removed", () => {
					callItWith('vertex-added', () => {
						expect().not.toBeReachable();
					});
					graph.removeExistingVertex('k1');
				});

				it("causes the handler to be called after a previously removed vertex is added again", () => {
					let registeredAddedVertices = {};
					callItWith('vertex-added', ([key, value]) => {
						expect(graph.hasVertex(key)).toBeTruthy();
						registeredAddedVertices[key] = value;
					});
					graph.removeExistingVertex('k1');
					expect(registeredAddedVertices).toEqual({});
					graph.addNewVertex('k1', 'oldValue1');
					expect(registeredAddedVertices).toEqual({ 'k1': 'oldValue1' });
				});

				it("does not cause the handler to be called after the handler is removed", () => {
					let registeredAddedVertices = {};
					const handler = ([key, value]) => { registeredAddedVertices[key] = value };
					callItWith('vertex-added', handler);
					graph.addNewVertex('newKey', 'newValue');
					expect(registeredAddedVertices).toEqual({ 'newKey': 'newValue' });
					graph.off('vertex-added', handler);
					graph.addNewVertex('newKey2', 'newValue2');
					expect(registeredAddedVertices).toEqual({ 'newKey': 'newValue' });
				});

			});

			describe("— 'vertex-removed' —", () => {

				it("throws no exceptions when passed a function", () => {
					expectItWhenBoundWith('vertex-removed', () => {
						throw new Error("should not be thrown");
					}).not.toThrow();
				});

				it("does not modify the graph", () => {
					callItWith('vertex-removed', () => {
						graph = null;
					});
					expectTheGraphNotToHaveChanged();
				});

				it("causes the handler to be called after an existing vertex is removed", () => {
					let registeredRemovedVertices = {};
					callItWith('vertex-removed', (key) => {
						expect(graph.hasVertex(key)).toBeFalsy();
						registeredRemovedVertices[key] = true;
					});
					graph.removeExistingVertex('k1');
					expect(registeredRemovedVertices).toEqual({ 'k1': true });
				});

				it("does not cause the handler to be called when an existing vertex is modified", () => {
					callItWith('vertex-removed', () => {
						expect().not.toBeReachable();
					});
					graph.setVertex('k1', 'newValue');
					graph.setVertex('k2', 'newValue');
				});

				it("does not cause the handler to be called when an absent vertex is left absent", () => {
					callItWith('vertex-removed', () => {
						expect().not.toBeReachable();
					});
					graph.removeVertex('newKey');
				});

				it("does not cause the handler to be called when an absent vertex is added", () => {
					callItWith('vertex-removed', () => {
						expect().not.toBeReachable();
					});
					graph.addNewVertex('newKey');
				});

				it("does not cause the handler to be called after the handler is removed", () => {
					let registeredRemovedVertices = set( );
					const handler = (key) => { registeredRemovedVertices.add(key) };
					callItWith('vertex-removed', handler);
					graph.addNewVertex('k99', 'newValue');
					graph.removeExistingVertex('k99');
					expect(registeredRemovedVertices).toEqual(set( 'k99' ));
					graph.off('vertex-removed', handler);
					graph.removeExistingVertex('k1');
					expect(registeredRemovedVertices).toEqual(set( 'k99' ));
				});

			});

			describe("— 'vertex-modified' —", () => {

				it("throws no exceptions when passed a function", () => {
					expectItWhenBoundWith('vertex-modified', () => {
						throw new Error("should not be thrown");
					}).not.toThrow();
				});

				it("does not modify the graph", () => {
					callItWith('vertex-modified', () => {
						graph = null;
					});
					expectTheGraphNotToHaveChanged();
				});

				it("causes the handler to be called after a new vertex is added, after the 'vertex-added' event is handled", () => {
					let registeredAddedVertices = {};
					let order = { 'newKey': 0 };
					callItWith('vertex-added', ([key]) => {
						expect(order[key]).toBe(0);
						order[key] += 1;
					});
					callItWith('vertex-modified', ([key, value]) => {
						expect(graph.hasVertex(key)).toBeTruthy();
						registeredAddedVertices[key] = value;
						expect(order[key]).toBe(1);
					});
					graph.addNewVertex('newKey', "newValue");
					expect(registeredAddedVertices).toEqual({ 'newKey': "newValue" });
				});

				it("causes the handler to be called when an existing vertex is modified", () => {
					let registeredModifiedVertices = {};
					callItWith('vertex-modified', ([key, value]) => {
						expect(graph.hasVertex(key)).toBeTruthy();
						registeredModifiedVertices[key] = value;
					});
					graph.setVertex('k1', "newValue");
					expect(registeredModifiedVertices).toEqual({ 'k1': "newValue" });
				});

				it("does not cause the handler to be called when an existing vertex is removed", () => {
					callItWith('vertex-modified', () => {
						expect().not.toBeReachable();
					});
					graph.removeExistingVertex('k1');
				});

				it("causes the handler to be called after a previously removed vertex is added again", () => {
					let registeredAddedVertices = {};
					callItWith('vertex-modified', ([key, value]) => {
						expect(graph.hasVertex(key)).toBeTruthy();
						registeredAddedVertices[key] = value;
					});
					graph.removeExistingVertex('k1');
					expect(registeredAddedVertices).toEqual({});
					graph.addNewVertex('k1', 'oldValue1');
					expect(registeredAddedVertices).toEqual({ 'k1': 'oldValue1' });
				});

				it("does not cause the handler to be called after the handler is removed", () => {
					let registeredModifiedVertices = {};
					const handler = ([key, value]) => { registeredModifiedVertices[key] = value };
					callItWith('vertex-modified', handler);
					graph.setVertex('k1', 'newValue');
					expect(registeredModifiedVertices).toEqual({ 'k1': 'newValue' });
					graph.off('vertex-modified', handler);
					graph.setVertex('k2', 'newValue2');
					expect(registeredModifiedVertices).toEqual({ 'k1': 'newValue' });
				});

			});

			describe("— 'edge-added' —", () => {

				it("throws no exceptions when passed a function", () => {
					expectItWhenBoundWith('edge-added', () => {
						throw new Error("should not be thrown");
					}).not.toThrow();
				});

				it("does not modify the graph", () => {
					callItWith('edge-added', () => {
						graph = null;
					});
					expectTheGraphNotToHaveChanged();
				});

				it("causes the handler to be called after a new edge is added", () => {
					let registeredAddedEdges = {};
					callItWith('edge-added', ([key, value]) => {
						expect(graph.hasEdge(key)).toBeTruthy();
						registeredAddedEdges[key] = value;
					});
					graph.addNewEdge('k1', 'k2', "newValue");
					expect(registeredAddedEdges).toEqual({ 'k1,k2': "newValue" });
				});

				it("does not cause the handler to be called when an existing edge is modified", () => {
					callItWith('edge-added', () => {
						expect().not.toBeReachable();
					});
					graph.setEdge('k2', 'k3', "newValue1");
					graph.setEdge('k3', 'k4', "newValue2");
				});

				it("does not cause the handler to be called when an existing edge is removed", () => {
					callItWith('edge-added', () => {
						expect().not.toBeReachable();
					});
					graph.removeExistingEdge('k2', 'k3');
				});

				it("causes the handler to be called after a previously removed edge is added again", () => {
					let registeredAddedEdges = {};
					callItWith('edge-added', ([key, value]) => {
						expect(graph.hasEdge(key)).toBeTruthy();
						registeredAddedEdges[key] = value;
					});
					graph.removeExistingEdge('k2', 'k3');
					expect(registeredAddedEdges).toEqual({});
					graph.addNewEdge('k2', 'k3', 'newValue');
					expect(registeredAddedEdges).toEqual({ 'k2,k3': 'newValue' });
				});

				it("does not cause the handler to be called after the handler is removed", () => {
					let registeredAddedEdges = {};
					const handler = ([key, value]) => { registeredAddedEdges[key] = value };
					callItWith('edge-added', handler);
					graph.addNewEdge('k1', 'k2', 'newValue');
					expect(registeredAddedEdges).toEqual({ 'k1,k2': 'newValue' });
					graph.off('edge-added', handler);
					graph.addNewEdge('k5', 'k4', 'newValue2');
					expect(registeredAddedEdges).toEqual({ 'k1,k2': 'newValue' });
				});

			});

			describe("— 'edge-removed' —", () => {

				it("throws no exceptions when passed a function", () => {
					expectItWhenBoundWith('edge-removed', () => {
						throw new Error("should not be thrown");
					}).not.toThrow();
				});

				it("does not modify the graph", () => {
					callItWith('edge-removed', () => {
						graph = null;
					});
					expectTheGraphNotToHaveChanged();
				});

				it("causes the handler to be called after an existing edge is removed", () => {
					let registeredRemovedEdges = set( );
					callItWith('edge-removed', (key) => {
						expect(graph.hasEdge(key)).toBeFalsy();
						registeredRemovedEdges.add(key.toString());
					});
					graph.removeExistingEdge('k2', 'k3');
					expect(registeredRemovedEdges).toEqual(set( 'k2,k3' ));
				});

				it("does not cause the handler to be called when an existing edge is modified", () => {
					callItWith('edge-removed', () => {
						expect().not.toBeReachable();
					});
					graph.setEdge('k2', 'k3', 'newValue1');
					graph.setEdge('k3', 'k4', 'newValue2');
				});

				it("does not cause the handler to be called when an absent edge is left absent", () => {
					callItWith('edge-removed', () => {
						expect().not.toBeReachable();
					});
					graph.removeEdge('k1', 'k2');
				});

				it("does not cause the handler to be called when an absent edge is added", () => {
					callItWith('edge-removed', () => {
						expect().not.toBeReachable();
					});
					graph.addNewEdge('k1', 'k2', 'newValue');
				});

				it("does not cause the handler to be called after the handler is removed", () => {
					let registeredRemovedEdges = set( );
					const handler = (key) => { registeredRemovedEdges.add(key.toString()) };
					callItWith('edge-removed', handler);
					graph.removeExistingEdge('k2', 'k3');
					expect(registeredRemovedEdges).toEqual(set( 'k2,k3' ));
					graph.off('edge-removed', handler);
					graph.removeExistingEdge('k3', 'k4');
					expect(registeredRemovedEdges).toEqual(set( 'k2,k3' ));
				});

			});

			describe("— 'edge-modified' —", () => {

				it("throws no exceptions when passed a function", () => {
					expectItWhenBoundWith('edge-modified', () => {
						throw new Error("should not be thrown");
					}).not.toThrow();
				});

				it("does not modify the graph", () => {
					callItWith('edge-modified', () => {
						graph = null;
					});
					expectTheGraphNotToHaveChanged();
				});

				it("causes the handler to be called after a new edge is added, after the 'edge-added' event is handled", () => {
					let registeredAddedEdges = {};
					let order = { 'k1,k2': 0 };
					callItWith('edge-added', ([key]) => {
						expect(order[key]).toBe(0);
						order[key] += 1;
					});
					callItWith('edge-modified', ([key, value]) => {
						expect(graph.hasEdge(key)).toBeTruthy();
						registeredAddedEdges[key] = value;
						expect(order[key]).toBe(1);
					});
					graph.addNewEdge('k1', 'k2', "newValue");
					expect(registeredAddedEdges).toEqual({ 'k1,k2': "newValue" });
				});

				it("causes the handler to be called when an existing edge is modified", () => {
					let registeredModifiedEdges = {};
					callItWith('edge-modified', ([key, value]) => {
						expect(graph.hasEdge(key)).toBeTruthy();
						registeredModifiedEdges[key] = value;
					});
					graph.setEdge('k2', 'k3', "newValue");
					expect(registeredModifiedEdges).toEqual({ 'k2,k3': "newValue" });
				});

				it("does not cause the handler to be called when an existing edge is removed", () => {
					callItWith('edge-modified', () => {
						expect().not.toBeReachable();
					});
					graph.removeExistingEdge('k2', 'k3');
				});

				it("causes the handler to be called after a previously removed edge is added again", () => {
					let registeredAddedEdges = {};
					callItWith('edge-modified', ([key, value]) => {
						expect(graph.hasEdge(key)).toBeTruthy();
						registeredAddedEdges[key] = value;
					});
					graph.removeExistingEdge('k2', 'k3');
					expect(registeredAddedEdges).toEqual({});
					graph.addNewEdge('k2', 'k3', "newValue");
					expect(registeredAddedEdges).toEqual({ 'k2,k3': "newValue" });
				});

				it("does not cause the handler to be called after the handler is removed", () => {
					let registeredModifiedEdges = {};
					const handler = ([key, value]) => { registeredModifiedEdges[key] = value };
					callItWith('edge-modified', handler);
					graph.setEdge('k2', 'k3', "newValue");
					expect(registeredModifiedEdges).toEqual({ 'k2,k3': "newValue" });
					graph.off('edge-modified', handler);
					graph.setEdge('k2', 'k3', "newValue2");
					expect(registeredModifiedEdges).toEqual({ 'k2,k3': "newValue" });
				});

			});

			it("can call multiple registered handlers per event", () => {
				let counter = 0;
				callItWith('vertex-added', () => { counter += 1 });
				callItWith('vertex-added', () => { counter += 1 });
				expect(counter).toBe(0);
				graph.addNewVertex('k99');
				expect(counter).toBe(2);
			});

		});

		describeMethod('off', () => {

			it("deregisters a registered handler", () => {
				const handler = () => { expect().not.toBeReachable() };
				graph.on ('vertex-added', handler);
				graph.off('vertex-added', handler);
				graph.addNewVertex('k99');
			});

			it("does nothing if the given handler is not registered", () => {
				const handler = () => { expect().not.toBeReachable() };
				graph.off('vertex-added', handler);
				graph.addNewVertex('k99');
			});

		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		describeMethod('addNewVertex', () => {
			it_throwsErrorIfVertexExists();
			it_throwsNothingIfVertexDoesNotExist();
			it_leavesNewVertexWithNewValue();
			it_leavesNewVertexWithNewUndefinedValue();
		});

		describeMethod('setVertex', () => {
			it_throwsErrorIfVertexDoesNotExist();
			it_throwsNothingIfVertexExists();
			it_leavesExistingVertexWithNewValue();
			it_leavesExistingVertexWithNewUndefinedValue();
		});

		describeMethod('ensureVertex', () => {
			it_throwsNothingWhenPassedAKey();
			it_throwsNothingWhenPassedAKeyAndValue();
			it_leavesNewVertexWithNewValue();
			it_leavesNewVertexWithNewUndefinedValue();
			it_leavesExistingVertexWithOldValue();
			it_leavesExistingVertexWithOldUndefinedValue();
		});

		describeMethod('addVertex', () => {
			it_throwsNothingWhenPassedAKey();
			it_throwsNothingWhenPassedAKeyAndValue();
			it_leavesNewVertexWithNewValue();
			it_leavesNewVertexWithNewUndefinedValue();
			it_leavesExistingVertexWithNewValue();
			it_leavesExistingVertexWithNewUndefinedValue();
		});

		describeMethod('removeExistingVertex', () => {
			it_throwsErrorIfVertexDoesNotExist();
			it_throwsErrorIfEdgesAreConnected();
			it_throwsNothingIfUnconnectedVertexExists();
			it_leavesExistingVertexAbsent();
		});

		describeMethod('destroyExistingVertex', () => {
			it_throwsErrorIfVertexDoesNotExist();
			it_throwsNothingIfVertexExists();
			it_leavesExistingVertexAbsent();
			it_leavesConnectedEdgesAbsent();
		});

		describeMethod('removeVertex', () => {
			it_throwsErrorIfEdgesAreConnected();
			it_throwsNothingIfUnconnectedVertexExists();
			it_leavesExistingVertexAbsent();
			it_leavesAbsentVertexAbsent();
		});

		describeMethod('destroyVertex', () => {
			it_throwsNothingWhenPassedAKey();
			it_leavesExistingVertexAbsent();
			it_leavesAbsentVertexAbsent();
			it_leavesConnectedEdgesAbsent();
		});

		describeMethod('addNewEdge', () => {
			it_throwsErrorIfEdgeExists();
			it_throwsErrorIfVerticesDoNotExist();
			it_throwsNothingIfVerticesExistAndEdgeDoesNot();
			it_leavesNewEdgeWithNewValue();
			it_leavesNewEdgeWithNewUndefinedValue();
		});

		describeMethod('createNewEdge', () => {
			it_throwsErrorIfEdgeExists();
			it_throwsNothingIfEdgeDoesNotExist();
			it_leavesNewEdgeWithNewValue();
			it_leavesNewEdgeWithNewUndefinedValue();
			it_leavesAbsentVerticesPresent();
		});

		describeMethod('setEdge', () => {
			it_throwsErrorIfEdgeDoesNotExist();
			it_throwsNothingIfEdgeExists();
			it_leavesExistingEdgeWithNewValue();
			it_leavesExistingEdgeWithNewUndefinedValue();
		});

		describeMethod('spanEdge', () => {
			it_throwsErrorIfVerticesDoNotExist();
			it_throwsNothingIfVerticesExist();
			it_leavesNewEdgeWithNewValue();
			it_leavesNewEdgeWithNewUndefinedValue();
			it_leavesExistingEdgeWithOldValue();
			it_leavesExistingEdgeWithOldUndefinedValue();
		});

		describeMethod('addEdge', () => {
			it_throwsErrorIfVerticesDoNotExist();
			it_throwsNothingIfVerticesExist();
			it_leavesNewEdgeWithNewValue();
			it_leavesNewEdgeWithNewUndefinedValue();
			it_leavesExistingEdgeWithNewValue();
			it_leavesExistingEdgeWithNewUndefinedValue();
		});

		describeMethod('ensureEdge', () => {
			it_throwsNothingWhenPassedTwoKeys();
			it_throwsNothingWhenPassedTwoKeysAndValue();
			it_leavesNewEdgeWithNewValue();
			it_leavesNewEdgeWithNewUndefinedValue();
			it_leavesExistingEdgeWithOldValue();
			it_leavesExistingEdgeWithOldUndefinedValue();
			it_leavesAbsentVerticesPresent();
		});

		describeMethod('createEdge', () => {
			it_throwsNothingWhenPassedTwoKeys();
			it_throwsNothingWhenPassedTwoKeysAndValue();
			it_leavesNewEdgeWithNewValue();
			it_leavesNewEdgeWithNewUndefinedValue();
			it_leavesExistingEdgeWithNewValue();
			it_leavesExistingEdgeWithNewUndefinedValue();
			it_leavesAbsentVerticesPresent();
		});

		describeMethod('removeExistingEdge', () => {
			it_throwsErrorIfEdgeDoesNotExist();
			it_leavesExistingEdgeAbsent();
		});

		describeMethod('removeEdge', () => {
			it_throwsNothingWhenPassedTwoKeys();
			it_leavesExistingEdgeAbsent();
			it_leavesAbsentEdgeAbsent();
		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		describeMethod('clearEdges', () => {

			it_throwsNothing();

			it("leaves the graph without edges", () => {
				callItWith();
				expect(graph.edgeCount()).toBe(0);
			});

			it("leaves existing vertices in the graph", () => {
				callItWith();
				expect(graph.vertexCount()).toBe(originalVertexCount);
			});

		});


		describeMethod('clear', () => {

			it_throwsNothing();

			it("leaves the graph without edges", () => {
				callItWith();
				expect(graph.edgeCount()).toBe(0);
			});

			it("leaves the graph without vertices", () => {
				callItWith();
				expect(graph.vertexCount()).toBe(0);
			});

		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		describeMethod('cycles', () => {

			it_throwsNothing();

			let cycleCount;
			let cyclesByLength;
			beforeEach(() => {
				cycleCount = 0;
				cyclesByLength = [];
			});
			function getCycles() {
				for (let cycle of callItWith()) {
					cycleCount += 1;
					cyclesByLength[cycle.length] = cycle;
				}
			}

			it("iterates over all cycles in the graph in no particular order (no cycles)", () => {
				expect(callItWith().next().done).toBeTruthy();
			});

			it("iterates over all cycles in the graph in no particular order (single cycle)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n3', 'n4']],
					[['n4', 'n5']],
					[['n3', 'n6']],
					[['n6', 'n2']]
				);

				// n1 ──▶ n2 ───▶ n3 ──▶ n4 ──▶ n5
				//        ▲       ╷
				//        ╰─ n6 ◀─╯

				getCycles();

				expect(cycleCount).toEqual(1);

				expect(cyclesByLength[3]).toEqualOneOf(...cycleArrays('n6', 'n2', 'n3'));
			});

			it("iterates over all cycles in the graph in no particular order (cycles sharing one vertex)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n4']],
					[['n4', 'n1']],
					[['n2', 'n3']],
					[['n3', 'n2']]
				);

				// n1 ──▶ n2 ◀───╮
				// ▲      ╷╷     │
				// │      │╰───▶ n3
				// ╵      │
				// n4 ◀───╯

				getCycles();

				expect(cyclesByLength[3]).toEqualOneOf(...cycleArrays('n1', 'n2', 'n4'));
				expect(cyclesByLength[2]).toEqualOneOf(...cycleArrays('n2', 'n3'));
			});

			it("iterates over all cycles in the graph in no particular order (cycles sharing one edge, 1)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n5']],
					[['n5', 'n4']],
					[['n4', 'n1']],
					[['n5', 'n3']],
					[['n3', 'n2']]
				);

				// n1 ──▶ n2 ◀── n3
				// ▲      ╷      ▲
				// │      │      │
				// ╵      ▼      │
				// n4 ◀── n5 ────╯

				getCycles();

				expect(cycleCount).toEqual(2);
				expect(cyclesByLength[4]).toEqualOneOf(...cycleArrays('n4', 'n1', 'n2', 'n5'));
				expect(cyclesByLength[3]).toEqualOneOf(...cycleArrays('n2', 'n5', 'n3'));
			});

			it("iterates over all cycles in the graph in no particular order (cycles sharing one edge, 2)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n3', 'n4']],
					[['n4', 'n5']],
					[['n3', 'n2']],
					[['n4', 'n2']]
				);

				// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
				//        ▲      ╷      ╷
				//        ├──────╯      │
				//        ╰─────────────╯

				getCycles();

				expect(cycleCount).toEqual(2);
				expect(cyclesByLength[2]).toEqualOneOf(...cycleArrays('n2', 'n3'));
				expect(cyclesByLength[3]).toEqualOneOf(...cycleArrays('n2', 'n3', 'n4'));
			});

			it("iterates over all cycles in the graph in no particular order (cycles sharing two edges)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n3', 'n4']],
					[['n4', 'n5']],
					[['n3', 'n6']],
					[['n4', 'n6']],
					[['n6', 'n2']]
				);

				// n1 ──▶ n2 ──▶ n3 ────▶ n4 ──▶ n5
				//        ▲      ╷        ╷
				//        │      ╰─▶ n6 ◀─╯
				//        │          ╷
				//        ╰──────────╯

				getCycles();

				expect(cycleCount).toEqual(2);
				expect(cyclesByLength[3]).toEqualOneOf(...cycleArrays('n2', 'n3', 'n6'));
				expect(cyclesByLength[4]).toEqualOneOf(...cycleArrays('n2', 'n3', 'n4', 'n6'));
			});

			it("iterates over all cycles in the graph in no particular order (three cycles sharing edges)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n3', 'n4']],
					[['n4', 'n5']],
					[['n3', 'n6']],
					[['n4', 'n7']],
					[['n5', 'n7']],
					[['n7', 'n6']],
					[['n6', 'n2']]
				);

				// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
				//        ▲      ╷      ╷      ╷
				//        │      │      │      │
				//        ╵      │      ▼      │
				//        n6 ◀───┴───── n7 ◀───╯

				getCycles();

				expect(cycleCount).toEqual(3);
				expect(cyclesByLength[3]).toEqualOneOf(...cycleArrays('n6', 'n2', 'n3'));
				expect(cyclesByLength[5]).toEqualOneOf(...cycleArrays('n6', 'n2', 'n3', 'n4', 'n7'));
				expect(cyclesByLength[6]).toEqualOneOf(...cycleArrays('n6', 'n2', 'n3', 'n4', 'n5', 'n7'));
			});

			it("iterates over all cycles in the graph in no particular order (disconnected graphs + single-vertex cycle)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n3', 'n7']],
					[['n7', 'n2']],
					[['n4', 'n5']],
					[['n5', 'n9']],
					[['n9', 'n8']],
					[['n8', 'n4']],
					[['n6', 'n6']]
				);

				// n1 ──▶ n2 ───▶ n3     n4 ──▶ n5     n6 ─╮
				//        ▲       ╷      ▲      ╷      ▲   │
				//        ╰─╴n7 ◀─╯      │      │      ╰───╯
				//                       ╵      ▼
				//                       n8 ◀── n9

				getCycles();

				expect(cycleCount).toEqual(3);
				expect(cyclesByLength[3]).toEqualOneOf(...cycleArrays('n7', 'n2', 'n3'));
				expect(cyclesByLength[4]).toEqualOneOf(...cycleArrays('n8', 'n4', 'n5', 'n9'));
				expect(cyclesByLength[1]).toEqual(['n6']);
			});

			it("iterates over all cycles in the graph in no particular order (multiple paths to the same cycle)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n2', 'n6']],
					[['n6', 'n3']],
					[['n3', 'n4']],
					[['n4', 'n5']],
					[['n5', 'n4']]
				);

				// n1 ──▶ n2 ───▶ n3 ──▶ n4 ──▶ n5
				//        ╷       ▲      ▲      ╷
				//        ╰─▶ n6 ─╯      ╰──────╯

				getCycles();

				expect(cycleCount).toEqual(1);
				expect(cyclesByLength[2]).toEqualOneOf(...cycleArrays('n4', 'n5'));
			});

			it("iterates over all cycles in the graph in no particular order (multiple paths to the same cycle in a strongly connected graph)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n2', 'n6']],
					[['n6', 'n3']],
					[['n3', 'n4']],
					[['n4', 'n5']],
					[['n5', 'n4']],
					[['n4', 'n1']]
				);

				// ╭─────────────────────╮
				// ▼                     ╵
				// n1 ──▶ n2 ───▶ n3 ──▶ n4 ──▶ n5
				//        ╷       ▲      ▲      ╷
				//        ╰─▶ n6 ─╯      ╰──────╯

				getCycles();

				expect(cycleCount).toEqual(3);
				expect(cyclesByLength[2]).toEqualOneOf(...cycleArrays('n4', 'n5'));
				expect(cyclesByLength[4]).toEqualOneOf(...cycleArrays('n1', 'n2', 'n3', 'n4'));
				expect(cyclesByLength[5]).toEqualOneOf(...cycleArrays('n1', 'n2', 'n6', 'n3', 'n4'));
			});

			it("iterates over all cycles in the graph in no particular order (multiple paths to different parts of the same cycle)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n2', 'n4']],
					[['n4', 'n5']],
					[['n3', 'n5']],
					[['n5', 'n3']]
				);

				// n1 ──▶ n2 ──▶ n3 ──╮
				//        ╷      ▲    │
				//        │      │    │
				//        ▼      ╵    │
				//        n4 ──▶ n5 ◀─╯

				getCycles();

				expect(cycleCount).toEqual(1);
				expect(cyclesByLength[2]).toEqualOneOf(...cycleArrays('n3', 'n5'));
			});

		});


		describeMethod('cycle', () => {

			it_throwsNothing();

			it("returns a descriptive array if the graph contains a cycle (1)", () => {
				graph = new GraphClass(
					[['n1', 'n2']],
					[['n2', 'n3']],
					[['n3', 'n4']],
					[['n4', 'n5']],
					[['n3', 'n6']],
					[['n6', 'n2']]
				);

				// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
				//        ▲      ╷
				//        │      │
				//        ╵      │
				//        n6 ◀───╯

				expectItWhenCalledWith().toEqualOneOf(
					['n6', 'n2', 'n3'],
					['n3', 'n6', 'n2'],
					['n2', 'n3', 'n6']
				);
			});

			it("returns a descriptive array if the graph contains a cycle (2)", () => {
				graph = new GraphClass([['n1', 'n1']]);
				expectItWhenCalledWith().toEqual(['n1']);
			});

			it("returns null if the graph contains no cycle (1)", () => {
				expectItWhenCalledWith().toBeNull();
			});

			it("returns null if the graph contains no cycle (2)", () => {
				graph.clear();
				expectItWhenCalledWith().toBeNull();
			});

		});


		describeMethod('hasCycle', () => {

			it_throwsNothing();

			it("returns true if the graph contains a cycle (1)", () => {
				graph = new GraphClass(
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

				expectItWhenCalledWith().toBe(true);
			});

			it("returns true if the graph contains a cycle (2)", () => {
				graph = new GraphClass([['n1', 'n1']]);
				expectItWhenCalledWith().toBe(true);
			});

			it("returns false if the graph contains no cycle (1)", () => {
				expectItWhenCalledWith().toBe(false);
			});

			it("returns false if the graph contains no cycle (2)", () => {
				graph.clear();
				expectItWhenCalledWith().toBe(false);
			});

		});


		describeMethod('paths', () => {

			it_throwsErrorIfVerticesDoNotExist();

			//  k1     k2 ──▶ k3 ──▶ k4
			//         ╷      ▲
			//         │      │
			//         ▼      │
			//         k5 ────╯

			it("iterates over all paths between the given keys, in no particular order (no path)", () => {
				expect(set( ...callItWith( 'k1', 'k2' ) )).toEqual(set( ));
				expect(set( ...callItWith(['k1', 'k2']) )).toEqual(set( ));
			});

			it("iterates over all paths between the given keys, in no particular order (no implicit self-loop)", () => {
				expect(set( ...callItWith( 'k3', 'k3' ) )).toEqual(set( ));
				expect(set( ...callItWith(['k3', 'k3']) )).toEqual(set( ));
			});

			it("iterates over all paths between the given keys, in no particular order (single edge)", () => {
				expect(set( ...callItWith( 'k2', 'k5' ) )).toEqual(set( ['k2', 'k5'] ));
				expect(set( ...callItWith(['k2', 'k5']) )).toEqual(set( ['k2', 'k5'] ));
			});

			it("iterates over all paths between the given keys, in no particular order (transitive)", () => {
				expect(set( ...callItWith( 'k2', 'k3' ) )).toEqual(set( ['k2', 'k3'], ['k2', 'k5', 'k3'] ));
				expect(set( ...callItWith(['k2', 'k3']) )).toEqual(set( ['k2', 'k3'], ['k2', 'k5', 'k3'] ));
				expect(set( ...callItWith( 'k2', 'k4' ) )).toEqual(set( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] ));
				expect(set( ...callItWith(['k2', 'k4']) )).toEqual(set( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] ));
			});

			it("iterates over all paths between the given keys, in no particular order (reflexive cycle)", () => {
				graph.addNewEdge('k1', 'k1');
				expect(set( ...callItWith( 'k1', 'k1' ) )).toEqual(set( ['k1', 'k1'] ));
				expect(set( ...callItWith(['k1', 'k1']) )).toEqual(set( ['k1', 'k1'] ));
			});

			it("iterates over all paths between the given keys, in no particular order (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expect(set( ...callItWith( 'k3', 'k3' ) )).toEqual(set( ['k3', 'k4', 'k3'] ));
				expect(set( ...callItWith(['k3', 'k3']) )).toEqual(set( ['k3', 'k4', 'k3'] ));
			});

			it("iterates over all paths between the given keys, in no particular order (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expect(set( ...callItWith( 'k3', 'k3' ) )).toEqual(set( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] ));
				expect(set( ...callItWith(['k3', 'k3']) )).toEqual(set( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] ));
			});

			it("iterates over all paths between the given keys, in no particular order (including part of a cycle)", () => {
				graph = new GraphClass(
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

				expect(set( ...callItWith( 'n1', 'n5' ) )).toEqual(set( ['n1', 'n2', 'n3', 'n4', 'n5'] ));
				expect(set( ...callItWith(['n1', 'n5']) )).toEqual(set( ['n1', 'n2', 'n3', 'n4', 'n5'] ));
			});

		});


		describeMethod('path', () => {

			it_throwsErrorIfVerticesDoNotExist();

			it("returns null if the path doesn't exist (simple)", () => {
				expectItWhenCalledWith( 'k1', 'k2' ).toBeNull();
				expectItWhenCalledWith(['k1', 'k2']).toBeNull();
				expectItWhenCalledWith( 'k1', 'k3' ).toBeNull();
				expectItWhenCalledWith(['k1', 'k3']).toBeNull();
				expectItWhenCalledWith( 'k2', 'k1' ).toBeNull();
				expectItWhenCalledWith(['k2', 'k1']).toBeNull();
			});

			it("returns null if the path doesn't exist (implicit self-loop)", () => {
				expectItWhenCalledWith( 'k2', 'k2' ).toBeNull();
				expectItWhenCalledWith(['k2', 'k2']).toBeNull();
			});

			it("returns null if the path doesn't exist (edge backwards)", () => {
				expectItWhenCalledWith( 'k3', 'k2' ).toBeNull();
				expectItWhenCalledWith(['k3', 'k2']).toBeNull();
				expectItWhenCalledWith( 'k4', 'k2' ).toBeNull();
				expectItWhenCalledWith(['k4', 'k2']).toBeNull();
			});

			it("returns a descriptive array if the path exists (single edge)", () => {
				expectItWhenCalledWith( 'k2', 'k3' ).toEqual(['k2', 'k3']);
				expectItWhenCalledWith(['k2', 'k3']).toEqual(['k2', 'k3']);
				expectItWhenCalledWith( 'k3', 'k4' ).toEqual(['k3', 'k4']);
				expectItWhenCalledWith(['k3', 'k4']).toEqual(['k3', 'k4']);
				expectItWhenCalledWith( 'k2', 'k5' ).toEqual(['k2', 'k5']);
				expectItWhenCalledWith(['k2', 'k5']).toEqual(['k2', 'k5']);
				expectItWhenCalledWith( 'k5', 'k3' ).toEqual(['k5', 'k3']);
				expectItWhenCalledWith(['k5', 'k3']).toEqual(['k5', 'k3']);
			});

			it("returns a descriptive array if the path exists (transitive)", () => {
				expectItWhenCalledWith( 'k2', 'k4' ).toEqualOneOf( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] );
				expectItWhenCalledWith(['k2', 'k4']).toEqualOneOf( ['k2', 'k3', 'k4'], ['k2', 'k5', 'k3', 'k4'] );
				expectItWhenCalledWith( 'k5', 'k4' ).toEqual(['k5', 'k3', 'k4']);
				expectItWhenCalledWith(['k5', 'k4']).toEqual(['k5', 'k3', 'k4']);
				graph.addNewEdge('k4', 'k1');
				expectItWhenCalledWith( 'k2', 'k1' ).toEqualOneOf( ['k2', 'k3', 'k4', 'k1'], ['k2', 'k5', 'k3', 'k4', 'k1'] );
				expectItWhenCalledWith(['k2', 'k1']).toEqualOneOf( ['k2', 'k3', 'k4', 'k1'], ['k2', 'k5', 'k3', 'k4', 'k1'] );
			});

			it("returns a descriptive array if the path exists (reflexive cycle)", () => {
				graph.addNewEdge('k1', 'k1');
				expectItWhenCalledWith( 'k1', 'k1' ).toEqual(['k1', 'k1']);
				expectItWhenCalledWith(['k1', 'k1']).toEqual(['k1', 'k1']);
			});

			it("returns a descriptive array if the path exists (symmetric cycle)", () => {
				graph.addNewEdge('k4', 'k3');
				expectItWhenCalledWith( 'k3', 'k3' ).toEqual(['k3', 'k4', 'k3']);
				expectItWhenCalledWith(['k3', 'k3']).toEqual(['k3', 'k4', 'k3']);
			});

			it("returns a descriptive array if the path exists (larger cycle)", () => {
				graph.addNewEdge('k4', 'k1');
				graph.addNewEdge('k1', 'k2');
				expectItWhenCalledWith( 'k3', 'k3' ).toEqualOneOf( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] );
				expectItWhenCalledWith(['k3', 'k3']).toEqualOneOf( ['k3', 'k4', 'k1', 'k2', 'k3'], ['k3', 'k4', 'k1', 'k2', 'k5', 'k3'] );
			});

			it("returns a descriptive array if the path exists (including part of a cycle)", () => {
				graph = new GraphClass(
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

				expectItWhenCalledWith( 'n1', 'n5' ).toEqual(['n1', 'n2', 'n3', 'n4', 'n5']);
				expectItWhenCalledWith(['n1', 'n5']).toEqual(['n1', 'n2', 'n3', 'n4', 'n5']);
			});

		});


		describeMethod('hasPath', () => {

			it_throwsErrorIfVerticesDoNotExist();

			it("returns false if the path doesn't exist (simple)", () => {
				expectItWhenCalledWith( 'k1', 'k2' ).toBe(false);
				expectItWhenCalledWith(['k1', 'k2']).toBe(false);
				expectItWhenCalledWith( 'k1', 'k3' ).toBe(false);
				expectItWhenCalledWith(['k1', 'k3']).toBe(false);
				expectItWhenCalledWith( 'k2', 'k1' ).toBe(false);
				expectItWhenCalledWith(['k2', 'k1']).toBe(false);
			});

			it("returns false if the path doesn't exist (self-loop)", () => {
				expectItWhenCalledWith( 'k2', 'k2' ).toBe(false);
				expectItWhenCalledWith(['k2', 'k2']).toBe(false);
			});

			it("returns false if the path doesn't exist (edge backwards)", () => {
				expectItWhenCalledWith( 'k3', 'k2' ).toBe(false);
				expectItWhenCalledWith(['k3', 'k2']).toBe(false);
				expectItWhenCalledWith( 'k4', 'k2' ).toBe(false);
				expectItWhenCalledWith(['k4', 'k2']).toBe(false);
			});

			it("returns true if the path exists (single edge)", () => {
				expectItWhenCalledWith( 'k2', 'k3' ).toBe(true);
				expectItWhenCalledWith(['k2', 'k3']).toBe(true);
				expectItWhenCalledWith( 'k3', 'k4' ).toBe(true);
				expectItWhenCalledWith(['k3', 'k4']).toBe(true);
				expectItWhenCalledWith( 'k2', 'k5' ).toBe(true);
				expectItWhenCalledWith(['k2', 'k5']).toBe(true);
				expectItWhenCalledWith( 'k5', 'k3' ).toBe(true);
				expectItWhenCalledWith(['k5', 'k3']).toBe(true);
			});

			it("returns true if the path exists (transitive)", () => {
				expectItWhenCalledWith( 'k2', 'k4' ).toBe(true);
				expectItWhenCalledWith(['k2', 'k4']).toBe(true);
				expectItWhenCalledWith( 'k5', 'k4' ).toBe(true);
				expectItWhenCalledWith(['k5', 'k4']).toBe(true);
				graph.addEdge('k4', 'k1');
				expectItWhenCalledWith( 'k2', 'k1' ).toBe(true);
				expectItWhenCalledWith(['k2', 'k1']).toBe(true);
			});

			it("returns true if the path exists (reflexive cycle)", () => {
				graph.addEdge('k1', 'k1');
				expectItWhenCalledWith( 'k1', 'k1' ).toBe(true);
				expectItWhenCalledWith(['k1', 'k1']).toBe(true);
			});

			it("returns true if the path exists (symmetric cycle)", () => {
				graph.addEdge('k4', 'k3');
				expectItWhenCalledWith( 'k3', 'k3' ).toBe(true);
				expectItWhenCalledWith(['k3', 'k3']).toBe(true);
			});

			it("returns true if the path exists (larger cycle)", () => {
				graph.addEdge('k4', 'k1');
				graph.addEdge('k1', 'k2');
				expectItWhenCalledWith( 'k3', 'k3' ).toBe(true);
				expectItWhenCalledWith(['k3', 'k3']).toBe(true);
			});

			it("returns true if the path exists (including part of a cycle, part 1)", () => {
				graph = new GraphClass(
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

				expectItWhenCalledWith( 'n1', 'n5' ).toBe(true);
				expectItWhenCalledWith(['n1', 'n5']).toBe(true);
			});

			it("returns true if the path exists (including part of a cycle, part 2)", () => {
				graph = new GraphClass(
					[['n3', 'n6']],
					[['n6', 'n2']],
					[['n1', 'n2' ]],
					[['n2', 'n3' ]],
					[['n3', 'n4' ]],
					[['n4', 'n5' ]]
				);

				//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
				//         ▲      ╷
				//         │      │
				//         ╵      │
				//         n6 ◀───╯

				expectItWhenCalledWith( 'n1', 'n5' ).toBe(true);
				expectItWhenCalledWith(['n1', 'n5']).toBe(true);
			});

		});


		describeMethod('equals', () => {

			it("throws nothing", () => {
				expectItWhenBoundWith()             .not.toThrow();
				expectItWhenBoundWith('some string').not.toThrow();
				expectItWhenBoundWith(42)           .not.toThrow();
				expectItWhenBoundWith(graph)        .not.toThrow();
			});

			it("returns falsy when compared to a graph with fewer vertices", () => {
				let other = graph.clone();
				graph.addNewVertex('k6');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns falsy when compared to a graph with more vertices", () => {
				let other = graph.clone();
				other.addNewVertex('k6');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns falsy when compared to a graph with different vertices", () => {
				let other = graph.clone();
				other.removeVertex('k1');
				other.addNewVertex('k6');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns falsy when compared to a graph with fewer edges", () => {
				let other = graph.clone();
				graph.addNewEdge('k1', 'k2');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns falsy when compared to a graph with more edges", () => {
				let other = graph.clone();
				other.addNewEdge('k1', 'k2');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns falsy when compared to a graph with different edges", () => {
				let other = graph.clone();
				other.addNewEdge('k1', 'k2');
				other.removeEdge('k2', 'k3');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns falsy when compared to a graph with a different vertex value", () => {
				let other = graph.clone();
				other.setVertex('k1', 'new value');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns falsy when compared to a graph with a different edge value", () => {
				let other = graph.clone();
				other.setEdge('k2', 'k3', 'new value');
				expectItWhenCalledWith(other).toBeFalsy();
			});

			it("returns truthy for graphs that are equal", () => {
				let other = graph.clone();
				expectItWhenCalledWith(other).toBeTruthy();
			});

			it("can be influenced by a custom comparison function", () => {
				let sillyComparison = (v1, v2, [from, to]) => {
					if (from === 'k2' && to === 'k3') { return true }
					return v1 === v2;
				};
				let other = graph.clone();
				other.setEdge('k2', 'k3', 'new value');
				expectItWhenCalledWith(other, sillyComparison).toBeTruthy();
				other.setEdge('k3', 'k4', 'new value');
				expectItWhenCalledWith(other, sillyComparison).toBeFalsy();
			});

		});


		describeMethod('outDegree', () => {

			it_throwsErrorIfVertexDoesNotExist();

			it("returns the number of edges going out of a given vertex", () => {
				expect(callItWith('k1')).toBe(0);
				expect(callItWith('k2')).toBe(2);
				expect(callItWith('k3')).toBe(1);
				expect(callItWith('k4')).toBe(0);
				expect(callItWith('k5')).toBe(1);
			});

		});


		describeMethod('inDegree', () => {

			it_throwsErrorIfVertexDoesNotExist();

			it("returns the number of edges coming into a given vertex", () => {
				expect(callItWith('k1')).toBe(0);
				expect(callItWith('k2')).toBe(0);
				expect(callItWith('k3')).toBe(2);
				expect(callItWith('k4')).toBe(1);
				expect(callItWith('k5')).toBe(1);
			});

		});


		describeMethod('degree', () => {

			it_throwsErrorIfVertexDoesNotExist();

			it("returns the number of edges connected to a given vertex", () => {
				expect(callItWith('k1')).toBe(0);
				expect(callItWith('k2')).toBe(2);
				expect(callItWith('k3')).toBe(3);
				expect(callItWith('k4')).toBe(1);
				expect(callItWith('k5')).toBe(2);
			});

		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		describeMethod('mergeIn', () => {

			it_throwsNothingWhenPassedAnotherGraph();

			// graph
			//
			//  k1     k2 ──▶ k3 ──▶ k4
			//         ╷      ▲
			//         │      │
			//         ▼      │
			//         k5 ────╯

			// other
			//
			//  k1 ◀── k2     k3 ──▶ k4
			//         ▲             ▲
			//         │             │
			//         ╵             │
			//         k5 ───────────╯

			let other;
			beforeEach(() => {
				other = new GraphClass(
					['k1', "newValue1"],
					['k2', "newValue2"],
					['k3'             ],
					['k4'             ],
					['k5'             ],
					[['k2', 'k1'], "newValue21"],
					[['k3', 'k4']              ],
					[['k5', 'k2']              ],
					[['k5', 'k4']              ]
				);
			});

			it("properly merges in the other graph", () => {
				graph.mergeIn(other);

				expect(graph).toEqual(new GraphClass(
					['k1', "newValue1"],
					['k2', "newValue2"],
					['k3'             ],
					['k4'             ],
					['k5'             ],
					[['k2', 'k1'], "newValue21"],
					[['k2', 'k3'], "oldValue23"],
					[['k2', 'k5']              ],
					[['k3', 'k4']              ],
					[['k5', 'k2']              ],
					[['k5', 'k3']              ],
					[['k5', 'k4']              ]
				));
			});

			it("properly merges in the other graph when using a custom merge function", () => {
				graph.mergeIn(other, (v1, v2) => `${v1}:${v2}`);

				expect(graph).toEqual(new GraphClass(
					['k1', "oldValue1:newValue1"],
					['k2', "undefined:newValue2"],
					['k3', "undefined:undefined"],
					['k4', "undefined:undefined"],
					['k5', "oldValue5:undefined"],
					[['k2', 'k1'], "undefined:newValue21"],
					[['k2', 'k3'], "oldValue23"          ],
					[['k2', 'k5']                        ],
					[['k3', 'k4'], "undefined:undefined" ],
					[['k5', 'k2'], "undefined:undefined" ],
					[['k5', 'k3']                        ],
					[['k5', 'k4'], "undefined:undefined" ]
				));
			});

		});


		describeMethod('clone', () => {

			it_throwsNothing();

			beforeEach(() => {
				graph.addEdge('k1', 'k3');
				graph.addEdge('k2', 'k4');
				graph.addEdge('k5', 'k4');
			});

			it("returns a new graph with the same vertices as the original", () => {
				let newGraph = callItWith();
				for (let [key, val] of newGraph.vertices()) {
					expect(graph.hasVertex(key)).toBeTruthy();
					expect(val).toBe(graph.vertexValue(key));
				}
				for (let [key, val] of graph.vertices()) {
					expect(newGraph.hasVertex(key)).toBeTruthy();
					expect(val).toBe(newGraph.vertexValue(key));
				}
			});

			it("returns a new graph with the same edges as the original", () => {
				let newGraph = callItWith();
				for (let [key, val] of newGraph.edges()) {
					expect(graph.hasEdge(key)).toBeTruthy();
					expect(val).toBe(graph.edgeValue(key));
				}
				for (let [key, val] of graph.edges()) {
					expect(newGraph.hasEdge(key)).toBeTruthy();
					expect(val).toBe(newGraph.edgeValue(key));
				}
			});

			it("returns a new graph with the same vertices and edges as the original, with values influenced by custom vertex value transformer", () => {
				let newGraph = callItWith(v=>`value:${v}`, v=>v);
				for (let [key, val] of newGraph.vertices()) {
					expect(graph.hasVertex(key)).toBeTruthy();
					expect(val).toBe(`value:${graph.vertexValue(key)}`);
				}
				for (let [key, val] of graph.vertices()) {
					expect(newGraph.hasVertex(key)).toBeTruthy();
					expect(`value:${val}`).toBe(newGraph.vertexValue(key));
				}
				for (let [key, val] of newGraph.edges()) {
					expect(graph.hasEdge(key)).toBeTruthy();
					expect(val).toBe(graph.edgeValue(key));
				}
				for (let [key, val] of graph.edges()) {
					expect(newGraph.hasEdge(key)).toBeTruthy();
					expect(val).toBe(newGraph.edgeValue(key));
				}
			});

			it("returns a new graph with the same vertices and edges as the original, with values influenced by custom edge value transformer", () => {
				let newGraph = callItWith(undefined, v => `value:${v}`);
				for (let [key, val] of newGraph.vertices()) {
					expect(graph.hasVertex(key)).toBeTruthy();
					expect(val).toBe(graph.vertexValue(key));
				}
				for (let [key, val] of graph.vertices()) {
					expect(newGraph.hasVertex(key)).toBeTruthy();
					expect(val).toBe(newGraph.vertexValue(key));
				}
				for (let [key, val] of newGraph.edges()) {
					expect(graph.hasEdge(key)).toBeTruthy();
					expect(val).toBe(`value:${graph.edgeValue(key)}`);
				}
				for (let [key, val] of graph.edges()) {
					expect(newGraph.hasEdge(key)).toBeTruthy();
					expect(`value:${val}`).toBe(newGraph.edgeValue(key));
				}
			});

		});


		describeMethod('transitiveReduction', () => {

			it_throwsNothing();

			let newGraph;
			beforeEach(() => {
				graph.addEdge('k1', 'k3');
				graph.addEdge('k2', 'k4');
				graph.addEdge('k5', 'k4');
				newGraph = callItWith();
			});

			it("returns a new graph with the same vertices as the original", () => {
				for (let [key, val] of newGraph.vertices()) {
					expect(graph.hasVertex(key)).toBeTruthy();
					expect(val).toBe(graph.vertexValue(key));
				}
				for (let [key, val] of graph.vertices()) {
					expect(newGraph.hasVertex(key)).toBeTruthy();
					expect(val).toBe(newGraph.vertexValue(key));
				}
			});

			it("returns a new graph with the same reachability as the original", () => {
				for (let [from] of graph.vertices()) {
					for (let [to] of graph.vertices()) {
						expect(graph.hasPath(from, to)).toEqual(newGraph.hasPath(from, to));
					}
				}
			});

			it("returns a new graph with no transitive edges", () => {
				for (let [key] of newGraph.edges()) {
					newGraph.removeEdge(key);
					expect(newGraph.hasPath(key)).toBeFalsy();
					newGraph.addNewEdge(key);
				}
			});

			it("returns a new graph with edges that have the same values as in the original", () => {
				for (let [key, val] of newGraph.edges()) {
					expect(graph.edgeValue(key)).toBe(val);
				}
			});

		});


		describeMethod('contractPaths', () => {

			it("contracts empty graph to empty graph", () => {
				graph = new GraphClass();
				callItWith();
				expect(graph).toEqual(new GraphClass());
			});

			it("contracts edgeless graph to same edgeless graph", () => {
				graph = new GraphClass(
					['n1', 'newValue1'],
					['n2', 'newValue2'],
					['n3', 'newValue3']
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					['n1', 'newValue1'],
					['n2', 'newValue2'],
					['n3', 'newValue3']
				));
			});

			it("contracts one-edge graph to corresponding one-edge graph", () => {
				graph = new GraphClass(
					[['n1', 'n2'], 'newValue']
				);
				callItWith();

				expect(graph).toEqual(new GraphClass(
					[['n1', 'n2'], new GraphClass(
						[['n1', 'n2'], 'newValue']
					)]
				));
			});

			it("contracts branch-less paths to a single edge (no branching)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n5'], "n4,n5"],
					[['n5', 'n6'], "n5,n6"],
					[['n6', 'n7'], "n6,n7"]
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n7'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"],
						[['n3', 'n4'], "n3,n4"],
						[['n4', 'n5'], "n4,n5"],
						[['n5', 'n6'], "n5,n6"],
						[['n6', 'n7'], "n6,n7"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (branching forward)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n5'], "n4,n5"],
					[['n4', 'n6'], "n4,n6"],
					[['n6', 'n7'], "n6,n7"]
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n4'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"],
						[['n3', 'n4'], "n3,n4"]
					)],
					[['n4', 'n5'], new GraphClass(
						[['n4', 'n5'], "n4,n5"]
					)],
					[['n4', 'n7'], new GraphClass(
						[['n4', 'n6'], "n4,n6"],
						[['n6', 'n7'], "n6,n7"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (custom nexuses)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n5'], "n4,n5"],
					[['n5', 'n6'], "n5,n6"],
					[['n6', 'n7'], "n6,n7"]
				);
				callItWith((key) => (key === 'n3' || key === 'n5'));
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n3'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"]
					)],
					[['n3', 'n5'], new GraphClass(
						[['n3', 'n4'], "n3,n4"],
						[['n4', 'n5'], "n4,n5"]
					)],
					[['n5', 'n7'], new GraphClass(
						[['n5', 'n6'], "n5,n6"],
						[['n6', 'n7'], "n6,n7"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (all custom nexuses)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n5'], "n4,n5"],
					[['n5', 'n6'], "n5,n6"],
					[['n6', 'n7'], "n6,n7"]
				);
				callItWith(() => true);
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n2'], new GraphClass(
						[['n1', 'n2'], "n1,n2"]
					)],
					[['n2', 'n3'], new GraphClass(
						[['n2', 'n3'], "n2,n3"]
					)],
					[['n3', 'n4'], new GraphClass(
						[['n3', 'n4'], "n3,n4"]
					)],
					[['n4', 'n5'], new GraphClass(
						[['n4', 'n5'], "n4,n5"]
					)],
					[['n5', 'n6'], new GraphClass(
						[['n5', 'n6'], "n5,n6"]
					)],
					[['n6', 'n7'], new GraphClass(
						[['n6', 'n7'], "n6,n7"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (branching backward)", () => {
				graph = new GraphClass(
					[['n2', 'n1'], "n1,n2"],
					[['n3', 'n2'], "n2,n3"],
					[['n4', 'n3'], "n3,n4"],
					[['n5', 'n4'], "n4,n5"],
					[['n6', 'n4'], "n4,n6"],
					[['n7', 'n6'], "n6,n7"]
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					[['n4', 'n1'], new GraphClass(
						[['n2', 'n1'], "n1,n2"],
						[['n3', 'n2'], "n2,n3"],
						[['n4', 'n3'], "n3,n4"]
					)],
					[['n5', 'n4'], new GraphClass(
						[['n5', 'n4'], "n4,n5"]
					)],
					[['n7', 'n4'], new GraphClass(
						[['n6', 'n4'], "n4,n6"],
						[['n7', 'n6'], "n6,n7"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (branch and join)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n5'], "n4,n5"],
					[['n5', 'n7'], "n5,n7"],
					[['n4', 'n6'], "n4,n6"],
					[['n6', 'n7'], "n6,n7"],
					[['n7', 'n8'], "n7,n8"]
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n4'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"],
						[['n3', 'n4'], "n3,n4"]
					)],
					[['n4', 'n7'], new GraphClass(
						[['n4', 'n5'], "n4,n5"],
						[['n5', 'n7'], "n5,n7"],
						[['n4', 'n6'], "n4,n6"],
						[['n6', 'n7'], "n6,n7"]
					)],
					[['n7', 'n8'], new GraphClass(
						[['n7', 'n8'], "n7,n8"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (cycle with outgoing branch)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n1'], "n4,n1"],
					[['n1', 'n5'], "n1,n5"],
					[['n5', 'n6'], "n5,n6"]
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n1'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"],
						[['n3', 'n4'], "n3,n4"],
						[['n4', 'n1'], "n4,n1"]
					)],
					[['n1', 'n6'], new GraphClass(
						[['n1', 'n5'], "n1,n5"],
						[['n5', 'n6'], "n5,n6"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (cycle with incoming branch)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n1'], "n4,n1"],
					[['n5', 'n1'], "n5,n1"],
					[['n6', 'n5'], "n6,n5"]
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n1'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"],
						[['n3', 'n4'], "n3,n4"],
						[['n4', 'n1'], "n4,n1"]
					)],
					[['n6', 'n1'], new GraphClass(
						[['n5', 'n1'], "n5,n1"],
						[['n6', 'n5'], "n6,n5"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (cycle with two branches)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n1'], "n4,n1"],
					[['n5', 'n1'], "n5,n1"],
					[['n3', 'n6'], "n3,n6"]
				);
				callItWith();
				expect(graph).toEqual(new GraphClass(
					[['n1', 'n3'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"]
					)],
					[['n3', 'n1'], new GraphClass(
						[['n3', 'n4'], "n3,n4"],
						[['n4', 'n1'], "n4,n1"]
					)],
					[['n5', 'n1'], new GraphClass(
						[['n5', 'n1'], "n5,n1"]
					)],
					[['n3', 'n6'], new GraphClass(
						[['n3', 'n6'], "n3,n6"]
					)]
				));
			});

			it("contracts branch-less paths to a single edge (cycle with custom nexus)", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"],
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n1'], "n4,n1"]
				);
				callItWith((key) => (key === 'n2'));
				expect(graph).toEqual(new GraphClass(
					[['n2', 'n2'], new GraphClass(
						[['n1', 'n2'], "n1,n2"],
						[['n2', 'n3'], "n2,n3"],
						[['n3', 'n4'], "n3,n4"],
						[['n4', 'n1'], "n4,n1"]
					)]
				));
			});

			it("throws an error if the graph contains a cycle with no branches", () => {
				graph = new GraphClass(
					[['n1', 'n2'], "n1,n2"], // n1,n2,n3,n4 = offending cycle
					[['n2', 'n3'], "n2,n3"],
					[['n3', 'n4'], "n3,n4"],
					[['n4', 'n1'], "n4,n1"],
					[['n5', 'n6'], "n5,n6"], // n5,n6,n7 = unrelated non-cycle
					[['n6', 'n7'], "n6,n7"]
				);
				try {
					callItWith();
					expect().not.toBeReachable();
				} catch (err) {
					expect(err.cycle).toEqualOneOf(
						['n1', 'n2', 'n3', 'n4'],
						['n4', 'n1', 'n2', 'n3'],
						['n3', 'n4', 'n1', 'n2'],
						['n2', 'n3', 'n4', 'n1']
					);
				}
			});

		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		describe("default iterable interface", () => {

			it("iterates over each vertex in the graph", () => {
				let verticesFound = {};
				for (let [key, value] of graph) {
					expect(verticesFound[key]).toBeUndefined();
					verticesFound[key] = value;
				}
				expect(verticesFound).toEqual(originalVertices);
			});

		});


		describeMethod('vertices', () => {

			it("iterates over each vertex in the graph", () => {
				let verticesFound = {};
				for (let [key, value] of callItWith()) {
					expect(verticesFound[key]).toBeUndefined();
					verticesFound[key] = value;
				}
				expect(verticesFound).toEqual(originalVertices);
			});

			it("iterates over each vertex in the graph (ES5 style)", () => {
				let verticesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var key   = kv.value[0],
						value = kv.value[1];
					expect(verticesFound[key]).toBeUndefined();
					verticesFound[key] = value;
				}
				expect(verticesFound).toEqual(originalVertices);
			});

		});


		describeMethod('edges', () => {

			it("iterates over each edge in the graph", () => {
				let edgesFound = {};
				for (let [key, value] of callItWith()) {
					expect(edgesFound[key]).toBeUndefined();
					edgesFound[key] = value;
				}
				expect(edgesFound).toEqual(originalEdges);
			});

			it("iterates over each edge in the graph (ES5 style)", () => {
				let edgesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var from  = kv.value[0][0],
						to    = kv.value[0][1],
						value = kv.value[1];
					let key = from + "," + to;
					expect(edgesFound[key]).toBeUndefined();
					edgesFound[key] = value;
				}
				expect(edgesFound).toEqual(originalEdges);
			});

		});


		describeMethod('verticesFrom', () => {

			it_throwsErrorIfVertexDoesNotExist();

			it_throwsNothingIfVertexExists();

			it("iterates over each outgoing edge, providing the connected vertex", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith('k2')) {
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
				for (var it = callItWith('k2'), kv; !(kv = it.next()).done;) {
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

			it_throwsErrorIfVertexDoesNotExist();

			it_throwsNothingIfVertexExists();

			it("iterates over each incoming edge, providing the connected vertex", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith('k3')) {
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
				for (var it = callItWith('k3'), kv; !(kv = it.next()).done;) {
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

			it_throwsErrorIfVertexDoesNotExist();

			it_throwsNothingIfVertexExists();

			it("iterates over each outgoing edge, providing the connected vertex key/value and edge value", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith('k2')) {
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
				for (var it = callItWith('k2'), kv; !(kv = it.next()).done;) {
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

			it_throwsErrorIfVertexDoesNotExist();

			it_throwsNothingIfVertexExists();

			it("iterates over each incoming edge, providing the connected vertex key/value and edge value", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith('k3')) {
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
				for (var it = callItWith('k3'), kv; !(kv = it.next()).done;) {
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

			it_throwsErrorIfVertexDoesNotExist();

			it_throwsNothingIfVertexExists();

			it("iterates once over each vertex that is reachable from the given vertex, in no particular order", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith('k2')) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k3': undefined,
					'k5': "oldValue5",
					'k4': undefined
				});
			});

			it("iterates once over each vertex that is reachable from the given vertex, in no particular order (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith('k2'), kv; !(kv = it.next()).done;) {
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

			it_throwsErrorIfVertexDoesNotExist();

			it_throwsNothingIfVertexExists();

			it("iterates once over each vertex that has a path to reach the given vertex, in no particular order", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith('k4')) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;
				}
				expect(valuesFound).toEqual({
					'k2': undefined,
					'k3': undefined,
					'k5': "oldValue5"
				});
			});

			it("iterates once over each vertex that has a path to reach the given vertex, in no particular order (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith('k4'), kv; !(kv = it.next()).done;) {
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


		describeMethod('sources', () => {

			it_throwsNothing();

			it("visits all vertices with no incoming edges exactly once", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;

				}
				expect(valuesFound).toEqual({
					'k1': "oldValue1",
					'k2':  undefined
				});
			});

			it("visits all vertices with no incoming edges exactly once (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var key   = kv.value[0],
						value = kv.value[1];
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;

				}
				expect(valuesFound).toEqual({
					'k1': "oldValue1",
					'k2':  undefined
				});
			});

			it("visits all vertices with no incoming edges exactly once (after some edges have been removed)", () => {
				graph.removeExistingEdge('k5', 'k3');
				graph.removeExistingEdge('k3', 'k4');
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;

				}
				expect(valuesFound).toEqual({
					'k1': "oldValue1",
					'k2':  undefined,
					'k4':  undefined
				});
			});

		});


		describeMethod('sinks', () => {

			it_throwsNothing();

			it("visits all vertices with no outgoing edges exactly once", () => {
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;

				}
				expect(valuesFound).toEqual({
					'k1': "oldValue1",
					'k4':  undefined
				});
			});

			it("visits all vertices with no outgoing edges exactly once (ES5 style)", () => {
				let valuesFound = {};
				for (var it = callItWith(), kv; !(kv = it.next()).done;) {
					var key   = kv.value[0],
						value = kv.value[1];
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;

				}
				expect(valuesFound).toEqual({
					'k1': "oldValue1",
					'k4':  undefined
				});
			});

			it("visits all vertices with no outgoing edges exactly once (after some edges have been removed)", () => {
				graph.removeExistingEdge('k2', 'k3');
				graph.removeExistingEdge('k3', 'k4');
				let valuesFound = {};
				for (let [key, value] of callItWith()) {
					expect(valuesFound[key]).toBeUndefined();
					valuesFound[key] = value;

				}
				expect(valuesFound).toEqual({
					'k1': "oldValue1",
					'k3':  undefined,
					'k4':  undefined
				});
			});

		});


		describeMethod('vertices_topologically', () => {

			it("throws an error if the graph contains a cycle (1)", () => {
				graph = new GraphClass(
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

				expect(() => [...callItWith()]).toThrowSpecific(GraphClass.CycleError);

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
				graph = new GraphClass([['n1', 'n1']]);

				expect(() => [...callItWith()]).toThrowSpecific(GraphClass.CycleError);

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
				graph = new GraphClass(
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

		describe(`${GraphClass.name}.VertexExistsError`, () => {

			it("can specify one existing vertex", () => {
				let err = new GraphClass.VertexExistsError(
					['x', 1]
				);
				expect(err.vertices).toEqual(set(
					['x', 1]
				));
			});

			it("can specify multiple existing vertices", () => {
				let err = new GraphClass.VertexExistsError(
					['x', 1],
					['y', 2]
				);
				expect(err.vertices).toEqual(set(
					['x', 1],
					['y', 2]
				));
			});

		});

		describe(`${GraphClass.name}.VertexNotExistsError`, () => {

			it("can specify one missing vertex", () => {
				let err = new GraphClass.VertexNotExistsError('x');
				expect(err.vertices).toEqual(set(
					'x'
				));
			});

			it("can specify multiple missing vertices", () => {
				let err = new GraphClass.VertexNotExistsError('x', 'y');
				expect(err.vertices).toEqual(set(
					'x',
					'y'
				));
			});

		});

		describe(`${GraphClass.name}.EdgeExistsError`, () => {

			it("can specify one existing edge", () => {
				let err = new GraphClass.EdgeExistsError(
					[['x', 'y'], 1]
				);
				expect(err.edges).toEqual(set(
					[['x', 'y'], 1]
				));
			});

			it("can specify multiple existing edges", () => {
				let err = new GraphClass.EdgeExistsError(
					[['x', 'y'], 1],
					[['y', 'z'], 2]
				);
				expect(err.edges).toEqual(set(
					[['x', 'y'], 1],
					[['y', 'z'], 2]
				));
			});

		});

		describe(`${GraphClass.name}.EdgeNotExistsError`, () => {

			it("can specify one missing edge", () => {
				let err = new GraphClass.EdgeNotExistsError(
					['x', 'y']
				);
				expect(err.edges).toEqual(set(
					['x', 'y']
				));
			});

			it("can specify multiple missing edges", () => {
				let err = new GraphClass.EdgeNotExistsError(
					['x', 'y'],
					['y', 'z']
				);
				expect(err.edges).toEqual(set(
					['x', 'y'],
					['y', 'z']
				));
			});

		});

		describe(`${GraphClass.name}.HasConnectedEdgesError`, () => {

			it("can specify that a vertex has connected edges", () => {
				let err = new GraphClass.HasConnectedEdgesError('x',
					[['x', 'y'], 1],
					[['z', 'x'], 2]
				);
				expect(err.vertex).toEqual('x');
				expect(err.edges).toEqual(set(
					[['x', 'y'], 1],
					[['z', 'x'], 2]
				));
			});

		});

		describe(`${GraphClass.name}.CycleError`, () => {

			it("can specify that a graph contains a cycle", () => {
				let err = new GraphClass.CycleError(
					['x', 'y', 'z']
				);
				expect(err.cycle).toEqualOneOf(...cycleArrays('x', 'y', 'z'));
			});

		});

		describe(`${GraphClass.name}.BranchlessCycleError`, () => {

			it("can specify that a graph contains a branchless cycle", () => {
				let err = new GraphClass.BranchlessCycleError(['x', 'y', 'z']);
				expect(err.cycle).toEqualOneOf(...cycleArrays('x', 'y', 'z'));
			});

		});


		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


		additionalTests();


	});
};
