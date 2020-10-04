const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  node: {
    fs: "empty"
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 9000,
    watchContentBase: true,
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.browser': 'true'
    })
  ]
};