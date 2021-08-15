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

    getEmployeeId(firstname, lastname){
        const sql = 'SELECT id FROM employee WHERE first_name = ? && last_name = ?'
        const params = [firstname, lastname];
        return db.promise().query(sql, params);
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

    updateEmployee() {
        return
    }
}

module.exports = Database;