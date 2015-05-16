'use strict';

/* export utility stuff */
export var any = jasmine.any;

export function cycleArrays(...vertices) {
	let result = [];
	for (let i = 0; i < vertices.length; ++i) {
		result.push([...vertices]);
		vertices.unshift(vertices.pop());
	}
	return result;
}

/* add matchers */
beforeEach(() => {

	jasmine.addCustomEqualityTester(function setEquals(a, b) {
		if (a instanceof Set && b instanceof Set) {
			if (a.size !== b.size) { return false }
			for (let aValue of a) {
				let found = false;
				for (let bValue of b) {
					if (jasmine.matchersUtil.equals(aValue, bValue, this)) {
						found = true;
						break;
					}
				}
				if (!found) { return false }
			}
			return true;
		}
	});

	jasmine.addCustomEqualityTester(function mapEquals(a, b) {
		if (a instanceof Map && b instanceof Map) {
			if (a.size !== b.size) { return false }
			for (let [key] of a) {
				if (!b.has(key))                                                { return false }
				if (!jasmine.matchersUtil.equals(a.get(key), b.get(key), this)) { return false }
			}
			return true;
		}
	});

	jasmine.addMatchers({
		toBeReachable(/*util, customEqualityTesters*/) {
			return {
				compare() {
					var result = {};
					result.message = "Expected this test not to be reachable.";
					result.pass = true;
					return result;
				}
			};
		},
		toThrowSpecific(util, customEqualityTesters) {
			return {
				compare(actual, ExpectedType, expectedContent) {
					var result = {};
					result.message = "";

					if (typeof expectedContent === 'undefined') {
						expectedContent = {};
					}

					try {
						actual();
						result.pass = false;
					} catch (exception) {
						result.pass = exception instanceof ExpectedType;
						if (result.pass) {
							for (let prop of Object.keys(expectedContent)) {
								result.pass = result.pass && util.equals(expectedContent[prop], exception[prop], customEqualityTesters);
							}
							result.message = `However, the thrown ${exception.constructor.name} only had the following properties: ${JSON.stringify(exception, undefined, 4)}`;
						} else {
							result.message = `However, the thrown exception was not a subclass of ${ExpectedType.name}.`;
						}
					}

					result.message = `Expected the function to throw a new ${ExpectedType.name} with the following properties: ` +
						`${JSON.stringify(expectedContent, undefined, 4)}. ${result.message}`;

					return result;
				}
			};
		},
		toEqualOneOf(util, customEqualityTesters) {
			return {
				compare(actual, expected) {
					var candidates = Array.prototype.slice.call(arguments, 1);
					var result = {};

					result.pass = candidates.some((candidate) => {
						return util.equals(actual, candidate, customEqualityTesters);
					});

					if (!result.pass) {
						result.message = "Expected " + JSON.stringify(actual) + " to equal one of: " +
							  candidates.map(JSON.stringify).join(', ');
					}

					return result;
				}
			};
		}
	});
});
