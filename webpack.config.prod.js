/* this is the production config
 * -minifying
 * */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: __dirname  + "/src/app.requires.js",
		//to combine vendor libs: vendors: ['angular']
	},
	output: {
		path: __dirname, 
		filename: "bundle.js"
	},

	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				include: [
					path.resolve(__dirname, "src/")
				],	
				exclude: [
					"node_modules/",
				   "test/"
				],	
				loader: 'babel-loader' }
		]
	},

	/*plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			filename: 'index.html',
			isDevEnvironment: false
		}),
		//to combine vendor libs: new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	]*/
}
