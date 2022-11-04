const Intern = required('../lib/Intern');

describe('Validate Intern', () => {
    const intern = new Intern();

    Test('defines getSchool()',() => {
        expect(typeof intern.getSchool).toBe('function');
    });
});