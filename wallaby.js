var babel = require('babel');
var wallabyWebpack = require('wallaby-webpack');
var webpack = require('webpack');

var wallabyPostprocessor = wallabyWebpack({
		plugins: [
			new webpack.optimize.OccurenceOrderPlugin()
		]
	}
);

module.exports = function (wallaby) {
	return {
		files: [
			{pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false },
			{pattern: 'node_modules/babel-core/browser-polyfill.js', instrument: false },
			{pattern: 'src/**/*.es6.js', load: false},
			{pattern: 'test/helpers.es6.js', load: false}
		],
		tests: [
			{pattern: 'test/**/*-spec.es6.js', load: false}
		],
		compilers: {
			'**/*.es6.js': wallaby.compilers.babel({
				babel: babel
			})
		},
		postprocessor: wallabyPostprocessor,
		bootstrap: function () {
			window.__moduleBundler.loadTests()
		}
	};
};
