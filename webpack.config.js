var webpack = require('webpack');
var path = require('path');

module.exports = {

  devtool: 'source-map',

  context: __dirname + '/client',
  entry: [
    'webpack/hot/dev-server',
    // 'webpack-dev-server/client?http://localhost:8080',
    'webpack-dev-server/client?http://' + require("os").hostname() + ':8080/',
    './app'
  ],

  output: {
    path: __dirname + '/client/build',
    filename: 'build.js',
    publicPath: 'http://localhost:8080/assets/'
  },
    module: {
        loaders: [
          {
            test: /\.js/,
            loader: 'react-hot',
            include: path.join(__dirname, 'client'),
            exclude: path.join(__dirname, 'client', 'build.js')
          },
          {
            test: /\.js/,
            loader: 'babel',
            include: path.join(__dirname, 'client'),
            exclude: path.join(__dirname, 'client', 'build.js'),
            query: {
              presets: ['es2015', 'react', 'stage-0'],
              plugins: ['transform-decorators-legacy']
            }
          },
          {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
          }
        ]
      },
      inline: true,
      // hot: true,
      // recordsPath: path.join(process.cwd(), 'cache', 'webpack.json'),
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ]

};