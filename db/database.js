const db = require('../db/connection');

class Database {
    constructor(){
       /* const sql = 'SOURCE ./db/db.sql; SOURCE ./db/schema.sql; SOURCE ./db/seeds.sql';

        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
        });*/
    }

    getDepartments() {
        const sql = 'SELECT * FROM department'

        return db.promise().query(sql);
       /* db.promise().query(sql)
        .then(([rows,fields]) => {
            console.log(rows);
            return rows;
        });*/

       /* db.promise().query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
            return result;
        });*/
    }

    getDepartmentNames(){
        const sql = 'SELECT name FROM department';
        return db.promise().query(sql);
    }

    getDepartmentId(name){
        const sql = 'SELECT id FROM department WHERE name = ?';
        return db.promise().query(sql, name);
    }

    getRoles() {
        const sql = 'SELECT * FROM role'

        return db.promise().query(sql);

        /*db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            return result;
        });*/
    }

    getRoleId(title){
        const sql = 'SELECT id FROM role WHERE title = ?';
        return db.promise().query(sql, title);
    }

    getEmployees() {
        const sql = 'SELECT * FROM employee';
        return db.promise().query(sql);
    }

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

    getEmployeeId(firstname, lastname){
        const sql = 'SELECT id FROM employee WHERE first_name = ? && last_name = ?'
        const params = [firstname, lastname];
        return db.promise().query(sql, params);
    }

    getEmployeeSalaries(department){
        const sql = 'SELECT salary FROM employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id where department.id = ?'
        return db.promise().query(sql, department);
    }

    addDepartment(name) {
        const sql = 'INSERT INTO department (name) VALUES (?)';
        return db.promise().query(sql, name);
    }

    addRole(title, salary, department) {
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const params = [title, salary, department];
        return db.promise().query(sql, params);
    }

    addEmployee(firstname, lastname, role, manager) {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const params = [firstname, lastname, role, manager];
        return db.promise().query(sql, params);
    }

    updateEmployeeRole(employee, role) {
        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const params = [role, employee];
        return db.promise().query(sql, params);
    }

    updateEmployeeManager(employee, manager) {
        const sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
        const params = [manager, employee];
        return db.promise().query(sql, params);
    }

    deleteDepartment(department){
        const sql = 'DELETE FROM department WHERE id = ?';
        return db.promise().query(sql, department);
    }

    deleteRole(role){
        const sql = 'DELETE FROM role WHERE id = ?';
        return db.promise().query(sql, role);
    }

    deleteEmployee(employee){
        const sql = 'DELETE FROM employee WHERE id = ?';
        return db.promise().query(sql, employee);
    }
}

module.exports = Database;