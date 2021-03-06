const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
	devtool: "devtool: 'source-map'",
	mode: 'development',
	entry: ["babel-polyfill", "./src/index.js"],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
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
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: 'only',
							importLoaders: 2,
							localIdentName: '[local]--[hash:base64:5]'
						},
					},
					'less-loader'
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
							outputPath: 'images/'
						},
					},
				],
			}
		]
	},
	// devServer: {
	// 	historyApiFallback: true,
	// 	https: true,
	// 	port: "443",
	// 	allowedHosts: [
	// 		'test.com'
	// 	],
	// 	// hot: false,
	// 	// inline: false,
	// },
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			minify   : {
				html5                          : true,
				collapseWhitespace             : true,
				minifyCSS                      : true,
				minifyJS                       : true,
				minifyURLs                     : false,
				removeAttributeQuotes          : true,
				removeComments                 : true,
				removeEmptyAttributes          : true,
				removeOptionalTags             : true,
				removeRedundantAttributes      : true,
				removeScriptTypeAttributes     : true,
				removeStyleLinkTypeAttributese : true,
				useShortDoctype                : true
			},
			// favicon: 'src/images/favicon.png'
		}),
		new ErrorOverlayPlugin(),
		new webpack.ProvidePlugin({
			TWEEN: path.resolve(__dirname, './src/helpers/libs/tween.js'),
			wrapperImage: path.resolve(__dirname, './src/helpers/ImgWrapper/ImgWrapper'),
		})
	]
};
