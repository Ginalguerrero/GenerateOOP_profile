const Engineer = require('../lib/Engineer');
// import Engineer from '../lib/Engineer';

describe('Validate Engineer', () => {
	const engineer = new Engineer();

	test('defines getGithub()', () => {
		expect(typeof engineer.getGithub).toBe('function');
	});
});
