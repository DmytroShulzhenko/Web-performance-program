const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(scss)$/,
                use: [
                    miniCss.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new miniCss({
            filename: 'style.css',
        }),
        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            dimensions: [
                {
                    height: 375,
                    width: 565,
                },
                {
                    height: 820,
                    width: 1180,
                },
                {
                    height: 820,
                    width: 1180,
                },
                {
                    height: 1024,
                    width: 950,
                },
            ],
            penthouse: {
                blockJSRequests: false,
            }
        })
    ],
};
