var babel = require('babel');
var wallabyWebpack = require('wallaby-webpack');

var wallabyPostprocessor = wallabyWebpack({
		module: {
			loaders: [
				{ test: /\.es6\.js$/, loader: 'babel' }
			]
		}
	}
);

module.exports = function () {
	return {
		files: [
			'node_modules/babel-core/browser-polyfill.js',
			{ pattern: 'src/graph.es6.js', load: false },
			{ pattern: 'src/graph.es6.js', load: false },
			{ pattern: 'test/helpers.es6.js', load: false }
		],
		tests: [
			{ pattern: 'test/**/*-spec.es6.js', load: false }
		],
		postprocessor: wallabyPostprocessor,
		bootstrap: function () { window.__moduleBundler.loadTests() }
	};
};
