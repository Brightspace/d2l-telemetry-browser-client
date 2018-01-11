module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'chai', 'browserify'],
		files: [
			'test/**/*.js'
		],
		preprocessors: {
			'test/**/*.js': ['browserify']
		},
		reporters: ['progress', 'coverage'],
		port: 9876,  // karma web server port
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: ['ChromeHeadless'],
		autoWatch: false,
		singleRun: true,
		concurrency: Infinity,
		browserify: {
			debug: true,
			"transform": ["babelify"]
		},
		coverageReporter: {
			reporters: [
				{type: 'lcov', dir: 'coverage', subdir: '.'},
				{type: 'text-summary'}
			]
		}
	})
}
