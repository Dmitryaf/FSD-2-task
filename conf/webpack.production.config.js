const path = require('path');
const configuration = require('webpack-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = new configuration.default()
  .extend('conf/webpack.base.config.js')
  .merge({
    output: {
      filename: '[name]-[hash].js',
      path: path.resolve(__dirname, '..', 'dist'),
      publicPath: '/',
    },
    filename: __filename,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader',
          ],
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
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),

      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true,
        },
      }),
    ],
  });
