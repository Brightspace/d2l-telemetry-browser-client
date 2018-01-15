describe('test suite', () => {

	it('should have "d2lTelemetryBrowserClient" defined as a global variable', () => {
		expect(window['d2lTelemetryBrowserClient']).to.not.be.undefined;
	});

});
