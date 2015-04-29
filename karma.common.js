module.exports = {
	frameworks: ['jasmine'],
	reporters: ['progress', 'coverage'],
	coverageReporter: {
		reporters: [
			{ type: 'text-summary' },
			{ type: 'lcov'}
		]
	},
	colors: true,
	autoWatch: false,
	browsers: ['PhantomJS'],
	browserNoActivityTimeout: 120000,
	captureTimeout:           120000, // the build process tends to take a while
	singleRun: true,
	files: [
		'./node_modules/phantomjs-polyfill/bind-polyfill.js',
		'./node_modules/babel-core/browser-polyfill.js',
		'./test/test.js'
	],
	preprocessors: {
		'./test/test.js': ['webpack', 'sourcemap']
	},
	webpack: {
		devtool: 'inline-source-map',
		module: {
			preLoaders: [
				{
					test:    /\.es6\.js$/,
					exclude: /(test|node_modules|bower_components)\//,
					loader:  'isparta-instrumenter'
				}
			],
			loaders: [
				{ test: /\.es6\.js$/, loader: 'babel?compact=true' }
			]
		}
	},
	webpackServer: {
		noInfo: true
	}
};
