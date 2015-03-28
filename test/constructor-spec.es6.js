import {any} from './helpers.es6.js';
import JsGraph from '../src/js-graph.es6.js';


describe("constructor", () => {

	it("is present", () => {
		expect(JsGraph).toEqual(any(Function));
	});

	it("never throws any exception", () => {
		expect(() => new JsGraph()).not.toThrow();
	});

	it("returns an object of type JsGraph", () => {
		var graph = new JsGraph();
		expect(graph).toEqual(any(JsGraph));
	});

});
