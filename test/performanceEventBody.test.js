import d2lTelemetryBrowserClient from '../src/index.js';
import { expect } from '@open-wc/testing';

const PerformanceEventBody = d2lTelemetryBrowserClient.PerformanceEventBody;

describe('PerformanceEventBody', () => {
	let eventBody;

	beforeEach(() => {
		eventBody = new PerformanceEventBody();
	});

	it('should return self from methods', () => {
		expect(eventBody.addUserTiming({ name: 'my-timing', duration: 100 })).to.equal(eventBody);
	});

	it('should generate JSON body', () => {
		eventBody.addUserTiming({ name: 'my-timing-1', duration: 100 });
		eventBody.addUserTiming({ name: 'my-timing-2', duration: 200 });

		expect(eventBody.toJSON()).to.deep.include({
			EventTypeGuid: '02a00ca0-e67d-4a6c-908b-ee80b8a61eec',
			UserTiming: [{
				name: 'my-timing-1',
				duration: 100
			},
			{
				name: 'my-timing-2',
				duration: 200
			}]
		});
	});
});
