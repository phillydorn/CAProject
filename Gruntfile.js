module.exports = function (grunt) {


require('load-grunt-tasks')(grunt);

grunt.initConfig({

  watch: {
    react: {
      files: ['client/**/*.js','client/app.js', '!client/build.js','!client/build2.js'],
      tasks: ['browserify']
    },
    sass: {
      files: 'client/styles/*.scss',
      tasks: ['sass']
    },
    babel: {
      files: 'client/build2.js',
      tasks: ['babel']
    }
  },

  sass: {
    dev: {
      options: {
        outputStyle: 'nested',
      },
      files: {
        'client/main.min.css': 'client/styles/manifest.scss'
      }
    }
  },


  browserify: {
    options: {
      transform: [require('grunt-react').browserify]
    },
    client: {
      src: ['client/**/*.jsx.js', 'client/app.js'],
      dest: 'client/build2.js'
    }
  },

  babel: {
    options:{
      presets: ['es2015','react']
    },
    dist:{
      files: {
        'client/build.js': 'client/build2.js'
      }
    }
  }
});
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['browserify', 'sass', 'watch', 'babel']);

}
