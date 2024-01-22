const inquirer = require('inquirer');
const mysql = require('mysql2');


// database connection 

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
);


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
    startEmployeeTracker();
});

// Function to start the employee tracker 
function startEmployeeTracker() {
    inquirer
        .prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add an employee', 'Add department', 'Add a role',
                'Update an employee role', 'Quit']
        })
        .then(handleAction);
}

// Object to map options to functions
const optionsMap = {
    'View all departments': viewDepartments,
    'View all roles': viewRoles,
    'View all employees': viewEmployees,
    'Add an employee': addEmployee,
    'Add department': addDepartment,
    'Add a role': addRole,
    'Update an employee role': updateEmployeeRole, 
    'Quit': quit,

};

// Function to handle user action
function handleAction(answer) {
    const selectedOPtion = optionsMap[answer.options];
    if (selectedOPtion) {
        selectedOPtion();
    } else {
        console.log('Invalid option, please try again.');
        startEmployeeTracker();
    }
}


//function to view departments

function viewDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();

    });
}


//functon to view the roles
function viewRoles() {
    db.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();

    });
}

// Function to view employees

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();

    });
}

// Function to add a new employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter employee first name:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter employee last name:',
            },
            {
                type: 'list',
                name: 'role',
                message: 'Enter employee role:',
                choices: ['Billing Support', 'Accountant', 'Sales Manager', 'Sales Rep',
                    'Junior Software Engineer', 'Software Engineer', 'Lead Software Engineer', 'Senior Software Engineer',
                    'Data Engineer', 'Data Maanger', 'Marketing Manager', 'Marketing Coordinator', 'Customer Service Rep',
                    'Technical Support', 'Customer Success Manager']
            },

            {
                type: 'list',
                name: 'manager',
                message: 'Who is the employees manager?',
                choices: ['James Batcheller', 'Jessica Sherwood', 'Benjamin Sakas', 'Corey Petersen']
            }
        ])
        .then((answers) => {
            db.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.role_id,
                    manager_id: answers.manager_id
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    startEmployeeTracker();

                }
            );
        });
}


//Function to add a department
function addDepartment() {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'addDepartment',
                message: 'Enter new department',
            },

        ])
        .then((answers) => {
            db.query(
                `INSERT INTO department SET ?`,
                {
                    name: answers.addDepartment
                },
                (err) => {
                    if (err) throw err;
                    console.log('Department added successfully!');
                    startEmployeeTracker();
                }
            );
        });
}


//Function for adding a new role

function addRole() {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'addRole',
                message: 'Enter new role',
            },

            {
                type: 'input',
                name: 'addSalary',
                message: 'Enter role salary',
            },

            {
                type: 'list',
                name: 'addDepartmentId',
                message: 'Enter new role department',
                choices: ['Accounting', 'Sales', 'Engineering', 'Marketing', 'Customer Service']
            }
        ])
        .then((answers) => {
            db.query(
                `INSERT INTO roles SET ?`,
                {
                    title: answers.addRole,
                    salary: answers.addSalary,
                    department_id: answers.addDepartment
                },
                (err) => {
                    if (err) throw err;
                    console.log('New role added successfully!');
                    startEmployeeTracker();
                }
            );
        });
}


// Function to update an employee's role

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose employee',
                name: 'employeeList',
                choices: ['James Batcheller', 'Jessica Sherwood', 'Benjamin Sakas', 'Garrett Soares',
                    'Mike Penhale', 'Erica Voulle', 'Corey Petersen', 'Ashley Owens', 'Saint Navarez',
                    'Shane Oneil', 'Cory Kennedy', 'Paul Rodriguez', 'Dylan Jaeb', 'Chris Cole', 'Frank Reynolds',
                    'Ishod Wair']
            },

            {
                type: 'list',
                message: 'Update employee role',
                name: 'updatedRole',
                choices: ['Billing Support', 'Accountant', 'Sales Manager', 'Sales Rep',
                'Junior Software Engineer', 'Software Engineer', 'Lead Software Engineer', 'Senior Software Engineer',
                'Data Engineer', 'Data Maanger', 'Marketing Manager', 'Marketing Coordinator', 'Customer Service Rep',
                'Technical Support', 'Customer Success Manager']
            },

            {
                type: 'list',
                message: 'Who is their manager?',
                name: 'managers',
                choices: ['James Batcheller', 'Jessica Sherwood', 'Benjamin Sakas', 'Corey Petersen']

            }

        ])
        .then((answers) => {
            db.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: answers.employeeList,
                    last_name: answers.employeeList,
                    role_id: answers.role_id,
                    manager_id: answers.manager_id

                },
                
                (err) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    startEmployeeTracker();
                }

            );
        });


};


function quit() {
    db.end();
};











