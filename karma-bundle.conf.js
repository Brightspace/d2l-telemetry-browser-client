module.exports = function(config) {
	config.set({
		autoWatch: false,
		browsers: ['ChromeHeadless'],
		colors: true,
		concurrency: Infinity,
		frameworks: ['mocha', 'chai'],
		files: [
			'dist/d2l-telemetry-browser-client.js',
			'test/bundle.js'
		],
		logLevel: config.LOG_WARN,
		port: 9876,
		reporters: ['progress'],
		singleRun: true
	})
}
