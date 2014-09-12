'use strict';

describe("constructor", function () {


	it("is present", function () {
		expect(typeof JsGraph).toBe('function');
	});


	it("never throws any exception", function () {
		expect(function () {
			new JsGraph()
		}).not.toThrow();
	});


	it("returns an object of type JsGraph", function () {
		var graph = new JsGraph();
		expect(graph instanceof JsGraph).toBeTruthy();
	});


});
