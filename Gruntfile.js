module.exports = function (grunt) {


require('load-grunt-tasks')(grunt);

grunt.initConfig({

  watch: {
      react: {
        files: 'client/**/*.jsx.js',
        tasks: ['browserify']
      }
    },

  browserify: {
    options: {
      transform: [require('grunt-react').browserify]
    },
    client: {
      src: ['client/**/*.jsx.js', 'client/app.js'],
      dest: 'client/build.js'
    }
  }
});
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['browserify']);

}

 // babel: {
 //      options: {
 //        sourceMap: true,
 //        stage: 0,
 //        optional: ['runtime']
 //      },
 //      dist: {
 //        files: [{
 //          expand: true,     // Enable dynamic expansion.
 //          cwd: 'src_babel/',      // Src matches are relative to this path.
 //          src: ['**/*.js'],
 //          dest: 'build/',   // Destination path prefix.
 //          ext: '.js',   // Dest filepaths will have this extension.
 //          extDot: 'first'   // Extensions in filenames begin after the first dot
 //        }]
 //      },
 // //      test: {
 // //        options: {
 // //          sourceMap: false
 // //        },
 // //        files:[{
 // //          expand: true,     // Enable dynamic expansion.
 // //          cwd: 'test_babel/',      // Src matches are relative to this path.
 // //          src: ['**/*.js'],
 // //          dest: 'test_build/',   // Destination path prefix.
 // //          ext: '.js',   // Dest filepaths will have this extension.
 // //          extDot: 'first'   // Extensions in filenames begin after the first dot
 // //        }]
 // //      }
 // //      }