// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-07-20 using
// generator-karma 1.0.0

module.exports = function(config) {
	'use strict';

	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		reporters: ['dots', 'coverage'],

		preprocessors: {
			// Update this if you change the yeoman config path
			'src/**/*.js': ['coverage']
		},

		coverageReporter: {
			reporters: [
				{ type: 'html', dir: 'coverage/' },
				{ type: 'text-summary' }
			]
		},

		// base path, that will be used to resolve files and exclude
		basePath: '../',

		// testing framework to use (jasmine/mocha/qunit/...)
		// as well as any additional frameworks (requirejs/chai/sinon/...)
		frameworks: [
			"jasmine"
		],

		// list of files / patterns to load in the browser
		files: [
			// bower:js
			'bower_components/angular/angular.js',
			'bower_components/jsSHA/src/sha.js',
			'bower_components/ng-cordova-oauth/dist/ng-cordova-oauth.js',
			'bower_components/firebase/firebase.js',
			'bower_components/angularfire/dist/angularfire.js',
			'bower_components/firebase-token-generator/dist/firebase-token-generator.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-scenario/angular-scenario.js',
			// endbower
			'src/**/*.js',
			//'test/mock/**/*.js',
			'test/spec/**/*.js'
		],

		// list of files / patterns to exclude
		exclude: [
			"**/*.git",
			"**/angular-scenario.js"
		],

		// web server port
		port: 8080,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: [
			"PhantomJS"
		],

		// Which plugins to enable
		plugins: [
			"karma-phantomjs-launcher",
			"karma-jasmine",
			"karma-coverage"
		],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true,

		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Uncomment the following lines if you are using grunt's server to run the tests
		// proxies: {
		//   '/': 'http://localhost:9000/'
		// },
		// URL root prevent conflicts with the site root
		// urlRoot: '_karma_'
	});
};
