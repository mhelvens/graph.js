'use strict';

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: [ 'jasmine' ],
		files: [ 'dist/js-graph.js', 'spec/matchers.js', 'spec/**/*-spec.js' ],
		exclude: [],
		preprocessors: { 'dist/js-graph.js': ['coverage'] },
		reporters: ['progress', 'coverage'],
		coverageReporter: {
			reporters: [
				{ type: 'text-summary' },
				{ type: 'lcovonly'}
			]
		},
		port: 9876,
		colors: true,
		autoWatch: false,
		browsers: ['PhantomJS'],
		singleRun: true
	})
};
