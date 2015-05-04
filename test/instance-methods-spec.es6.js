import {any} from './helpers.es6.js';
import Graph from '../src/graph.es6.js';


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


/* add equality tester for graphs; its validity is justified by the tests for the `equals` method */
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


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


/* declare and initialize the initial graph */
let graph;
beforeEach(() => {
	graph = new Graph();
});


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


/* bookkeeping for method tests */
let methodUnderTest = "";

function describeMethod(method, fn) {
	describe(`the '${method}' method`, () => {
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
	let args = arguments;
	return expect(() => {
		graph[methodUnderTest].apply(graph, args);
	});
}

function expectItWhenCalledWith() {
	let args = Array.prototype.slice.call(arguments, 0);
	return expect(graph[methodUnderTest].apply(graph, args));
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


let originalVertices, originalEdges, originalVertexCount, originalEdgeCount;


function expectTheGraphNotToHaveChanged() {
	let vertices = {};
	for (let [key, value] of graph.vertices()) {
		vertices[key] = value;
	}
	expect(vertices).toEqual(originalVertices);

	let edges = {};
	for (let [from, to, value] of graph.edges()) {
		edges[from + ", " + to] = value;
	}
	expect(edges).toEqual(originalEdges);
}


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
	originalVertices = {
		'k1': "oldValue1",
		'k2': undefined,
		'k3': undefined,
		'k4': undefined,
		'k5': "oldValue5"
	};
	originalEdges = {
		'k2, k3': "oldValue23",
		'k3, k4': undefined,
		'k2, k5': undefined,
		'k5, k3': undefined
	};
	originalVertexCount = Object.keys(originalVertices).length;
	originalEdgeCount   = Object.keys(originalEdges)   .length;

	/* and we now 'expect' that those variables are set correctly */
	expectTheGraphNotToHaveChanged();
});


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


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
function it_throwsNothingWhenPassedAnotherGraph() {
	it("throws no exceptions when it is passed another graph as an argument", () => {
		let g = new Graph();
		expectItWhenBoundWith(g).not.toThrow();
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
function it_throwsErrorIfVertexExists() {
	it("throws an error if a vertex with the given key already exists", () => {
		expectItWhenBoundWith('k1').toThrowSpecific(Graph.VertexExistsError, { vertices: new Set([ ['k1', 'oldValue1'] ]) });
		expectItWhenBoundWith('k2').toThrowSpecific(Graph.VertexExistsError, { vertices: new Set([ ['k2',  undefined ] ]) });
	});
}
function it_throwsErrorIfVertexDoesNotExist() {
	it("throws an error if a vertex with the given key does not exist", () => {
		expectItWhenBoundWith('newKey').toThrow();
		expectItWhenBoundWith('newKey').toThrowSpecific(Graph.VertexNotExistsError, { vertices: new Set(['newKey']) });
	});
}
function it_throwsErrorIfEdgesAreConnected() {
	it("throws an error if there are edges connected to that vertex", () => {
		expectItWhenBoundWith('k2').toThrow();
		expectItWhenBoundWith('k3').toThrow();
		expectItWhenBoundWith('k4').toThrow();
		expectItWhenBoundWith('k2').toThrowSpecific(Graph.HasConnectedEdgesError, { key: 'k2' });
		expectItWhenBoundWith('k3').toThrowSpecific(Graph.HasConnectedEdgesError, { key: 'k3' });
		expectItWhenBoundWith('k4').toThrowSpecific(Graph.HasConnectedEdgesError, { key: 'k4' });
	});
}
function it_throwsErrorIfEdgeExists() {
	it("throws an error if an edge with the given keys already exists", () => {
		expectItWhenBoundWith('k2', 'k3').toThrowSpecific(Graph.EdgeExistsError, { edges: new Set([ [['k2', 'k3'], 'oldValue23'] ]) });
		expectItWhenBoundWith('k3', 'k4').toThrowSpecific(Graph.EdgeExistsError, { edges: new Set([ [['k3', 'k4'],  undefined  ] ]) });
	});
}
function it_throwsErrorIfEdgeDoesNotExist() {
	it("throws an error if an edge with the given keys does not exist", () => {
		expectItWhenBoundWith('k1', 'k2').toThrow();
		expectItWhenBoundWith('k1', 'k2').toThrowSpecific(Graph.EdgeNotExistsError, { edges: new Set([ ['k1', 'k2'] ]) });
	});
}
function it_throwsErrorIfVerticesDoNotExist() {
	it("throws an error if the required vertices do not exist", () => {
		expectItWhenBoundWith('newKey1', 'newKey2').toThrowSpecific(Graph.VertexNotExistsError, { vertices: new Set([ 'newKey1', 'newKey2' ]) });
		expectItWhenBoundWith('k1',      'newKey3').toThrowSpecific(Graph.VertexNotExistsError, { vertices: new Set([ 'newKey3'            ]) });
		expectItWhenBoundWith('newKey4', 'k2'     ).toThrowSpecific(Graph.VertexNotExistsError, { vertices: new Set([ 'newKey4'            ]) });
	});
}
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


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


describe("the constructor", () => {

	it("can be used to add vertices and edges to the new graph right away", () => {

		let newGraph = new Graph(
			['k1', "oldValue1"],
			['k2'             ],
			['k3'             ],
			['k4', undefined  ], // specifying 'undefined' as value is optional
			['k5', "oldValue5"],
			[['k2', 'k3'], "oldValue23"],
			[['k3', 'k4']              ],
			[['k2', 'k5']              ],
			[['k5', 'k3'], undefined   ] // specifying 'undefined' as value is optional
		);

		expect(newGraph).toEqual(graph);

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


describeMethod('cycle', () => {

	it_throwsNothing();

	it("returns a descriptive array if the graph contains a cycle (1)", () => {
		graph = new Graph(
			[['n1', 'n2']],
			[['n2', 'n3']],
			[['n3', 'n4']],
			[['n4', 'n5']],
			[['n3', 'n23']],
			[['n23', 'n2']]
		);

		// n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//        ▲      ╷
		//        │      │
		//        ╵      │
		//       n23 ◀───╯

		expectItWhenCalledWith().toEqualOneOf(
			['n23', 'n2', 'n3'],
			['n3', 'n23', 'n2'],
			['n2', 'n3', 'n23']
		);
	});

	it("returns a descriptive array if the graph contains a cycle (2)", () => {
		graph = new Graph([['n1', 'n1']]);
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
		graph = new Graph(
			[['n1', 'n2']],
			[['n2', 'n3']],
			[['n3', 'n4']],
			[['n4', 'n5']],
			[['n3', 'n23']],
			[['n23', 'n2']]
		);

		//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//         ▲      ╷
		//         │      │
		//         ╵      │
		//        n23 ◀───╯

		expectItWhenCalledWith().toBe(true);
	});

	it("returns true if the graph contains a cycle (2)", () => {
		graph = new Graph([['n1', 'n1']]);
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


describeMethod('path', () => {

	it("throws nothing when passed two key arguments", () => {
		expectItWhenBoundWith('k1', 'k2').not.toThrow();
		expectItWhenBoundWith('k2', 'k3').not.toThrow();
		expectItWhenBoundWith('newKey', 'k2').not.toThrow();
		expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
	});

	it("returns null if the path doesn't exist (1)", () => {
		expectItWhenCalledWith('k1', 'k2').toBeNull();
		expectItWhenCalledWith('k1', 'k3').toBeNull();
		expectItWhenCalledWith('k2', 'k1').toBeNull();
	});

	it("returns null if the path doesn't exist (2: self-loop)", () => {
		expectItWhenCalledWith('k2', 'k2').toBeNull();
	});

	it("returns null if the path doesn't exist (3: edge backwards)", () => {
		expectItWhenCalledWith('k3', 'k2').toBeNull();
		expectItWhenCalledWith('k4', 'k2').toBeNull();
	});

	it("returns a descriptive array if the path exists (1: single edge)", () => {
		expectItWhenCalledWith('k2', 'k3').toEqual(['k2', 'k3']);
		expectItWhenCalledWith('k3', 'k4').toEqual(['k3', 'k4']);
		expectItWhenCalledWith('k2', 'k5').toEqual(['k2', 'k5']);
		expectItWhenCalledWith('k5', 'k3').toEqual(['k5', 'k3']);
	});

	it("returns a descriptive array if the path exists (2: transitive)", () => {
		expectItWhenCalledWith('k2', 'k4').toEqualOneOf(
			['k2', 'k3', 'k4'],
			['k2', 'k5', 'k3', 'k4']
		);
		expectItWhenCalledWith('k5', 'k4').toEqual(['k5', 'k3', 'k4']);
		graph.addNewEdge('k4', 'k1');
		expectItWhenCalledWith('k2', 'k1').toEqualOneOf(
			['k2', 'k3', 'k4', 'k1'],
			['k2', 'k5', 'k3', 'k4', 'k1']
		);
	});

	it("returns a descriptive array if the path exists (3: reflexive cycle)", () => {
		graph.addNewEdge('k1', 'k1');
		expectItWhenCalledWith('k1', 'k1').toEqual(['k1', 'k1']);
	});

	it("returns a descriptive array if the path exists (4: symmetric cycle)", () => {
		graph.addNewEdge('k4', 'k3');
		expectItWhenCalledWith('k3', 'k3').toEqual(['k3', 'k4', 'k3']);
	});

	it("returns a descriptive array if the path exists (5: larger cycle)", () => {
		graph.addNewEdge('k4', 'k1');
		graph.addNewEdge('k1', 'k2');
		expectItWhenCalledWith('k3', 'k3').toEqualOneOf(
			['k3', 'k4', 'k1', 'k2', 'k3'],
			['k3', 'k4', 'k1', 'k2', 'k5', 'k3']
		);
	});

	it("returns a descriptive array if the path exists (6: including part of a cycle, part 1)", () => {
		graph.clear();

		graph.createEdge('n1', 'n2');
		graph.createEdge('n2', 'n3');
		graph.createEdge('n3', 'n4');
		graph.createEdge('n4', 'n5');
		graph.createEdge('n3', 'n23');
		graph.createEdge('n23', 'n2');

		//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//         ▲      ╷
		//         │      │
		//         ╵      │
		//        n23 ◀───╯

		expectItWhenCalledWith('n1', 'n5').toEqual(['n1', 'n2', 'n3', 'n4', 'n5']);
	});

	it("returns a descriptive array if the path exists (7: including part of a cycle, part 2)", () => {
		graph.clear();

		graph.createEdge('n3', 'n23'); // same graph as above, but creating the loopy bit
		graph.createEdge('n23', 'n2'); // first; insertion order matters for some engines
		graph.createEdge('n1', 'n2');
		graph.createEdge('n2', 'n3');
		graph.createEdge('n3', 'n4');
		graph.createEdge('n4', 'n5');

		//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//         ▲      ╷
		//         │      │
		//         ╵      │
		//        n23 ◀───╯

		expectItWhenCalledWith('n1', 'n5').toEqual(['n1', 'n2', 'n3', 'n4', 'n5']);
	});

});


describeMethod('hasPath', () => {

	it("throws nothing when passed two key arguments", () => {
		expectItWhenBoundWith('k1', 'k2').not.toThrow();
		expectItWhenBoundWith('k2', 'k3').not.toThrow();
		expectItWhenBoundWith('newKey', 'k2').not.toThrow();
		expectItWhenBoundWith('newKey1', 'newKey2').not.toThrow();
	});

	it("returns false if the path doesn't exist (1)", () => {
		expectItWhenCalledWith('k1', 'k2').toBe(false);
		expectItWhenCalledWith('k1', 'k3').toBe(false);
		expectItWhenCalledWith('k2', 'k1').toBe(false);
	});

	it("returns false if the path doesn't exist (2: self-loop)", () => {
		expectItWhenCalledWith('k2', 'k2').toBe(false);
	});

	it("returns false if the path doesn't exist (3: edge backwards)", () => {
		expectItWhenCalledWith('k3', 'k2').toBe(false);
		expectItWhenCalledWith('k4', 'k2').toBe(false);
	});

	it("returns true if the path exists (1: single edge)", () => {
		expectItWhenCalledWith('k2', 'k3').toBe(true);
		expectItWhenCalledWith('k3', 'k4').toBe(true);
		expectItWhenCalledWith('k2', 'k5').toBe(true);
		expectItWhenCalledWith('k5', 'k3').toBe(true);
	});

	it("returns true if the path exists (2: transitive)", () => {
		expectItWhenCalledWith('k2', 'k4').toBe(true);
		expectItWhenCalledWith('k5', 'k4').toBe(true);
		graph.addEdge('k4', 'k1');
		expectItWhenCalledWith('k2', 'k1').toBe(true);
	});

	it("returns true if the path exists (3: reflexive cycle)", () => {
		graph.addEdge('k1', 'k1');
		expectItWhenCalledWith('k1', 'k1').toBe(true);
	});

	it("returns true if the path exists (4: symmetric cycle)", () => {
		graph.addEdge('k4', 'k3');
		expectItWhenCalledWith('k3', 'k3').toBe(true);
	});

	it("returns true if the path exists (5: larger cycle)", () => {
		graph.addEdge('k4', 'k1');
		graph.addEdge('k1', 'k2');
		expectItWhenCalledWith('k3', 'k3').toBe(true);
	});

	it("returns true if the path exists (6: including part of a cycle, part 1)", () => {
		graph.clear();

		graph.createEdge('n1', 'n2');
		graph.createEdge('n2', 'n3');
		graph.createEdge('n3', 'n4');
		graph.createEdge('n4', 'n5');
		graph.createEdge('n3', 'n23');
		graph.createEdge('n23', 'n2');

		//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//         ▲      ╷
		//         │      │
		//         ╵      │
		//        n23 ◀───╯

		expectItWhenCalledWith('n1', 'n5').toBe(true);
	});

	it("returns true if the path exists (7: including part of a cycle, part 2)", () => {
		graph.clear();

		graph.createEdge('n3', 'n23'); // same graph as above, but creating the loopy bit
		graph.createEdge('n23', 'n2'); // first; insertion order matters for some engines
		graph.createEdge('n1', 'n2');
		graph.createEdge('n2', 'n3');
		graph.createEdge('n3', 'n4');
		graph.createEdge('n4', 'n5');

		//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//         ▲      ╷
		//         │      │
		//         ╵      │
		//        n23 ◀───╯

		expectItWhenCalledWith('n1', 'n5').toBe(true);
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
		let sillyComparison = (v1, v2, from, to) => {
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
		other = new Graph(
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

		expect(graph).toEqual(new Graph(
			['k1', "newValue1"],
			['k2', "newValue2"],
			['k3'             ],
			['k4'             ],
			['k5', "oldValue5"],
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

		expect(graph).toEqual(new Graph(
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
		for (let [from, to, val] of newGraph.edges()) {
			expect(graph.hasEdge(from, to)).toBeTruthy();
			expect(val).toBe(graph.edgeValue(from, to));
		}
		for (let [from, to, val] of graph.edges()) {
			expect(newGraph.hasEdge(from, to)).toBeTruthy();
			expect(val).toBe(newGraph.edgeValue(from, to));
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
		for (let [from, to, val] of newGraph.edges()) {
			expect(graph.hasEdge(from, to)).toBeTruthy();
			expect(val).toBe(graph.edgeValue(from, to));
		}
		for (let [from, to, val] of graph.edges()) {
			expect(newGraph.hasEdge(from, to)).toBeTruthy();
			expect(val).toBe(newGraph.edgeValue(from, to));
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


describeMethod('contractPaths', () => {

	it("contracts branch-less paths to a single edge (no branching)", () => {
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n5'], "n4,n5"],
			[['n5', 'n6'], "n5,n6"],
			[['n6', 'n7'], "n6,n7"]
		);
		callItWith();
		expect(graph).toEqual(new Graph(
			[['n1', 'n7'], new Graph(
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
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n5'], "n4,n5"],
			[['n4', 'n6'], "n4,n6"],
			[['n6', 'n7'], "n6,n7"]
		);
		callItWith();
		expect(graph).toEqual(new Graph(
			[['n1', 'n4'], new Graph(
				[['n1', 'n2'], "n1,n2"],
				[['n2', 'n3'], "n2,n3"],
				[['n3', 'n4'], "n3,n4"]
			)],
			[['n4', 'n5'], new Graph(
				[['n4', 'n5'], "n4,n5"]
			)],
			[['n4', 'n7'], new Graph(
				[['n4', 'n6'], "n4,n6"],
				[['n6', 'n7'], "n6,n7"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (custom nexuses)", () => {
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n5'], "n4,n5"],
			[['n5', 'n6'], "n5,n6"],
			[['n6', 'n7'], "n6,n7"]
		);
		callItWith((key) => (key === 'n3' || key === 'n5'));
		expect(graph).toEqual(new Graph(
			[['n1', 'n3'], new Graph(
				[['n1', 'n2'], "n1,n2"],
				[['n2', 'n3'], "n2,n3"]
			)],
			[['n3', 'n5'], new Graph(
				[['n3', 'n4'], "n3,n4"],
				[['n4', 'n5'], "n4,n5"]
			)],
			[['n5', 'n7'], new Graph(
				[['n5', 'n6'], "n5,n6"],
				[['n6', 'n7'], "n6,n7"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (all custom nexuses)", () => {
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n5'], "n4,n5"],
			[['n5', 'n6'], "n5,n6"],
			[['n6', 'n7'], "n6,n7"]
		);
		callItWith(() => true);
		expect(graph).toEqual(new Graph(
			[['n1', 'n2'], new Graph(
				[['n1', 'n2'], "n1,n2"]
			)],
			[['n2', 'n3'], new Graph(
				[['n2', 'n3'], "n2,n3"]
			)],
			[['n3', 'n4'], new Graph(
				[['n3', 'n4'], "n3,n4"]
			)],
			[['n4', 'n5'], new Graph(
				[['n4', 'n5'], "n4,n5"]
			)],
			[['n5', 'n6'], new Graph(
				[['n5', 'n6'], "n5,n6"]
			)],
			[['n6', 'n7'], new Graph(
				[['n6', 'n7'], "n6,n7"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (branching backward)", () => {
		graph = new Graph(
			[['n2', 'n1'], "n1,n2"],
			[['n3', 'n2'], "n2,n3"],
			[['n4', 'n3'], "n3,n4"],
			[['n5', 'n4'], "n4,n5"],
			[['n6', 'n4'], "n4,n6"],
			[['n7', 'n6'], "n6,n7"]
		);
		callItWith();
		expect(graph).toEqual(new Graph(
			[['n4', 'n1'], new Graph(
				[['n2', 'n1'], "n1,n2"],
				[['n3', 'n2'], "n2,n3"],
				[['n4', 'n3'], "n3,n4"]
			)],
			[['n5', 'n4'], new Graph(
				[['n5', 'n4'], "n4,n5"]
			)],
			[['n7', 'n4'], new Graph(
				[['n6', 'n4'], "n4,n6"],
				[['n7', 'n6'], "n6,n7"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (branch and join)", () => {
		graph = new Graph(
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
		expect(graph).toEqual(new Graph(
			[['n1', 'n4'], new Graph(
				[['n1', 'n2'], "n1,n2"],
				[['n2', 'n3'], "n2,n3"],
				[['n3', 'n4'], "n3,n4"]
			)],
			[['n4', 'n7'], new Graph(
				[['n4', 'n5'], "n4,n5"],
				[['n5', 'n7'], "n5,n7"],
				[['n4', 'n6'], "n4,n6"],
				[['n6', 'n7'], "n6,n7"]
			)],
			[['n7', 'n8'], new Graph(
				[['n7', 'n8'], "n7,n8"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (cycle with outgoing branch)", () => {
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n1'], "n4,n1"],
			[['n1', 'n5'], "n1,n5"],
			[['n5', 'n6'], "n5,n6"]
		);
		callItWith();
		expect(graph).toEqual(new Graph(
			[['n1', 'n1'], new Graph(
				[['n1', 'n2'], "n1,n2"],
				[['n2', 'n3'], "n2,n3"],
				[['n3', 'n4'], "n3,n4"],
				[['n4', 'n1'], "n4,n1"]
			)],
			[['n1', 'n6'], new Graph(
				[['n1', 'n5'], "n1,n5"],
				[['n5', 'n6'], "n5,n6"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (cycle with incoming branch)", () => {
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n1'], "n4,n1"],
			[['n5', 'n1'], "n5,n1"],
			[['n6', 'n5'], "n6,n5"]
		);
		callItWith();
		expect(graph).toEqual(new Graph(
			[['n1', 'n1'], new Graph(
				[['n1', 'n2'], "n1,n2"],
				[['n2', 'n3'], "n2,n3"],
				[['n3', 'n4'], "n3,n4"],
				[['n4', 'n1'], "n4,n1"]
			)],
			[['n6', 'n1'], new Graph(
				[['n5', 'n1'], "n5,n1"],
				[['n6', 'n5'], "n6,n5"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (cycle with two branches)", () => {
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n1'], "n4,n1"],
			[['n5', 'n1'], "n5,n1"],
			[['n3', 'n6'], "n3,n6"]
		);
		callItWith();
		expect(graph).toEqual(new Graph(
			[['n1', 'n3'], new Graph(
				[['n1', 'n2'], "n1,n2"],
				[['n2', 'n3'], "n2,n3"]
			)],
			[['n3', 'n1'], new Graph(
				[['n3', 'n4'], "n3,n4"],
				[['n4', 'n1'], "n4,n1"]
			)],
			[['n5', 'n1'], new Graph(
				[['n5', 'n1'], "n5,n1"]
			)],
			[['n3', 'n6'], new Graph(
				[['n3', 'n6'], "n3,n6"]
			)]
		));
	});

	it("contracts branch-less paths to a single edge (cycle with custom nexus)", () => {
		graph = new Graph(
			[['n1', 'n2'], "n1,n2"],
			[['n2', 'n3'], "n2,n3"],
			[['n3', 'n4'], "n3,n4"],
			[['n4', 'n1'], "n4,n1"]
		);
		callItWith((key) => (key === 'n2'));
		expect(graph).toEqual(new Graph(
			[['n2', 'n2'], new Graph(
				[['n1', 'n2'], "n1,n2"],
				[['n2', 'n3'], "n2,n3"],
				[['n3', 'n4'], "n3,n4"],
				[['n4', 'n1'], "n4,n1"]
			)]
		));
	});

	it("throws an error if the graph contains a cycle with no branches", () => {
		graph = new Graph(
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
		for (var it = callItWith(), kv = it.next(); !kv.done; kv = it.next()) {
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
		for (let [from, to, value] of callItWith()) {
			let key = from + ", " + to;
			expect(edgesFound[key]).toBeUndefined();
			edgesFound[key] = value;
		}
		expect(edgesFound).toEqual(originalEdges);
	});

	it("iterates over each edge in the graph (ES5 style)", () => {
		let edgesFound = {};
		for (var it = callItWith(), kv = it.next(); !kv.done; kv = it.next()) {
			var from  = kv.value[0],
				to    = kv.value[1],
				value = kv.value[2];
			let key = from + ", " + to;
			expect(edgesFound[key]).toBeUndefined();
			edgesFound[key] = value;
		}
		expect(edgesFound).toEqual(originalEdges);
	});

});


describeMethod('verticesFrom', () => {

	it("throws an error if the given vertex does not exist", () => {
		expectItWhenBoundWith('newKey').toThrowSpecific(Graph.VertexNotExistsError, new Set(['newKey']));
	});

	it("throws nothing if the given vertex exists", () => {
		expectItWhenBoundWith('k1').not.toThrow();
	});

	it("iterates over each outgoing edge, providing the connected vertex key/value and edge value", () => {
		let valuesFound = {};
		for (let [key, value, edgeValue] of callItWith('k2')) {
			expect(valuesFound[key]).toBeUndefined();
			valuesFound[key] = [value, edgeValue];
		}
		expect(valuesFound).toEqual({
			'k3': [ undefined, 'oldValue23'],
			'k5': ['oldValue5', undefined  ]
		});
	});

	it("iterates over each outgoing edge, providing the connected vertex key/value and edge value (ES5 style)", () => {
		let valuesFound = {};
		for (var it = callItWith('k2'), kv = it.next(); !kv.done; kv = it.next()) {
			var key       = kv.value[0],
				value     = kv.value[1],
				edgeValue = kv.value[2];
			expect(valuesFound[key]).toBeUndefined();
			valuesFound[key] = [value, edgeValue];
		}
		expect(valuesFound).toEqual({
			'k3': [ undefined, 'oldValue23'],
			'k5': ['oldValue5', undefined  ]
		});
	});

});


describeMethod('verticesTo', () => {

	it("throws an error if the given vertex does not exist", () => {
		expectItWhenBoundWith('newKey').toThrowSpecific(Graph.VertexNotExistsError, new Set(['newKey']));
	});

	it("throws nothing if the given vertex exists", () => {
		expectItWhenBoundWith('k1').not.toThrow();
	});

	it("iterates over each incoming edge, providing the connected vertex key/value and edge value", () => {
		let valuesFound = {};
		for (let [key, value, edgeValue] of callItWith('k3')) {
			expect(valuesFound[key]).toBeUndefined();
			valuesFound[key] = [value, edgeValue];
		}
		expect(valuesFound).toEqual({
			'k2': [undefined, 'oldValue23'],
			'k5': ['oldValue5', undefined]
		});
	});

	it("iterates over each incoming edge, providing the connected vertex key/value and edge value (ES5 style)", () => {
		let valuesFound = {};
		for (var it = callItWith('k3'), kv = it.next(); !kv.done; kv = it.next()) {
			var key       = kv.value[0],
				value     = kv.value[1],
				edgeValue = kv.value[2];
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
		expectItWhenBoundWith('newKey').toThrowSpecific(Graph.VertexNotExistsError, new Set(['newKey']));
	});

	it("throws nothing if the given vertex exists", () => {
		expectItWhenBoundWith('k1').not.toThrow();
	});

	it("iterates once over each vertex that is reachable from the given vertex, in no particular order", () => {
		let valuesFound = {};
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

	it("iterates once over each vertex that is reachable from the given vertex, in no particular order (ES5 style)", () => {
		let valuesFound = {};
		for (var it = callItWith('k2'), kv = it.next(); !kv.done; kv = it.next()) {
			var key   = kv.value[0],
				value = kv.value[1];
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
		expectItWhenBoundWith('newKey').toThrowSpecific(Graph.VertexNotExistsError, new Set(['newKey']));
	});

	it("throws nothing if the given vertex exists", () => {
		expectItWhenBoundWith('k1').not.toThrow();
	});

	it("iterates once over each vertex that has a path to reach the given vertex, in no particular order", () => {
		let valuesFound = {};
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

	it("iterates once over each vertex that has a path to reach the given vertex, in no particular order (ES5 style)", () => {
		let valuesFound = {};
		for (var it = callItWith('k4'), kv = it.next(); !kv.done; kv = it.next()) {
			var key   = kv.value[0],
				value = kv.value[1];
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


describeMethod('sources', () => {

	it_throwsNothing();

	it("visits all vertices with no incoming edges exactly once", () => {
		let valuesFound = {};
		for (let [key, value] of callItWith()) {
			expect(valuesFound[key]).toBeUndefined();
			valuesFound[key] = value;

		}
		expect(valuesFound).toEqual({
			'k1': 'oldValue1',
			'k2': undefined
		});
	});

	it("visits all vertices with no incoming edges exactly once (ES5 style)", () => {
		let valuesFound = {};
		for (var it = callItWith(), kv = it.next(); !kv.done; kv = it.next()) {
			var key   = kv.value[0],
				value = kv.value[1];
			expect(valuesFound[key]).toBeUndefined();
			valuesFound[key] = value;

		}
		expect(valuesFound).toEqual({
			'k1': 'oldValue1',
			'k2': undefined
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
			'k1': 'oldValue1',
			'k2': undefined,
			'k4': undefined
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
			'k1': 'oldValue1',
			'k4': undefined
		});
	});

	it("visits all vertices with no outgoing edges exactly once (ES5 style)", () => {
		let valuesFound = {};
		for (var it = callItWith(), kv = it.next(); !kv.done; kv = it.next()) {
			var key   = kv.value[0],
				value = kv.value[1];
			expect(valuesFound[key]).toBeUndefined();
			valuesFound[key] = value;

		}
		expect(valuesFound).toEqual({
			'k1': 'oldValue1',
			'k4': undefined
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
			'k1': 'oldValue1',
			'k3': undefined,
			'k4': undefined
		});
	});

});


describeMethod('vertices_topologically', () => {

	it("throws an error if the graph contains a cycle (1)", () => {
		graph = new Graph(
			[['n1', 'n2']],
			[['n2', 'n3']],
			[['n3', 'n4']],
			[['n4', 'n5']],
			[['n3', 'n23']],
			[['n23', 'n2']]
		);

		//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//         ▲      ╷
		//         │      │
		//         ╵      │
		//        n23 ◀───╯

		expect(() => [...callItWith()]).toThrowSpecific(Graph.CycleError, {}); // TODO: specify cycle property

		try {
			//noinspection JSUnusedLocalSymbols
			let x = [...callItWith()];
		} catch (err) {
			expect(err.cycle).toEqualOneOf(
				['n23', 'n2', 'n3'],
				['n3', 'n23', 'n2'],
				['n2', 'n3', 'n23']
			);
			let cycleInMessage = err.message.substring(err.message.indexOf(':') + 1).trim();
			expect(cycleInMessage).toEqualOneOf(
				'n23,n2,n3',
				'n3,n23,n2',
				'n2,n3,n23'
			);
		}
	});

	it("throws an error if the graph contains a cycle (2)", () => {
		graph = new Graph([['n1', 'n1']]);

		expect(() => [...callItWith()]).toThrowSpecific(Graph.CycleError, {}); // TODO: specify cycle property

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
		for (var it = callItWith(), kv = it.next(); !kv.done; kv = it.next()) {
			var key   = kv.value[0],
				value = kv.value[1];
			expect(verticesFound[key]).toBeUndefined();
			verticesFound[key] = value;
		}
		expect(verticesFound).toEqual(originalVertices);
	});

	it("visits vertices only when their predecessors have already been visited", () => {
		graph = new Graph(
			[['n3', 'n23']],
			[['n2', 'n23']],
			[['n1', 'n2']],
			[['n2', 'n3']],
			[['n3', 'n4']],
			[['n4', 'n5']]
		);

		//  n1 ──▶ n2 ──▶ n3 ──▶ n4 ──▶ n5
		//         ╷      ╷
		//         │      │
		//         ▼      │
		//        n23 ◀───╯

		let visited = {};

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

describe("Graph.VertexExistsError", () => {

	it("can specify one existing vertex", () => {
		let err = new Graph.VertexExistsError('x', 1);
		expect(err.vertices).toEqual(new Set([
			['x', 1]
		]));
	});

	it("can specify multiple existing vertices", () => {
		let err = new Graph.VertexExistsError('x', 1).v('y', 2);
		expect(err.vertices).toEqual(new Set([
			['x', 1],
			['y', 2]
		]));
	});

});

describe("Graph.VertexNotExistsError", () => {

	it("can specify one missing vertex", () => {
		let err = new Graph.VertexNotExistsError('x');
		expect(err.vertices).toEqual(new Set([
			'x'
		]));
	});

	it("can specify multiple missing vertices", () => {
		let err = new Graph.VertexNotExistsError('x').v('y');
		expect(err.vertices).toEqual(new Set([
			'x',
			'y'
		]));
	});

});

describe("Graph.EdgeExistsError", () => {

	it("can specify one existing edge", () => {
		let err = new Graph.EdgeExistsError('x', 'y', 1);
		expect(err.edges).toEqual(new Set([
			[['x', 'y'], 1]
		]));
	});

	it("can specify multiple existing edges", () => {
		let err = new Graph.EdgeExistsError('x', 'y', 1).e('y', 'z', 2);
		expect(err.edges).toEqual(new Set([
			[['x', 'y'], 1],
			[['y', 'z'], 2]
		]));
	});

});

describe("Graph.EdgeNotExistsError", () => {

	it("can specify one missing edge", () => {
		let err = new Graph.EdgeNotExistsError('x', 'y');
		expect(err.edges).toEqual(new Set([
			['x', 'y']
		]));
	});

	it("can specify multiple missing edges", () => {
		let err = new Graph.EdgeNotExistsError('x', 'y').e('y', 'z');
		expect(err.edges).toEqual(new Set([
			['x', 'y'],
			['y', 'z']
		]));
	});

});

describe("Graph.HasConnectedEdgesError", () => {

	it("can specify that a vertex has connected edges", () => {
		let err = new Graph.HasConnectedEdgesError('x');
		expect(err.key).toEqual('x');
	});

});

describe("Graph.CycleError", () => {

	it("can specify that a graph contains a cycle", () => {
		let err = new Graph.CycleError(['x', 'y', 'z']);
		expect(err.cycle).toEqualOneOf(
			['x', 'y', 'z'],
			['z', 'x', 'y'],
			['y', 'z', 'x']
		);
	});

});

describe("Graph.BranchlessCycleError", () => {

	it("can specify that a graph contains a branchless cycle", () => {
		let err = new Graph.BranchlessCycleError(['x', 'y', 'z']);
		expect(err.cycle).toEqualOneOf(
			['x', 'y', 'z'],
			['z', 'x', 'y'],
			['y', 'z', 'x']
		);
	});

});
