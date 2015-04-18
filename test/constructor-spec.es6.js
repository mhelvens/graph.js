import {any} from './helpers.es6.js';
import Graph from '../src/graph.es6.js';


describe("constructor", () => {

	it("is present", () => {
		expect(Graph).toEqual(any(Function));
	});

	it("never throws any exception", () => {
		expect(() => new Graph()).not.toThrow();
	});

	it("returns an object of type Graph", () => {
		var graph = new Graph();
		expect(graph).toEqual(any(Graph));
	});

});
