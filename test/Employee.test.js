const Employee = required('../lib/Employee');

describe('Validate Employee', () => {
    const employe = new Employee();

    Test('defines getRole()',() => {
        expect(typeof employe.getRole).toBe('function');
    });
});
