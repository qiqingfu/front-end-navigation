const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

const config = {
	mode: 'development',
	entry: './src/main.js',
	devtool: 'none',
	output: {
		filename: 'bundle-[hash:5].js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new StyleLintPlugin({
			// 正则匹配想要lint监测的文件
			files: ['src/**/*.vue']
		})
	],
	resolve:{
		alias: {
			'~': path.resolve(__dirname, '../src')
		}
	}
};

module.exports = config;