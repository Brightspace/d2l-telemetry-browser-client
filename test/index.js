const Client = require('../src/index').Client;
const Event = require('../src/index').Event;
const EventBody = require('../src/index').EventBody;

const sinon = require('sinon');

describe('test suite', () => {

	before(() => {
		window.d2lfetch = {
			fetch: function() {}
		};
	});

	it('should be defined', () => {
		expect(Client).to.not.be.undefined;
	});

	it('should have logUserEvent', () => {
		const client = new Client();
		expect(client.logUserEvent).to.not.be.undefined;
	});

	describe('logUserEvent', () => {
		var fetch, client, event;

		before(() => {
			fetch = sinon.stub(window.d2lfetch, 'fetch');
			var promise = Promise.resolve({
				ok: true,
				json: function() {
					return Promise.resolve();
				}
			});
			fetch.returns(promise);
		});

		after(() => {
			fetch && fetch.restore();
		});

		beforeEach(() => {
			client = new Client({
				endpoint: 'https://somewhere.com'
			});

			event = new Event();
			const eventBody = new EventBody();
			event.setBody(eventBody);
		});

		it ('POSTs an event', () => {
			client.logUserEvent(event);
			expect(fetch.calledWith(sinon.match.has('method', 'POST'))).to.be.true;
		});

		it ('calls the correct endpoint', () => {
			client.logUserEvent(event);
			expect(fetch.calledWith(sinon.match.has('url', 'https://somewhere.com/'))).to.be.true;
		});

		it ('populates the event body', () => {
			client.logUserEvent(event);
			var request = fetch.args[0][0];
			return request.json().then(function(data) {
				expect(data.EventBody.EventTypeGuid).to.equal('d6b021b6-ffa2-4ee8-8206-8710e04396ce');
			});
		});
	});
});
