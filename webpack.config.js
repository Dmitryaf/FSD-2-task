const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

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
      getData: () => {
        try {
          return JSON.parse(
            fs.readFileSync(`./pages/${fileName}/data.json`, 'utf-8')
          );
        } catch (e) {
          console.warn(`data.json was not provided for page ${fileName}`);
        }
      },
      filename: `${fileName}.html`,
      template: `./pages/${fileName}/${fileName}.pug`,
      alwaysWriteToDisk: true,
      inject: 'body',
      hash: true,
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
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    contentBase: './dist',
    compress: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: process.env.NODE_ENV === 'production' ? 'browserslist' : 'web',

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false, dry: true }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
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
