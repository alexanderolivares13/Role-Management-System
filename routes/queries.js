const { connection } = require("../config/connect");

// this function returns a table that containst the names, title, department, salary, and manager names for each employee
async function sqlGetEmployee() {
  // the query is set to use multiple instances of the employee table to be able to return the employee id as a manager name
  // furthermore, it combines the remaining 2 tables to all of the aforementioned data.
  const sqlQuery = `SELECT e.id, e.first_name, e.last_name, title, dept_name, salary, CONCAT(em.first_name," ", em.last_name) AS manager_name 
  FROM employee e 
  JOIN role r 
  ON e.role_id = r.id 
  RIGHT JOIN department d 
  on d.id = r.department_id
  LEFT JOIN employee em
  ON em.id = e.manager_id;`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}
// this function allows the user to enter new employees into the database following a series of questions from inquirer.
async function sqlAddEmployee(valueArray) {
  const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  try {
    const [rows, fields] = await connection
      .promise()
      .query(sqlQuery, valueArray);
    return console.log(
      `\nAdded ${valueArray[0]} ${valueArray[1]} to the database\n`
    );
  } catch (err) {
    console.error(err);
  }
}

// this function shows all current departments in the database
async function sqlGetDepartment() {
  const sqlQuery = `SELECT * FROM department`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}

// allows the user to add a new department into the database following a series of inquirer pormpts
async function sqlAddDepartment(values) {
  const sqlQuery = `INSERT INTO department (dept_name) VALUES (?)`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery, values);
    return console.log(`\nAdded ${values} to the database\n`);
  } catch (err) {
    console.error(err);
  }
}

// returns all roles in the database as well as what departments they fall under
async function sqlGetRole() {
  const sqlQuery = `SELECT DISTINCT r.id, title, dept_name, salary FROM role r RIGHT JOIN department d ON r.department_id = d.id;`;
  try {
    const [rows, fields] = await connection.promise().query(sqlQuery);
    return console.table(rows);
  } catch (err) {
    console.error(err);
  }
}

// allows the user to add new roles to the database following a series of inquirer prompts
async function sqlAddRole(valueArray) {
  const sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  try {
    const [rows, fields] = await connection
      .promise()
      .query(sqlQuery, valueArray);
    return console.log(`\nAdded ${valueArray[0]} to the database\n`);
  } catch (err) {
    console.error(err);
  }
}

// allows the user to change the role of employees currently in the database.
async function sqlUpdateRole(valueArray) {
  const sqlQuery = `UPDATE employee SET role_id = ? WHERE id = ?`;
  try {
    const [rows, fields] = await connection
      .promise()
      .query(sqlQuery, valueArray);
    return console.log("\nRole successfully updated!\n");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  sqlGetEmployee,
  sqlGetDepartment,
  sqlGetRole,
  sqlAddEmployee,
  sqlAddDepartment,
  sqlAddRole,
  sqlUpdateRole,
};
