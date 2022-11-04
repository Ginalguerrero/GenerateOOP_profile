
// import inq from 'inquirer';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const inq = require('inquirer');

const fs = require('fs');

let content = '';

global.document = new JSDOM(content).window.document;

const Manager = require('./app/lib/Manager');
const Engineer = require('./app/lib/Engineer');
const Intern = require('./app/lib/Intern');

(async () => {
	const managerData = await inq.prompt([
		{
			name: 'name',
			message: 'Your name please?',
			type: 'input',
		},
		{
			name: 'id',
			message: 'Your id?',
			type: 'input',
		},
		{
			name: 'email',
			message: 'your email id?',
			type: 'input',
		},
		{
			name: 'officeNumber',
			message: 'office number please?',
			type: 'input',
		},
	]);

	let myOptions = null;

	let allEmployeeys = [];

	managerData['role'] = 'manager';
	let manager = new Manager(
		managerData.name,
		managerData.id,
		managerData.email,
		managerData.officeNumber
	);
	allEmployeeys.push(manager);

	async function selectEmployee() {
		const options = await inq.prompt([
			{
				type: 'list',
				name: 'employee',
				message:
					'Please select type of employee you want to add or close the app.',
				choices: ['Intern', 'Engineer', 'Exit'],
			},
		]);
		return options;
	}

	// console.log(employeOptions);

	async function selectEngineer() {
		const engineerData = await inq.prompt([
			{
				name: 'engineerName',
				type: 'input',
				message: "Engineer's Name?",
			},
			{
				name: 'engineerID',
				type: 'input',
				message: "Engineer's Id?",
			},
			{
				name: 'engineerEmail',
				type: 'input',
				message: "Engineer's Email?",
			},
			{
				name: 'engineerGithub',
				type: 'input',
				message: 'Engineer Github Username?',
			},
		]);

		return engineerData;
	}

	async function selectIntern() {
		let internData = null;

		internData = await inq.prompt([
			{
				name: 'interName',
				type: 'input',
				message: 'Inter Name?',
			},
			{
				name: 'internId',
				type: 'input',
				message: 'Inter Id?',
			},
			{
				name: 'internEmail',
				type: 'input',
				message: "Intern's Email?",
			},
			{
				name: 'internSchool',
				type: 'input',
				message: 'Intern School?',
			},
		]);

		return internData;
	}
	// while (true) {}

	myOptions = await selectEmployee();

	while (true) {
		if (myOptions.employee === 'Engineer') {
			const engineersData = await selectEngineer();
			engineersData['role'] = 'engineer';

			let engineer = new Engineer(
				engineersData.engineerName,
				engineersData.engineerID,
				engineersData.engineerEmail,
				engineersData.engineerGithub
			);
			allEmployeeys.push(engineer);
			myOptions = await selectEmployee();
		} else if (myOptions.employee === 'Intern') {
			const internData = await selectIntern();
			internData['role'] = 'intern';
			let intern = new Intern(
				internData.interName,
				internData.internId,
				internData.internEmail,
				internData.internSchool
			);
			allEmployeeys.push(intern);
			myOptions = await selectEmployee();
		} else {
			// console.log(allEmployeeys);

			break;

			process.exit();
		}
	}

	let customHTML = '';
	// let employees = document.querySelector('.employees');

	let employees = document.createElement('div');
	employees.classList.add('employees');
	allEmployeeys.forEach((item, index) => {
		let employee = document.createElement('div');
		employee.classList.add('employee');

		if (item.getRole() === 'Manager') {
			employee.innerHTML = `
			<div class="heading">
			<h3>${item.getRole()}</h3>
			<h3>${item.getName()}</h3>
		</div>
	
		<ul class="meta_data">
		<li>ID: ${item.id}</li>
			<li>email: <a href="mailto:${item.getEmail()}">${item.getEmail()}</a></li>

			<li>Office Number: ${item.officeNumber}</li>
	
		</ul>
			`;
		} else if (item.getRole() === 'Engineer') {
			employee.innerHTML = `
			<div class="heading">
			<h3>${item.getRole()}</h3>
			<h3>${item.getName()}</h3>
		</div>
	
		<ul class="meta_data">
		<li>ID: ${item.id}</li>
			<li>email: <a href="mailto:${item.getEmail()}">${item.getEmail()}</a></li>

			<li>Github: <a href="https://www.github.com/${item.getGithub()}">${item.getGithub()}</a></li>
	
		</ul>
			`;
		} else {
			employee.innerHTML = `
			<div class="heading">
			<h3>${item.getRole()}</h3>
			<h3>${item.getName()}</h3>
		</div>
	
		<ul class="meta_data">
		<li>ID: ${item.id}</li>
			<li>email: <a href="mailto:${item.getEmail()}">${item.getEmail()}</a></li>

			<li>School: ${item.getSchool()}</li>
	
		</ul>
			`;
		}

		employees.append(employee);
	});

	customHTML = employees;

	content = `
	<!DOCTYPE html>
	<html lang="en">
	
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="stylesheet" href="style.css">
			<title>Emloyee Management</title>
		</head>
	
		<body>
			<h1>Employee Management</h1>
			<section class="container">
	
${customHTML.innerHTML}
			</section>
		</body>
	
	</html>`;
	fs.writeFile('./app/dist/index.html', content, (err) => {
		if (err) {
			console.error(err);
		}
		// file written successfully
	});
})();

