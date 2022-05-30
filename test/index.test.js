import d2lTelemetryBrowserClient from '../src/index.js';
import { expect } from '@open-wc/testing';
import sinon from 'sinon';

const Client = d2lTelemetryBrowserClient.Client;
const TelemetryEvent = d2lTelemetryBrowserClient.TelemetryEvent;
const EventBody = d2lTelemetryBrowserClient.EventBody;

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
		let fetch, client, event;

		before(() => {
			fetch = sinon.stub(window.d2lfetch, 'fetch');
			const promise = Promise.resolve({
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
				endpoint: 'https://somewhere.com/'
			});

			event = new TelemetryEvent();
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
			const request = fetch.args[0][0];
			return request.json().then((data) => {
				expect(data.EventBody.EventTypeGuid).to.equal('d6b021b6-ffa2-4ee8-8206-8710e04396ce');
			});
		});
	});

	describe('logUserEvent - with null endpoint', () => {
		let fetch, client, event;

		before(() => {
			client = new Client({
				endpoint: null
			});

			event = new TelemetryEvent();
			const eventBody = new EventBody();
			event.setBody(eventBody);

			fetch = sinon.stub(window.d2lfetch, 'fetch');
			const promise = Promise.resolve({
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

		it ('POSTs an event', () => {
			client.logUserEvent(event);
			expect(fetch.calledWith(sinon.match.has('method', 'POST'))).to.be.false;
		});
	});
});
