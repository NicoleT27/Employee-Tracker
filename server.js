const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection successful!");
  start();
});

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    })
    .then((response) => {
      if (response.start === "View All Employees") {
        viewAllEmployees();
      } else if (response.start === "Add Employee") {
        addEmployees();
      } else if (response.start === "Update Employee Role") {
        updateEmployee();
      } else if (response.start === "View All Roles") {
        viewAllRoles();
      } else if (response.start === "Add Role") {
        addRoles();
      } else if (response.start === "View All Departments") {
        viewAllDepartments();
      } else if (response.start === "Add Department") {
        addDepartments();
      } else {
        console.log("please choose one of the options");
      }
    });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM department", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}
function viewAllRoles() {
  connection.query("SELECT * FROM roles", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}

function addDepartments() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    })
    .then((response) => {
      console.log(response.name);
      `INSERT INTO department (department_name) VALUES ("${response.name}")`;
      connection.query((error, results) => {
        if (error) throw error;
        console.log("Added department to the database!");
        start();
      });
    });
}

function addRoles() {
  connection.query("SELECT * FROM departments", (error, results) => {
    if (error) throw error;
    inquirer
      .prompt(
        {
          type: "input",
          name: "name",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the role belong to ?",
          choices: response.map((departments) => departments.department_name),
        }
      )
      .then((response) => {
        const departments = results.find(
          (department) => department.name === response.department
        );
        `INSERT INTO roles (title) VALUES (${response.title}),("${response.salary}")(department)`;
        connection.query((error, results) => {
          if (error) throw error;
          console.los("added role with salary to the database!");
          start();
        });
      });
  });
}

start();
