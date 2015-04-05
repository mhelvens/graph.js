import {any} from './helpers.es6.js';
import JsGraph from '../src/js-graph.es6.js';


var graph;
beforeEach(() => {
	graph = new JsGraph();
});


describe("method", () => {//////////////////////////////////////////////////////////////////////////////////////////////


	var methodUnderTest = "";

	function describeMethod(method, fn) {
		describe(`'${method}'`, () => {
			beforeEach(() => {
				methodUnderTest = method;
			});
			it("is present", () => {
				expect(graph[methodUnderTest]).toEqual(any(Function));
			});
			fn();
		});
	}

	function callItWith() {
		return graph[methodUnderTest].apply(graph, arguments);
	}

	function expectItWhenBoundWith() {
		var args = arguments;
		return expect(() => {
			graph[methodUnderTest].apply(graph, args);
		});
	}

	function expectItWhenCalledWith() {
		var args = Array.prototype.slice.call(arguments, 0);
		return expect(graph[methodUnderTest].apply(graph, args));
	}


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	var originalVertices, originalEdges, originalVertexCount, originalEdgeCount;


	function expectTheGraphNotToHaveChanged() {
		var vertices = {};
		for (let [key, value] of graph.vertices()) {
			vertices[key] = value;
		}
		expect(vertices).toEqual(originalVertices);

		var edges = {};
		for (let [from, to, value] of graph.edges()) {
			edges[from + ", " + to] = value;
		}
		expect(edges).toEqual(originalEdges);
	}


	beforeEach(() => {
		//// the original graph:
		//
		graph.addNewVertex('k1', 'oldValue1');
		graph.addNewVertex('k2');
		graph.addNewVertex('k3');
		graph.addNewVertex('k4');
		graph.addNewVertex('k5', 'oldValue5');
		graph.addNewEdge('k2', 'k3', 'oldValue23');
		graph.addNewEdge('k3', 'k4');
		graph.addNewEdge('k2', 'k5');
		graph.addNewEdge('k5', 'k3');

		// k1     k2 ──▶ k3 ──▶ k4
		//        ╷      ▲
		//        │      │
		//        ▼      │
		//        k5 ────╯

		//// some preliminary work to more easily 'expect' things about the original graph:
		//
		originalVertices = {
			'k1': 'oldValue1',
			'k2': undefined,
			'k3': undefined,
			'k4': undefined,
			'k5': 'oldValue5'
		};
		originalEdges = {
			'k2, k3': 'oldValue23',
			'k3, k4': undefined,
			'k2, k5': undefined,
			'k5, k3': undefined
		};
		originalVertexCount = Object.keys(originalVertices).length;
		originalEdgeCount = Object.keys(originalEdges).length;

		//// and we now 'expect' that those variables are set correctly
		//
		expectTheGraphNotToHaveChanged();
	});


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	describeMethod('vertexCount', () => {

		it("throws nothing", () => {
			expectItWhenBoundWith().not.toThrow();
		});

		it("returns the number of vertices in the graph", () => {
			expectItWhenCalledWith().toBe(originalVertexCount);
		});

	});


	describeMethod('edgeCount', () => {

		it("throws nothing", () => {
			expectItWhenBoundWith().not.toThrow();
		});

		it("returns the number of edges in the graph", () => {
			expectItWhenCalledWith().toBe(originalEdgeCount);
		});

	});


	describeMethod('hasVertex', () => {

		it("throws nothing when passed a key argument", () => {
			expectItWhenBoundWith('k1').not.toThrow();
			expectItWhenBoundWith('newKey').not.toThrow();
		});

		it("returns a truthy value for an existing vertex", () => {
			expectItWhenCalledWith('k1').toBeTruthy();
			expectItWhenCalledWith('k2').toBeTruthy();
		});

		it("returns a falsy value for an absent vertex", () => {
			expectItWhenCalledWith('newKey').toBeFalsy();
		});

	});


	describeMethod('hasEdge', () => {

		it("throws nothing when passed two key arguments", () => {
			expectItWhenBoundWith('k1', 'k2').not.toThrow();
			expectItWhenBoundWith('k2', 'k3').not.toThrow();
			expectItWhenBoundWith('newKey', 'k2').not.toThrow();
			expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
		});

		it("returns a truthy value for an existing edge", () => {
			expectItWhenCalledWith('k2', 'k3').toBeTruthy();
			expectItWhenCalledWith('k3', 'k4').toBeTruthy();
		});

		it("returns a falsy value for an absent edge", () => {
			expectItWhenCalledWith('k1', 'k2').toBeFalsy();
			expectItWhenCalledWith('k3', 'k2').toBeFalsy();
			expectItWhenCalledWith('newKey', 'k2').toBeFalsy();
			expectItWhenCalledWith('newKey1', 'newKey2').toBeFalsy();
		});

	});


	describeMethod('vertexValue', () => {

		it("throws nothing when passed a key argument", () => {
			expectItWhenBoundWith('k1').not.toThrow();
			expectItWhenBoundWith('k2').not.toThrow();
			expectItWhenBoundWith('newKey').not.toThrow();
		});

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


	describeMethod('edgeValue', () => {

		it("throws nothing when passed two key arguments", () => {
			expectItWhenBoundWith('k1', 'k2').not.toThrow();
			expectItWhenBoundWith('k2', 'k3').not.toThrow();
			expectItWhenBoundWith('newKey', 'k2').not.toThrow();
			expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
		});

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


	describeMethod('eachVertex', () => {

		it("throws nothing when passed a non-throwing function", () => {
			expectItWhenBoundWith(() => {/*not throwing things*/}).not.toThrow();
		});

		it("does not change the graph if the specified handler doesn't", () => {
			callItWith(() => {
				// not changing the graph from here
			});
			expectTheGraphNotToHaveChanged();
		});

		it("calls the specified handler exactly once for each vertex in the graph", () => {
			var verticesFound = {};
			callItWith((key, value) => {
				expect(verticesFound[key]).toBeUndefined();
				verticesFound[key] = value;
			});
			expect(verticesFound).toEqual(originalVertices);
		});

		it("stops iteration if and when the callback returns false", () => {
			var counter = 0;
			callItWith((/*key, value*/) => {
				counter += 1;
				if (counter === 3) { return false }
			});
			expect(counter).toEqual(3);
		});

		it("does not stop iteration when the callback returns a non-false falsey value", () => {
			var counter;

			[undefined, null, 0, "", NaN].forEach((falsey) => {
				counter = 0;
				callItWith((/*key, value*/) => {
					counter += 1;
					if (counter === 1) { return falsey }
				});
				expect(counter).toEqual(5);
			});
		});

	});


	describeMethod('eachVertexFrom', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey', () => {}).toThrow();
			expectItWhenBoundWith('newKey', () => {}).toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1', () => {}).not.toThrow();
		});

		it("does not change the graph if the specified handler doesn't", () => {
			callItWith('k2', () => {
				// not changing the graph from here
			});
			expectTheGraphNotToHaveChanged();
		});

		it("calls the specified handler exactly once for each outgoing edge, providing the connected vertex key/value and edge value", () => {
			var valuesFound = {};
			callItWith('k2', (key, value, edgeValue) => {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = [value, edgeValue];
			});
			expect(valuesFound).toEqual({
				'k3': [undefined, 'oldValue23'],
				'k5': ['oldValue5', undefined]
			});
		});

		it("stops iteration if and when the callback returns false", () => {
			var counter = 0;
			callItWith('k2', (/*key, value*/) => {
				counter += 1;
				if (counter === 1) { return false }
			});
			expect(counter).toEqual(1);
		});

		it("does not stop iteration when the callback returns a non-false falsey value", () => {
			var counter;

			[undefined, null, 0, "", NaN].forEach((falsey) => {
				counter = 0;
				callItWith('k2', (/*key, value*/) => {
					counter += 1;
					if (counter === 1) { return falsey }
				});
				expect(counter).toEqual(2);
			});
		});

	});


	describeMethod('eachVertexTo', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey', () => {}).toThrow();
			expectItWhenBoundWith('newKey', () => {}).toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1', () => {}).not.toThrow();
		});

		it("does not change the graph if the specified handler doesn't", () => {
			callItWith('k3', () => {
				// not changing the graph from here
			});
			expectTheGraphNotToHaveChanged();
		});

		it("calls the specified handler exactly once for each incoming edge, providing the connected vertex key/value and edge value", () => {
			var valuesFound = {};
			callItWith('k3', (key, value, edgeValue) => {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = [value, edgeValue];
			});
			expect(valuesFound).toEqual({
				'k2': [undefined, 'oldValue23'],
				'k5': ['oldValue5', undefined]
			});
		});

		it("stops iteration if and when the callback returns false", () => {
			var counter = 0;
			callItWith('k3', (/*key, value*/) => {
				counter += 1;
				if (counter === 1) { return false }
			});
			expect(counter).toEqual(1);
		});

		it("does not stop iteration when the callback returns a non-false falsey value", () => {
			var counter;

			[undefined, null, 0, "", NaN].forEach((falsey) => {
				counter = 0;
				callItWith('k3', (/*key, value*/) => {
					counter += 1;
					if (counter === 1) { return falsey }
				});
				expect(counter).toEqual(2);
			});
		});

	});


	describeMethod('eachVertexWithPathFrom', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey', () => {}).toThrow();
			expectItWhenBoundWith('newKey', () => {}).toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1', () => {}).not.toThrow();
		});

		it("does not change the graph if the specified handler doesn't", () => {
			callItWith('k2', () => {
				// not changing the graph from here
			});
			expectTheGraphNotToHaveChanged();
		});

		it("calls the specified handler exactly once for each vertex that is reachable from the given vertex, in no particular order", () => {
			var valuesFound = {};
			callItWith('k2', (key, value) => {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = value;
			});
			expect(valuesFound).toEqual({
				'k3': undefined,
				'k5': 'oldValue5',
				'k4': undefined
			});
		});

		it("stops iteration if and when the callback returns false", () => {
			var counter = 0;
			callItWith('k2', (/*key, value*/) => {
				counter += 1;
				if (counter === 1) { return false }
			});
			expect(counter).toEqual(1);
		});

		it("does not stop iteration when the callback returns a non-false falsey value", () => {
			var counter;

			[undefined, null, 0, "", NaN].forEach((falsey) => {
				counter = 0;
				callItWith('k2', (/*key, value*/) => {
					counter += 1;
					if (counter === 1) { return falsey }
				});
				expect(counter).toEqual(3);
			});
		});

	});


	describeMethod('eachVertexWithPathTo', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey', () => {}).toThrow();
			expectItWhenBoundWith('newKey', () => {}).toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1', () => {}).not.toThrow();
		});

		it("does not change the graph if the specified handler doesn't", () => {
			callItWith('k2', () => {
				// not changing the graph from here
			});
			expectTheGraphNotToHaveChanged();
		});

		it("calls the specified handler exactly once for each vertex that has a path to reach the given vertex, in no particular order", () => {
			var valuesFound = {};
			callItWith('k4', (key, value) => {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = value;
			});
			expect(valuesFound).toEqual({
				'k2': undefined,
				'k3': undefined,
				'k5': 'oldValue5'
			});
		});

		it("stops iteration if and when the callback returns false", () => {
			var counter = 0;
			callItWith('k4', (/*key, value*/) => {
				counter += 1;
				if (counter === 1) { return false }
			});
			expect(counter).toEqual(1);
		});

		it("does not stop iteration when the callback returns a non-false falsey value", () => {
			var counter;

			[undefined, null, 0, "", NaN].forEach((falsey) => {
				counter = 0;
				callItWith('k4', (/*key, value*/) => {
					counter += 1;
					if (counter === 1) { return falsey }
				});
				expect(counter).toEqual(3);
			});
		});

	});


	describeMethod('eachEdge', () => {

		it("throws nothing when passed a non-throwing function", () => {
			expectItWhenBoundWith(() => {/*not throwing things*/}).not.toThrow();
		});

		it("does not change the graph if the specified handler doesn't", () => {
			callItWith(() => {
				// not changing the graph from here
			});
			expectTheGraphNotToHaveChanged();
		});

		it("calls the specified handler exactly once for each edge in the graph", () => {
			var edgesFound = {};
			callItWith((from, to, value) => {
				var key = from + ", " + to;
				expect(edgesFound[key]).toBeUndefined();
				edgesFound[key] = value;
			});
			expect(edgesFound).toEqual(originalEdges);
		});

		it("stops iteration if and when the callback returns false", () => {
			var counter = 0;
			callItWith((/*key, value*/) => {
				counter += 1;
				if (counter === 3) { return false }
			});
			expect(counter).toEqual(3);
		});

		it("does not stop iteration when the callback returns a non-false falsey value", () => {
			var counter;

			[undefined, null, 0, "", NaN].forEach((falsey) => {
				counter = 0;
				callItWith((/*key, value*/) => {
					counter += 1;
					if (counter === 1) { return falsey }
				});
				expect(counter).toEqual(4);
			});
		});

	});


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	function it_throwsErrorIfVertexExists() {
		it("throws an error if a vertex with the given key already exists", () => {
			expectItWhenBoundWith('k1').toThrow();
			expectItWhenBoundWith('k2').toThrow();
			expectItWhenBoundWith('k1').toThrowSpecific(JsGraph.VertexExistsError, { vertices: {'k1': 'oldValue1'} });
			expectItWhenBoundWith('k2').toThrowSpecific(JsGraph.VertexExistsError, { vertices: {'k2': undefined} });
		});
	}

	function it_throwsErrorIfVertexDoesNotExist() {
		it("throws an error if a vertex with the given key does not exist", () => {
			expectItWhenBoundWith('newKey').toThrow();
			expectItWhenBoundWith('newKey').toThrowSpecific(JsGraph.VertexNotExistsError, { vertices: {'newKey': undefined} });
		});
	}

	function it_throwsErrorIfEdgesAreConnected() {
		it("throws an error if there are edges connected to that vertex", () => {
			expectItWhenBoundWith('k2').toThrow();
			expectItWhenBoundWith('k3').toThrow();
			expectItWhenBoundWith('k4').toThrow();
			expectItWhenBoundWith('k2').toThrowSpecific(JsGraph.HasConnectedEdgesError, { key: 'k2' });
			expectItWhenBoundWith('k3').toThrowSpecific(JsGraph.HasConnectedEdgesError, { key: 'k3' });
			expectItWhenBoundWith('k4').toThrowSpecific(JsGraph.HasConnectedEdgesError, { key: 'k4' });
		});
	}

	function it_throwsNothing() {
		it("throws no exceptions when called", () => {
			expectItWhenBoundWith().not.toThrow();
		});
	}

	function it_throwsNothingIfVertexDoesNotExist() {
		it("throws no exceptions if a vertex with that key does not exist", () => {
			expectItWhenBoundWith('newKey').not.toThrow();
		});
	}

	function it_throwsNothingIfVertexExists() {
		it("throws no exceptions if a vertex with that key exists", () => {
			expectItWhenBoundWith('k1').not.toThrow();
			expectItWhenBoundWith('k2').not.toThrow();
			expectItWhenBoundWith('k3').not.toThrow();
			expectItWhenBoundWith('k4').not.toThrow();
			expectItWhenBoundWith('k5').not.toThrow();
		});
	}

	function it_throwsNothingIfUnconnectedVertexExists() {
		it("throws no exceptions if a vertex with that key exists, not connected to any edges", () => {
			expectItWhenBoundWith('k1').not.toThrow();
		});
	}

	function it_throwsNothingWhenPassedAKey() {
		it("throws no exceptions when it is passed a single key argument", () => {
			expectItWhenBoundWith('k1').not.toThrow();
			expectItWhenBoundWith('newKey').not.toThrow();
		});
	}

	function it_throwsNothingWhenPassedAKeyAndValue() {
		it("throws no exceptions when it is passed a key and a value argument", () => {
			expectItWhenBoundWith('k1', 'newValue').not.toThrow();
			expectItWhenBoundWith('newKey', 'newValue').not.toThrow();
		});
	}


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	function it_leavesNewVertexWithNewValue() {
		it("leaves a new vertex in the graph with a new value", () => {
			callItWith('newKey', 'newValue');
			expect(graph.hasVertex('newKey')).toBeTruthy();
			expect(graph.vertexValue('newKey')).toBe('newValue');
			expect(graph.vertexCount()).toBe(originalVertexCount + 1);
		});
	}

	function it_leavesNewVertexWithNewUndefinedValue() {
		it("leaves a new vertex in the graph with a new 'undefined' value", () => {
			callItWith('newKey');
			expect(graph.hasVertex('newKey')).toBeTruthy();
			expect(graph.vertexValue('newKey')).toBeUndefined();
			expect(graph.vertexCount()).toBe(originalVertexCount + 1);
		});
	}

	function it_leavesExistingVertexWithNewValue() {
		it("leaves an existing vertex in the graph with a new value", () => {
			callItWith('k1', 'newValue');
			expect(graph.hasVertex('k1')).toBeTruthy();
			expect(graph.vertexValue('k1')).toBe('newValue');
			expect(graph.vertexCount()).toBe(originalVertexCount);
		});
	}

	function it_leavesExistingVertexWithNewUndefinedValue() {
		it("leaves an existing vertex in the graph with a new 'undefined' value", () => {
			callItWith('k1');
			expect(graph.hasVertex('k1')).toBeTruthy();
			expect(graph.vertexValue('k1')).toBeUndefined();
			expect(graph.vertexCount()).toBe(originalVertexCount);
		});
	}

	function it_leavesExistingVertexWithOldValue() {
		it("leaves an existing vertex in the graph with its old value", () => {
			callItWith('k1', 'newValue');
			expect(graph.hasVertex('k1')).toBeTruthy();
			expect(graph.vertexValue('k1')).toBe('oldValue1');
			expect(graph.vertexCount()).toBe(originalVertexCount);
			callItWith('k1', undefined);
			expect(graph.hasVertex('k1')).toBeTruthy();
			expect(graph.vertexValue('k1')).toBe('oldValue1');
			expect(graph.vertexCount()).toBe(originalVertexCount);
		});
	}

	function it_leavesExistingVertexWithOldUndefinedValue() {
		it("leaves an existing vertex in the graph with its old 'undefined' value", () => {
			callItWith('k2', 'newValue');
			expect(graph.hasVertex('k2')).toBeTruthy();
			expect(graph.vertexValue('k2')).toBeUndefined();
			expect(graph.vertexCount()).toBe(originalVertexCount);
		});
	}

	function it_leavesExistingVertexAbsent() {
		it("leaves an existing vertex absent from the graph", () => {
			callItWith('k1');
			expect(graph.hasVertex('k1')).toBeFalsy();
			expect(graph.vertexCount()).toBe(originalVertexCount - 1);
		});
	}

	function it_leavesConnectedEdgesAbsent() {
		it("leaves existing connected edges absent from the graph", () => {
			callItWith('k3');
			expect(graph.hasEdge('k2', 'k3')).toBeFalsy();
			expect(graph.hasEdge('k3', 'k4')).toBeFalsy();
			expect(graph.hasEdge('k4', 'k3')).toBeFalsy();
			expect(graph.edgeCount()).toBe(originalEdgeCount - 3);
		});
	}

	function it_leavesAbsentVertexAbsent() {
		it("leaves an absent vertex absent from the graph", () => {
			callItWith('newKey');
			expect(graph.hasVertex('newKey')).toBeFalsy();
			expect(graph.vertexCount()).toBe(originalVertexCount);
		});
	}


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


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


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	function it_throwsErrorIfEdgeExists() {
		it("throws an error if an edge with the given keys already exists", () => {
			expectItWhenBoundWith('k2', 'k3').toThrow();
			expectItWhenBoundWith('k3', 'k4').toThrow();
			expectItWhenBoundWith('k2', 'k3').toThrowSpecific(JsGraph.EdgeExistsError, { edges: {'k2': {'k3': 'oldValue23'}} });
			expectItWhenBoundWith('k3', 'k4').toThrowSpecific(JsGraph.EdgeExistsError, { edges: {'k3': {'k4': undefined}} });
		});
	}

	function it_throwsErrorIfEdgeDoesNotExist() {
		it("throws an error if an edge with the given keys does not exist", () => {
			expectItWhenBoundWith('k1', 'k2').toThrow();
			expectItWhenBoundWith('k1', 'k2').toThrowSpecific(JsGraph.EdgeNotExistsError, { edges: {'k1': {'k2': undefined}} });
		});
	}

	function it_throwsErrorIfVerticesDoNotExist() {
		it("throws an error if the required vertices do not exist", () => {
			expectItWhenBoundWith('newKey1', 'newKey2').toThrow();
			expectItWhenBoundWith('k1', 'newKey3').toThrow();
			expectItWhenBoundWith('newKey4', 'k2').toThrow();
			expectItWhenBoundWith('newKey1', 'newKey2').toThrowSpecific(JsGraph.VertexNotExistsError, { vertices: {'newKey1': undefined, 'newKey2': undefined} });
			expectItWhenBoundWith('k1', 'newKey3').toThrowSpecific(JsGraph.VertexNotExistsError, { vertices: {'newKey3': undefined} });
			expectItWhenBoundWith('newKey4', 'k2').toThrowSpecific(JsGraph.VertexNotExistsError, { vertices: {'newKey4': undefined} });
		});
	}

	function it_throwsNothingIfEdgeDoesNotExist() {
		it("throws nothing if the edge does not exist", () => {
			expectItWhenBoundWith('k1', 'k2').not.toThrow();
			expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
		});
	}

	function it_throwsNothingIfEdgeExists() {
		it("throws nothing if the edge exists", () => {
			expectItWhenBoundWith('k2', 'k3').not.toThrow();
			expectItWhenBoundWith('k3', 'k4').not.toThrow();
		});
	}

	function it_throwsNothingIfVerticesExistAndEdgeDoesNot() {
		it("throws nothing if the required vertices exist but the edge does not", () => {
			expectItWhenBoundWith('k1', 'k2').not.toThrow();
		});
	}

	function it_throwsNothingIfVerticesExist() {
		it("throws nothing if the required vertices exist", () => {
			expectItWhenBoundWith('k1', 'k2').not.toThrow();
			expectItWhenBoundWith('k2', 'k3').not.toThrow();
			expectItWhenBoundWith('k3', 'k4').not.toThrow();
		});
	}

	function it_throwsNothingWhenPassedTwoKeys() {
		it("throws no exceptions when it is passed two key arguments", () => {
			expectItWhenBoundWith('k1', 'k2').not.toThrow();
			expectItWhenBoundWith('k2', 'k3').not.toThrow();
			expectItWhenBoundWith('k3', 'k4').not.toThrow();
			expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
		});
	}

	function it_throwsNothingWhenPassedTwoKeysAndValue() {
		it("throws no exceptions when it is passed two keys and a value argument", () => {
			expectItWhenBoundWith('k1', 'k2', 'newValue').not.toThrow();
			expectItWhenBoundWith('k2', 'k3', 'newValue').not.toThrow();
			expectItWhenBoundWith('k3', 'k4', 'newValue').not.toThrow();
			expectItWhenBoundWith('newKey1', 'newKey2', 'newValue').not.toThrow();
		});
	}


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	function it_leavesNewEdgeWithNewValue() {
		it("leaves a new edge in the graph with a new value", () => {
			callItWith('k1', 'k2', 'newValue');
			expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
			expect(graph.edgeValue('k1', 'k2')).toBe('newValue');
			expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
		});
	}

	function it_leavesNewEdgeWithNewUndefinedValue() {
		it("leaves a new edge in the graph with a new 'undefined' value", () => {
			callItWith('k1', 'k2');
			expect(graph.hasEdge('k1', 'k2')).toBeTruthy();
			expect(graph.edgeValue('k1', 'k2')).toBeUndefined();
			expect(graph.edgeCount()).toBe(originalEdgeCount + 1);
		});
	}

	function it_leavesExistingEdgeWithNewValue() {
		it("leaves an existing edge in the graph with a new value", () => {
			callItWith('k2', 'k3', 'newValue');
			expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
			expect(graph.edgeValue('k2', 'k3')).toBe('newValue');
			expect(graph.edgeCount()).toBe(originalEdgeCount);
		});
	}

	function it_leavesExistingEdgeWithNewUndefinedValue() {
		it("leaves an existing edge in the graph with a new 'undefined' value", () => {
			callItWith('k2', 'k3');
			expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
			expect(graph.edgeValue('k2', 'k3')).toBeUndefined();
			expect(graph.edgeCount()).toBe(originalEdgeCount);
		});
	}

	function it_leavesExistingEdgeWithOldValue() {
		it("leaves an existing edge in the graph with its old value", () => {
			callItWith('k2', 'k3', 'newValue');
			expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
			expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
			expect(graph.edgeCount()).toBe(originalEdgeCount);
			callItWith('k2', 'k3', undefined);
			expect(graph.hasEdge('k2', 'k3')).toBeTruthy();
			expect(graph.edgeValue('k2', 'k3')).toBe('oldValue23');
			expect(graph.edgeCount()).toBe(originalEdgeCount);
		});
	}

	function it_leavesExistingEdgeWithOldUndefinedValue() {
		it("leaves an existing edge in the graph with its old 'undefined' value", () => {
			callItWith('k3', 'k4', 'newValue');
			expect(graph.hasEdge('k3', 'k4')).toBeTruthy();
			expect(graph.edgeValue('k3', 'k4')).toBeUndefined();
			expect(graph.edgeCount()).toBe(originalEdgeCount);
		});
	}

	function it_leavesExistingEdgeAbsent() {
		it("leaves an existing edge absent from the graph", () => {
			callItWith('k2', 'k3');
			expect(graph.hasEdge('k2', 'k3')).toBeFalsy();
			expect(graph.edgeCount()).toBe(originalEdgeCount - 1);
			callItWith('k3', 'k4');
			expect(graph.hasEdge('k3', 'k4')).toBeFalsy();
			expect(graph.edgeCount()).toBe(originalEdgeCount - 2);
		});
	}

	function it_leavesAbsentEdgeAbsent() {
		it("leaves an absent edge absent from the graph", () => {
			callItWith('k1', 'k2');
			expect(graph.hasEdge('k1', 'k2')).toBeFalsy();
			expect(graph.edgeCount()).toBe(originalEdgeCount);
		});
	}

	function it_leavesAbsentVerticesPresent() {
		it("leaves absent vertices present in the graph", () => {
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
	}


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


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


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	describeMethod('clearEdges', () => {

		it("throws nothing", () => {
			expectItWhenBoundWith().not.toThrow();
		});

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

		it("throws nothing", () => {
			expectItWhenBoundWith().not.toThrow();
		});

		it("leaves the graph without edges", () => {
			callItWith();
			expect(graph.edgeCount()).toBe(0);
		});

		it("leaves the graph without vertices", () => {
			callItWith();
			expect(graph.vertexCount()).toBe(0);
		});

	});


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	describeMethod('onAddVertex', () => {

		it("throws no exceptions when passed a function", () => {
			expectItWhenBoundWith(() => { throw new Error("should not be thrown"); }).not.toThrow();
		});

		it("does not modify the graph", () => {
			callItWith(() => {
				graph = null;
			});
			expectTheGraphNotToHaveChanged();
		});

		it("causes the handler to be called after a new vertex is added", () => {
			var addedVertices = {};
			callItWith((key, value) => {
				expect(graph.hasVertex(key)).toBeTruthy();
				addedVertices[key] = value;
			});
			graph.addNewVertex('newKey', 'newValue');
			expect(addedVertices).toEqual({ 'newKey': 'newValue' });
		});

		it("does not cause the handler to be called when an existing vertex is modified", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.setVertex('k1', 'newValue');
			graph.setVertex('k2', 'newValue');
		});

		it("does not cause the handler to be called when an existing vertex is removed", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.removeExistingVertex('k1');
		});

		it("causes the handler to be called after a previously removed vertex is added again", () => {
			var vertices = {};
			callItWith((key, value) => {
				expect(graph.hasVertex(key)).toBeTruthy();
				vertices[key] = value;
			});
			graph.removeExistingVertex('k1');
			expect(vertices).toEqual({});
			graph.addNewVertex('k1', 'oldValue1');
			expect(vertices).toEqual({ 'k1': 'oldValue1' });
		});

		it("does not cause the handler to be called after the handler is removed", () => {
			var registeredAddedVertices = {};
			var removeCallback = callItWith((key, value) => {
				registeredAddedVertices[key] = value;
			});
			graph.addNewVertex('newKey', 'newValue');
			expect(registeredAddedVertices).toEqual({ 'newKey': 'newValue' });
			removeCallback();
			graph.addNewVertex('newKey2', 'newValue2');
			expect(registeredAddedVertices).toEqual({ 'newKey': 'newValue' });
		});

	});


	describeMethod('onAddEdge', () => {

		it("throws no exceptions when passed a function", () => {
			expectItWhenBoundWith(() => { throw new Error("should not be thrown"); }).not.toThrow();
		});

		it("does not modify the graph", () => {
			callItWith(() => {
				graph = null;
			});
			expectTheGraphNotToHaveChanged();
		});

		it("causes the handler to be called after a new edge is added", () => {
			var addedEdges = {};
			callItWith((from, to, value) => {
				expect(graph.hasEdge(from, to)).toBeTruthy();
				addedEdges[from + ", " + to] = value;
			});
			graph.addNewEdge('k1', 'k2', 'newValue');
			expect(addedEdges).toEqual({ 'k1, k2': 'newValue' });
		});

		it("does not cause the handler to be called when an existing edge is modified", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.setEdge('k2', 'k3', 'newValue');
			graph.setEdge('k3', 'k4', 'newValue');
		});

		it("does not cause the handler to be called when an existing edge is removed", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.removeExistingEdge('k2', 'k3');
		});

		it("causes the handler to be called after a previously removed edge is added again", () => {
			var edges = {};
			callItWith((from, to, value) => {
				expect(graph.hasEdge(from, to)).toBeTruthy();
				edges[from + ", " + to] = value;
			});
			graph.removeExistingEdge('k2', 'k3');
			expect(edges).toEqual({});
			graph.addNewEdge('k2', 'k3', 'oldValue23');
			expect(edges).toEqual({ 'k2, k3': 'oldValue23' });
		});

		it("does not cause the handler to be called after the handler is removed", () => {
			var registeredAddedEdges = {};
			var removeCallback = callItWith((from, to, value) => {
				registeredAddedEdges[from + ", " + to] = value;
			});
			graph.addNewEdge('k1', 'k2', 'newValue');
			expect(registeredAddedEdges).toEqual({ 'k1, k2': 'newValue' });
			removeCallback();
			graph.addNewEdge('k2', 'k1', 'newValue2');
			expect(registeredAddedEdges).toEqual({ 'k1, k2': 'newValue' });
		});

	});


	describeMethod('onRemoveVertex', () => {

		it("throws no exceptions when passed a function", () => {
			expectItWhenBoundWith(() => { throw new Error("should not be thrown"); }).not.toThrow();
		});

		it("does not modify the graph", () => {
			callItWith(() => {
				graph = null;
			});
			expectTheGraphNotToHaveChanged();
		});

		it("causes the handler to be called after an existing vertex is removed", () => {
			var removedVertices = {};
			callItWith((key, value) => {
				expect(graph.hasVertex(key)).toBeFalsy();
				removedVertices[key] = value;
			});
			graph.removeExistingVertex('k1');
			expect(removedVertices).toEqual({ 'k1': 'oldValue1' });
		});

		it("does not cause the handler to be called when an existing vertex is modified", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.setVertex('k1', 'newValue');
			graph.setVertex('k2', 'newValue');
		});

		it("does not cause the handler to be called when an absent vertex is left absent", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.removeVertex('newKey');
		});

		it("does not cause the handler to be called when an absent vertex is added", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.addNewVertex('newKey');
		});

		it("does not cause the handler to be called after the handler is removed", () => {
			var registeredRemovedVertices = {};
			var removeCallback = callItWith((key, value) => {
				registeredRemovedVertices[key] = value;
			});
			graph.addNewVertex('k99', 'newValue');
			graph.removeExistingVertex('k99');
			expect(registeredRemovedVertices).toEqual({ 'k99': 'newValue' });
			removeCallback();
			graph.removeExistingVertex('k1');
			expect(registeredRemovedVertices).toEqual({ 'k99': 'newValue' });
		});

	});


	describeMethod('onRemoveEdge', () => {

		it("throws no exceptions when passed a function", () => {
			expectItWhenBoundWith(() => { throw new Error("should not be thrown"); }).not.toThrow();
		});

		it("does not modify the graph", () => {
			callItWith(() => {
				graph = null;
			});
			expectTheGraphNotToHaveChanged();
		});

		it("causes the handler to be called after an existing edge is removed", () => {
			var removedEdges = {};
			callItWith((from, to, value) => {
				expect(graph.hasEdge(from, to)).toBeFalsy();
				removedEdges[from + ", " + to] = value;
			});
			graph.removeExistingEdge('k2', 'k3');
			expect(removedEdges).toEqual({ 'k2, k3': 'oldValue23' });
		});

		it("does not cause the handler to be called when an existing edge is modified", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.setEdge('k2', 'k3', 'newValue');
			graph.setEdge('k3', 'k4', 'newValue');
		});

		it("does not cause the handler to be called when an absent edge is left absent", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.removeEdge('k1', 'k2');
		});

		it("does not cause the handler to be called when an absent edge is added", () => {
			callItWith(() => {
				expect().not.toBeReachable();
			});
			graph.addNewEdge('k1', 'k2');
		});

		it("does not cause the handler to be called after the handler is removed", () => {
			var registeredRemovedEdges = {};
			var removeCallback = callItWith((from, to, value) => {
				registeredRemovedEdges[from + ", " + to] = value;
			});
			graph.removeExistingEdge('k2', 'k3');
			expect(registeredRemovedEdges).toEqual({ 'k2, k3': 'oldValue23' });
			removeCallback();
			graph.removeExistingEdge('k3', 'k4');
			expect(registeredRemovedEdges).toEqual({ 'k2, k3': 'oldValue23' });
		});

	});


	describe("event subscription methods", () => {

		it("register each handler only once", () => {
			var counter = 0;
			var handler = () => {
				++counter;
			};
			graph.onAddVertex(handler);
			graph.onAddVertex(handler);
			graph.addNewVertex('newKey', 'newValue');
			expect(counter).toBe(1);
		});

		it("quietly ignore multiple removals of the same handler", () => {
			var counter = 0;
			graph.onAddVertex(() => { // adding a handler before the main handler
				++counter;
			});
			var removeCallback = graph.onAddVertex(() => {
				counter += 10;
			});
			graph.onAddVertex(() => { // adding a handler after the main handler
				++counter;
			});
			graph.addNewVertex('newKey', 'newValue');
			expect(counter).toBe(12);
			removeCallback();
			removeCallback();
			graph.addNewVertex('newKey2', 'newValue2');
			expect(counter).toBe(14); // meaning: the other two handlers are not accidentally removed
		});

	});


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	describeMethod('hasCycle', () => {

		it("returns true if the graph contains a cycle (1)", () => {
			graph.clear();

			graph.createEdge('n1', 'n2');
			graph.createEdge('n2', 'n3');
			graph.createEdge('n3', 'n4');
			graph.createEdge('n4', 'n5');
			graph.createEdge('n3', 'n23');
			graph.createEdge('n23', 'n2');

			// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//        ▲      ╷
			//        │      │
			//        ╵      │
			//       n23 ◀───╯

			expectItWhenCalledWith().toBe(true);
		});

		it("returns true if the graph contains a cycle (2)", () => {
			graph.clear();

			graph.createEdge('n1', 'n1');

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


	describeMethod('hasPath', () => {

		it("throws nothing when passed two key arguments", () => {
			expectItWhenBoundWith('k1', 'k2').not.toThrow();
			expectItWhenBoundWith('k2', 'k3').not.toThrow();
			expectItWhenBoundWith('newKey', 'k2').not.toThrow();
			expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
		});

		// k1     k2 ──▶ k3 ──▶ k4
		//        ╷      ▲
		//        │      │
		//        ▼      │
		//        k5 ────╯

		it("returns a falsy value if the path doesn't exist (1)", () => {
			expectItWhenCalledWith('k1', 'k2').toBeFalsy();
			expectItWhenCalledWith('k1', 'k3').toBeFalsy();
			expectItWhenCalledWith('k2', 'k1').toBeFalsy();
		});

		it("returns a falsy value if the path doesn't exist (2: self-loop)", () => {
			expectItWhenCalledWith('k2', 'k2').toBeFalsy();
		});

		it("returns a falsy value if the path doesn't exist (3: edge backwards)", () => {
			expectItWhenCalledWith('k3', 'k2').toBeFalsy();
			expectItWhenCalledWith('k4', 'k2').toBeFalsy();
		});

		it("returns a truthy value if the path exists (1: single edge)", () => {
			expectItWhenCalledWith('k2', 'k3').toBeTruthy();
			expectItWhenCalledWith('k3', 'k4').toBeTruthy();
			expectItWhenCalledWith('k2', 'k5').toBeTruthy();
			expectItWhenCalledWith('k5', 'k3').toBeTruthy();
		});

		it("returns a truthy value if the path exists (2: transitive)", () => {
			expectItWhenCalledWith('k2', 'k4').toBeTruthy();
			expectItWhenCalledWith('k5', 'k4').toBeTruthy();
			graph.addEdge('k4', 'k1');
			expectItWhenCalledWith('k2', 'k1').toBeTruthy();
		});

		it("returns a truthy value if the path exists (3: reflexive cycle)", () => {
			graph.addEdge('k1', 'k1');
			expectItWhenCalledWith('k1', 'k1').toBeTruthy();
		});

		it("returns a truthy value if the path exists (4: symmetric cycle)", () => {
			graph.addEdge('k4', 'k3');
			expectItWhenCalledWith('k3', 'k3').toBeTruthy();
		});

		it("returns a truthy value if the path exists (5: larger cycle)", () => {
			graph.addEdge('k4', 'k1');
			graph.addEdge('k1', 'k2');
			expectItWhenCalledWith('k3', 'k3').toBeTruthy();
		});

		it("returns a truthy value if the path exists (6: including part of a cycle, part 1)", () => {
			graph.clear();

			graph.createEdge('n1', 'n2');
			graph.createEdge('n2', 'n3');
			graph.createEdge('n3', 'n4');
			graph.createEdge('n4', 'n5');
			graph.createEdge('n3', 'n23');
			graph.createEdge('n23', 'n2');

			// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//        ▲      ╷
			//        │      │
			//        ╵      │
			//       n23 ◀───╯

			expectItWhenCalledWith('n1', 'n5').toBeTruthy();
		});

		it("returns a truthy value if the path exists (7: including part of a cycle, part 2)", () => {
			graph.clear();

			graph.createEdge('n3', 'n23'); // same graph as above, but creating the loopy bit
			graph.createEdge('n23', 'n2'); // first; insertion order matters for some engines
			graph.createEdge('n1', 'n2');
			graph.createEdge('n2', 'n3');
			graph.createEdge('n3', 'n4');
			graph.createEdge('n4', 'n5');

			// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//        ▲      ╷
			//        │      │
			//        ╵      │
			//       n23 ◀───╯

			expectItWhenCalledWith('n1', 'n5').toBeTruthy();
		});

	});


	describeMethod('equals', () => {

		it("throws nothing", () => {
			expectItWhenBoundWith()             .not.toThrow();
			expectItWhenBoundWith('some string').not.toThrow();
			expectItWhenBoundWith(42)           .not.toThrow();
			expectItWhenBoundWith(graph)        .not.toThrow();
		});

		// k1     k2 ──▶ k3 ──▶ k4
		//        ╷      ▲
		//        │      │
		//        ▼      │
		//        k5 ────╯

		it("returns falsy when compared to a graph with fewer vertices", () => {
			var other = graph.clone();
			graph.addNewVertex('k6');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns falsy when compared to a graph with more vertices", () => {
			var other = graph.clone();
			other.addNewVertex('k6');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns falsy when compared to a graph with different vertices", () => {
			var other = graph.clone();
			other.removeVertex('k1');
			other.addNewVertex('k6');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns falsy when compared to a graph with fewer edges", () => {
			var other = graph.clone();
			graph.addNewEdge('k1', 'k2');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns falsy when compared to a graph with more edges", () => {
			var other = graph.clone();
			other.addNewEdge('k1', 'k2');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns falsy when compared to a graph with different edges", () => {
			var other = graph.clone();
			other.addNewEdge('k1', 'k2');
			other.removeEdge('k2', 'k3');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns falsy when compared to a graph with a different vertex value", () => {
			var other = graph.clone();
			other.setVertex('k1', 'new value');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns falsy when compared to a graph with a different edge value", () => {
			var other = graph.clone();
			other.setEdge('k2', 'k3', 'new value');
			expectItWhenCalledWith(other).toBeFalsy();
		});

		it("returns truthy for graphs that are equal", () => {
			var other = graph.clone();
			expectItWhenCalledWith(other).toBeTruthy();
		});

		it("can be influenced by a custom comparison function", () => {
			var sillyComparison = (v1, v2, from, to) => {
				if (from === 'k2' && to === 'k3') { return true }
				return v1 === v2;
			};
			var other = graph.clone();
			other.setEdge('k2', 'k3', 'new value');
			expectItWhenCalledWith(other, sillyComparison).toBeTruthy();
			other.setEdge('k3', 'k4', 'new value');
			expectItWhenCalledWith(other, sillyComparison).toBeFalsy();
		});


	});


	describeMethod('eachVertexTopologically', () => {

		it("throws an error if the graph contains a cycle (1)", () => {
			graph.clear();

			graph.createEdge('n1', 'n2');
			graph.createEdge('n2', 'n3');
			graph.createEdge('n3', 'n4');
			graph.createEdge('n4', 'n5');
			graph.createEdge('n3', 'n23');
			graph.createEdge('n23', 'n2');

			// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//        ▲      ╷
			//        │      │
			//        ╵      │
			//       n23 ◀───╯

			expectItWhenBoundWith(() => {}).toThrow();
			expectItWhenBoundWith(() => {}).toThrowSpecific(JsGraph.CycleError, {});

			try {
				callItWith(() => {});
			} catch (err) {
				expect(err.cycle).toEqualOneOf(
					['n23', 'n2', 'n3'],
					['n3', 'n23', 'n2'],
					['n2', 'n3', 'n23']
				);
				var cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
				expect(cycleInMessage).toEqualOneOf(
					'n23,n2,n3',
					'n3,n23,n2',
					'n2,n3,n23'
				);
			}
		});

		it("throws an error if the graph contains a cycle (2)", () => {
			graph.clear();

			graph.createEdge('n1', 'n1');

			expectItWhenBoundWith(() => {}).toThrow();
			expectItWhenBoundWith(() => {}).toThrowSpecific(JsGraph.CycleError, {});

			try {
				callItWith(() => {});
			} catch (err) {
				expect(err.cycle).toEqual(['n1']);
				var cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
				expect(cycleInMessage).toEqual('n1');
			}
		});

		it("throws nothing if the graph has no cycle and the passed function throws nothing", () => {
			expectItWhenBoundWith(() => {/*not throwing stuff*/}).not.toThrow();
		});

		it("calls the specified handler exactly once for each vertex in the graph", () => {
			var verticesFound = {};
			callItWith((key, value) => {
				expect(verticesFound[key]).toBeUndefined();
				verticesFound[key] = value;
			});
			expect(verticesFound).toEqual(originalVertices);
		});

		it("visits vertices only when their predecessors have already been visited", () => {
			graph.clear();

			graph.createEdge('n3', 'n23');
			graph.createEdge('n2', 'n23');
			graph.createEdge('n1', 'n2');
			graph.createEdge('n2', 'n3');
			graph.createEdge('n3', 'n4');
			graph.createEdge('n4', 'n5');

			// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//        ╷      ╷
			//        │      │
			//        ▼      │
			//       n23 ◀───╯

			var visited = {};

			callItWith((key) => {
				if (key === 'n2') { expect(visited['n1']).toBeDefined(); }
				if (key === 'n3') { expect(visited['n2']).toBeDefined(); }
				if (key === 'n4') { expect(visited['n3']).toBeDefined(); }
				if (key === 'n5') { expect(visited['n4']).toBeDefined(); }
				if (key === 'n23') {
					expect(visited['n2']).toBeDefined();
					expect(visited['n3']).toBeDefined();
				}
				visited[key] = true;
			});

		});

		it("stops iteration if and when the callback returns false", () => {
			var counter = 0;
			callItWith((/*key, value*/) => {
				counter += 1;
				if (counter === 1) { return false }
			});
			expect(counter).toEqual(1);
		});

		it("does not stop iteration when the callback returns a non-false falsey value", () => {
			var counter;

			[undefined, null, 0, "", NaN].forEach((falsey) => {
				counter = 0;
				callItWith((/*key, value*/) => {
					counter += 1;
					if (counter === 1) { return falsey }
				});
				expect(counter).toEqual(5);
			});
		});

	});


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	describeMethod('clone', () => {

		it_throwsNothing();

		beforeEach(() => {
			graph.addEdge('k1', 'k3');
			graph.addEdge('k2', 'k4');
			graph.addEdge('k5', 'k4');
		});

		it("returns a new graph with the same vertices as the original", () => {
			var newGraph = callItWith();
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
			var newGraph = callItWith();
			for (let [from, to, val] of newGraph.edges()) {
				expect(graph.hasEdge(from, to)).toBeTruthy();
				expect(val).toBe(graph.edgeValue(from, to));
			}
			for (let [from, to, val] of graph.edges()) {
				expect(newGraph.hasEdge(from, to)).toBeTruthy();
				expect(val).toBe(newGraph.edgeValue(from, to));
			}
		});

		it("returns a new graph with the same vertices as the original, with values influenced by custom value transformer", () => {
			var newGraph = callItWith(v => `value:${v}`);
			for (let [key, val] of newGraph.vertices()) {
				expect(graph.hasVertex(key)).toBeTruthy();
				expect(val).toBe(`value:${graph.vertexValue(key)}`);
			}
			for (let [key, val] of graph.vertices()) {
				expect(newGraph.hasVertex(key)).toBeTruthy();
				expect(`value:${val}`).toBe(newGraph.vertexValue(key));
			}
		});

		it("returns a new graph with the same edges as the original, with values influenced by custom value transformer", () => {
			var newGraph = callItWith(v => `value:${v}`);
			for (let [from, to, val] of newGraph.edges()) {
				expect(graph.hasEdge(from, to)).toBeTruthy();
				expect(val).toBe(`value:${graph.edgeValue(from, to)}`);
			}
			for (let [from, to, val] of graph.edges()) {
				expect(newGraph.hasEdge(from, to)).toBeTruthy();
				expect(`value:${val}`).toBe(newGraph.edgeValue(from, to));
			}
		});

	});


	describeMethod('transitiveReduction', () => {

		it_throwsNothing();

		var newGraph;
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
			for (let [from, to] of newGraph.edges()) {
				newGraph.removeEdge(from, to);
				expect(newGraph.hasPath(from, to)).toBeFalsy();
				newGraph.addNewEdge(from, to);
			}
		});

		it("returns a new graph with edges that have the same values as in the original", () => {
			for (let [from, to, val] of newGraph.edges()) {
				expect(graph.edgeValue(from, to)).toBe(val);
			}
		});

	});


	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


	describe("default iterable interface", () => {

		it("iterates over each vertex in the graph", () => {
			var verticesFound = {};
			for (let [key, value] of graph) {
				expect(verticesFound[key]).toBeUndefined();
				verticesFound[key] = value;
			}
			expect(verticesFound).toEqual(originalVertices);
		});

	});


	describeMethod('vertices', () => {

		it("iterates over each vertex in the graph", () => {
			var verticesFound = {};
			for (let [key, value] of callItWith()) {
				expect(verticesFound[key]).toBeUndefined();
				verticesFound[key] = value;
			}
			expect(verticesFound).toEqual(originalVertices);
		});

	});


	describeMethod('edges', () => {

		it("iterates over each edge in the graph", () => {
			var edgesFound = {};
			for (let [from, to, value] of callItWith()) {
				var key = from + ", " + to;
				expect(edgesFound[key]).toBeUndefined();
				edgesFound[key] = value;
			}
			expect(edgesFound).toEqual(originalEdges);
		});

	});


	describeMethod('verticesFrom', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey').toThrow();
			expectItWhenBoundWith('newKey').toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1').not.toThrow();
		});

		it("iterates over each outgoing edge, providing the connected vertex key/value and edge value", () => {
			var valuesFound = {};
			for (let [key, value, edgeValue] of callItWith('k2')) {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = [value, edgeValue];
			}
			expect(valuesFound).toEqual({
				'k3': [undefined, 'oldValue23'],
				'k5': ['oldValue5', undefined]
			});
		});

	});


	describeMethod('verticesTo', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey').toThrow();
			expectItWhenBoundWith('newKey').toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1').not.toThrow();
		});

		it("iterates over each incoming edge, providing the connected vertex key/value and edge value", () => {
			var valuesFound = {};
			for (let [key, value, edgeValue] of callItWith('k3')) {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = [value, edgeValue];
			}
			expect(valuesFound).toEqual({
				'k2': [undefined, 'oldValue23'],
				'k5': ['oldValue5', undefined]
			});
		});

	});


	describeMethod('verticesWithPathFrom', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey').toThrow();
			expectItWhenBoundWith('newKey').toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1').not.toThrow();
		});

		it("iterates once over each vertex that is reachable from the given vertex, in no particular order", () => {
			var valuesFound = {};
			for (let [key, value] of callItWith('k2')) {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = value;
			}
			expect(valuesFound).toEqual({
				'k3': undefined,
				'k5': 'oldValue5',
				'k4': undefined
			});
		});

	});


	describeMethod('verticesWithPathTo', () => {

		it("throws an error if the given vertex does not exist", () => {
			expectItWhenBoundWith('newKey').toThrow();
			expectItWhenBoundWith('newKey').toThrowSpecific(JsGraph.VertexNotExistsError, {'newKey': undefined});
		});

		it("throws nothing if the given vertex exists", () => {
			expectItWhenBoundWith('k1').not.toThrow();
		});

		it("iterates once over each vertex that has a path to reach the given vertex, in no particular order", () => {
			var valuesFound = {};
			for (let [key, value] of callItWith('k4')) {
				expect(valuesFound[key]).toBeUndefined();
				valuesFound[key] = value;
			}
			expect(valuesFound).toEqual({
				'k2': undefined,
				'k3': undefined,
				'k5': 'oldValue5'
			});
		});

	});


	describeMethod('vertices_topologically', () => {

		it("throws an error if the graph contains a cycle (1)", () => {
			graph.clear();

			graph.createEdge('n1', 'n2');
			graph.createEdge('n2', 'n3');
			graph.createEdge('n3', 'n4');
			graph.createEdge('n4', 'n5');
			graph.createEdge('n3', 'n23');
			graph.createEdge('n23', 'n2');

			// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//        ▲      ╷
			//        │      │
			//        ╵      │
			//       n23 ◀───╯

			expect(() => [...callItWith()]).toThrow();
			expect(() => [...callItWith()]).toThrowSpecific(JsGraph.CycleError, {});

			try {
				var x = [...callItWith()];
			} catch (err) {
				expect(err.cycle).toEqualOneOf(
					['n23', 'n2', 'n3'],
					['n3', 'n23', 'n2'],
					['n2', 'n3', 'n23']
				);
				var cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
				expect(cycleInMessage).toEqualOneOf(
					'n23,n2,n3',
					'n3,n23,n2',
					'n2,n3,n23'
				);
			}
		});

		it("throws an error if the graph contains a cycle (2)", () => {
			graph.clear();

			graph.createEdge('n1', 'n1');

			expect(() => [...callItWith()]).toThrow();
			expect(() => [...callItWith()]).toThrowSpecific(JsGraph.CycleError, {});

			try {
				var x = [...callItWith()];
			} catch (err) {
				expect(err.cycle).toEqual(['n1']);
				var cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
				expect(cycleInMessage).toEqual('n1');
			}
		});

		it("throws nothing if the graph has no cycle and the passed function throws nothing", () => {
			expect(() => [...callItWith()]).not.toThrow();
		});

		it("iterates over each vertex in the graph exactly once", () => {
			var verticesFound = {};
			for (let [key, value] of callItWith()) {
				expect(verticesFound[key]).toBeUndefined();
				verticesFound[key] = value;
			}
			expect(verticesFound).toEqual(originalVertices);
		});

		it("visits vertices only when their predecessors have already been visited", () => {
			graph.clear();

			graph.createEdge('n3', 'n23');
			graph.createEdge('n2', 'n23');
			graph.createEdge('n1', 'n2');
			graph.createEdge('n2', 'n3');
			graph.createEdge('n3', 'n4');
			graph.createEdge('n4', 'n5');

			// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
			//        ╷      ╷
			//        │      │
			//        ▼      │
			//       n23 ◀───╯

			var visited = {};

			for (let [key] of callItWith()) {
				if (key === 'n2') { expect(visited['n1']).toBeDefined(); }
				if (key === 'n3') { expect(visited['n2']).toBeDefined(); }
				if (key === 'n4') { expect(visited['n3']).toBeDefined(); }
				if (key === 'n5') { expect(visited['n4']).toBeDefined(); }
				if (key === 'n23') {
					expect(visited['n2']).toBeDefined();
					expect(visited['n3']).toBeDefined();
				}
				visited[key] = true;
			}
		});

	});








});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
