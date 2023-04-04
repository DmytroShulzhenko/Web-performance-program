const fs = require("fs");
const path = require("path");

const sharp = require("sharp");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const INPUT  = "./src/images/input";
const OUTPUT = "./src/images/output/";
const RESOLUTIONS = [320, 768, 1024, 1920];

const directory_name = `${INPUT}`;
const filenames = fs.readdirSync(directory_name);

filenames.forEach((file) => {
	const sh = sharp(`${INPUT}/${file}`);
	const fileName = file.split(".")[0];
	const fileFormat = getExtension(file);

	switch(fileFormat) {
		case "svg":
			console.log("svg not processed with sharp");
			return;
		case "jpg":
		case "jpeg":
			RESOLUTIONS.forEach((resolution) => {
				sh.resize({ width: resolution }).jpeg({ quality: 80 }).toFile(`${OUTPUT}${fileName}-${resolution}.${fileFormat}`);
				sh.resize({ width: resolution }).webp().toFile(`${OUTPUT}${fileName}-${resolution}.webp`);
			});
			break;
		case "png":
			RESOLUTIONS.forEach((resolution) => {
				sh.resize({ width: resolution }).toFile(`${OUTPUT}${fileName}-${resolution}.${fileFormat}`);
			});
			break;
		default:
			console.log(`${fileFormat} - unknown image extension type`);
	}
});

function getExtension(filename) {
	let ext = path.extname(filename || "").split(".");

	return ext[ext.length - 1];
}

module.exports = {
	mode: "production",
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: "file-loader",
				options: {
					outputPath: "images/output",
					name: '[name].[ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'image optimization',
			template: "./src/index.html",
		}),
	],
};
