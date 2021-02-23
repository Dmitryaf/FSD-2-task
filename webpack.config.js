const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackHadrddiskPlugin = require('html-webpack-harddisk-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

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
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
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

const mode = process.env.NODE_ENV;

module.exports = {
  mode: mode,
  context: path.resolve(__dirname, 'src'),
  entry: ['./entry.js'],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
    assetModuleFilename: 'assets/[name][ext]',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: false,
  devServer: {
    port: 8080,
    hot: isDev,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle: true,
      },
    }),
    new HtmlWebpackHadrddiskPlugin(),
  ].concat(htmlPlugins),
  module: {
    rules: [
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
        test: /\.(png|jpg|svg|ttf|woff|)$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoader(),
      },
    ],
  },
};
