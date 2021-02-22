const path = require('path');
const webpack = require('webpack');
const configuration = require('webpack-config');

module.exports = new configuration.default()
  .extend('conf/webpack.base.config.js')
  .merge({
    devtool: 'eval',
    output: {
      pathinfo: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
        {
          test: /\.css/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLodaers: 2,
                sourceMap: false,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
        {
          test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      inline: true,
      hot: true,
      contentBase: 'dist',
      host: 'localhost',
    },
  });
