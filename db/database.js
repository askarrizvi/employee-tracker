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

    getEmployees() {
        const sql = 'SELECT * FROM employee'

        return db.promise().query(sql);
    }

    addDepartment(name) {
        return
    }

    addRole() {
        return
    }

    addEmployee() {
        return
    }

    updateEmployee() {
        return
    }
}

module.exports = Database;