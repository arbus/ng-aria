module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    karma:{
      unit:{
        configFile: 'karma.conf.js'
      }
    },
    jshint:{
      all: ['src/**/*.js']
    }
  });
}