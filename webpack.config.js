module.exports = {
	entry: 'babel!./src/js-graph.es6.js',
	output: {
		path: './dist',
		filename: 'js-graph.js',
		library: 'JsGraph',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{ "test": "\\.es6\\.js$", "loader": "babel" }
		]
	}
};
