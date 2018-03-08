const ProblemEventBody = require('../src/index').ProblemEventBody;

describe('ProblemEventBody', () => {
	var eventBody;

	beforeEach(() => {
		eventBody = new ProblemEventBody();
	});

	it('should return self from methods', () => {
		expect(eventBody.setProblemType('http://my.schema.com/MyExceptionType')).to.equal(eventBody);
	});

	it('should generate JSON body', () => {
		expect(eventBody.setProblemType('http://my.schema.com/MyExceptionType')).to.equal(eventBody);

		expect(eventBody.toJSON()).to.deep.include({
			EventTypeGuid: '96a02080-a363-4524-b231-563e55aa0d47',
			Problem: {
				problemType: 'http://my.schema.com/MyExceptionType'
			}
		});
	});
});
