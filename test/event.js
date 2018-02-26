const Event = require('../src/index').Event;
const EventBody = require('../src/index').EventBody;

describe('Event', () => {
	var event;

	beforeEach(() => {
		event = new Event();
	});

	it('should return self from methods', () => {
		expect(event.setSourceId('abc')).to.equal(event);
	});

	it('should generate JSON body', () => {
		event.setSourceId('MySource');
		event.setType('MyType');
		event.setDate(new Date(Date.UTC(96, 1, 2, 3, 4, 5)));
		event.setBody(new EventBody());

		expect(event.toJSON()).to.include({
			SourceId: 'MySource',
			EventType: 'MyType',
			Date: '1996-02-02T03:04:05.000Z'
		});

		expect(event.toJSON()).to.have.property('EventBody');
	});

});
