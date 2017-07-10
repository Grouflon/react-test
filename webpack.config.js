var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
	entry: [
		"react-hot-loader/patch",
		APP_DIR + "/index.jsx"
	],
	output: {
		path: BUILD_DIR,
		publicPath: "/assets/",
		filename: 'bundle.js'
	},

	module : {
		loaders : [
			{
				test: /\.jsx?/,
				include : APP_DIR,
				loaders : ["babel-loader", "react-hot-loader/webpack"]
			}
		]
	}
}

module.exports = config;