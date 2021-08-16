const db = require('../db/connection');

/*
A Database class that will hold all the getter, setter, modify and delete functions for
the mysql database.
*/
class Database {
    //Create an empty constructor since we're only using this class to
    //get and modify the database.
    constructor(){}

    //Get all departments and their IDs from the department table
    getDepartments() {
        const sql = 'SELECT * FROM department'
        return db.promise().query(sql);
    }

    //Get just the names of the dpeartments with no ID
    getDepartmentNames(){
        const sql = 'SELECT name FROM department';
        return db.promise().query(sql);
    }

    //Get a department ID when passed the name of the department 
    getDepartmentId(name){
        const sql = 'SELECT id FROM department WHERE name = ?';
        return db.promise().query(sql, name);
    }

    //Get all roles and their IDs, salaries, and department IDs from the role table
    getRoles() {
        const sql = 'SELECT * FROM role';
        return db.promise().query(sql);
    }

    //Get the role ID based on its name
    getRoleId(title){
        const sql = 'SELECT id FROM role WHERE title = ?';
        return db.promise().query(sql, title);
    }

    //Get all employees and their information from the employee table
    getEmployees() {
        const sql = 'SELECT * FROM employee';
        return db.promise().query(sql);
    }

    //Get the employee based on their manager's ID or their department's ID
    getEmployeesbyid(manOrDept, id){
        var sql = "";
        if (manOrDept === "manager"){
            sql = 'SELECT * FROM employee WHERE manager_id = ?';
        }
        if (manOrDept === "department"){
            sql = 'SELECT employee.id, first_name, last_name, role_id, manager_id FROM employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id where department.id = ?';
        }
        
        return db.promise().query(sql, id);
    }

    //Get the employee ID from the first and last names of the employee
    getEmployeeId(firstname, lastname){
        const sql = 'SELECT id FROM employee WHERE first_name = ? && last_name = ?'
        const params = [firstname, lastname];
        return db.promise().query(sql, params);
    }

    //Get all employee salaries of a certain department
    getEmployeeSalaries(department){
        const sql = 'SELECT salary FROM employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id where department.id = ?'
        return db.promise().query(sql, department);
    }

    //Add a department to the department table
    addDepartment(name) {
        const sql = 'INSERT INTO department (name) VALUES (?)';
        return db.promise().query(sql, name);
    }

    //Add a role with the title, salary and department ID to the role table
    addRole(title, salary, department) {
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const params = [title, salary, department];
        return db.promise().query(sql, params);
    }

    //Add employee with first name, last name, role id and manager id to the employee table
    addEmployee(firstname, lastname, role, manager) {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const params = [firstname, lastname, role, manager];
        return db.promise().query(sql, params);
    }

    //Update the employee's role
    updateEmployeeRole(employee, role) {
        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const params = [role, employee];
        return db.promise().query(sql, params);
    }

    //Update the employee's manager
    updateEmployeeManager(employee, manager) {
        const sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
        const params = [manager, employee];
        return db.promise().query(sql, params);
    }

    //Delete the department(with id)
    deleteDepartment(department){
        const sql = 'DELETE FROM department WHERE id = ?';
        return db.promise().query(sql, department);
    }

    //Delete the role(with id)
    deleteRole(role){
        const sql = 'DELETE FROM role WHERE id = ?';
        return db.promise().query(sql, role);
    }

    //Delete the employee(with id)
    deleteEmployee(employee){
        const sql = 'DELETE FROM employee WHERE id = ?';
        return db.promise().query(sql, employee);
    }
}

module.exports = Database;