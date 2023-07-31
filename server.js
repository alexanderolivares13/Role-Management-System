const express = require("express");
const { connection } = require("./config/connect");
const inquirer = require("inquirer");
const {
  sqlGetEmployee,
  sqlGetRole,
  sqlGetDepartment,
  sqlAddEmployee,
  sqlAddDepartment,
  sqlAddRole,
  sqlUpdateRole
} = require("./routes/queries");
const questions = require('./routes/questions')
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// initializes the inquirer prompt. The function utilizes a switch case to check for the user response and ensure the correct query is ran for the database depending on user selection
// init is then called again within the function only after the query and data table is returned to the user. Allowing the user to continuously use the application without having to re-run the server.js file
function init() {
  inquirer.prompt(questions).then((answers) => {
    switch (answers.choice) {
      // the functions and queries called within each case are representitive of the choice made by the user.
      // the functions are imported from a seperate queries.js file and utilized the connection.promise method to ensure they are able to be executed correctly. This further allowed to be able to use the .then method to reinitialize the application and allow the user to continuously use the application without interruption
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
        sqlAddDepartment(answers.deptChoice).then(() => {
          init();
        });
        break;
      case "Add a Role":
        // an array is utilized for the following cases to insert the values entered by the user in a specific order that allows the query to execute correctly.
        let roleArray = [];
        roleArray.push(answers.roleName, answers.salary, answers.deptId);
      sqlAddRole(roleArray).then(() => {
          init();
        });
        break;
      case "Add an Employee":
        let valueArray = [];
        valueArray.push(answers.firstName, answers.lastName, answers.empRole, answers.empMan);
        sqlAddEmployee(valueArray).then(() => {
          init();
        });
        break;
      case "Update Employee Role":
        let updateArray = [];
        updateArray.push(answers.updRole, answers.updEmp);
        sqlUpdateRole(updateArray).then(() => {
          init();
        });
        break;
        // closes the application and ends the server instance for quality of life. removing the need from having to close the terminal after each use.
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
