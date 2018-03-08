const EventBody = require('../src/index').EventBody;

describe('EventBody', () => {
	var eventBody;

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
		eventBody.setContext('1', 'Course Offering');
		eventBody.setObject('2', 'MyObjectType', 'http://somewhere.com/resource');
		eventBody.addActorImsRole('urn:lti:instrole:ims/lis/Instructor');
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
				Type: 'Course Offering'
			},
			Object: {
				Id: '2',
				Type: 'MyObjectType',
				Url: 'http://somewhere.com/resource'
			},
			Actor: {
				ImsRoleIds: [
					'urn:lti:instrole:ims/lis/Instructor'
				]
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
