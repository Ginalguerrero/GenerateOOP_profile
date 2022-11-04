import Manager from '../lib/Manager';

//import Manager from '../lib/Manager';

describe('Validate Manager', () => {
    const manager = new Manager();

    test('defines getRole()',() => {
        expect(typeof manager.getRole).toBe('function');
    });
});