/* this is the development config
 * -no minifying
 * -testing enabled
 * -adds all individual scripts
 * */

var path = require('path');

module.exports = {
	entry: __dirname  + "/../src/app/app.js",
	
	output: {
		path: __dirname + "/../", 
		filename: "bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
				
			}
		]
	},

	devtool: '#source-map'
}
