module.exports = function (config) {
	config.set({
		frameworks: ['jasmine'],
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
		singleRun: true,
		files: [
			'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			'./node_modules/babel/browser-polyfill.js',
			'./test/tests.webpack.js'
		],
		preprocessors: {
			'./test/tests.webpack.js': ['webpack', 'sourcemap']
		},
		webpack: {
			devtool: 'inline-source-map',
			module: {
				preLoaders: [
					{
						test: /\.es6\.js$/,
						exclude: /(test|node_modules|bower_components)\//,
						loader: 'isparta-instrumenter'
					}
				],
				loaders: [
					{ "test": /\.es6\.js$/, "loader": "babel" }
				]
			}
		},
		webpackServer: {
			noInfo: true
		}
	})
};
