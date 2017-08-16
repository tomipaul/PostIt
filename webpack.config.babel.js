import webpack from 'webpack';
import path from 'path';
import Dotenv from 'dotenv-webpack';

const NODE_ENV = process.env.NODE_ENV;
const webpackConfig = {
  entry: path.resolve(__dirname, './client/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client', 'bin', 'bundle'),
    publicPath: '/',
    sourceMapFilename: 'source.map',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|styl|jpe?g|png|gif|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css?$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
  },
  devtool: (NODE_ENV === 'development') ?
  'cheap-module-eval-source-map' : 'cheap-module-source-map',
  target: 'web',
  stats: 'errors-only',
  devServer: (NODE_ENV === 'development') ? {
    proxy: {
      '/api': 'http://localhost:5000'
    },
    contentBase: path.join(__dirname, '/client/bin/'),
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: false,
    stats: 'minimal'
  } : {},
  node: {
    dns: 'mock',
    fs: 'empty',
    net: 'mock',
    tls: 'mock',
    path: true,
    url: false
  },
  plugins: (NODE_ENV === 'development') ? (
  [
    new Dotenv(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ]) : (
  [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ])
};

export default webpackConfig;