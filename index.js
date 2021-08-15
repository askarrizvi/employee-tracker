// Include packages needed for this application
const inquirer = require('inquirer');
const Database = require('./db/database');
const cTable = require('console.table');
const { Console } = require('console');

const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add An Employee', 'Update An Employee Role',
"Update Employee's Manager", 'View Employees by Manager', 'View Employees by Department', 'Delete Department', 'Delete Role', 'Delete Employee', 'View Total Salary of Department'];

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: choices,
        }
    ])
};

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptname',
            message: 'Please enter a name for the new department',
            validate: (deptname) => {
                if (deptname) {
                    return true;
                } else {
                    console.log("Please enter the new department name!");
                    return false;
                }
            }
        }
    ])
};

function addRole(departments){
    return inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: 'Please enter a name for the new role',
            validate: (rolename) => {
                if (rolename) {
                    return true;
                } else {
                    console.log("Please enter the new role name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'rolesalary',
            message: 'Please enter a salary for the new role',
            validate: (rolesalary) => {
                if (!isNaN(rolesalary)) {
                    return true;
                } else {
                    console.log("Please enter a valid salary!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            message: 'Choose the department',
            name: 'department',
            choices: departments,
        }
    ]);
}

function addEmployee(roles, managers){
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Please enter the first name for the new employee',
            validate: (firstname) => {
                if (firstname) {
                    return true;
                } else {
                    console.log("Please enter a first name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Please enter the last name for the new employee',
            validate: (lastname) => {
                if (lastname) {
                    return true;
                } else {
                    console.log("Please enter a last name!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            message: "Choose the employee's role",
            name: 'role',
            choices: roles,
        },
        {
            type: 'list',
            message: "Choose the employee's manager",
            name: 'manager',
            choices: managers,
        }
    ]);
}

function changeEmployeeRole(roles, employees){
    return inquirer.prompt([
        {
            type: 'list',
            message: "Choose the employee",
            name: 'employee',
            choices: employees,
        },
        {
            type: 'list',
            message: "Choose the employee's new role",
            name: 'role',
            choices: roles,
        }
    ]);
}

function changeEmployeeManager(employees){
    return inquirer.prompt([
        {
            type: 'list',
            message: "Choose the employee",
            name: 'employee',
            choices: employees,
        },
        {
            type: 'list',
            message: "Choose the employee's new manager",
            name: 'manager',
            choices: employees,
        }
    ]);
}

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
                .then(dept => {
                    currentDb.addDepartment(dept.deptname)
                    .then(([rows, fields]) => {
                        console.log(dept.deptname+" added as new Department!");
                        init();
                    })
                });
            }
            else if (choice.menu === 'Add a Role'){
                currentDb.getDepartmentNames()
                .then(([rows, fields]) => {
                    //var resultArray = Object.values(JSON.parse(JSON.stringify(result)))
                    var newArr = [];
                    rows.forEach(element => {
                        newArr.push(element.name);
                    });
                    addRole(newArr)
                    .then(role => {
                        currentDb.getDepartmentId(role.department)
                        .then(([rows, fields]) => {
                            currentDb.addRole(role.rolename, role.rolesalary, rows[0].id)
                            .then(([rows, fields]) => {
                                console.log(role.rolename+" added as new Role!");
                                init();
                            });
                        });
                    });
                });
            }
            else if (choice.menu === 'Add An Employee'){
                var roleArr = [];
                var empArr = [];
                var roleId;
                var manId;
                var fn;
                var ln;
                currentDb.getRoles()
                .then(([rolerows, rolefields]) => {
                    rolerows.forEach(element => {
                        roleArr.push(element.title);
                    });
                    currentDb.getEmployees()
                    .then(([emprows, empfields]) => {
                        emprows.forEach(element => {
                            empArr.push(element.first_name+" "+element.last_name);
                        });
                        empArr.push("None");
                        addEmployee(roleArr, empArr)
                        .then(emp => {
                            if (emp.manager === "None"){
                                currentDb.getRoleId(emp.role)
                                .then(([ridrows, ridfields]) => {
                                    roleId = ridrows[0].id;
                                    currentDb.addEmployee(emp.firstname, emp.lastname, roleId, null)
                                    .then(([rows, fields]) => {
                                        console.log(emp.firstname+" "+emp.lastname+" added as new Employee!");
                                        init();
                                    });
                                });
                            }
                            else {
                            [fn, ln] = emp.manager.split(' ');
                            currentDb.getRoleId(emp.role)
                            .then(([ridrows, ridfields]) => {
                                roleId = ridrows[0].id;
                                currentDb.getEmployeeId(fn, ln)
                                .then(([midrows, midfields]) => {
                                    manId = midrows[0].id;
                                    currentDb.addEmployee(emp.firstname, emp.lastname, roleId, manId)
                                    .then(([rows, fields]) => {
                                        console.log(emp.firstname+" "+emp.lastname+" added as new Employee!");
                                        init();
                                    });
                                });
                            });
                        }
                        });
                    });
                });
            }
            else if (choice.menu === 'Update An Employee Role'){
                var roleArr = [];
                var empArr = [];
                var roleId;
                var empId;
                var fn;
                var ln;
                currentDb.getRoles()
                .then(([rolerows, rolefields]) => {
                    rolerows.forEach(element => {
                        roleArr.push(element.title);
                    });
                    currentDb.getEmployees()
                    .then(([emprows, empfields]) => {
                        emprows.forEach(element => {
                            empArr.push(element.first_name+" "+element.last_name);
                        });
                        changeEmployeeRole(roleArr, empArr)
                        .then(emp => {
                            [fn, ln] = emp.employee.split(' ');
                            currentDb.getRoleId(emp.role)
                            .then(([ridrows, ridfields]) => {
                                roleId = ridrows[0].id;
                                currentDb.getEmployeeId(fn, ln)
                                .then(([eidrows, eidfields]) => {
                                    empId = eidrows[0].id;
                                    currentDb.updateEmployeeRole(empId, roleId)
                                    .then(([rows, fields]) => {
                                        console.log("Changed "+emp.employee+"'s Role to "+emp.role+"!");
                                        init();
                                    });
                                });
                            });
                        });
                    });
                });
            }
            else if (choice.menu === "Update Employee's Manager"){
                var empArr = [];
                var empId;
                var manId;
                var efn;
                var eln;
                var mfn;
                var mln;

                currentDb.getEmployees()
                    .then(([emprows, empfields]) => {
                        emprows.forEach(element => {
                            empArr.push(element.first_name+" "+element.last_name);
                        });
                        changeEmployeeManager(empArr)
                        .then(emp => {
                            if(emp.employee === emp.manager){
                                [efn, eln] = emp.employee.split(' ');
                                currentDb.getEmployeeId(efn, eln)
                                .then(([eidrows, eidfields]) => {
                                    empId = eidrows[0].id;
                                    currentDb.updateEmployeeManager(empId, null)
                                    .then(([rows, fields]) => {
                                        console.log("Changed "+emp.employee+"'s Manager to Null!");
                                        init();
                                    });
                                });
                            }
                            else{
                                [efn, eln] = emp.employee.split(' ');
                                [mfn, mln] = emp.manager.split(' ');
                                currentDb.getEmployeeId(efn, eln)
                                .then(([eidrows, eidfields]) => {
                                    empId = eidrows[0].id;
                                    currentDb.getEmployeeId(mfn, mln)
                                    .then(([midrows, midfields]) => {
                                        manId = midrows[0].id;
                                        currentDb.updateEmployeeManager(empId, manId)
                                        .then(([rows, fields]) => {
                                            console.log("Changed "+emp.employee+"'s Manager to "+emp.manager+"!");
                                            init();
                                        });
                                    });
                                });
                            }
                        });
                    });
            }
            else if (choice.menu === 'View Employees by Manager'){}
            else if (choice.menu === 'View Employees by Department'){}
            else if (choice.menu === 'Delete Department'){}
            else if (choice.menu === 'Delete Role'){}
            else if (choice.menu === 'Delete Employee'){}
            else if (choice.menu === 'View Total Salary of Department'){}
        });
}

// Function call to display splashscreen and initialize app
splashScreen();
init();