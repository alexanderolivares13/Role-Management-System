const express = require("express");
const { connection } = require("./config/connect");
const api = require("./routes/index");
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;

const app = express();
app.use("/api", api);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questions = [
    {
        message: 'What would you like to do?',
        type: 'list',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Quit'],
        name: 'choice'
    }
]


function init () {
    inquirer
        .prompt(questions)
        .then(({choice}) => {
            if(choice === 'Quit'){
                return;
            }
             return console.log(choice);
            })}
            
 switch (choice) {
    case 'View All Departments':
        
        break;

    default:
        break;
}



app.listen(PORT, () => {
  console.info(`Server listening on PORT ${PORT}`);
  init();
});