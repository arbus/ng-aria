module.exports = function(config){
  config.set({basePath: '.',
  files: [
    'lib/jquery-1.8.2.min.js',
    'lib/angular.js',
    'lib/angular-mocks.js',
    'src/**/*.js',
    'tests/**/*.js'
  ],
  browsers: ['Chrome'],
  frameworks: ["jasmine"],
  plugins: ['karma-jasmine', 'karma-chrome-launcher'],
  reporters: ['progress'],
  port: 9018,
  runnerPort: 9100,
  colors: true,
  autoWatch: true,
  singleRun: false});
}
