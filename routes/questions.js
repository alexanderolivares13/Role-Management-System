const { connection } = require("../config/connect");

const questions = [
    {
      message: "What would you like to do?\n",
      type: "list",
      loop: false,
      choices: [
        "View All Departments",
        "Add a Department",
        "View All Roles",
        "Add a Role",
        "View All Employees",
        "Add an Employee",
        "Update Employee Role",
        "Quit",
      ],
      name: "choice",
    },
    {
      message:
        "Please enter the name of the Department that you would like to add:\n",
      type: "input",
      name: "deptChoice",
      when: (response) => response.choice === "Add a Department",
    },
    {
      message:
        "Please enter the name of the Role that you would like to add:\n",
      type: "input",
      name: "roleName",
      when: (response) => response.choice === "Add a Role",
    },
    {
      message:
        "Please enter the salary for the Role that you would like to add:\n",
      type: "input",
      name: "salary",
      when: (response) => response.choice === "Add a Role",
    },
    {
      message:
        "Please enter the department that corresponds with the Role:\n",
      type: "list",
      loop: false,
      // an async function written to return the current list of available departments. 
      // The map function is used to iterate through every element of the rows array, and return an object that will display a department name but return it's respective id as the returned value from the user.
      // This allows us to insert the appropriate value into our query using the prepared statements
      // This code ensures that whatever changes have been made while the user is utilizing the application are reflected immediately.
      // this further fixes the need to change the code in the future and the user will always be returned the most current data that is available in their database
      choices: async function () {
        const sqlQuery = `Select dept_name, id FROM department;`;
        try {
          const [rows, fields] = await connection.promise().query({ sql: sqlQuery });
          return rows.map((dept) => {
            return { name: dept.dept_name, value: dept.id };
          });
        } catch (err) {
          console.error(err);
        }
      },
      name: "deptId",
      when: (response) => response.choice === "Add a Role",
    },
    {
      message: "What is the Employee's first name?\n",
      type: "input",
      name: "firstName",
      when: (response) => response.choice === "Add an Employee",
    },
    {
      message: "What is the Employee's last name?\n",
      type: "input",
      name: "lastName",
      when: (response) => response.choice === "Add an Employee",
    },
    {
      message: "What is the Employee's role?\n",
      type: "list",
      loop: false,
      // similar to the aforementioned async function to return all the current available roles in the database
      choices: async function () {
        const sqlQuery = `SELECT * FROM role;`;
        try {
          const [rows, fields] = await connection.promise().query({ sql: sqlQuery });
          return rows.map((role) => {
            return { name: role.title, value: role.id };
          });
        } catch (err) {
          console.error(err);
        }
      },
      name: "empRole",
      when: (response) => response.choice === "Add an Employee",
    },
    {
      message: "Who is the Employee's manager?\n",
      type: "list",
      loop: false,
      // similar to the aforementioned async function to return all the current managers in the database
      // the query returns the first and last name of the manager combined under a single column. Allowing the user to select by name and returning the respective id to be used as a value to insert into the database.
      choices: async function () {
        const sqlQuery = `SELECT DISTINCT e.manager_id, CONCAT(em.first_name," ", em.last_name) AS manager_name FROM employee e JOIN employee em ON em.id = e.manager_id;`;
        try {
          const [rows, fields] = await connection.promise().query({ sql: sqlQuery });
          const choiceArray = rows.map((manger) => {
            return { name: manger.manager_name, value: manger.manager_id };
          });
          choiceArray.push({name: "N/A", value: null})
          return  choiceArray;
        } catch (err) {
          console.error(err);
        }
      },
      name: "empMan",
      when: (response) => response.choice === "Add an Employee",
    },
    {
        message: "Which employee's role would you like to update?\n",
        type: "list",
        loop: false,
        // similar to the aforementioned async function to return all of the employee names currently in the database.
        // the query returns the first and last name of the employee as a single column and allows the program to return the respective id to the employee. the value is used to update any existing information about the employee selected.
        choices: async function () {
            const sqlQuery = `Select id, CONCAT(first_name," ", last_name) AS employee_name FROM employee;`;
            try {
                const [rows, fields] = await connection.promise().query({ sql: sqlQuery });
                return rows.map((employee) => {
                    return { name: employee.employee_name, value: employee.id }
                })
            } catch (err) {
                console.error(err);
            }
        },
        name: "updEmp",
        when: (response) => response.choice === "Update Employee Role", 
    },
    {
        message: "What is their new role?\n",
        type: "list",
        loop: false,
      // similar to the aforementioned async function to return all the current available roles in the database
      // the same functionality is used here to return the relevant id to be used later.
        choices: async function () {
            const sqlQuery = `Select id, title FROM role;`;
            const [rows, fields] = await connection.promise().query({ sql: sqlQuery });
            return rows.map((role) => {
                return { name: role.title, value: role.id }
            })
        },
        name: "updRole",
        when: (response) => response.choice === "Update Employee Role",
        
    }
  ];

module.exports = questions;