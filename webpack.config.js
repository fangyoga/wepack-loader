const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssConfig = {
  postcssOptions: {
    plugins: [
      autoprefixer({
        overrideBrowserslist: [
          'defaults',
        ],
      }),
    ],
  },
};

module.exports = (env) => {
  const { development, production } = env;
  const cssFileName = development ? 'css/[name].css' : 'css/[name].[hash:8].css';
  const cssChunkFieldName = development ? 'cssChunk/[id].css' : 'cssChunk/[id].[contenthash].css';
  const jsFileName = development ? 'js/[name].js' : 'js/[name].[fullhash:8].js';
  const jsChunkFileName = development ? 'jsChunk/[name].chunk.js' : 'jsChunk/[name].[fullhash:5].chunk.js';

  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './react/index.html'),
      title: 'webpack模板',
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 去除多余引号
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
    new WebpackBar(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new MiniCssExtractPlugin({
      filename: cssFileName,
      chunkFilename: cssChunkFieldName,
      ignoreOrder: true,
    }),
    // new BundleAnalyzerPlugin(),
  ];

  if (production) {
    plugins.push(new CleanWebpackPlugin());
  }

  return {
    mode: development ? 'development' : 'production',
    devtool: development ? 'source-map' : undefined,
    entry: path.resolve(__dirname, './react/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: jsFileName,
      chunkFilename: jsChunkFileName,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['node_modules', path.join(__dirname, './node_modules')],
      alias: {
        '@': path.join(__dirname, './react'),
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      client: {
        overlay: false,
      },
      compress: true,
      port: 9000,
    },
    plugins,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin({
          parallel: true,
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(tsx)$/,
          include: /(react)/,
          use: {
            loader: path.resolve(__dirname, 'testLoader.js'),
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
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]',
            // publicPath: './',
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
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ...postcssConfig,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ...postcssConfig,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ...postcssConfig,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  };
};
