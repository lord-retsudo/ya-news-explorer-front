const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    articles: './src/articles.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader' },
      exclude: /node_modules/,
    },
    { 
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [
        'file-loader?name=./images/[name].[ext]', 
        {
          loader: 'image-webpack-loader',
          options: {},
        },
      ],
    },
    {
      test: /\.css$/i,
      use: [
        isDev ? 'style-loader'
          : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
        'css-loader',
        'postcss-loader',
      ],
    },
    { 
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // eslint-disable-next-line global-require
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/articles.html',
      filename: 'articles.html',
      chunks: ['articles'],
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
