const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge: mergeWebpackConfig } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const getStyleLoader = require('./getStyleLoader');

const rootDir = process.cwd();

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'production',
  devtool: undefined,
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'js/[name].[fullhash:8].js', // 生产加hash用于缓存
    chunkFilename: 'jsChunk/[name].[fullhash:5].chunk.js',
  },
  optimization: {
    minimizer: [
      // splitChunks
      new UglifyJsPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'cssChunk/[id].[contenthash].css',
      ignoreOrder: true,
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      ...getStyleLoader('production'),
    ],
  },
});
