describe('test suite', () => {

	describe('client', () => {
		it('should have "d2lTelemetryBrowserClient" defined as a global variable', () => {
			expect(window['d2lTelemetryBrowserClient']).to.not.be.undefined;
		});

		it('should have logUserEvent', () => {
			const client = new window['d2lTelemetryBrowserClient'].Client();
			expect(client.logUserEvent).to.not.be.undefined;
		});
	});

	describe('event', () => {
		it('should have method setSourceId', () => {
			const event = new window['d2lTelemetryBrowserClient'].Event();
			expect(event.setSourceId).to.not.be.undefined;
		});

		it('should return self from methods', () => {
			const event = new window['d2lTelemetryBrowserClient'].Event();
			const val = event.setSourceId('abc');
			expect(val).to.equal(event);
		});
	});
});
