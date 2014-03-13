module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    karma:{
      options:{
        configFile: 'karma.conf.js'
      },
      dev:{
        singleRun: false,
        autoWatch: true,
        autoRun: true
      },
      continuous:{
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    jshint:{
      all: ['src/**/*.js']
    }
  });
}