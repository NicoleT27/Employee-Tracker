const inquirer = require("inquirer");
require("dotenv").config()

const questions= [
  {
    type: "input",
    name: "department",
    message: "What would you like to do?",
  },
  {
    type: "input",
    name: "departmentName",
    message: "What is the name of the department?",
  },
  {
    type: "input",
    name: "role",
    message: "what would you like to do?",
  },
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role?",
  },
  {
    type: "input",
    name: "salaryRole",
    message: "What is the salary of the role?",
  },
  {
    type: "list",
    name: "departmentRole",
    message: "Which department does the role belong to?",
    choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
  },
];
