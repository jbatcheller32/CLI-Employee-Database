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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add a role',
                'Add an employee', 'Update an employee role',]
        })
        .then(handleAction);
}

// Object to map options to functions
const optionsMap = {
    'View all departments': viewDepartments,
    'View all roles': viewRoles,
    'View all employees': viewEmployees,
    'Add employee': addEmployee,
    //'Update employee role': updateEmployeeRole,

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
                type: 'input',
                name: 'role',
                message: 'Enter employee role:',
            },
        ])
        .then((answers) => {
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role: answers.role,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    startEmployeeTracker();
                   
                }
            );
        });
}

// Function to update an employee's role
//function updateEmployeeRole() {
    // Implement code to update employee role
    // You can use a similar inquirer prompt to get employee information and new role
    // Update the MySQL database accordingly
  //  startEmployeeTracker();
//}










