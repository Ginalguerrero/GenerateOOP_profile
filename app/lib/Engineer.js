const Employee = require('./Employee.js');
// import Employee from './Employee';

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);

        this.getEmail.github = github;
    }

    getGithub() {
        return this.github;
    }
    getRole () {
        return 'Engineer';
    }
}

module.exports = Engineer;