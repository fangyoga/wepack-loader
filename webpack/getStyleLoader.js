const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const postcssConfig = {
  postcssOptions: {
    plugins: [
      autoprefixer({
        overrideBrowserslist: [
          'last 2 versions',
          'Firefox ESR',
          '> 1%',
          'ie >= 8',
          'iOS >= 8',
          'Android >= 4',
        ],
      }),
    ],
  },
};

const getStyleLoader = (env) => {
  const isDev = env === 'development';
  const currentUseLoader = isDev ? {
    loader: 'style-loader',
  } : {
    loader: MiniCssExtractPlugin.loader,
  };

  return [
    {
      test: /\.css$/,
      use: [
        currentUseLoader,
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
        currentUseLoader,
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
  ];
};
module.exports = getStyleLoader;
