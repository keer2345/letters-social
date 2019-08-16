const path = require("path")
const webpack = require("webpack")
const config = require("config")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const GLOBALS = {
  "process.env": {
    ENDPOINT: JSON.stringify(config.get("ENDPOINT"))
  }
}

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "..", "static"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}
