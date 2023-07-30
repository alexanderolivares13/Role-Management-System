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

async function sqlGetDepartment() {
  const sqlQuery = `SELECT * FROM department`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}

async function sqlGetRole() {
  const sqlQuery = `SELECT * FROM role`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { sqlGetEmployee, sqlGetDepartment, sqlGetRole };
