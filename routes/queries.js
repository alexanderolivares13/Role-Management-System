const { connection } = require("../config/connect");

async function sqlGetEmployee() {
  const sqlQuery = `SELECT e.id, first_name, last_name, title, dept_name, salary FROM employee e JOIN role r ON e.role_id = r.id RIGHT JOIN department d on d.id = r.department_id;`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}    
async function sqlAddEmployee(valueArray) {
    const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    try {
      const [rows, fields] = await connection.promise().query(sqlQuery, valueArray);
      return console.log(`\nAdded ${valueArray[0]} ${valueArray[1]} to the database\n`);
    } catch (err) {
      console.error(err);
    }
  }

async function sqlGetDepartment() {
  const sqlQuery = `SELECT * FROM department`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}

async function sqlAddDepartment(values) {
    const sqlQuery = `INSERT INTO department (dept_name) VALUES (?)`;
    try {
      const [rows, fields] = await connection.promise().query(sqlQuery, values);
      return console.log(`\nAdded ${values} to the database\n`);
    } catch (err) {
      console.error(err);
    }
  }

async function sqlGetRole() {
  const sqlQuery = `SELECT DISTINCT r.id, title, dept_name, salary FROM role r RIGHT JOIN department d ON r.department_id = d.id;`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}

async function sqlAddRole(valueArray) {
    const sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    try {
      const [rows, fields] = await connection.promise().query(sqlQuery, valueArray);
      return console.log(`\nAdded ${valueArray[0]} to the database\n`);
    } catch (err) {
      console.error(err);
    }
  }

module.exports = { sqlGetEmployee, sqlGetDepartment, sqlGetRole, sqlAddEmployee, sqlAddDepartment, sqlAddRole };
