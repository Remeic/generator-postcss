const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    "./production/css/styles.min": "./production/css/styles.css"
  },
  output: {
    path: "./",
    filename: "[path][name].css"
  },
  resolve: {
    extensions: [".js", ".css"]
  },
  module: {
    loaders: [
      {
        test: /\.(woff|woff2|ttf|eot|svg|png)(\?[a-z0-9]+)?$/,
        loader: "file-loader",
        options: {
          //TODO redirect to the entry.[name] path
          name: "[path][name].[hash:8].min.[ext]"
        }
      },
      {
        test: /\.(css)$/,
        test: /\.(css)$/,
        loaders: ExtractTextPlugin.extract(
          {
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: [autoprefixer()]
                }
              }
            ]
          }
        )
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './production',
    inline: true,
    port: 3000
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    })
  ]
};
