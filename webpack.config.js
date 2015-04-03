module.exports = {
	devtool: 'source-map',
	entry: './src/js-graph.es6.js',
	output: {
		path: './dist',
		filename: 'js-graph.js',
		library: 'JsGraph',
		libraryTarget: 'umd',
		sourceMapFilename: 'js-graph.js.map'
	},
	module: {
		loaders: [
			{ test: /\.es6\.js$/, loader: 'babel' }
		]
	}
};
