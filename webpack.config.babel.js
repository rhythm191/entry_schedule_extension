import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let isProduction = process.env.NODE_ENV === 'production'

let webpack_config = [{
  context: path.join(__dirname, 'src'),
  entry: {
    content_scripts: './content_scripts.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
  ]
}];


if (isProduction) {
  webpack_config.forEach(function(config) {
    config.devtool = false
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
  });
}

module.exports = webpack_config
