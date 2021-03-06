module.exports = function(config){
  config.set({basePath: '.',
  files: [
    'lib/angular.js',
    'lib/angular-mocks.js',
    'src/**/*.js',
    'tests/helpers.js',
    'tests/**/*.js'
  ],
  browsers: ['Chrome'],
  frameworks: ["jasmine"],
  plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-phantomjs-launcher'],
  reporters: ['progress'],
  port: 9018,
  runnerPort: 9100,
  colors: true});
}
