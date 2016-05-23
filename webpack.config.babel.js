import {join} from 'path';
import webpack from 'webpack';


export default {
  devtool: 'cheap-module-source-map',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    './app',
  ],

  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css?modules&sourceMap!sass'],
      },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },

  devServer: {
    hot: true,
    inline: true,
    progress: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_EMV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    })
  ],

  eslint: {
    configFile: '.eslintrc',
  },
};