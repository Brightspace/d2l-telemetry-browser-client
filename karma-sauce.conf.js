const customLaunchers = {
	chrome_win10: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'Windows 10',
		version: ''
	},
	chrome_mac: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'macOS 10.13',
		version: ''
	},
	firefox_win: {
		base: 'SauceLabs',
		browserName: 'firefox',
		platform: 'Windows 10',
		version: ''
	},
	firefox_mac: {
		base: 'SauceLabs',
		browserName: 'firefox',
		platform: 'macOS 10.13',
		version: ''
	},
	safari: {
		base: 'SauceLabs',
		browserName: 'safari',
		platform: 'macOS 10.13',
		version: ''
	},
	ie_11: {
		base: 'SauceLabs',
		browserName: 'internet explorer',
		platform: 'Windows 10',
		version: '11'
	}
};

module.exports = function(config) {
	config.set({
		autoWatch: false,
		browserify: {
			debug: true,
			'transform': ['babelify']
		},
		browsers: Object.keys(customLaunchers),
		captureTimeout: 120000,
		colors: true,
		concurrency: Infinity,
		customLaunchers: customLaunchers,
		frameworks: ['mocha', 'chai', 'browserify'],
		files: [
			'node_modules/promise-polyfill/dist/polyfill.js',
			'node_modules/whatwg-fetch/fetch.js',
			'test/index.js'
		],
		logLevel: config.LOG_WARN,
		port: 9876,
		preprocessors: {
			'test/index.js': ['browserify']
		},
		reporters: ['progress', 'saucelabs'],
		sauceLabs: {
			testName: 'd2l-telemetry-browser-client tests'
		},
		singleRun: true
	});
};
