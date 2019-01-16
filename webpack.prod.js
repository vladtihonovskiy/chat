const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: "devtool: 'source-map'",
	entry: ["babel-polyfill", "./src/index.js"],
	output: {
		path: path.resolve(__dirname, 'build/app'),
		filename: 'bundle.js',
		publicPath: ''
	},
	module: {
		rules: [

			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/react', '@babel/env']
					}
				}
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							options: {
								modules: true,
								camelCase: 'only',
								importLoaders: 2,
								localIdentName: '[local]'
							},
						}
					}
				]
			},
			// {
			// 	test: /\.(gif|png|jpe?g|svg)$/i,
			// 	use: [
			// 		{
			// 			loader: "file-loader",
			// 			options: {
			// 				publicPath: "app/"
			// 				// outputPath: 'app/',
			//
			// 				// bypassOnDebug: true, // webpack@1.x
			// 				// disable: true, // webpack@2.x and newer
			// 			},
			// 		},
			// 	],
			// },
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							// outputPath: 'app/',
							// publicPath: "app/"
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: 'only',
							// sourceMap: true,
							// root: path.resolve(__dirname,'app'),
							// url:false,
							importLoaders: 2,
							localIdentName: '[local]--[hash:base64:5]'
						},
					},
					{
						loader: 'less-loader',
						options: {
							// paths: [
							// 	// path.resolve(__dirname, 'build/app')
							// ]
						},
					},

					// {
					// 	loader: 'string-replace-loader',
					// 	options: {
					// 		search: 'url\\("([^)`"]*)"\\)',
					// 		replace: 'url("\.\.\/$1")',
					// 		flags: "g"
					// 	}
					// }
				]
			},
		]
	},
	devServer: {
		historyApiFallback: true,
		https: true,
		port: "443",
		allowedHosts: [
			'test.com'
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			minify: {
				html5: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: false,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributese: true,
				useShortDoctype: true
			},
			favicon: 'src/images/favicon.png'
		}),
		new ErrorOverlayPlugin(),
		new CleanWebpackPlugin(path.resolve(__dirname, 'build')),
		new webpack.ProvidePlugin({
			TWEEN: path.resolve(__dirname, './src/helpers/libs/tween.js'),
			wrapperImage: path.resolve(__dirname, './src/helpers/ImgWrapper/ImgWrapper'),
		}),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, './src/mainLoginPage'), to: path.resolve(__dirname, 'build') },
			// { from: path.resolve(__dirname, 'build/app'), to: path.resolve(__dirname, 'build/app/app') }

		])
	]
};
