module.exports = function(config) {
	config.set({
		autoWatch: false,
		browserify: {
			debug: true,
			'transform': ['babelify']
		},
		browsers: ['ChromeHeadless'],
		colors: true,
		concurrency: Infinity,
		coverageReporter: {
			reporters: [
				{type: 'lcov', dir: 'coverage', subdir: '.'},
				{type: 'text-summary'}
			]
		},
		frameworks: ['mocha', 'chai', 'browserify'],
		files: [
			'node_modules/promise-polyfill/dist/polyfill.js',
			'node_modules/whatwg-fetch/fetch.js',
			'test/*'
		],
		exclude: [
			'test/bundle.js'
		],
		logLevel: config.LOG_WARN,
		port: 9876,
		preprocessors: {
			'test/*': ['browserify']
		},
		reporters: ['progress', 'coverage'],
		singleRun: true
	});
};
