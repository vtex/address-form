const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV)
let port = 80
if (process.argv && process.argv.indexOf('--https') !== -1) {
  port = 443
}

module.exports = {
  devtool: ifDevelopment('eval'),

  entry: removeEmpty([
    ifDevelopment('react-hot-loader/patch'),
    './src/AddressForm.js',
  ]),

  output: {
    filename: pkg.name + '.js',
    path: path.join(__dirname, 'deploy', pkg.version),
    publicPath: 'https://io.vtex.com.br/' + pkg.name + '/' + pkg.version + '/',
    ...(ifDevelopment(true)
      ? {
        path: path.join(__dirname, 'build', pkg.name),
        publicPath: '',
      }
      : {}),
  },

  externals: {},

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /src/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, camelCase: true },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|ttf|eot|svg|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: removeEmpty([
    new HtmlWebpackPlugin({
      title: pkg.name,
      inject: true,
      template: path.join(__dirname, 'src/index.html'),
    }),
    new LodashModuleReplacementPlugin(),
    ...(ifProduction(true)
      ? [
        new CleanWebpackPlugin(['build', 'deploy']),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"',
          },
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([{ from: 'package.json' }]),
      ]
      : [new webpack.NamedModulesPlugin()]),
  ]),

  watch: ifDevelopment(true),

  devServer: {
    port: port,
    hot: true,
    overlay: true,
    disableHostCheck: true,
    proxy: {
      '*': 'http://janus-edge.vtex.com.br/',
    },
  },
}
