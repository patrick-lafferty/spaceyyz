/* this is the production config
 * -minifying
 * */

var path = require('path');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: __dirname  + "/../src/app.requires.js",
	},
	output: {
		path: __dirname + "/../", 
		filename: "bundle.js"
	},
	plugins: [
		new UglifyJSPlugin({
			uglifyOptions: {
				ecma: 6
			}
		})
	]

}
