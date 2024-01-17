const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },

    console.log(`Connected to the employees_db database.`)
);



function displayDepartmentTable() {

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all Roles', 'View all employees', 'Add department', 'Add a role',
                    'Add an employee', 'Update an employee role'],
                name: 'options'
            }

        ])

        .then((response) => {

            db.query('SELECT * FROM department', function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(results);
                console.log(response);

            });

        });

};

displayDepartmentTable();






