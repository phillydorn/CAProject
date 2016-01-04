var webpack = require('webpack');
var path = require('path');

module.exports = {

  context: __dirname + '/client',
  entry: './app',
  output: {
    path: __dirname + '/client',
    filename: 'build.js'
  },
    module: {
        loaders: [
          {
            test: /\.js/,
            loader: 'babel',
            include: path.join(__dirname, 'client'),
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
      inline: true
      // recordsPath: path.join(process.cwd(), 'cache', 'webpack.json'),
      // plugins: [
      //   new webpack.HotModuleReplacementPlugin()
      // ]


};