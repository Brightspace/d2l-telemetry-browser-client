const telemetryClient = require('../src/index').Client;

describe('test suite', () => {

	it('should be defined', () => {
		expect(telemetryClient).to.not.be.undefined;
	});

	it('should have logUserEvent', () => {
		const client = new telemetryClient();
		expect(client.logUserEvent).to.not.be.undefined;
	});
});
