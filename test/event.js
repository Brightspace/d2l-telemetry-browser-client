const Event = require('../src/index').Event;

describe('test suite', () => {

	it('should be defined', () => {
		expect(Event).to.not.be.undefined;
	});

	it('should have setSourceId', () => {
		const event = new Event();
		expect(event.setSourceId).to.not.be.undefined;
	});

	it('should return self from methods', () => {
		const event = new Event();
		expect(event.setSourceId('abc')).to.equal(event);
	});

});
