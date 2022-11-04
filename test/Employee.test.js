const Employee = require('../lib/Employee');
// import Employee from '../lib/Employee';

describe('Validate Employee', () => {
	const employe = new Employee();

	test('defines getRole()', () => {
		expect(typeof employe.getRole).toBe('function');
	});
});
