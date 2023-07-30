const express = require("express");
const { connection } = require("./config/connect");
const api = require("./routes/index");
const inquirer = require("inquirer");
const {
  sqlGetEmployee,
  sqlGetRole,
  sqlGetDepartment,
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
      "View All Roles",
      "View All Employees",
      "Quit",
    ],
    name: "choice",
  },
];

function init() {
  inquirer.prompt(questions).then(({ choice }) => {
    switch (choice) {
      case "View All Employees":
        sqlGetEmployee().then(() => {
          init();
        });
        break;
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

      default:
        console.log("Goodbye");
        break;
    }
  });
}

app.listen(PORT, () => {
  console.info(`Server listening on PORT ${PORT}`);
  init();
});
