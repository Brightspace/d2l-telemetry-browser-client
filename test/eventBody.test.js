import d2lTelemetryBrowserClient from '../src/index.js';
import { expect } from '@open-wc/testing';

const EventBody = d2lTelemetryBrowserClient.EventBody;

describe('EventBody', () => {
	let eventBody;

	beforeEach(() => {
		eventBody = new EventBody();
	});

	it('should return self from methods', () => {
		expect(eventBody.setTypeGuid('abc')).to.equal(eventBody);
	});

	it('should generate JSON body', () => {
		eventBody.setDate(new Date(Date.UTC(96, 1, 2, 3, 4, 5)));
		eventBody.setAction('MyAction');
		eventBody.setTenantUrl('https://some.tenant.com');
		eventBody.setContext('1', 'Course Offering', 'http://somewhere.com/context', 'contextValue');
		eventBody.setActivity('123', 'MyActivity');
		eventBody.setObject('2', 'MyObjectType', 'http://somewhere.com/resource', 'objectValue');
		eventBody.setTarget('3', 'MyTargetType', 'http://somewhere.com/target', 'targetValue');
		eventBody.setActor(['urn:lti:instrole:ims/lis/Learner'], 'theRequestId', 'theSessionId', 'theCookieId');
		eventBody.addActorImsRole('urn:lti:instrole:ims/lis/Instructor');
		eventBody.addActorImsRole('urn:lti:instrole:ims/lis/Admin');
		eventBody.setGenerated('123-456', 'GenerationRequestId');
		eventBody.addCustom('foo', 'bar');
		eventBody.setCustomJson({
			zinglewaga: {
				zinglezoo: 'zingletoo'
			}
		});

		expect(eventBody.toJSON()).to.deep.include({
			Date: '1996-02-02T03:04:05.000Z',
			Action: 'MyAction',
			TenantUrl: 'https://some.tenant.com',
			Context: {
				Id: '1',
				Type: 'Course Offering',
				Url: 'http://somewhere.com/context',
				Value: 'contextValue'
			},
			Activity: {
				Id: '123',
				Type: 'MyActivity'
			},
			Object: {
				Id: '2',
				Type: 'MyObjectType',
				Url: 'http://somewhere.com/resource',
				Value: 'objectValue'
			},
			Target: {
				Id: '3',
				Type: 'MyTargetType',
				Url: 'http://somewhere.com/target',
				Value: 'targetValue'
			},
			Actor: {
				ImsRoleIds: [
					'urn:lti:instrole:ims/lis/Learner',
					'urn:lti:instrole:ims/lis/Instructor',
					'urn:lti:instrole:ims/lis/Admin'
				],
				RequestId: 'theRequestId',
				SessionId: 'theSessionId',
				CookieId: 'theCookieId'
			},
			Generated: {
				Id: '123-456',
				Type: 'GenerationRequestId'
			},
			Custom: [
				{
					name: 'foo',
					value: 'bar'
				}
			],
			CustomJson: {
				zinglewaga: {
					zinglezoo: 'zingletoo'
				}
			}
		});
	});
	it('should generate JSON body (using chaining)', () => {
		eventBody.setDate(new Date(Date.UTC(96, 1, 2, 3, 4, 5)))
			.setAction('MyAction')
			.setTenantUrl('https://some.tenant.com')
			.setContext('1', 'Course Offering', 'http://somewhere.com/context', 'contextValue')
			.setActivity('123', 'MyActivity')
			.setObject('2', 'MyObjectType', 'http://somewhere.com/resource', 'objectValue')
			.setTarget('3', 'MyTargetType', 'http://somewhere.com/target', 'targetValue')
			.setActor(['urn:lti:instrole:ims/lis/Learner'], 'theRequestId', 'theSessionId', 'theCookieId')
			.addActorImsRole('urn:lti:instrole:ims/lis/Instructor')
			.addActorImsRole('urn:lti:instrole:ims/lis/Admin')
			.setGenerated('123-456', 'GenerationRequestId')
			.addCustom('foo', 'bar')
			.setCustomJson({
				zinglewaga: {
					zinglezoo: 'zingletoo'
				}
			});

		expect(eventBody.toJSON()).to.deep.include({
			Date: '1996-02-02T03:04:05.000Z',
			Action: 'MyAction',
			TenantUrl: 'https://some.tenant.com',
			Context: {
				Id: '1',
				Type: 'Course Offering',
				Url: 'http://somewhere.com/context',
				Value: 'contextValue'
			},
			Activity: {
				Id: '123',
				Type: 'MyActivity'
			},
			Object: {
				Id: '2',
				Type: 'MyObjectType',
				Url: 'http://somewhere.com/resource',
				Value: 'objectValue'
			},
			Target: {
				Id: '3',
				Type: 'MyTargetType',
				Url: 'http://somewhere.com/target',
				Value: 'targetValue'
			},
			Actor: {
				ImsRoleIds: [
					'urn:lti:instrole:ims/lis/Learner',
					'urn:lti:instrole:ims/lis/Instructor',
					'urn:lti:instrole:ims/lis/Admin'
				],
				RequestId: 'theRequestId',
				SessionId: 'theSessionId',
				CookieId: 'theCookieId'
			},
			Generated: {
				Id: '123-456',
				Type: 'GenerationRequestId'
			},
			Custom: [
				{
					name: 'foo',
					value: 'bar'
				}
			],
			CustomJson: {
				zinglewaga: {
					zinglezoo: 'zingletoo'
				}
			}
		});
	});
});
