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
        sqlAddDepartment(answers.deptChoice).then(() => {
          init();
        });
        break;
      case "Add a Role":
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
