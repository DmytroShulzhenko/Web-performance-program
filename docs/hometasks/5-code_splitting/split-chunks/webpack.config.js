const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: {
      import: "./src/js/index.js",
      filename: "js/shared.bundle.js"
    },
    page1: {
      import: "./src/js/pages/page1.js",
      filename: "js/pages/[name].bundle.js",
    },
    page2: {
      import: "./src/js/pages/page2.js",
      filename: "js/pages/[name].bundle.js",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "page1.html",
      template: "./src/page1.html",
      chunks: [ "index", "page1" ]
    }),
    new HtmlWebpackPlugin({
      filename: "page2.html",
      template: "./src/page2.html",
      chunks: [ "index", "page2" ]
    }),
  ],
};
