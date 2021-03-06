/* this is the production config
 * -minifying
 * */

var path = require('path');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: __dirname  + "/../src/app/app.js",
	},
	output: {
		path: __dirname + "/../", 
		filename: "bundle.js"
	},
	plugins: [
		new UglifyJSPlugin({
			uglifyOptions: {
          //mangle: false,
          //compress: false,
				  //ecma: 6,
          //beautify: true,
          //keep_quoted_props: true
			}
		})
	]

}
