const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const mode = 'production';
const entry = path.resolve(__dirname, 'src/index.js');
const htmlRule = {
  test: /\.html$/i,
  loader: "html-loader",
};
const imagesRule = {
  test: /\.(png|jpe?g|gif)$/i,
  loader: 'file-loader',
  options: {
    outputPath: 'images',
  },
};
const plugins = [
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
  new ScriptExtHtmlWebpackPlugin({
    module: /\.mjs$/,
    custom: [
      {
        test: /\.js$/,
        attribute: 'nomodule',
        value: ''
      },
    ]
  })
];

const legacyConfig = {
  mode,
  entry,
  output: {
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", {
              useBuiltIns: "usage",
              corejs: "3.22",
              targets: {
                esmodules: false
              },
            }],
          ],
        },
      },
      htmlRule,
      imagesRule
    ]
  },
  plugins
}

const moduleConfig = {
  mode,
  entry,
  output: {
    filename: "[name].mjs"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", {
              useBuiltIns: "usage",
              corejs: "3.22",
              targets: {
                esmodules: true
              },
            }],
          ],
        },
      },
      htmlRule,
      imagesRule
    ]
  },
  plugins
}

module.exports = [legacyConfig, moduleConfig];
