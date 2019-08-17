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
        test: /\.(eot|svg|woff|woff2|otf|ttf)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: [
          "style-loader",
          "css-loader?sourceMap",
          "sass-loader?sourceMap"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    })
  ]
}
