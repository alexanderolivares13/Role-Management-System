const express = require("express");
const { connection } = require("./config/connect");
const api = require("./routes/index");
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
app.use("/api", api);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questions = [
  {
    message: "What would you like to do?",
    type: "list",
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
      "Please enter the Role Name, salary, and department id of the Role that you would like to add: \n (Please indicate each seperate value with a ',' (e.g Customer Service Rep,100000,1) \n (Please refer to the 'View All Department' option to view the ID for each department)\n" ,
    type: "input",
    name: "deptChoice",
    when: (response) => response.choice === "Add a Role",
  },
];

function init() {
  inquirer.prompt(questions).then(({choice, deptChoice}) => {
    switch (choice, deptChoice) {
      case (choice === "View All Departments" && deptChoice):
        sqlGetDepartment().then(() => {
          init();
        });
        break;
      case (choice === "View All Roles" && deptChoice):
        sqlGetRole().then(() => {
          init();
        });
        break;
      case (choice === "View All Employees" && deptChoice):
        sqlGetEmployee().then(() => {
          init();
        });
        break;
      case choice === "Add a Department" && deptChoice:
        sqlAddDepartment(deptChoice).then(() => {
          init();
        });
        break;
        case choice === "Add a Role" && deptChoice:
            deptChoice = deptChoice.split(",");
        sqlAddRole(deptChoice).then(() => {
          init();
        });
        break;
      default:
        console.log("\nGoodbye");
        break;
    }
  });
}

app.listen(PORT, () => {
  console.info(`Server listening on PORT ${PORT}`);
  init();
});
