module.exports = function (grunt) {


require('load-grunt-tasks')(grunt);

grunt.initConfig({


  // webpack: {
  //   react: require('./webpack.config.js')
  // },

  // watch: {
  //   react: {
  //     files: ['client/**/*.js','client/app.js', 'client/**/*.scss', '!client/build.js'],
  //     tasks: ['webpack']
  //   }
  // }

});
grunt.loadNpmTasks('grunt-webpack');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['webpack', 'watch']);

}

