import {d2lTelemetryBrowserClient} from '../src/index';

const chai = require('chai'),
	expect = chai.expect;

chai.should();

describe('test suite', () => {

	it('should pass', () => {
		expect(d2lTelemetryBrowserClient).to.not.be.undefined;
	});

});
