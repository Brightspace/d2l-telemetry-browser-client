'use strict';
var publisherOptions = require('./package.json').config.frauPublisher;
publisherOptions.devTag = process.env.TRAVIS_COMMIT || publisherOptions.devTagVar;
publisherOptions.version = process.env.TRAVIS_TAG;
var publisher = require('frau-publisher').lib(publisherOptions);
console.log('build published to:', publisher.getLocation() + 'd2l-telemetry-browser-client.js'); //eslint-disable-line no-console
