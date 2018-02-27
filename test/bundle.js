describe('test suite', () => {

	describe('bundle', () => {
		it('should have "d2lTelemetryBrowserClient" defined as a global variable', () => {
			expect(window['d2lTelemetryBrowserClient']).to.not.be.undefined;
		});
	});

	describe('client', () => {
		it('should have a Client ctor', () => {
			const client = new window['d2lTelemetryBrowserClient'].Client();
			expect(client.logUserEvent).to.not.be.undefined;
		});
	});

	describe('event', () => {
		it('should have a TelemetryEvent ctor', () => {
			const event = new window['d2lTelemetryBrowserClient'].TelemetryEvent();
			expect(event.setType).to.not.be.undefined;
		});
	});

	describe('eventBody', () => {
		it('should have an EventBody ctor', () => {
			const eventBody = new window['d2lTelemetryBrowserClient'].EventBody();
			expect(eventBody.setTypeGuid).to.not.be.undefined;
		});
	});

	describe('performanceEventBody', () => {
		it('should have a PerformanceEventBody ctor', () => {
			const performanceEventBody = new window['d2lTelemetryBrowserClient'].PerformanceEventBody();
			expect(performanceEventBody.addUserTiming).to.not.be.undefined;
		});
	});

	describe('problemEventBody', () => {
		it('should have a ProblemEventBody ctor', () => {
			const problemEventBody = new window['d2lTelemetryBrowserClient'].ProblemEventBody();
			expect(problemEventBody.setProblemType).to.not.be.undefined;
		});
	});
});
