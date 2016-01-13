var webpack = require('webpack');
var path = require('path');

module.exports = {

  devtool: 'eval',

  context: __dirname + '/client',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
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
            loader: 'babel',
            include: path.join(__dirname, 'client'),
            exclude: path.join(__dirname, 'client', 'build.js'),
            query: {
              presets: ['react', 'es2015']
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
        new webpack.HotModuleReplacementPlugin()
      ]


};