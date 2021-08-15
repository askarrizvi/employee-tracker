// Include packages needed for this application
const inquirer = require('inquirer');
const Database = require('./db/database');
const cTable = require('console.table');

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add An Employee', 'Update An Employee Role'],
        }
    ])
};

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'deptname',
            message: 'Please enter a name for the new department'
        }
    ])
};

function splashScreen(){
    console.log(`
-------------------------------------
|  E M P L O Y E E   M A N A G E R  |
-------------------------------------
    `);
}

function init() {
    currentDb = new Database();
    promptMenu()
        .then(choice => {
            if (choice.menu === 'View All Departments'){
                currentDb.getDepartments()
                .then(([rows, fields]) => {
                    const table = cTable.getTable(rows);
                    console.log(table);
                    init();
                })
            }
            else if (choice.menu === 'View All Roles'){
                currentDb.getRoles()
                .then(([rows, fields]) => {
                    const table = cTable.getTable(rows);
                    console.log(table);
                    init();
                })
            }
            else if (choice.menu === 'View All Employees'){
                currentDb.getEmployees()
                .then(([rows, fields]) => {
                    const table = cTable.getTable(rows);
                    console.log(table);
                    init();
                })
            }
            else if (choice.menu === 'Add a Department'){
                addDepartment()
                .then(({deptname}) => {

                });
                currentDb.getEmployees()
                .then(([rows, fields]) => {
                    const table = cTable.getTable(rows);
                    console.log(table);
                    init();
                })
            }
            else if (choice.menu === 'Add a Role'){
                currentDb.getEmployees()
                .then(([rows, fields]) => {
                    const table = cTable.getTable(rows);
                    console.log(table);
                    init();
                })
            }
            else if (choice.menu === 'Add An Employee'){
                currentDb.getEmployees()
                .then(([rows, fields]) => {
                    const table = cTable.getTable(rows);
                    console.log(table);
                    init();
                })
            }
            else if (choice.menu === 'Update An Employee Role'){
                currentDb.getEmployees()
                .then(([rows, fields]) => {
                    const table = cTable.getTable(rows);
                    console.log(table);
                    init();
                })
            }
        })
}

// Function call to display splashscreen and initialize app
splashScreen();
init();