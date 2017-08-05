/* this is the development config
 * -no minifying
 * -testing enabled
 * -adds all individual scripts
 * */

var path = require('path');

module.exports = {
	entry: __dirname  + "/../src/app.module.js",
	output: {
		path: __dirname + "/../", 
		filename: "bundle.js"
	},
}
