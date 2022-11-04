const Intern = require('../lib/Intern');
// import Intern from '../lib/Intern';

describe('Validate Intern', () => {
	const intern = new Intern();

	test('defines getSchool()', () => {
		expect(typeof intern.getSchool).toBe('function');
	});
});
