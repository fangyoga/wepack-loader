const webpack = require('webpack');
const path = require('path');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = process.cwd();

module.exports = {
  entry: path.resolve(rootDir, './react/index.js'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules', path.join(rootDir, './node_modules')],
    alias: {
      '@': path.join(rootDir, './react'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: path.join(rootDir, './react/index.html'),
      title: 'webpack模板',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 去除多余引号
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
    new WebpackBar(),
  ],
  module: {
    noParse: /jquery|lodash|chartjs/,
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: path.resolve(rootDir, 'testLoader.js'),
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb 以下用inline形式转base64
          },
        },
        generator: {
          filename: 'assets/[hash][ext][query]',
          // publicPath: '../',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        exclude: /\.sprite\.svg$/,
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: /\.sprite\.svg$/,
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};
