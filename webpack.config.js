const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = [];

fs.readdirSync(path.resolve(__dirname, 'src', 'pages'))
  .filter((file) => {
    return file.indexOf('base') !== 0;
  })
  .forEach((file) => {
    pages.push(file.split('/', 2));
  });

const htmlPlugins = pages.map(
  (fileName) =>
    new HtmlWebpackPlugin({
      filename: `${fileName}.html`,
      template: `./pages/${fileName}/${fileName}.pug`,
      alwaysWriteToDisk: true,
      inject: 'body',
    })
);

const jsLoader = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ];
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: `favicons`, to: 'favicons' }],
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ].concat(htmlPlugins),

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        exclude: [path.resolve(__dirname, 'src/fonts')],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img',
            esModule: false,
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        include: [path.resolve(__dirname, 'src/fonts')],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
            esModule: false,
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoader(),
      },
    ],
  },
};
