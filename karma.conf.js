'use strict';

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: [ 'jasmine', 'requirejs' ],
		files: [ 'spec/main-dev.js', {pattern: '**/*.js', included: false} ],
		exclude: [],
		preprocessors: { 'src/**/*.js': ['coverage'] },
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
