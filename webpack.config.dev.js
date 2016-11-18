/* this is the development config
 * -no minifying
 * -testing enabled
 * -adds all individual scripts
 * */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: __dirname  + "/src/app.module.js",
	output: {
		path: __dirname, 
		filename: "bundle.js"
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
			isDevEnvironment: true,
			inject: false
		})
	]
}
