const path = require('path');

module.exports = {
	mode: 'development',
	entry: './app.js',
	output: {
		path: path.resolve( __dirname ),
		filename: 'app.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
		],
	},
};