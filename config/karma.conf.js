// Karma configuration
// Generated on Wed Nov 16 2016 12:51:08 GMT-0500 (EST)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha', 'chai'],

    plugins: ['karma-mocha', 'karma-chai', 'karma-browserify', 'karma-mocha-reporter', 'karma-sourcemap-loader'],

    files: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js',
      'https://unpkg.com/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'https://unpkg.com/angular-ui-router@next/release/angular-ui-router.min.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../src/**/*.js',
      '../test/**/*.js'
    ],

    exclude: [
      'bundle.js', 'karma.conf.js', 'webpack.config.prod.js', 'webpack.config.dev.js',
      'node_modules/*!(mocha|karma-mocha/lib|chai|karma-chai|angular-mocks|angular-ui-bootstrap|angular-ui-router)/**/*.js',
      'node_modules/JSONStream/**/*.js',
      'coverage/**/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../src/**/*.js': ['browserify', 'sourcemap'],
      '../test/**/*.js': ['browserify', 'sourcemap']
    },

    browserify: {
      debug: true,
      'transform': [[
        'babelify', {
        presets: ['es2015']
        }
      ]]
    },

    devtool: 'inline-source-map',

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    //colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1, //Infinity

    client: {
      mocha: {
        reporter: 'html'
      }
    }
  })
}
