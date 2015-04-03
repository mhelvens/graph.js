var webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	entry: {
		'js-graph':      ['./src/js-graph.es6.js'],
		'js-graph.full': [ 'babel/polyfill.js', './src/js-graph.es6.js' ]
	},
	output: {
		path: './dist',
		filename: '[name].js',
		library: 'JsGraph',
		libraryTarget: 'umd',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: [
			{ test: /\.es6\.js$/, loader: 'babel' }
		]
	}
};
