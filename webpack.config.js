const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const pack = require("./package.json");

const babelSettings = {
	extends: path.join(__dirname, "/.babelrc")
};

module.exports = {
	mode: "development",
	entry: {
		main: "./sources/app.js"
	},
	output: {
		filename: "./codebase/[name].js",
		path: path.resolve(__dirname, "JetTranslator_Dist/"),
		publicPath: "/JetTranslator_Dist/" //
	},
	devtool: "inline-source-map",
	devServer: { //
		contentBase: "./JetTranslator_Dist/" //
	}, //
	module: {
		rules: [
			{
				test: /\.js/,
				loader: `babel-loader?${JSON.stringify(babelSettings)}`,
				exclude: /(node_modules)/
			},
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				use: [
					{loader: "style-loader"},
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: "url-loader",
				options: {
					limit: 10000
				}
			}
		]
	},
	resolve: {
		extensions: [".js"],
		modules: ["./sources", "node_modules"],
		alias: {
			"jet-views": path.resolve(__dirname, "sources/views/"),
			"jet-locales": path.resolve(__dirname, "sources/locales/")
		}
	},
	plugins: [new webpack.DefinePlugin({
		VERSION: `"${pack.version}"`,
		APPNAME: `"${pack.name}"`
	}),
	new HtmlWebpackPlugin({template: "./index.html"}),
	new CopyWebpackPlugin([
		{
			from: "lib/",
			to: "lib/"
		},
		{
			from: "sources/styles/",
			to: "codebase/styles/"
		}
	])
	]
};
