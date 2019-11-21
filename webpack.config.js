const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env, argv) => {
  return {
    context: path.join(__dirname, "src"),
    entry: {
      content_scripts: "./content_scripts.js"
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      ]
    },
    devtool: "inline-source-map",
    performance: {
      hints: false
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
        })
      ]
    },
    plugins: []
  };
};
