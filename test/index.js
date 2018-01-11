const chai = require('chai'),
	expect = chai.expect,
	telemetryClient = require('../src/index').Client;

chai.should();

describe('test suite', () => {

	it('should be defined', () => {
		expect(telemetryClient).to.not.be.undefined;
	});

	it('should have method1', () => {
		const client = new telemetryClient();
		expect(client.method1).to.not.be.undefined;
	});

	it('should return "foo" from method1', () => {
		const client = new telemetryClient();
		const val = client.method1();
		expect(val).to.equal('foo');
	});

});
