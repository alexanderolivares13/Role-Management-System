const express = require("express");
const { connection } = require("./config/connect");
const inquirer = require("inquirer");
const {
  sqlGetEmployee,
  sqlGetRole,
  sqlGetDepartment,
  sqlAddEmployee,
  sqlAddDepartment,
  sqlAddRole
} = require("./routes/queries");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questions = [
  {
    message: "What would you like to do?",
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
      "Please enter the name of the Department that you would like to add:",
    type: "input",
    name: "deptChoice",
    when: (response) => response.choice === "Add a Department",
  },
  {
    message:
      "Please enter the Role Name, salary, and department id of the Role that you would like to add: \n (Please indicate each seperate value with a ',' (e.g Customer Service Rep,100000,1) \n (Please refer to the 'View All Department' option to view the ID for each department)\n",
    type: "input",
    name: "deptChoice",
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
];

function init() {
  inquirer.prompt(questions).then((answers) => {
    switch (answers.choice) {
      case "View All Departments":
        sqlGetDepartment().then(() => {
          init();
        });
        break;
      case "View All Roles":
        sqlGetRole().then(() => {
          init();
        });
        break;
      case "View All Employees":
        sqlGetEmployee().then(() => {
          init();
        });
        break;
      case "Add a Department":
        sqlAddDepartment(deptChoice).then(() => {
          init();
        });
        break;
      case "Add a Role":
        deptChoice = deptChoice.split(",");
        sqlAddRole(deptChoice).then(() => {
          init();
        });
        break;
      case "Add an Employee":
        let valueArray = []
        valueArray.push(answers.firstName, answers.lastName, answers.empRole, answers.empMan);
        sqlAddEmployee(valueArray).then(() => {
          init();
        });
        break;
      default:
        console.log("\nGoodbye");
        process.exit();
    }
  });
}

app.listen(PORT, () => {
  console.info(`Server listening on PORT ${PORT}`);
  init();
});
