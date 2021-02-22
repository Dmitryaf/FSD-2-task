const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const configuration = require('webpack-config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHadrddiskPlugin = require('html-webpack-harddisk-plugin');

const pages = [];

fs.readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
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
            fs.readFileSync(`./src/pages/${fileName}/data.json`, 'utf-8')
          );
        } catch (e) {
          console.warn(`data.json was not provided for page ${fileName}`);
        }
      },
      filename: `${fileName}.html`,
      template: `./src/pages/${fileName}/${fileName}.pug`,
      alwaysWriteToDisk: true,
      inject: 'body',
      hash: true,
    })
);

module.exports = new configuration.default().merge({
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  entry: './src/entry.js',
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/static/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ProgressPlugin(),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    // }),
    new HtmlWebpackHadrddiskPlugin(),
  ].concat(htmlPlugins),
});
